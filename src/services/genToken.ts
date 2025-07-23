import jwt, { JwtPayload } from 'jsonwebtoken'

interface TokenPayload extends JwtPayload{
    email: string;
    username: string
}


export function generateToken(email: string, username: string): string {
    return jwt.sign({userEmail: email, userName: username}, process.env.jwt_secret!,{expiresIn: '15m'})
    
}
export function generateRefreshToken(email: string, username: string) : string{
    return jwt.sign({userEmail: email, userName: username}, process.env.jwt_r_secret!,{expiresIn: '7d'})
}

export function verifyToken(token: string): TokenPayload{
    try {
        return jwt.verify(token, process.env.jwt_secret!) as TokenPayload
        
    } catch (error) {
        throw new Error("Invalid Error ! " + (error as Error).message)
    }
}

export function verifyRefreshToken(token: string): TokenPayload{
    try {
        return jwt.verify(token,process.env.jwt_r_secret!) as TokenPayload
    } catch (error) {
        throw new Error("Invalid Error ! "+ (error as Error).message)
    }
}