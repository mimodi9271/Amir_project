import nodemailer from "nodemailer";
import 'dotenv/config';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mymailname_mailer,
        pass: process.env.mymailpass_mailer
    }
    
});

export default transporter;