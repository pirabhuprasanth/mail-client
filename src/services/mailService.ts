import { ImapFlow } from 'imapflow';

const imapClient = new ImapFlow({
    host: process.env.IMAP_HOST,
    port: parseInt(process.env.IMAP_PORT || '993', 10),
    secure: true,
    auth: {
        user: process.env.IMAP_USER,
        pass: process.env.IMAP_PASS
    }
});

export async function getEmails(page: number, limit: number) {
    await imapClient.connect();
    let emails: any[] = [];

    try {
        const mailbox = await imapClient.mailboxOpen('INBOX');
        const messages = await imapClient.fetch(
            { seq: `${(page - 1) * limit + 1}:${page * limit}` },
            { envelope: true, uid: true, internalDate: true }
        );

        for await (let msg of messages) {
            emails.push({
                uid: msg.uid,
                subject: msg.envelope.subject,
                from: msg.envelope.from[0].address,
                date: msg.internalDate
            });
        }
    } finally {
        await imapClient.logout();
    }

    return emails;
}
