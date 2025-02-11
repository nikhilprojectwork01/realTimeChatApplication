import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "Some Fields Are Missing",
        success: false
      })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Enter Same Password",
        success: false
      })
    }
    //finding user  
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        message: "UserName Alredy Register",
        success: false
      })
    }
    // hashing Password  
    const hashingpassword = await bcrypt.hash(password, 10);
    //profile photo : 
    const profilePhotoBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const profilePhotoGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    //creating new User  
    await User.create({
      fullName,
      userName,
      password: hashingpassword,
      profilePhoto: gender === 'male' ? profilePhotoBoy : profilePhotoGirl,
      gender
    })
    return res.status(200).json({
      message: "Account created Successfully",
      success: true
    })
  } catch (error) {
    console.log("Error Occured In user Registration " + error)
  }
}

// login user  

export const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: "Some Fields Are Missin",
        success: false
      })
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "User Not register ",
        success: false
      })
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
      res.status(400).json({
        message: "Please Enter Correct Password",
        success: false
      })
    }
    // generating token  
    const tokendata = {
      userId: user._id
    }
    //signing json 
    const token = await jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });
    let users = {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      password: user.password,
      profilePhoto: user.profilePhoto,
      gender: user.gender
    }
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.userName}`,
      users,
      success: true
    })
  } catch (error) {
    console.log("Error Occured in Login User " + error)
  }
}


//logout user  :
export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User Logout Successfully",
      success: true
    })
  } catch (error) {
    console.log("Error Occured IN logout User" + error)
  }
}

export const getOtherusers = async (req, res) => {
  try {
    const loggedinUser = req.id;
    //finding other uSer   
    const otheruser = await User.find({ _id: { $ne: loggedinUser } }).select("-password");
    return res.status(200).json({
      message: "User FInd Successfully",
      otheruser,
      success: true
    })
  } catch (error) {
    console.log("Error Occured in finding Other user " + error)
  }
}