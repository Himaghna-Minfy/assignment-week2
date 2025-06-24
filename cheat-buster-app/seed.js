const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/user.model');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const userCount = await User.countDocuments();

    if (userCount > 0) {
      console.log('Database already seeded.');
      return mongoose.disconnect();
    }

    const res = await axios.get('https://randomuser.me/api/?results=50&nat=us');
    const users = res.data.results.map(u => ({
      firstName: u.name.first,
      lastName: u.name.last,
      email: u.email,
      age: u.dob.age,
      city: u.location.city,
      picture: u.picture.large
    }));

    await User.insertMany(users);
    console.log('Seeded 50 users successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
