import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is necessary !!"],
  },
  desc: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: [true, "How can a blog be without body??"],
  },
  textContent: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  coverImage: {
   type:String,
   required:true
  },
  likedBy: {
    type: [String],
    default: [],
  },
  tag:{
    type:String,
    required:true
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
