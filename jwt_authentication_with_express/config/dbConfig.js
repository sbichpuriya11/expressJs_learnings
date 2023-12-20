const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(
      `Database connected: ${connection.connection.host} - ${connection.connection.name}`
    );
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
