import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NGO from "../models/ngo.model.js";
import User from "../models/user.model.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

  
export const registerNGO = async (req, res) => {
  const { name, email, password, phone, address, description } = req.body;
  try {

    if(!name || !password || !email || !phone || !address){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    if(password.length < 6 ){
        return res.status(400).json({
            message:"Password length should be greater than 6"
        });
    }

    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) return res.status(400).json({ msg: 'NGO already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newNGO = await NGO.create({ name, email, password: hashedPassword, phone, address, description });
    const token = generateToken(newNGO._id, 'ngo');
    res.status(201).json({ token, ngo: newNGO });

  } 
  catch (err) {
        console.log("Error in NGOsignup controller", err.message);
        res.status(500).json({ message : "Internal server Error "});
  }
};

  
export const loginNGO = async (req, res) => {
  const { email, password } = req.body;
  try {

    const ngo = await NGO.findOne({ email });
    if (!ngo) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(ngo._id, 'ngo');
    res.status(200).json({ token, ngo });

  } 
  catch (err) {
        console.log("Error in NGOlogin controller", err.message);
        res.status(500).json({ message : "Internal server Error "});
  }
};

 
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    if(!name || !password || !email ){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    if(password.length < 6 ){
        return res.status(400).json({
            message:"Password length should be greater than 6"
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser._id, 'user');
    res.status(201).json({ token, user: newUser });

  } 
  catch (err) {
        console.log("Error in user signup controller", err.message);
        res.status(500).json({ message : "Internal server Error "});
  }

};

 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user._id, 'user');
    res.json({ token, user });

  } 
  catch (err) {
        console.log("Error in user login controller", err.message);
        res.status(500).json({ message : "Internal server Error "});
  }
};
