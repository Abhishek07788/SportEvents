const express = require("express");
const Requests = require("../Schema/requests.schema");
const app = express.Router();

//------------- post request ---------
app.post("/", async (req, res) => {
  const { user_id, event_id } = req.body;
  try {
    const request = await Requests.findOne({
      user_id: user_id,
      event_id: event_id,
    });
    if (request) {
      return res
        .status(200)
        .send({ message: "Request already Sent to Organizer!!" });
    } else {
      await Requests.create(req.body);
      return res.status(200).send({ message: "Request Sent to Organizer" });
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get requests --------
app.get("/", async (req, res) => {
  try {
    const request = await Requests.find().sort({ publish_date: -1 });
    res.status(200).send(request);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get requests --------
app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Requests.updateOne(
      { _id: id },
      { $set: { status: req.body.status } }
    );
    res.status(200).send({ message: "request updated" });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get requests --------
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Requests.deleteOne({ _id: id });
    res.status(200).send({ message: "request Canceled!!" });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get by event id --------
app.get("/:event", async (req, res) => {
  const { event } = req.params;
  try {
    const request = await Requests.find({ event_id: event }).populate([
      "event",
    ]);
    res.status(200).send(request);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = app;
