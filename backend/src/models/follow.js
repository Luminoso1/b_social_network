import mongoose from 'mongoose'

const FollowSchema = mongoose.Schema({
  following_user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  followed_user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

// index
FollowSchema.index({ following_user: 1, followed_user: 1 }, { unique: true })

const Follow = mongoose.model('Follow', FollowSchema, 'follows')

export default Follow
