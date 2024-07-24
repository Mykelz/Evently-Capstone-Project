const Event = require('../models/events');
const User  = require('../models/user');
const Ticket = require('../models/event-ticket');
const axios = require('axios');
require('dotenv').config();
const qrCode = require('qrcode');

exports.createTicket = async (req, res, next) =>{
    try{
        const eventId = req.params.eventId;

        const NumberOfTicket = req.body.NumberOfTicket;
        if(isNaN(NumberOfTicket)){
            const error = new Error('The number of ticket you want must be a Number data type')
            error.statusCode = 400;
            throw error
        }

        const event = await Event.findById(eventId);
        const user = await User.findById(req.user);

        const userEmail = user.email
        const eventPrice = event.price;
        const totalPrice = eventPrice * NumberOfTicket;

        const data = {
            amount: totalPrice * 100,
            email: userEmail,
          };

        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          };

          console.log(data);
          const response = await axios.post('https://api.paystack.co/transaction/initialize', 
          data, 
          {
            headers,
          });

          let tickets = [];
          for (let i = 0; i < NumberOfTicket; i++){
              const ticket = await Ticket.create({
                  event: eventId,
                  user: req.user,
                  transactionId: response.data.data.reference
              })
                tickets.push(ticket);
                event.tickets.push(ticket._id);
                user.tickets.push(ticket._id);
          }

          await event.save()
          await user.save()
        
        res.status(201).json({
            message: 'Ticket created. Proceed to make payment',
            paymentDetails: response.data
        });

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}


exports.verifyTrans = async (req, res, next) =>{
    try{

        const paystack_ref = req.params.paystack_ref;

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${paystack_ref}`, {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
          });

        const tickets = await Ticket.find({ transactionId: paystack_ref});

        for ( i = 0; i < tickets.length; i++){
            if (response.data.data.status === 'success'){
                tickets[i].status = 'paid'
                await tickets[i].save();
            }

        }


        res.status(200).json(response.data);

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}