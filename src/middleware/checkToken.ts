import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { UserRequestObject } from '../models/UserRequestObject';
import jwt from 'jsonwebtoken';

//Fetch env variables
dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  
    let token: string | undefined;

    // Check if the token is present in the request headers
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const tokenPart = authHeader.split(' ');
  
      if (tokenPart.length === 2 && tokenPart[0] === 'Bearer') {
        token = tokenPart[1];
      }
    }
  

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token using the secret
    const secret = process.env.JWT_SECRET || "no token"
    //console.log("Using", secret)
    const decoded = jwt.verify(token, secret);
    //const userObject = new UserRequestObject("test12", "gpawar12@gmail.com")
    //console.log("Using third party app for token validation")
    //req.user = userObject;
    
    // Attach the decoded payload to the request object for further use
    (req as any).user = decoded;
    console.log("decoded", decoded)

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
