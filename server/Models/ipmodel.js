import mongoose from "mongoose";
const ipSchema = new mongoose.Schema({
    ipAddress: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  const IP = mongoose.model('IP', ipSchema);
  export default IP;