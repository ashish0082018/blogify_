
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import {z} from 'zod';

import prisma from "../config/database.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        
        if (!name || !email || !password) {
            return res.status(401).json({
                message: "Fill the details",
                success: false,
            });
        }

        const userAlreadyExists = await prisma.user.findUnique({
            where:{ email:email }
        })
        if (userAlreadyExists) {
            return res.status(401).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                name, email,
                password: hashedPassword,
            }
        })

        const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};




export const login = async (req,res)=>{
    try{
const {email,password} =req.body;
if(!email || !password){
    return res.status(401).json({
        message:"Fill the details",
        success:false
    })
  }

// lets find the user 
const loginuser= await prisma.user.findUnique({where:{email:email}})
if(!loginuser) return res.status(401).json({
    message:"Incorrect email or password",
    success:false
})

const matchingPassword= await bcrypt.compare(password,loginuser.password)

if(!matchingPassword){
    return res.status(401).json({
        message:"Incorrect email or password",
        success:false
    })
}



const token= jwt.sign({userid:loginuser.id},process.env.JWT_SECRET,{expiresIn:'1d'})
return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({    
  success:true,
   user:{
    name:loginuser.name,
    email:loginuser.email,
    id:loginuser.id
   },
 
}) 

    }
    catch(error){
        console.log(error);
        
    }
}


export const logout= async (req,res)=>{
    try{
        res.clearCookie('token');
      res.json({
          message:"Logged Out Successfully",
          success:true
      })
    }
    catch(error){
      console.log(error);
    }
  }




export const profile=async (req,res)=>{
try{
    const loginuser=req.id;
    const user= await prisma.user.findUnique({
        where:{id:loginuser}
    })
    return res.status(200).json({
        user
    })
}
catch(error){
    console.log(error);
    
}
  }
  
 
export const userpost= async (req,res)=>{
    try{
  const loginuser = req.id;
  const allposts= await prisma.post.findMany({
    where:{authorId:loginuser}
  })
  return res.status(200).json({
    success:true,
    allposts
  })
  

    }
    catch(error){
        console.log(error);
        
    }
}




const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(200, "Comment too long"),
});

export const comment = async (req, res) => {
  try {
    const parsed = commentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid comment",
        errors: parsed.error.flatten().fieldErrors,
        success: false,
      });
    }

    const user = req.id;
    const postid = req.params.id;
    const { content } = parsed.data;

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: postid,
        authorId: user,
      },
    });

    return res.status(201).json({
      message: "Comment posted successfully",
      success: true,
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};




export const getUserDetails=async(req,res)=>{
  try {
    const userid=req.id;
    const alldetail=await prisma.user.findUnique({
      where:{
        id:userid
      },
      include:{
        post:true,
        like:true
      }
    })
    return res.status(200).json({
      success:true,
      alldetail
    })
  } catch (error) {
    console.log(error);
    
  }
}


export const setBio=async(req,res)=>{
  try {
    const userId=req.id;
    const setBio=req.body.bio;
      await prisma.user.update({
        where:{id:userId},
        data:{
          bio:setBio
        }
      })

      return res.status(200).json({
        success:true,
        messsage:"Bio edited successfully"
      })
    

  } catch (error) {
    console.log(error);
    
  }
}