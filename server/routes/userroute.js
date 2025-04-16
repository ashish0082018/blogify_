import express from "express"
import { comment, getUserDetails, login, logout, profile, register, setBio, userpost } from "../controllers/userController.js";
import isauthenticated from "../middleware/isAuthenticated.js";

const router=express.Router();

router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(isauthenticated,profile)
router.route("/userpost").get(isauthenticated,userpost)
router.route("/comment/:id").post(isauthenticated,comment)
router.route("/userdetails").get(isauthenticated,getUserDetails);
router.route("/setbio").post(isauthenticated,setBio)


export default router

