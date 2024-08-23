import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  nick: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  image: {
    type: String,
    default: 'default.png'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', UserSchema)

export default User
