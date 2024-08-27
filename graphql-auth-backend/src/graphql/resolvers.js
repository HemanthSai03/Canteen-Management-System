const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const resolvers = {
  createUser: async ({ userInput }) => {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      throw new Error('User already exists.');
    }
    const user = new User({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, id: createdUser._id.toString() };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist.');
    }
    const isEqual = await user.comparePassword(password);
    if (!isEqual) {
      throw new Error('Password is incorrect.');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};

module.exports = resolvers;
