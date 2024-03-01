import 'dotenv/config';
import transporter from '../config/mailConf.js';


const backupFinishEmail = async (email) => {

    const mailData = {
        from: process.env.mymailname_mailer,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was not easy!',
    };

    try {
        const res = await transporter.sendMail(mailData);
        if(res) console.log("the url has send ..........") 
    } catch (error) {
        throw new Error("mailer error : " + error.message)
    }

    
}

export default backupFinishEmail;