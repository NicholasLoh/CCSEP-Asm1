const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.ewczw.mongodb.net/asm1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`Connected to MongoDB: ${connect.connection.host}`);
};

module.exports = connectDB;
