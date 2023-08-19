import {Request, Response, NextFunction} from 'express';


//This middlware should only be used for requests with :username parameter in their req
const checkIfAuthorized = (req: Request, res: Response, next: NextFunction) => {

    const req_param_user = req.params.username;
    const header_user = req.user.username;

    if(req_param_user !== header_user){
        return res.status(400).json({message : "Unauthorized action"})
    }

    next();
}

export default checkIfAuthorized;