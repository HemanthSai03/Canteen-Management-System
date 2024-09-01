/* This code snippet is defining a Mongoose schema for a menu item in a restaurant application. */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);

// // Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 12);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (password) {
//   try {
//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, this.password);
//     if (!isMatch) {
//       throw new Error('Invalid password');
//     }
//     return isMatch;
//   } catch (error) {
//     throw new Error('Password comparison failed');
//   }
// };

// module.exports = mongoose.model('User', userSchema);
