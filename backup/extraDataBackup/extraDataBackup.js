import xlsx from 'node-xlsx';
import path from "path";
import { dirname } from 'node:path';
import fs from "fs"
import { fileURLToPath } from 'node:url';

const extraDataBackup = (users , comments , domain) => {

    let __dirname = dirname(fileURLToPath(import.meta.url));
    __dirname = __dirname.slice(0 , __dirname.length-23);

    let usersList = [
        ["نام کاربری" , "رمز عبور" , "نام" , "نام خانوادگی", "آدرس ایمیل" , "شماره تماس"],
    ];

    let commentsList = [
        ["نام" , "آدرس ایمیل" , "پیغام"]
    ]

    users.forEach(item => {
        let list = [];
        for (const [key, value] of Object.entries(item)) {
            list.push(value)
          }
        usersList.push(list)
    });

    comments.forEach(item => {
        let list = [];
        for (const [key, value] of Object.entries(item)) {
            list.push(value)
          }
        commentsList.push(list)
    })
    
    let usersBuffer = xlsx.build([{name: 'listofusers', data: usersList}]);
    let commentsBuffer = xlsx.build([{name: 'listofcommnets', data: commentsList}]);
    

    try {
        fs.mkdir(path.join(__dirname, `${domain}`) , {} , (err) => {
            fs.mkdir(path.join(__dirname, `${domain}` , "extrabackup") , {} , (err) => {
                fs.writeFile(path.join(__dirname, `${domain}` , "extrabackup", "لیست کاربران.xlsx"), usersBuffer , "utf-8" , (err , res) => {
                    fs.writeFile(path.join(__dirname, `${domain}` , "extrabackup", "لیست پیام ها.xlsx"), commentsBuffer , "utf-8" , (err , res) => {
                    })
                })
            });
        })

        
            
        
        
        
        
    } catch (error) {
        throw new Error("problem to make extra data backup")
    }
    
    
}

export default extraDataBackup;