import prisma from '../utils/prisma.js';

export const createPost = async (req, res) => {
  try{

    const {content, title} = req.body

    if(!content || !title){
      return res.status(204).json({
        error: "This field cannot be empty"
      })
    }

    // creating post
    const post = await prisma.post.create({
      data: {content, title},
      select: {
        id: true,
        content: true,
        createdAt: true,
      }
    });

    res.status(200).json({
      message: "Post created successfull",
      post: post
    })
  }catch(error){
    console.log("createPost error.")
    return res.status(500).json({
      error: "Something went wrong please try again later."
    })
  }
}