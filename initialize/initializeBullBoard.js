import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import { Queue , Worker , FlowProducer } from 'bullmq';
// import express from "express"
// const app = express();

const initializeBullBoard = (app) => {
    const scrapequeue = new Queue("scrape");
    const zipqueue = new Queue("zip");
    const mailqueue = new Queue("mailer");
    const serverAdapter = new ExpressAdapter();
    
    serverAdapter.setBasePath('/admin/queues');
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
        queues: [new BullMQAdapter(scrapequeue) , new BullMQAdapter(zipqueue) , new BullMQAdapter(mailqueue)],
        serverAdapter: serverAdapter,
      });
   

    app.use('/admin/queues', serverAdapter.getRouter());

}

export default initializeBullBoard;



