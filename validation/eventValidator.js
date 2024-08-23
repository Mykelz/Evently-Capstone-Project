const Joi = require('joi');

const ValidationMiddleware = async (req, res, next) =>{
    const payLoad = req.body;
    try{
        await eventValidator.validateAsync(payLoad);
        next()
    }
    catch(err){
        return res.status(422).send(err.details[0].message)
    }
}


const eventValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(250)
        .required(),

    tag: Joi.string()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .min(3)
        .max(1000)
        .required(),
        
    venue: Joi.string()
        .min(3)
        .max(1000)
        .required(),

    price: Joi.number()
        .required(),

    totalTickets: Joi.number()
        .required()
        .min(10),
    
    eventDate: Joi.date()
        .required(),
    
    reminderDate: Joi.date()

    
})


module.exports = ValidationMiddleware;