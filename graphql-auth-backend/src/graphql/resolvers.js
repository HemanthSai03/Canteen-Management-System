const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error('Error fetching users');
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User does not exist.');
        }

        const isEqual = await user.comparePassword(password);
        if (!isEqual) {
          throw new Error('Password is incorrect.');
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return {
          userId: user.id,
          token: token,
          tokenExpiration: 1,
        };
      } catch (err) {
        console.error('Login error:', err.message);
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      try {
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
          throw new Error('User already exists.');
        }

        const user = new User({
          username: userInput.username,
          email: userInput.email,
          password: await userInput.password, // Ensure password is hashed
          role: userInput.role || 'user',
        });

        const createdUser = await user.save();
        return { ...createdUser._doc, id: createdUser._id.toString() };
      } catch (err) {
        console.error('Error creating user:', err.message);
        throw err;
      }
    },

    updateUser: async (parent, { id, userInput }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, userInput, { new: true });
        if (!updatedUser) {
          throw new Error('User not found.');
        }
        return updatedUser;
      } catch (err) {
        console.error('Error updating user:', err.message);
        throw err;
      }
    },

    // login: async (parent, { email, password }) => {
    //   try {
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //       throw new Error('User does not exist.');
    //     }

    //     const isEqual = await user.comparePassword(password);
    //     if (!isEqual) {
    //       throw new Error('Password is incorrect.');
    //     }

    //     const token = jwt.sign(
    //       { userId: user.id, email: user.email, role: user.role },
    //       process.env.JWT_SECRET,
    //       { expiresIn: '1h' }
    //     );

    //     return {
    //       userId: user.id,
    //       token: token,
    //       tokenExpiration: 1,
    //     };
    //   } catch (err) {
    //     console.error('Login error:', err.message);
    //     throw new Error('Failed to login');
    //   }
    // },
  },
};

module.exports = resolvers;
