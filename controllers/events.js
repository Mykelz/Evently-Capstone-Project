const Event = require('../models/events');
const User = require('../models/user.js');
const redisClient = require('../utils/redis');


exports.createEvent = async (req, res, next) =>{
    try{
        const { title, tag, description, venue, price, totalTickets, eventDate, reminderDate } = req.body;
        const user = await User.findById(req.user);

        const event = await Event.create({
            title: title,
            tag: tag,
            description: description,
            venue: venue,
            price: price,
            totalTickets: totalTickets,
            ticketsAvailable: totalTickets,
            eventDate: eventDate,
            reminderDate: new Date(reminderDate),
            creator: req.user
        })

        user.createdEvents.push(event);
        await user.save();
        
        // Clear cache related to events with pattern matching
        const cachePattern = 'events:*';
        const keys = await redisClient.keys(cachePattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }


        res.status(201).json({
            message: 'Event created', 
            data: event
        })

    }catch(err){
        if(!err.statuscode){
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getAllEvent = async (req, res, next) =>{
    try{

        const { limit = 3, page = 1, title, tag, order, orderBy} = req.query;
        let sortQ = {};
        
        if(orderBy === "price" && order === "asc"){
            sortQ["price"] = 'asc'

        }
        else if(orderBy === "price" && order === "desc"){
            sortQ["price"] = 'desc'
        }

        let filterQ = {};

        if (title){
            filterQ["title"] = { $regex: title}
        }
        else if(tag){
            filterQ["tag"] = { $regex: tag} 
        }

        const cacheKey = `events:${JSON.stringify(sortQ)}:${JSON.stringify(filterQ)}:${limit}:${page}`

        const data = await redisClient.get(cacheKey);
        if (data){
            console.log('cache hit')
            return res.status(200).json({
                message: 'All Events',
                data: JSON.parse(data)
            })
        }

        const events = await Event.find(filterQ)
        .sort(sortQ)
        .skip( (page - 1) * limit)
        .limit(limit)
        .exec()

        await redisClient.setEx(cacheKey, 10 * 60, JSON.stringify(events));
        console.log('cache miss')

        res.status(200).json({
            message: 'All Events',
            data: events
        })


    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }

}

exports.getCreatorEvent = async (req, res, next) =>{
    try{
        const events = await Event.find({ creator: req.user});

        res.status(200).json({
            message: 'All Creator Events',
            data: events
        })

    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }

}

exports.applyForEvent = async (req, res, next) =>{
    try{
        const eventId = req.params.eventId;
    
        const event = await Event.findById(eventId);

        const eventees = event.Eventees;

        if (eventees.includes(req.user)){
            const error = new Error('Sorry you already applied for this event');
            error.statusCode = 401;
            throw error;
        }
        const user = await User.findById(req.user)

        user.appliedEvents.push(event._id);
        await user.save();

        res.status(200).json({
            message: "Succesfully applied. proceed to create your ticket and make payment"
        })


    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
            console.log(err)
        }
        next(err)
    }
}

exports.getEventById = async (req, res, next) =>{

    try{
        const eventId = req.params.eventId;

        const event = await Event.findById(eventId);
    
        if (!event){
            const error = new Error('No event found');
            error.statusCode = 404;
            throw error; 
        }
    
        res.status(200).json({
            messsage: "Event details",
            data: event
        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.setEventReminder = async (req, res) => {
    try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    const reminder = req.body.reminderDate;
    const user = await User.findById(req.user);
    
    if (!user.appliedEvents.includes(eventId)){
        const error = new Error('Sorry you have to apply for this event first before setting a reminder');
        error.statusCode = 401;
        throw error;
    }
    
    user.eventReminders.push({ eventTitle: event.title, reminderDate: new Date(reminder) });
    await user.save();
  
      res.status(200).json({ message: 'Reminder set successfully' });
    } catch (error) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
};
