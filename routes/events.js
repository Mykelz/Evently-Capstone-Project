const express = require('express');
const eventController = require('../controllers/events');
const eventValidation = require('../validation/eventValidator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();


router.post('/event', isAuth, eventValidation ,eventController.createEvent);
router.get('/events', eventController.getAllEvent);
router.get('/event/creator', isAuth,  eventController.getCreatorEvent);
router.post('/event/:eventId', isAuth, eventController.applyForEvent);
router.get('/event/:eventId', isAuth, eventController.getEventById);
router.post('/event/setReminder/:eventId', isAuth, eventController.setEventReminder);



module.exports = router;