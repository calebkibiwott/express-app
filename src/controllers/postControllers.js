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
    console.log("createPost error.", error)
    return res.status(500).json({
      error: "Something went wrong please try again later."
    })
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return res.status(500).json({
      message: "Failed to retrieve posts"
    });
  }
};

export const getPostById = async (req, res) => {
  try{

    const id = Number(req.params.id);
    
    const findPost = await prisma.post.findUnique({
      where: {id},
      include: {
        user: {
          select: {
        id: true,
        username: true,

      }
        }
      }
     
    })

    if(!findPost){
      return res.status(404).json({
        message: "Post not found."
      })
    }
    return res.status(200).json({
      post: findPost
    })  
  }catch(error){
    console.log("getPostById error", error)
    return res.status(500).json({
      error: "Something went wrong please try again later."
    })
  }
};


export const postUpdate = async (req, res) => {
try{
  
  const postId = Number(req.params.id);
  const {title, content} = req.body;

  if(!title || !content){
    return res.status(400).json({
      message: "Please provide a post to update."
    })
  }

  // Checking the post exists.
  const post = await prisma.post.findFirst({
    where: {id: postId},
    select: {
      id: true,
      userId: true
    },
  })

  if(!post){
    return res.status(404).json({
      message: "Post not found."
    })
  }

  // Updating the post

  const updatePost = await prisma.post.update({
    where: {id: postId},
    data: {
      title,
      content
    },
    select: {
      id: true,
      title: true,
      content: true,
    }
  })
  return res.status(200).json({
    message: "Post updated successfull.",
    post: updatePost
  })
}catch(error){
  console.log("postUpdate error.", error)
  return res.status(500).json({
    error: "Something went wrong. Please try again later."
  })
}
};

export const deletedPost = async (req, res) => {
  try{

    const postId = Number(req.params.id);

    // Checking whether the post exists.
    const isPost = await prisma.post.findFirst({
      where: {id: postId}
    });

    if(!isPost){
      return res.status(404).json({
        message: "Post not found.",
      })
    }

    // Deleting the post.
    const post = await prisma.post.delete({
      where: {id: postId},
      select: {
        id: true,
        title: true,
        content: true
      },
    });

    return res.status(200).json({
      message: "Post deleted successfully.",
    })
  }catch(error){
    console.log("deletedPost error.", error)
    return res.status(500).json({
      message: "Something went wrong. Please try again later."
    })
  }
};
