import { Pool, QueryResult } from 'pg';
import { User } from '../models/User';
import Database from './database';

const db = Database.getInstance();

class UserDatabase {
  async updateUserDetails(user_full_name: string, user_bio: string, user_profession: string, user_other_links: { [key: string]: string }, username : string) {
    const query = `
    UPDATE users
    SET user_full_name = $1, user_bio = $2, user_profession = $3, user_other_links = $4
    WHERE user_name = $5;
  `;

  const values = [user_full_name, user_bio, user_profession, user_other_links, username];

  try {
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    console.error('Error updating user details:', error);
    console.log(error);
  }
  }

  async getUserByUserName(username : string) :Promise<User | null>{
    
    const query = 'SELECT * FROM users WHERE user_name = $1';
    const values = [username];

    try {
        
        const result: QueryResult<User> = await db.query(query, values);
        const user = result.rows[0];
        return user || null;
      } catch (error) {
        
        throw error;
    }
  }

  async updateUserProfilePic(username : string, url : string) {
    const query = "UPDATE users SET user_profile_pic = $1 WHERE user_name = $2"
    const values = [url, username]

    try {

      const result: QueryResult = await db.query(query, values);
      return url;
    } catch (error) {
      
      console.log(error)
  }
  }
  async userWithUserNameAndEmailExist(username : string, user_email : string) :Promise<boolean>{
    
    const query = 'SELECT * FROM users WHERE user_name = $1 OR user_email = $2';
    const values = [username, user_email];

    try {

        const result: QueryResult = await db.query(query, values);
        return result.rows.length > 0;
      } catch (error) {
        
        console.log(error)
        return false
    }
  }
}

export default UserDatabase;