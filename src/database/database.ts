import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import { bool } from 'aws-sdk/clients/signer';

//Fetch env variables
dotenv.config();

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    // Initialize the database connection pool
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(text: string, values?: any[]): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(text, values);
      return result;
    } finally {
      client.release();
    }
  }

  public async checkDatabaseConnection(): Promise<bool> {
    const client: PoolClient = await this.pool.connect();
    try {
      console.log('Database connection successful');
      return true;
    } catch (error : any) {
      console.error('Error connecting to the database:', error.message);
      return false;
    } finally {
      client.release();
    }
}
}

export default Database;
