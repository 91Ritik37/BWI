const AppError = require("../util/AppError");
const jwt = require("jsonwebtoken");
const catchAsync = require("../util/catchAsync");
const bcrypt = require("bcrypt");
const user = require("./../model/user");

const role = require("./../model/role")
// const AppError = require("../util/AppError");


const registerUser = catchAsync(async (req, res, next) => {

    const { name, email, password, phone_number, profile_image } = req.body;



    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are mandatory!" });

    }


    const userAvailable = await user.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: "User already registered!" });

    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);


    const User = await user.create({
        name,
        email,
        password: hashedPassword,
        phone_number,
        profile_image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        }
    })



    res.status(201).json({ message: "User register successfully", User });

    console.log(`User Register successfully ${User}`)


}
)


const login = catchAsync(async (req, res, next) => {

    const { email, password, phone_number } = req.body;

    if ((!email && !phone_number) || !password) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    let userAuth;
    if (email) {
        userAuth = await user.findOne({ email }).select("+password");
    } else if (phone_number) {
        userAuth = await user.findOne({ phone_number }).select("+password");
    }

    if (!userAuth) {
        return res.status(400).json({ message: "Invalid Password or email/phone_number " });
    }

    const matchPassword = await bcrypt.compare(password, userAuth.password);

    if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Password or username " });
    }

    const token = jwt.sign({ email, phone_number }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '30000s' });

    res.cookie('token', token);

    res.json({ message: "Login Successfully ", token })


})

const update = catchAsync(async (req, res, next) => {
    try {
        const Role = await role.findById(req.params.id);
        role_id = Role.user_id;
        role_name = Role.name;
        // console.log(role_name);
         

    } catch (error) {

    }
});






module.exports = { registerUser, login, update };