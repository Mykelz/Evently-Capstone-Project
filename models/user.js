const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['admin', 'user', 'creator'], 
        default: 'user' 
    },
    createdEvents:   [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        }
            ],
    appliedEvents:   [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        }
            ],
    tickets:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ticket',
        }
            ]

}, { timestamps: true })



module.exports = mongoose.model('User', userSchema);
