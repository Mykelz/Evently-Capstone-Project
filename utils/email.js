const nodemailer = require('nodemailer');


const sendEmail = async (users, eventNames)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.GMAIL_ACCT,
              pass: process.env.APP_PASS,
            },
          });

          for (const user of users){
            for (const eventName of eventNames){
                const mailOptions = {
                    from: '"Evently" obianukamicheal@gmail.com', // sender address
                    to: user, // list of receivers
                    subject: ` Reminder For Your Upcoming Event Titled: ${eventName} !!`, // Subject line
                    html: "<p> This is a reminder for your upcoming event.</p>", // html body
                  }
                  let info = await transporter.sendMail(mailOptions);
                  console.log('Message sent: %s', info.messageId);
            }
          }
    }catch(err){
        console.log(err)
    }

}


module.exports = sendEmail;