import express from 'express'
import isauthenticated from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
import { allposts, createpost, deletecomment, getcomment, getLikes, like, postdelete, setPrivate } from '../controllers/postController.js';


const router=express.Router();

router.route("/createpost").post(isauthenticated,upload.single("image"),createpost)   
router.route("/allposts").get(allposts);   // done
router.route("/deletepost/:id").get(postdelete)
router.route("/likepost/:id").get(isauthenticated,like) 
router.route("/comment/:id").get(getcomment);
router.route("/deletecomment").post(deletecomment);
router.route('/likes/:id').get( isauthenticated, getLikes);
router.route("/setprivate").post(isauthenticated,setPrivate)
// router.route("/showlikes/:id").get(isauthenticated,showlikes) 
// router.route("/readmore/:id").get(readmore) 

export default router 