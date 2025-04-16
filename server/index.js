import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routes/userroute.js"
import postRouter from "./routes/postroute.js"
import cookieParser from 'cookie-parser';
import path from"path"
dotenv.config()

const app=express();
const PORT=process.env.PORT || 8000;
const __dirname=path.resolve(); 

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);


app.use(express.static(path.join(__dirname,"/client_/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client_","dist","index.html"))
})

app.listen(PORT,()=>{
    console.log(`server connected at ${PORT}`);
    
})