const User = require('../models/user');
const MenuItem = require('../models/menuItem');
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
    createUser: async (parent, { userInput }) => {
      try {
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
          throw new Error('User already exists.');
        }

        const user = new User({
          username: userInput.username,
          email: userInput.email,
          password: await user.hashPassword(userInput.password), // Ensure this function is defined in the model
          role: userInput.role || 'USER',
        });

        const createdUser = await user.save();
        return { ...createdUser._doc, id: createdUser._id.toString() };
      } catch (err) {
        console.error('Error creating user:', err.message);
        throw new Error('Failed to create user');
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
        throw new Error('Failed to update user');
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
          role: user.role,
        };
      } catch (err) {
        console.error('Login error:', err.message);
        throw new Error('Failed to login');
      }
    },

    addMenuItem: async (parent, { menuItemInput }) => {
      try {
        console.log('Adding menu item with input:', menuItemInput);

        const menuItem = new MenuItem(menuItemInput);
        const createdMenuItem = await menuItem.save();

        console.log('Menu item added successfully:', createdMenuItem);
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
