import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
 };


// Route for user Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,message:"User not found"});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({success: false,message:"Incorrect password or email"});
        } else {
            const token = createToken(user._id);
            res.json({ success: true, token });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for user Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // cheking user already exits oor not
        const exists = await userModel.findOne({ email });
        if(exists) {
            return res.status(400).json({
                success: false,message:"User already exists"});
        }
        // validating email format and strong password
        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,message:"Enter a valid email"});
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,message:"Password must be at least 8 characters"});
        }
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        // saving user
        const newUser = new userModel({ name, email, password: encryptedPassword });
        const user = await newUser.save();
        
        const token = createToken(user._id); res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Incorrect email or password" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin }