import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  selectedPeople: [String],
  selectedRoom: String,
  peopleImages: Object,
  roomImages: Object,
  prompt: String,
  generatedImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Request", requestSchema);
