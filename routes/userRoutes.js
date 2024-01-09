const express = require("express");
const user = require("../model/user");
const router = express.Router();
const { registerUser } = require("../controllers/authController")
const { login, update } = require("../controllers/authController")
const { create_role } = require("../controllers/roleController");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });



// sign in..
router.route("/sign-up").post(upload.single("profile_image"), registerUser);

// login
router.route('/login').post(login);

// modify the Details 
router.route('/update/:id').put(update);

//Role Route;
router.route("/role").post(create_role);

module.exports = router;