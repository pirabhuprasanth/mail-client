import { Router, Request, Response } from 'express';
import { getEmails, sendEmail } from '../services/mailService';

const router = Router();

// Route to get emails with pagination
router.get('/emails', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    try {
        const emails = await getEmails(page, limit);
        res.json({ emails });
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
});

// Route to send an email
router.post('/send', async (req: Request, res: Response) => {
    const { to, subject, text } = req.body;
    try {
        await sendEmail(to, subject, text);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;
