const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  event_id: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "event", required: true },
  username: { type: String, required: true },
  status: { type: String, required: true },
  joining_date: { type: Date, default: Date.now, required: true },
});

const Request = mongoose.model("requests", requestsSchema);
module.exports = Request;
