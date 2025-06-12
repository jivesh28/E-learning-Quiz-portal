// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' }
}, { timestamps: true });

// { timestamps: true }
// Automatically adds:

// createdAt → Timestamp when the document is created.

// updatedAt → Timestamp when the document is last updated.

// Useful for tracking data changes.


// {
//   "_id": "abc123",
//   "name": "Vaishali Tyagi",
//   "email": "vaishali@example.com",
//   "password": "$2a$10$xyz...", 
//   "role": "instructor",
//   "createdAt": "2025-06-12T07:00:00Z",
//   "updatedAt": "2025-06-12T07:00:00Z"
// }


module.exports = mongoose.model('User', userSchema);

