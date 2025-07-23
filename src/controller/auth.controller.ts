import { verifyRefreshToken,generateToken } from '../services/genToken'
import { Request,Response } from 'express'

export const tokenRefresher = async (req: Request, res: Response) => {
    const token = req.cookies['refreshToken']

    try {
        const payload = verifyRefreshToken(token)
        const newAccessToken = generateToken(payload.email, payload.username)

        res.cookie('accessToken', newAccessToken,{httpOnly: true}).json({ok: true})
    } catch (error) {
        res.sendStatus(403)
    }
}