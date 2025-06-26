const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
dotenv.config();

const app = express();


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hotel Booking API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});