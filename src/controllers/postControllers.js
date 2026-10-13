import prisma from '../utils/prisma.js';

export const createPost = async (req, res) => {
  try{

    const {content, title} = req.body;

    if(!content || !title){
      return res.status(400).json({
        message: "Failed to create a post."
      })
    }

     const userId = Number(req.user.id);

    // creating post
    const post = await prisma.post.create({
      data: {
        content,
        title,
        user: {
          connect: {
            id: Number(userId)
          }
        }
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    });

    return res.status(200).json({
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