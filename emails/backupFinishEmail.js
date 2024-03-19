import 'dotenv/config';
import transporter from '../config/mailConf.js';
import {createEnvironment, createArrayLoader} from "twing";
import fs from "fs";
import path from 'path';
import hbs from 'nodemailer-express-handlebars';


const backupFinishEmail = async (domain , email) => {

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    const mailData = {
        from: process.env.mymailname_mailer,
        template: "email",
        to: email,
        subject: `نسخه ی پشتیبان وب سایت ${domain}`,
        context: {
            domain : domain,
            email : email
          },
    };

    try {
        const res = transporter.sendMail(mailData);
        console.log("email sended ....")
    } catch (error) {
        throw new Error("mailer error : " + error.message)
    }

    
}

export default backupFinishEmail;