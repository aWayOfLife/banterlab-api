import express from 'express';
import { login, signup, refreshToken } from '../controllers/authController';
import verifyToken  from '../middleware/checkToken';

const auth = express.Router();

auth.route('/login').post(login);
auth.route('/signup').post(signup);
auth.route('/token').get(verifyToken, refreshToken);

export default auth;
