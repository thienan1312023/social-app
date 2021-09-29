const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  description: String,
  images: Array,
  imgUserProfile: String,
  username: String,
  createdAt: String,
  createdBy: String,
  tags:Array,
  comments: [
    {
      body: String,
      username: String,
      imgUserProfile: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      imgUserProfile: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});
postSchema.index({'$**': 'text'});

module.exports = model('Post', postSchema);
