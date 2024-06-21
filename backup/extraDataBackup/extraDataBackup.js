import xlsx from 'node-xlsx';
import path from "path";
import { dirname } from 'node:path';
import fs from "fs"
import { fileURLToPath } from 'node:url';
import moment from 'jalali-moment';
import { tryCatch } from 'bullmq';

const extraDataBackup = async (websiteUsers , messages , domain) => {

    let __dirname = dirname(fileURLToPath(import.meta.url));
    __dirname = __dirname.slice(0 , __dirname.length-23);

    let websiteUsersList = [
        ["نام کاربری" , "رمز عبور" , "نام" , "نام خانوادگی", "آدرس ایمیل" , "شماره تماس"],
    ];

    let messagesList = [
        ["نام" , "آدرس ایمیل" , "ناریخ" , "پیغام"]
    ]

    websiteUsers.forEach(item => {
        let list = [];
        for (const [key, value] of Object.entries(item)) {
            list.push(value)
          }
        websiteUsersList.push(list)
    });

    messages.forEach(item => {
        let list = [];
        for (let [key, value] of Object.entries(item)) {
            if (key == "received_at"){
                value = moment(value , 'YYYY-M-D HH:mm:ss').locale('fa').format('YYYY/M/D HH:mm:ss');
                list.push(value)
            }else{
                list.push(value)
            }
          }
        messagesList.push(list)
    })


    let websiteUsersBuffer = ""
    try {
        websiteUsersBuffer = xlsx.build([{name: 'listofwebsiteusers', data: websiteUsersList}]);
    } catch (error) {
        console.log(error , "users .....")
    }



    let messagesBuffer = "";
    try {
        messagesBuffer = xlsx.build([{name: 'listofmessages', data: messagesList}]);
    } catch (error) {
        console.log(error , "messages ......")
    }
    
    

    try {
        await fs.promises.mkdir(path.join(__dirname , `${domain}`));
        await fs.promises.mkdir(path.join(__dirname, `${domain}` , "extrabackup"));
        await fs.promises.writeFile(path.join(__dirname, `${domain}` , "extrabackup" , "لیست کاربران.xlsx") , websiteUsersBuffer)
        await fs.promises.writeFile(path.join(__dirname, `${domain}` , "extrabackup" , "لیست پیام ها.xlsx") , messagesBuffer)

    } catch (error) {
        throw new Error("problem to make extra data backup :" + error.message)
    }
    
    
}

export default extraDataBackup;