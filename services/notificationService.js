const mongoose = require('mongoose')
const Capsule = require('../models/chronoLock.model')

const User = require('../models/User')

const checkRevealDates = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    const capsules = await Capsule.find({
      revealDate: { $gte: today, $lt: tomorrow }
    }).populate('owner', 'email');

    capsules.forEach(capsule => {
      console.log(
        `Capsule "${capsule.title}" is ready to be opened by ${capsule.owner.email}`
      );
    });
  } catch (error) {
    console.error('Error checking capsule reveal dates:', error.message);
  }
};

module.exports = { checkRevealDates };
