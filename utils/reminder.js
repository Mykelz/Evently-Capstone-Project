const Event = require('../models/events');
const User = require('../models/user')
const emailSender = require('./email')


const scheduleReminders = async () => {
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const events = await Event
    .find({ reminderDate: { $exists: true, $ne: null } })
    .populate({
      path: 'creator',
      select: 'email'  
      })
    .exec();

    if(events.length > 0 ){
      events.forEach(event => {
        const reminderDate = new Date(event.reminderDate)
        
        let creatorsEmail = []; 
        let eventName = [];
        if (reminderDate >= startOfDay && reminderDate <= endOfDay) {
          creatorsEmail.push(events.creator.email);
          eventName.push(event.title)
        }
      });
      emailSender.sendEmail(creatorsEmail, eventName);
    }


    const users = await User
      .find({ 'eventReminders.reminderDate': { $exists: true, $not: { $size: 0 } } })
      .populate({
        path: 'eventReminders.eventId',
        select: 'title'  
      })

    if(users.length > 0 ){
      users.forEach(user => {
        const reminderDate = new Date(user.eventReminders.reminderDate)

        let usersEmail = [];
        let eventName = []; 
        if (reminderDate >= startOfDay && reminderDate <= endOfDay) {
          usersEmail.push(user);
          eventName.push(user.eventReminders.eventId.title)
        }
      });
      // emailSender.sendEmail(usersEmail);
    }

};




module.exports = scheduleReminders;