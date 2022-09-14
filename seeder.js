const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Lead env vars
dotenv.config({ path: "./config/config.env" });

//Lead models
const Bootcamp = require("./models/Bootcamp");

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: false,
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete Data

const DeleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destoyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  DeleteData();
}
