import PollDatabase from "../database/pollDB";
import {Request, Response} from 'express';
import { Poll } from "../models/Poll";


const pollDB = new PollDatabase()

export const createPoll = async (req: Request, res: Response) => {
    
    //Initialize vars
    const poll_owner_username = req.user.username
    var {poll_id,
        poll_title,
        poll_type, 
        poll_description, 
        poll_options, 
        poll_background_color, 
        poll_background_image,
        poll_labels,
    } = req.body
    
    //Other required variables
    const currentDateTime: Date = new Date();
    const is_open = true;
    const is_sponsored = false;
    const ends_on = undefined;
    const total_opened = 0;
    const total_responded = 0;
    const total_shared = 0;
    const total_saved = 0;
    const total_likes =  0;
    const reports = 0;
    const is_banned = false;
    const poll_tags: string[] = [];

    //Check for mandatody fields
    if(!poll_id){
        return res.status(400).json({message : "Missing poll id"})
    }

    if(!poll_title){
        return res.status(400).json({message: "Missing poll"})
    }

    if(!poll_type){
        return res.status(400).json({message : "Missing poll type"})
    }

    //Set poll labels to blank list if missing
    poll_labels = poll_labels ?? []
    poll_description = poll_description ?? ""
    poll_background_color = poll_background_color ?? "#FFFFFF"
    poll_background_image = poll_background_image ?? "default_image"

    //Create option_text and option_image lists
    var poll_options_text: string[] = []
    var poll_options_image_urls: string[] = []

    poll_options.forEach((option: any) => {
        poll_options_text.push(option.pollOptionLabel)
        poll_options_image_urls.push(option.image)
    });

    //Create poll object
    const poll = new Poll(
        poll_id,
        poll_title, 
        poll_description,
        poll_owner_username,
        poll_options_text, 
        poll_options_image_urls,
        poll_background_image,
        poll_background_color,
        poll_labels,
        poll_tags,
        poll_type,
        currentDateTime,
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

    try {
        const result = await pollDB.addPoll(poll)
        if(!result){
            const poll = await pollDB.getPollWithId(poll_id);
            return res.status(422).json(poll)
        }

        return res.status(200).json(result)

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})
    }   
}

export const getPoll = async (req:Request, res: Response) => {
    
    try{
        const poll_id = req.params.poll_id
        const poll = await pollDB.getPollWithId(poll_id)
        return res.status(200).json(poll)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const updatePoll = async (req: Request, res: Response) => {
    return res.status(200).json({message: "Poll updated"})
}