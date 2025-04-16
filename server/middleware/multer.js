import multer from "multer";

const storage = multer.diskStorage({

    filename: function (req, file, cb) {
     // give unique file name
      cb(null, Date.now()+"-"+file.originalname)
    }
  })
 const upload = multer({storage })

 export default upload ; 