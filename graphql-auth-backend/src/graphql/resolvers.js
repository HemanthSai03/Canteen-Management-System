const User = require('../models/user');
const MenuItem = require('../models/menuItem');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

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

    menuItems: async () => {
      try {
        return await MenuItem.find();
      } catch (err) {
        throw new Error('Error fetching menu items');
      }
    },

    menuItem: async (parent, { id }) => {
      try {
        const menuItem = await MenuItem.findById(id);
        if (!menuItem) {
          throw new Error('Menu item not found.');
        }
        return menuItem;
      } catch (err) {
        throw new Error('Error fetching menu item');
      }
    },
  },

  Mutation: {
    createUser: async (parent, { userInput }, context) => {
      const { username, email, password, role } = userInput;

      // Validate input fields
      if (!username || !email || !password || !role) {
        throw new Error('All fields are required.');
      }

      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists.');
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword, // Store hashed password
          role: role || 'user', // Default role to 'user' if not provided
        });

        const savedUser = await newUser.save();

        // Return the created user data
        return { ...savedUser._doc, id: savedUser._id.toString() };
      } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error('Failed to create user: ' + error.message);
      }
    },

    login: async (parent, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User does not exist.');
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Password is incorrect.');
        }

        // Generate a JSON Web Token
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Return token and user info
        return {
          userId: user.id,
          token,
          tokenExpiration: 1,
          role: user.role,
        };
      } catch (err) {
        console.error('Login error:', err.message);
        throw new Error('Failed to login');
      }
    },

    updateUser: async (parent, { id, userInput }) => {
      try {
        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(id, userInput, { new: true });
        if (!updatedUser) {
          throw new Error('User not found.');
        }

        // Return updated user data
        return updatedUser;
      } catch (err) {
        console.error('Error updating user:', err.message);
        throw new Error('Failed to update user');
      }
    },

    addMenuItem: async (parent, { menuItemInput }) => {
      try {
        const menuItem = new MenuItem(menuItemInput);
        const createdMenuItem = await menuItem.save();
        return createdMenuItem;
      } catch (err) {
        console.error('Error adding menu item:', err.message);
        throw new Error('Failed to add menu item');
      }
    },

    updateMenuItem: async (parent, { id, menuItemInput }) => {
      try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, menuItemInput, { new: true });
        if (!updatedMenuItem) {
          throw new Error('Menu item not found.');
        }
        return updatedMenuItem;
      } catch (err) {
        console.error('Error updating menu item:', err.message);
        throw new Error('Failed to update menu item');
      }
    },

    deleteMenuItem: async (parent, { id }) => {
      try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedMenuItem) {
          throw new Error('Menu item not found.');
        }
        return true;
      } catch (err) {
        console.error('Error deleting menu item:', err.message);
        throw new Error('Failed to delete menu item');
      }
    },
  },
};

module.exports = resolvers;
