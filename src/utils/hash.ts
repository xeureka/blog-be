import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}

export async function validatePassword(givenPassword: string, actualPassword: string): Promise<boolean>{
    const validationResult = await bcrypt.compare(givenPassword, actualPassword)
    return validationResult
}

