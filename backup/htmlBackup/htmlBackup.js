import { Worker , FlowProducer} from 'bullmq';
import scrape from 'website-scraper';
import { zip } from 'zip-a-folder';
import transporter from '../../config/mailConf.js';
import 'dotenv/config';
import getWebsitePagesURL from '../../utilities/getWebsitePagesURL.js';
import backupFinishEmail from '../../emails/backupFinishEmail.js';

const htmlBackup =async (pages , page_posts , redisConnection , domain , email) => {
    
    let allPagesList = await getWebsitePagesURL(pages , page_posts , domain);
  
    const flowProducer = new FlowProducer({ connection : redisConnection });
    
  
    allPagesList = allPagesList.map(item => {
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
            children: allPagesList,
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
              attempts : 2
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
          console.log(error , ".....")
          throw new Error("cannot backup or scrape pages")
        }
  
    }, {
      connection: redisConnection,
      concurrency: 3,
    });
  
    scrapeworker.on('completed',async job => {
    });
    
    scrapeworker.on('failed', async (job, err) => {
      await redisConnection.set("busy" , "no");
      throw new Error("problem to scrape queue")
    });
  
  
    const zipworker = new Worker('zip', async job => {
      try {
        await redisConnection.set("busy" , "no");
        await zip( `./${domain}` , `./${domain}.zip` );
      } catch (error) {
        throw new Error("the zip has a problem")
      }
    }, {
    connection: redisConnection
    });

  
    const mailworker = new Worker("mailer" , async job => {
        try {
            await backupFinishEmail(domain , email)
        } catch (error) {
            throw new Error(error.message)
        }

    }, {
      connection: redisConnection
    })
}

export default htmlBackup;