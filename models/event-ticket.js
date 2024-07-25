const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true 
      },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
      },
    purchaseDate: {  
        type: Date, 
      },
    status: {
        type: String,
        default: 'pending'
      },
    transactionId: {
        type: String
      },
    qrCode: {
        type: String,
      }
}, { timestamps: true })



module.exports  = mongoose.model('Ticket', ticketSchema);





















