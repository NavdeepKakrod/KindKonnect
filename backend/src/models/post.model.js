import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  ngo: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'NGO' 
  },
  title:{
    type: String,
    required: true
  }, 
  description:{
    type: String,
  },
  goalAmount: { 
    type: Number 
  },
  collectedAmount: { 
    type: Number, 
    default: 0 
  },
  volunteersRequired: { 
    type: Number
  },
  volunteersJoined: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
}, 
{ timestamps: true }

);
 

const Post = mongoose.model("Post",postSchema);

export default Post;