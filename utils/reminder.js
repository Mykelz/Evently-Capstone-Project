const Event = require('../models/events');
const User = require('../models/user')
const  sendEmail = require('./email')


const scheduleReminders = async () => {
  const today = new Date();
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
      let creatorsEmail = []; 
      let eventName = [];

      events.forEach(event => {

        const reminderDate = new Date(event.reminderDate);
                
        if(reminderDate >= startOfDay && reminderDate <= endOfDay){
          creatorsEmail.push(event.creator.email);
          eventName.push(event.title)
        }
      });
      console.log(creatorsEmail, eventName)
      sendEmail(creatorsEmail, eventName);
    }


    const users = await User
      .find({ 'eventReminders.reminderDate': { $exists: true } })
      .populate({
        path: 'eventReminders',
        select: 'title'  
      }).exec()


    if(users.length > 0 ){
      let usersEmail = [];
      let eventName = []; 
      users.forEach(user => {
        user.eventReminders.forEach(reminder =>{
          const reminderDate = new Date(reminder.reminderDate)
          
          if (reminderDate >= startOfDay && reminderDate <= endOfDay) {
            usersEmail.push(user.email);
            eventName.push(reminder.eventTitle)
          }
        })
      });
      console.log(usersEmail, eventName)
      sendEmail(usersEmail, eventName);
    }

};






module.exports = scheduleReminders;