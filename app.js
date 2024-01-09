const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");


dotenv.config({ path: ".env" });

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
});

const app = express();

app.use(express.json());

// Load environment variables from .env file  

const port = process.env.PORT || 5500;

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successfull"));

// routes ............
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});

