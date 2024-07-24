const Event = require('../models/events');
const User = require('../models/user.js');

exports.createEvent = async (req, res, next) =>{
    try{
        const { title, tag, description, venue, price, ticketsAvailable, eventDate, reminderDate } = req.body;
        const user = await User.findById(req.user);
        console.log(user)

        const event = await Event.create({
            title: title,
            tag: tag,
            description: description,
            venue: venue,
            price: price,
            ticketsAvailable: ticketsAvailable,
            eventDate: eventDate,
            reminderDate: reminderDate,
            creator: req.user
        })

        user.createdEvents.push(event);
        await user.save();

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
        const events = await Event.find();

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

        const user = await User.findById(req.user)

        event.Eventees.push(req.user)
        await event.save()

        user.appliedEvents.push(event._id);
        await user.save();

        res.status(200).json({
            message: "Succesfully applied. proceed to create your ticket and make payment"
        })


    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}