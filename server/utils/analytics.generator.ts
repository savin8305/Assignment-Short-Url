import { Document, Model } from "mongoose";

interface MonthData {
    month: string;
    count: number;
}
//logic need to revise
export async function generateLast12MonthData<T extends Document>(
    model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
    const last12Months: MonthData[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);

        const month = date.toLocaleString('default', { month: 'long' });
        const count = await model.countDocuments({
            createdAt: {
                $gte: new Date(date.getFullYear(), date.getMonth(), 1),
                $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1)
            }
        });

        last12Months.push({ month, count });
    }

    return { last12Months };
}
