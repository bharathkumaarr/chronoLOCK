const mongoose = require('mongoose')
const Capsule = require('../models/chronoLock.model')

const User = require('../models/User')

const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const checkRevealDates = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    const capsules = await Capsule.find({
      revealDate: { $gte: today, $lt: tomorrow }
    }).populate('owner', 'email');



    for (const capsule of capsules) {
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: capsule.owner.email,
        subject: `Your time capsule "${capsule.title}" is Ready!`,
        text: `Hello,\n\nYour capsule titled "${capsule.title}" is now available to view.\n\n Visit the app to open it.\n\n- ChronoLOCK`
      }
      
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${capsule.owner.email} for "${capsule.title}"`);
      } catch (emailError) {
        console.error(`Failed to send email for "${capsule.title}":`, emailError.message);
      }
    
  } catch (error) {
    console.error('Error checking capsule reveal dates:', error.message);
  }
};


module.exports = { checkRevealDates };
