import express, { Request, Response } from 'express';
import { URLModel } from '../models/url.model';
import { generateShortId } from '../utils/url';

const router1 = express.Router();
const baseUrl = process.env.BASEURI;

const isValidUrl = (url: string): boolean => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
};

const generateUniqueShortId = async (): Promise<string> => {
    let shortId: string;
    let existingURL: any;

    while (true) {
        // Pass a placeholder argument to generateShortId
        shortId = generateShortId('placeholder');
        existingURL = await URLModel.findOne({ urlCode: shortId });

        if (!existingURL) {
            break;
        }
    }
    return shortId;
};

router1.post('/shorten', async (req: Request, res: Response) => {
    const { longUrl, urlCode } = req.body;

    try {
        if (!isValidUrl(longUrl)) {
            return res.status(401).json({ error: 'Invalid Url' });
        }

        if (urlCode) {
            const existingCodeBookmark = await URLModel.findOne({ urlCode });

            if (existingCodeBookmark) {
                return res.status(400).json({ error: `Code ${urlCode} already in use. Please choose a different code.` });
            }
        }

        const existingURL = await URLModel.findOne({ longUrl });

        if (existingURL && !urlCode) {
            return res.json({ urlCode: existingURL.urlCode });
        }

        let generatedCode: string;
        if (!urlCode) {
            generatedCode = await generateUniqueShortId();
        } else {
            generatedCode = urlCode;
        }
        const shortUrl = `${baseUrl}/${generatedCode}`;

        const newURL = new URLModel({
            urlCode: generatedCode,
            longUrl,
            shortUrl,
        });
        await newURL.save();
        res.status(201).json({ urlCode: generatedCode });
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});

export = router1;
