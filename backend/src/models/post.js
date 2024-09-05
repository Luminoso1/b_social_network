import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  file: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', PostSchema, 'posts')

export default Post
