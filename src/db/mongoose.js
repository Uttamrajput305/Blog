const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 60000,
  autoCreate: false,
});
