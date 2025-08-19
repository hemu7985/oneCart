import User from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import genToken1 from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email" });
        }
        if(password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }
       const hashPasssword = await bcrypt.hash(password, 10);
       const user = new User({ name, email, password: hashPasssword });
      
       const token = await genToken(user._id)
       res.cookie("token", token, { 
        httpOnly: true,
        secure:false,
        sameSite:"strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
     });

       await user.save();
       console.log(user)
       res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("signup error")
        res.status(500).json({ message: `Register error{error}` });
    }
};
     

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = await genToken(user._id)
        res.cookie("token", token, { 
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
         });
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {

        res.status(500).json({ message: `Login error{error}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: `Logout error{error}` });
    }
};

export const googlelogin = async (req, res) => {
    try {
        const { name, email } = req.body;
         const user = await User.findOne({email });
       if(!user){
        user = await User.create({ name , email })
       }
        const token = await genToken(user._id)
        res.cookie("token", token, { 
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
         });
        res.status(200).json(user);

    } catch (error)  {
    if (error.response) {
        console.log("Axios Error:", error.response.data);
        console.log("Status Code:", error.response.status);
    } else if (error.request) {
        console.log("No response received:", error.request);
    } else {
        console.log("Error setting up request:", error.message);
    }
}
};

export const adminLogin = async(req, res) => {  
    try {
        const { email, password } = req.body;

      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const token = await genToken1(email)
        res.cookie("token", token, { 
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 1000 * 60 * 60 * 24 * 1,
         });
        res.status(200).json(token);
      }
      else{
        res.status(400).json({ message: "Invalid credentials" });
      }

    } catch (error) {
        console.log("admin login error", error)
        res.status(500).json({ message: `Login error{error}` });
    }

};