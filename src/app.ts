import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import auth from './routes/auth';
import user from './routes/user'
import poll from './routes/poll';
// Create Express app
const app = express();

//Fetch env variables
dotenv.config();

//Add body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use CORS
app.use(cors({origin: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, application/octet-stream");
    res.header("Content-Type", "application/json");
    next();
  });


//Check config values
var missing_flag = false;

const configs = {
  DATABASE_URL : process.env.DATABASE_URL,
  PORT : process.env.PORT,
  JWT_SECRET : process.env.JWT_SECRET,
  ACCESS_KEY : process.env.ACCESS_KEY,
  SECRET_ACCESS_KEY : process.env.SECRET_ACCESS_KEY,
  REGION : process.env.REGION
};


Object.entries(configs).forEach(([key, value]) => {
  if(!value){
    missing_flag = true;
    console.log("Missing env variable : ",key);
  }
});


// Get the port number from the environment variables or use a default value
const port = process.env.PORT || 3000;


//Add endpoints
app.use("/auth", auth)
app.use("/user", user)
app.use('/poll', poll)

// Start the server
if(!missing_flag){
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
}
