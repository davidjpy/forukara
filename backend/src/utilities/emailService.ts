import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

interface EmailService {
    HTMLTemplate: string;
    replacement: object,
    target: string;
    subject: string;
}

const absPath = path.resolve(__dirname);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const readHTML = (HTMLTemplate: string, replacement: object): string => {
    const file = fs.readFileSync(path.join(absPath, '..', 'views', HTMLTemplate), 'utf-8');
    const template = handlebars.compile(file);
    const html = template(replacement);

    return html;
}

const emailService = ({ HTMLTemplate, replacement, target, subject }: EmailService): void => {
    const mailOptions = {
        from: 'forukara.auto@gmail.com',
        to: target,
        subject: subject,
        html: readHTML(HTMLTemplate, replacement)
    };

    transporter.sendMail(mailOptions);
}

export default emailService;