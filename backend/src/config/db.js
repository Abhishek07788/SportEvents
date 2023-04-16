const mongoose = require("mongoose");
// -------------- (MongoDb Connection) -------------
const connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;