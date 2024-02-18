import { Queue , Worker , FlowProducer, tryCatch } from 'bullmq';
import scrape from 'website-scraper';
import { zip } from 'zip-a-folder';
import transporter from '../Config/mailConf.js';
import 'dotenv/config';
import allPageCreator from '../func/allPageCreator.js';


const bullmqCreator =async (pages , page_posts , redisConnection , domain , email) => {
    
    let AllPagesList = await allPageCreator(pages , page_posts , domain);

  
  
    const flowProducer = new FlowProducer({ connection : redisConnection });
    
  
    AllPagesList = AllPagesList.map(item => {
      return { name : `${item.title}` , data : item , queueName: 'scrape' , opts: { failParentOnFailure: true }}
    });
    
  
    let flow = ""
    try {
      flow = await flowProducer.add({
        name : "mailer",
        queueName : "mailer",
        data : {step : "is mail"},
        children : [
          {
            name: 'zipbuilder',
            queueName: 'zip',
            data: { step: 'zip' },
            opts: { failParentOnFailure: true },
            children: AllPagesList,
          }
        ]
      } 
      ,
      { 
        queuesOptions : {
          ["mailer"]: {
              defaultJobOptions : {
              removeOnComplete : true,
              removeOnFail : true,
            },
          },
          ["zip"]: {
              defaultJobOptions : {
              removeOnComplete : true,
              removeOnFail : true,
            },
          },
          ["scrape"] : {
              defaultJobOptions : {
              removeOnComplete : true,
              removeOnFail : true,
              // attempts : 2
            },
          }
        }
      },
      );
    } catch (error) {
      throw new Error("cannot make queue")
    }
  
    
  
    const scrapeworker = new Worker('scrape', async job => {
        let options = {
          urls : [{ url : job.data.webUrl , filename : job.data.filename}] ,
          directory : job.data.directory
        }
  
        try {
          await scrape(options)
        } catch (error) {
          throw new Error("cannot backup or scrape pages")
        }
  
    }, {
      connection: redisConnection,
      concurrency: 5,
    });
  
    scrapeworker.on('completed',async job => {
      console.log(`${job.id} has completed`);
    });
    
    scrapeworker.on('failed', async (job, err) => {
      console.log(`${job.id} has failed with ${err.message}`);
      await redisConnection.set("busy" , "no");
      throw new Error("problem to scrape queue")
    });
  
  
    const zipworker = new Worker('zip', async job => {
      try {
        await zip( `./${domain}` , `./${domain}.zip` );
      } catch (error) {
        throw new Error("the zip has a problem")
      }
    }, {
    connection: redisConnection
    });

  
    const mailworker = new Worker("mailer" , async job => {
        const mailData = {
            from: process.env.mymailname_mailer,
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
        };

        try {
            const res = await transporter.sendMail(mailData);
            if(res) console.log("the url has send")
        } catch (error) {
            throw new Error("mailer has a problem")
        }

    }, {
      connection: redisConnection
    })
}

export default bullmqCreator