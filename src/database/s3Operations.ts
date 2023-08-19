import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
//Fetch env variables
dotenv.config();



  // Configure AWS SDK
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });

  // Create an S3 instance
  const s3 = new S3Client({
    region: process.env.REGION || "random",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY || "random",
      secretAccessKey: process.env.SECRET_ACCESS_KEY || "random",
    },
  });

  // Create multer storage object
  const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: "banterlabprofilepics",
    
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req : Request, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = req.user.username + "_" + "pfp." + fileExtension?.toUpperCase();
    cb(null, fileName);
        
    }
});


//middleware
const uploadImage = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Access req.params here
    const { username } = req.params;
    const header_username = req.user.username

    if(username !== header_username){
        return res.status(400).json({message : "Unauthorized"})
    }
    
    uploadImage.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        
        return res.status(400).json({ error: err.message });
      } else if (err) {
        
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      next();
    });
  };

export default uploadMiddleware;