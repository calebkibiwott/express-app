// Authentication controllers /srs/controllers/authcontrollers.js
import bcrypt from 'bcrypt'
import prisma from '../utils/prisma.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try{

      const {username, password, email} = req.body;

      // validation

      if(!username || !password || !email){
        return res.status(400).json({
          error: "All fields required."
        })
      }

      if(password.length < 6){
        return res.status(400).json({
          error: "Password must be at least 6 characters."
        })
      }

      const existingEmail = await prisma.user.findUnique({
        where: {email}
      })

      if (existingEmail){
        return res.status(409).json({
          error: "Email already in use."
        })
      }

      const existingUser = await prisma.user.findUnique({
        where: {username}
      })

      if (existingUser){
        return res.status(409).json({
          error: "Username already in use."
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Creating the user
    
      const user = await prisma.user.create({
        data: {email, username, password: hashedPassword},
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true
        }
      })

      res.status(200).json({
        message: "User created successfull.",
        user: user
      })

    
  }catch(err){
    console.log('Login error.')
    return res.status(500).json({
      error: "Something went wrong. Please try again later."
    })
  }
}


export const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        error: "All fields required."
      })
    };

    const user = await prisma.user.findUnique({
      where: {email}
    })

    if(!user){
      return res.status(401).json({
        error: "Invalid email or password."
      })
    };

    const isMatch = await bcrypt.compare(password, User.password)
    if(!isMatch){
      return res.status(401).json({
        error: "Invalid email or Password."
      })
    };

    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        
      res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        });
  }catch(err){
    console.log('Login error.', err);
    return res.status(500).json({
      error: "Something went wrong. Please try again later."
    })
  }
}

export const logout = async (req, res) => {
  try{
    return res.status(200).json({
      message: "Logged out successfully."
    })
  }catch(err){
    console.log('Logout error.', err);
    res.status(500).json({
      error: "Something went wrong. Please try again later."
    })
  }
}

export const updatePassword = async (req, res) => {
  try{

  }catch(err){
    console.log('Something went wrong.', err)
  }
}


export const getMe = async (req, res) => {
  try{

    const user = await prisma.user.findUnique({
      where: {id: id.user.id},
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    })

    if(!user){
      return res.status(404).json({
        error: "User not found."
      })
    };

    res.json({user});
  }catch(err){
    console.log('getMe error', err)
    return res.status(500).json({
      error: "Something went wrong. Please try again later."
    })
  }
}