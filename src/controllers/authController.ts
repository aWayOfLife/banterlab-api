import { Request, Response } from 'express';
import AuthDB from '../database/authDB';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import UserDatabase from '../database/userDB';

const authDB = new AuthDB();
const userDB = new UserDatabase();

export const login = async (req: Request, res: Response) => {
  try {
    // Extract login credentials from the request body
    const { user_email, user_password } = req.body;

    // Validate the input data
    if (!user_email || !user_password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Perform login authentication
    const user = await authDB.loginWithEmailAndPassword(user_email, user_password);
    if (user === null) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Login successful, return the JWT token
    const jwtSecret = process.env.JWT_SECRET || "no_token";
    console.log("testing")
    console.log(user);
    console.log(user.user_email, user.user_name)
    const token = jwt.sign({ user_email: user.user_email, username: user.user_name}, jwtSecret, { expiresIn: '48h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error occurred during login:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    // Extract signup data from the request body
    const { user_email, user_name, user_full_name, user_password} = req.body;

    // Validate the input data
    if (!user_email || !user_name || !user_full_name || !user_password) {
      return res.status(400).json({ message: 'user_email, user_name, user_password and user_full_name are required' });
    }

    //Generate random UUID
    const user_id = uuidv4();

    // Create a new user
    const user = new User(
        user_id,         //User id
        user_name,      //User name
        user_email,     //User email
        user_full_name,
        "",             //User bio
        "",             //User Profile pic link
        undefined,      //Other links,
        "",             //User profession,
        false,          //Is paid
        0,              //Credits
        [],             //Follows
        0,              //Followers
        0,              //Reports
        false,          //Is banned?
        []              //Saved polls
    )

    //Check whether email and username already exist
    const userExists = await userDB.userWithUserNameAndEmailExist(user_name, user_email)
    
    if(userExists){
      return res.status(409).json({ message: 'User with the provided email or username already exists' });
    }

    //Create user
    const createUserResult = await authDB.createUser(user, user_password);
    if (!createUserResult) {
      return res.status(409).json({ message: 'User with the provided email already exists' });
    }

    // User creation successful
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error occurred during signup:', error);
    return res.status(500).json({ message: 'An error occurred during signup' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    // TODO: Implement token refresh logic

    return res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error occurred during token refresh:', error);
    return res.status(500).json({ message: 'An error occurred during token refresh' });
  }
};
