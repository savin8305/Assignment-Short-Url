import * as crypto from 'crypto';

const base62Alphabet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Generates a short ID based on the SHA-256 hash of the input URL.
 * @param url - The input URL.
 * @returns The generated short ID.
 */
const generateShortId = (url: string): string => {
    try {
        // Create a unique hash for the input URL using SHA-256
        const hash: string = crypto.createHash('sha256').update(url).digest('hex');

        // Convert the hash to a decimal number
        const decimalValue: bigint = BigInt('0x' + hash);

        // Convert the decimal number to base62
        let shortId: string = '';
        let tempDecimalValue: bigint = decimalValue;
        while (tempDecimalValue > 0n) {
            const remainder: number = Number(tempDecimalValue % 62n);
            shortId = base62Alphabet[remainder] + shortId;
            tempDecimalValue /= 62n;
        }

        // Pad the shortId to a fixed length (adjust as needed)
        const desiredLength: number = 8;
        while (shortId.length < desiredLength) {
            shortId = '0' + shortId;
        }

        return shortId;
    } catch (error) {
        console.error('Error generating short ID:', error);
        throw new Error('Failed to generate short ID');
    }
};

export { generateShortId };
