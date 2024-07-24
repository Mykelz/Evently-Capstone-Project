const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const eventRoute = require('./routes/events');
const ticketRoute = require('./routes/event-ticket')

const app = express();

app.use(express.json());


app.use('/auth', userRoute);
app.use(eventRoute);
app.use(ticketRoute);


app.use((error, req, res, next) =>{
    const data = error.data;
    const status = error.statusCode || 500;
    const message = error.message || 'an error occcured';
    res.status(status).json({ message: message, data: data})
  })


mongoose.connect(process.env.CONNECT).then(connection=>{
    console.log('Database connected')
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
    })
}).catch(err=>{
    console.log(err)
})