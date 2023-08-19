import UserDatabase from "../database/userDB";
import { Request, Response } from 'express';

const userDB = new UserDatabase()

export const getUserWithUserName =async (req: Request, res: Response) => {
    
    try {
        const { username } = req.params;
        const result = await userDB.getUserByUserName(username);
        
        if(!result){
            return res.status(404).json({
                message : "User not found"
            });
        }
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: 'An error occurred during login' });
    }
    
}

export const updateUserInfo = async (req: Request, res: Response) => {
    var { user_full_name, user_profession, user_bio, user_other_links } = req.body
    const { username, user_email } = req.user;
    //Set to default values if not present
    user_full_name = user_full_name ?? ""
    user_profession = user_profession ?? ""
    user_bio = user_bio ?? ""
    user_other_links = user_other_links ?? {}

    

    const result = await userDB.updateUserDetails(user_full_name, user_bio, user_profession, user_other_links, username)
    const updatedUser = await userDB.getUserByUserName(username);
    return res.status(200).json(updatedUser);

}


export const updateProfilePic = async (req:Request, res : Response) => {
    
    const request_username = req.params.username
    const uploadedFile = req.file as Express.MulterS3.File;
    const imageUrl = uploadedFile.location;
    const header_username = req.user.username

    if(!uploadedFile){
        return res.status(400).json({message : "No file was uploaded"})
    }

    await userDB.updateUserProfilePic(request_username, imageUrl);

    return res.status(200).json({message : "Updated successfully", url : imageUrl});

}