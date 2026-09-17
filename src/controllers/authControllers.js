// Authentication controllers /srs/controllers/authcontrollers.js
import express from 'express';

export const register = async (req, res) => {
  try{

      const {username, password, email} = req.body;

      if(!username || !password || !email)
        return res.status(400).json({
          error: "All fields required!"
        });

      if(typeof password !== "number" || username !== "string")
        return res.status(400).json({
          error: "Invalid cridentials."
        })
  }catch(err){
    console.log('Something went wrong.', err)
  }
}


export const login = async (req, res) => {
  try{
    //  bussiness logic
  }catch(err){
    console.log('Something went wrong.', err);
  }
}

export const logout = async (req, res) => {
  try{

    

  }catch(err){
    console.log('Something went wrong.', err)
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

   

  }catch(err){
    console.log('Something went wrong.', err)
  }
}