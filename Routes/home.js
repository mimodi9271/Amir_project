import express from "express"
import generateKaniwebBackup from "../contoller/generateKaniwebBackup.js";
import validateDomain from "../utilities/validateDomain.js";

export const initializeRouter = (dependencies) => {
  const { app } = dependencies;

  const router = express.Router()

  router.get("/" ,  async (req , res) => {
    
    let { domain , email } = req.query;
    
    
    let validationRes = validateDomain(domain);
    if(validationRes.error){
      res.status(401).send("invalid url")
    }


    try {
      await generateKaniwebBackup(dependencies , domain , email);
      res.status(400).send("you have inserted in queue and the result will email you");
    } catch (error) {
      res.status(401).send(error.message)
    }
      
  })

  app.use( "/" , router )


}





