import { QueryResult } from 'pg';
import { User } from '../models/User';
import Database from './database';
import crypto from 'crypto';


function createMD5Hash(input: string): string {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex');
}

//Initialize database object
const db = Database.getInstance();

class AuthDatabase {

  async loginWithEmailAndPassword(email: string, user_password: string){
    const query = `
      SELECT COUNT(*) AS count FROM auth
      WHERE user_email = $1 AND user_password = $2
    `;
    const values = [email, createMD5Hash(user_password)];

    try {
      const result: QueryResult = await db.query(query, values);
      const row_count = result.rows[0].count;

      if(row_count > 0){
        const user = await this.getUserByEmail(email);
        console.log("Db user", user?.user_name)
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User, user_password: string): Promise<boolean> {
    const existingUser = await this.getUserByEmail(user.user_email);
    if (existingUser) {
      return false; // User with the given email already exists
    }


    //Create user query and val
    const createUserQuery = `
    INSERT INTO users (user_id, user_bio, user_profile_pic, user_other_links, user_profession,
      user_email, is_paid, credits, follows, followers, reports, is_banned, saved_polls, user_full_name, user_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  `;

    
  const createUserValues = [
    user.user_id,
    user.user_bio,
    user.user_profile_pic,
    JSON.stringify(user.user_other_links),
    user.user_profession,
    user.user_email,
    user.is_paid,
    user.credits,
    user.follows,
    user.followers,
    user.reports,
    user.is_banned,
    user.saved_polls,
    user.user_full_name,
    user.user_name
  ];
    
  //Add user_email and user_password to database
  const addToAuthQuery = `
    INSERT INTO auth (user_email, user_password) VALUES ($1, $2)`;
    const addToAuthQueryValues = [user.user_email, createMD5Hash(user_password)];
    
    try {
        await db.query('BEGIN');

        await db.query(createUserQuery, createUserValues);
        await db.query(addToAuthQuery, addToAuthQueryValues);

        await db.query('COMMIT');

        return true; // User created successfully
      } catch (error) {
        await db.query('ROLLBACK');
        throw error;
      }
}

  async getUserByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM users
      WHERE user_email = $1
    `;
    const values = [email];

    try {
      const result: QueryResult = await db.query(query, values);
      const user = result.rows[0];

    
      return user || null;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthDatabase;
