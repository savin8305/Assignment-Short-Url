import { Router, Request, Response } from 'express';
import { URLModel } from '../models/url.model';

const router2 = Router();

router2.get('/:code', async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const url = await URLModel.findOne({
            urlCode: code
        });
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

export default router2;
