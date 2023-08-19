import express from 'express';
import verifyToken  from '../middleware/checkToken';
import checkIfAuthorized from '../middleware/checkIfAuthorized';
import { createPoll, getPoll, updatePoll } from '../controllers/pollController';

const poll = express.Router();

poll.route("/:poll_id").get(getPoll).put(verifyToken, checkIfAuthorized, updatePoll);
poll.route("/").post(verifyToken, createPoll)

export default poll