
import {v2 as cloudinary} from "cloudinary"
import dotenv from 'dotenv'
import prisma from "../config/database.js"
import { z } from "zod"
dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});


export const createpost = async (req, res, next) => {
    try {
      const parsed= postSchema.safeParse(req.body);
      if(!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.errors[0].message,
          success: false
        });
      }

      const { title, content } = parsed.data;
      const author = req.id; // Ensure req.id is populated from authentication middleware
  
      if (!author) {
        return res.status(401).json({
          message: "User is not authenticated!",
          success: false
        });
      }
  
      const whetherfileuploaded = req.file;
      if (!whetherfileuploaded) {
        return res.status(401).json({
          message: "Upload an image for your post!",
          success: false
        });
      }
  
      const file = req.file.path;
  
      if (!title) {
        return res.status(401).json({
          message: "Provide a title for your post!",
          success: false
        });
      }
  
      if (!content) {
        return res.status(401).json({
          message: "Provide content for your post!",
          success: false
        });
      }
  
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(file, { folder: 'NODesss' });
  
      // Ensure the author (user) exists in the database
      const userExists = await prisma.user.findUnique({ where: { id: author } });
  
      if (!userExists) {
        return res.status(404).json({
          message: "User not found!",
          success: false
        });
      }
  
      // Create post in the database
      const post = await prisma.post.create({
        data: {
          title,
          content,
          image: cloudinaryResponse.url,
          authorId: author, // authorId must not be undefined
        }
      });
  
      return res.status(200).json({
        message: "Post created successfully",
        success: true,
        post
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  };



  export const allposts = async (req, res) => {
    try {
      const allpost = await prisma.post.findMany({
        where:{
          private:false
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          comment: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              author: {
                select: {
                  name: true,
                  email: true ,// We'll use email to generate avatarUrl
                
                }
              }
            }
          },
          author: {
            select: {
              name: true,
              email: true,
              bio:true
            }
          },
          like: {
            where: {
              isLiked: true
            },
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        },
      });
  
      // Alternative response format if you don't have user relation in like model:
      // This would just return userIds of people who liked the post
      /*
      const allpost = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          comment: {
            orderBy: { createdAt: 'desc' },
            include: {
              author: {
                select: { id: true, name: true }
              }
            }
          },
          author: {
            select: { id: true, name: true }
          },
          like: {
            select: { userId: true },
            where: { isLiked: true }
          }
        },
      });
      */
  
      return res.status(200).json({
        success: true,
        allpost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  };
  
  

export const postdelete= async (req,res)=>{
    try{
const postid=req.params.id;

await prisma.post.delete({
    where:{
        id:postid
    }
})
return res.status(200).json({
    message:"Post deleted successfully",
    success:true
})
    }
    catch(error){
        console.log(error);
        
    }
}
  


export const like= async (req,res)=>{
  try {
    const postId=req.params.id;
    const userId=req.id;
  
    await prisma.like.create({
      data:{
        postId,
        userId,
        isLiked:true
      }
    })
    return res.status(200).json({
      message:`Post Linked`,
      success:true
    })
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    
    const likes = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    const users = likes.map(like => ({
      id: like.user.id,
      name: like.user.name
    }));
    
    return res.status(200).json({
      success: true,
      users
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch likes'
    });
  }
};


export const setPrivate=async (req,res)=>{
  try {
    const {previous,id}=req.body;
    await prisma.post.update({
      where:{
        id:id
      },
      data:{
        private:!previous
      }
    })
    return res.status(200).json({
      success:true,
      message:"Setting changed"
    })
  } catch (error) {
    console.log(error);
  }
}


export const getcomment=async(req,res)=>{
  try {
    const postId=req.params.id;
    const comments=await prisma.comment.findMany({
      where:{
        postId:postId
      },
      orderBy:{
        createdAt:'desc'
      },
      include:{
        author: {
          select:{
            name:true,
            email:true
          }
        }
        
      }
    })
    return res.status(200).json({
      success:true,
      comments
    })

  } catch (error) {
    console.log(error);
    
  }
}


export const deletecomment=async(req,res)=>{
try {
  const commentId=req.body.commentId;
  await prisma.comment.delete({
    where:
    {id:commentId}
  })

  return res.status(200).json({
    success:true,
    message:"Comment deleted successfully"
  })

  
} catch (error) {
  console.log(error);
  
}

}





import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const askAi = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content || !title) {
      return res.status(400).json({ error: "Both title and content are required." });
    }

    const prompt = `
You are a professional blog writer.

Your job is to generate a blog post under 300 words based on the topic and user-provided input.

Return the result in the **following format ONLY**:
Title: <Your blog title>
Content: <Your blog content in plain text>

DO NOT add anything else — no line breaks like \\n, no tags, no explanation, just this exact format.

Topic: ${title}
User Input: ${content}
    `;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt.trim(),
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!rawText) {
      return res.status(500).json({ error: "Empty response from AI" });
    }

    // Regex to extract title and content
    const titleMatch = rawText.match(/Title:\s*(.*?)(?=\s*Content:)/i);
    const contentMatch = rawText.match(/Content:\s*(.*)/i);

    const extractedTitle = titleMatch?.[1]?.trim();
    const extractedContent = contentMatch?.[1]?.trim();

    if (!extractedTitle || !extractedContent) {
      console.error("Unexpected AI Response:", rawText);
      return res.status(500).json({ error: "Invalid response format from AI." });
    }

    return res.status(200).json({
      success: true,
      title: extractedTitle,
      content: extractedContent,
    });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "Internal Server Error",
    });
  }
};