const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ticketsAvailable: { 
        type: Number, 
        required: true 
    },
    eventDate: {
        type: Date,
        required: true
    },
    reminderDate: {
        type: Date
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Eventees:   [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
            ],

    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ]
}, { timestamps: true })



module.exports = mongoose.model('Event', eventSchema);
