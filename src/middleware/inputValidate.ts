import { Request, Response, NextFunction } from 'express'

import {z} from 'zod'

export function validateInput(schema: z.ZodObject<any,any>){
    return ( req: Request, res: Response, next: NextFunction) =>{

        const parsed = schema.safeParse(req.body);

        if (!parsed.success){
            res.status(400).json({errors: parsed.error.format()})
            return;
        }
        req.body = parsed.data
        next()
    }
}

