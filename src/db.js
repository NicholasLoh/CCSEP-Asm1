const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to MongoDB: ${connect.connection.host}`);
};

module.exports = connectDB;
