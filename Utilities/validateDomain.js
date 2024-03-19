import Joi from "joi";

const validateDomain = (domain) => {
    const schema = Joi.object({ 
        domain : Joi.string().min(3).max(30).required(), 
      });

    const dataToValidate = { 
        domain : `${domain}`,  
      };
    
    const result = schema.validate(dataToValidate);

    return result;


}

export default validateDomain;