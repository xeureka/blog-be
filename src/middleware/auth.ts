import { verifyToken } from "../services/genToken";
import {Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'

dotenv.config()


export function loggedInAuth(req: Request, res: Response, next: NextFunction){
 
    const token = res.header('authorization');
        
    if (!token || typeof(token) !='string'){
        res.json({message: 'No Token Provided !!'}).status(403);
        return;
    }
    try {
        
        let payload = verifyToken(token);
        if (!payload){
            res.status(404).json({message: 'No or Invalid Token Provided !!'});
            return;
        }
        next()
    } catch (error) {
        console.log(error)
    }

}
