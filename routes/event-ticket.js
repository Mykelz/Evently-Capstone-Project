const express = require('express');
const ticketController = require('../controllers/event-ticket');
const isAuth = require('../middleware/isAuth');

const router = express.Router();


router.post('/ticket/:eventId', isAuth, ticketController.createTicket );

router.post('/verifyPayment/:paystack_ref', isAuth, ticketController.verifyTrans);





module.exports = router;