import mongoose, { Document, Schema } from 'mongoose';

interface IURL extends Document {
    urlCode: string;
    longUrl: string;
    shortUrl: string;
    date: string;
}

const URLSchema = new Schema<IURL>(
    {
        urlCode: {
            type: String,
            required: true,
        },
        longUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            default: Date.now().toString(), // Use toString() to convert the number to a string
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

const URLModel = mongoose.model<IURL>('Url', URLSchema);
export { URLModel };
