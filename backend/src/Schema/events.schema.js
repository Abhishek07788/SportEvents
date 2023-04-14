const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  sport_name: { type: String, required: true },
  sport_img: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  number_of_player: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  publish_date: { type: String, required: true },
});

const Events = mongoose.model("events", eventsSchema);
module.exports = Events;
