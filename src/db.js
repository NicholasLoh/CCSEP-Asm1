const mongoose = require("mongoose");

const url =
  "mongodb+srv://nicholas0010:wodemimashi1@asm1.bmmty.mongodb.net/asm1?retryWrites=true&w=majority";
const connectDB = async () => {
  const connect = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to MongoDB: ${connect.connection.host}`);
};

module.exports = connectDB;
