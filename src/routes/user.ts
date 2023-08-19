import express from 'express';
import { getUserWithUserName, updateProfilePic, updateUserInfo } from '../controllers/userController';
import verifyToken  from '../middleware/checkToken';
import uploadMiddlware from '../database/s3Operations';
import checkIfAuthorized from '../middleware/checkIfAuthorized';
import checkIfUserExist from '../middleware/checkIfUserExists';

const user = express.Router();

//auth.route('/login').post(login); We will use third party auth for this
user.route('/:username').get(getUserWithUserName).put(verifyToken, checkIfAuthorized, checkIfUserExist, updateUserInfo);
user.route('/updateProfilePic/:username').post(verifyToken, checkIfAuthorized, checkIfUserExist, uploadMiddlware, updateProfilePic);

export default user;
