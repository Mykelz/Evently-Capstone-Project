const Event = require('../models/events');
const User = require('../models/user')
const emailSender = require('./email')


const scheduleReminders = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  console.log(startOfDay, endOfDay)

  let creatorsEmail = []; 
  let eventName = [];

  const events = await Event
    .find({ reminderDate: { $exists: true, $ne: null } })
    .populate({
      path: 'creator',
      select: 'email'  
      })
    .exec();

    if(events.length > 0 ){
      // console.log(events)
      events.forEach(event => {
        const reminderDate = new Date(event.reminderDate);
        
        console.log(event.creator.email + ' and ' + event.title, reminderDate)
        
        if(reminderDate >= startOfDay && reminderDate <= endOfDay){
          creatorsEmail.push(event.creator.email);
          eventName.push(event.title)
        }
      });
      console.log(creatorsEmail, eventName)
      // emailSender.sendEmail(creatorsEmail, eventName);
    }


    const users = await User
      .find({ 'eventReminders.reminderDate': { $exists: true } })
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
      console.log(usersEmail, eventName)
      // emailSender.sendEmail(usersEmail);
    }

};




module.exports = scheduleReminders;