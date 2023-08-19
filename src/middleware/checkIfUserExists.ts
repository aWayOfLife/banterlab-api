import {Request, Response, NextFunction} from 'express';
import UserDatabase from '../database/userDB';

const userDB = new UserDatabase();

const checkIfUserExist =async ( req:Request, res: Response, next: NextFunction) => {


    const {username, user_email} = req.user;
    const userExist = await userDB.userWithUserNameAndEmailExist(username, user_email);

    if(!userExist){
        return res.status(404).json({message: "User not found"})
    }

    next();
}

export default checkIfUserExist;