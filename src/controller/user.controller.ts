import { Request, Response } from 'express'
import { hashPassword,validatePassword } from '../utils/hash'
import Users from '../models/user.model'
import { generateToken, generateRefreshToken } from '../services/genToken'

export const registerUser = async (req: Request, res: Response) =>{
    try {
        const user = await Users.findOne({email: req.body.email})

        if (user){
            res.json({message: "User already exists !"}).status(401)
            return;
        }

        const hashedPass = await hashPassword(req.body.password);

        let newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        await newUser.save()

        let accessToken = generateToken(newUser.email, newUser.username);
        let refreshToken = generateRefreshToken(newUser.email,newUser.username)

        res
            .cookie('accessToken', accessToken,{httpOnly: true})
            .cookie('refreshToken', refreshToken,{httpOnly: true})

        res.json({
            username: newUser.username,
            email: newUser.email
        })

    } catch (error) {
        res.json({message: "Error Registering the user !", Error: error})
        return;
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({email: req.body.email});

        if (!user){
            res.json("User Don't Exist !").status(404)
            return;
        }

        const givenPassword = req.body.password

        const passwordVerification = await validatePassword(givenPassword, user.password)

        if (!passwordVerification){
            res.json({message: "Invalid Username or Password !"}).status(400)
            return;
        }

        let token = generateToken(user.email, user.username);
        res.header('authorization', token)
        res.json({message: "Login successful !"})

    } catch (error) {
        res.json({message: "Error Login the user !", Error: error})
        return;
    }

}
export const logoutUser = async (req: Request, res: Response) => {
    try {
        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .json({message: "Log out successful !! "}).
            status(200)
            
    } catch (error) {
        res.json(error)
        return;
    }
}

