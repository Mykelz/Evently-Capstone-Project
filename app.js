const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const eventRoute = require('./routes/events');
const ticketRoute = require('./routes/event-ticket');
const scheduleReminders = require('./utils/reminder');
const schedule = require('node-schedule')
const { rateLimit } = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 15 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(express.json());

app.use('/auth', userRoute);
app.use(eventRoute);
app.use(ticketRoute);


schedule.scheduleJob('0 7 * *', scheduleReminders)


app.use((error, req, res, next) =>{
    const data = error.data;
    const status = error.statusCode || 500;
    const message = error.message || 'an error occcured';
    res.status(status).json({ message: message, data: data})
  })


module.exports = app;