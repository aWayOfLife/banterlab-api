import {Pool, QueryResult} from 'pg';
import Database from './database';
import { Poll } from '../models/Poll';

const db = Database.getInstance();


class PollDatabase{
    
    async addPoll(poll : Poll){

        const query = `
        INSERT INTO polls (
          poll_id,
          poll_title,
          poll_description,
          poll_owner_username,
          poll_options_text,
          poll_options_image_urls,
          poll_background_color, 
          poll_background_image,
          poll_labels,
          poll_tags,
          poll_type,
          poll_creation_time,
          is_open,
          is_sponsored,
          ends_on,
          total_opened,
          total_responded,
          total_shared,
          total_saved,
          total_likes,
          reports,
          is_banned
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      `;
  
      const values = [
        poll.poll_id,
        poll.poll_title,
        poll.poll_description,
        poll.poll_owner_username,
        poll.poll_options_text,
        poll.poll_options_image_urls,
        poll.poll_background_color,
        poll.poll_background_image,
        poll.poll_labels,
        poll.poll_tags,
        poll.poll_type,
        poll.poll_creation_time,
        poll.is_open,
        poll.is_sponsored,
        poll.ends_on,
        poll.total_opened,
        poll.total_responded,
        poll.total_shared,
        poll.total_saved,
        poll.total_likes,
        poll.reports,
        poll.is_banned,
      ];
      try {
        const result = await db.query(query, values);
        return result;
      } catch (error) {
        console.error('Error updating user details:', error);
        console.log(error);
      } 

    }

    async getPollWithId(pollId : string) : Promise<Poll | null>{
      
      const query = "SELECT * FROM polls WHERE poll_id = $1";
      const values = [pollId]

      try{
        const result: QueryResult<Poll> = await db.query(query, values);
        const poll = result.rows[0];
        return poll || null
      }catch(err){
        console.log(err)
        return null;
      }
    }
}


export default PollDatabase;