import { hashPassword, validatePassword } from "../utils/hash";

describe('Password Hashing and Validation', () => {
    const plainPassword = "admin123";
    let hashedPassword: string;

    beforeAll(async () => {
        hashedPassword = await hashPassword(plainPassword);
    });
    
    test('hashPassword: should hash the password properly', () => {
        expect(typeof hashedPassword).toBe('string');
        expect(hashedPassword).not.toBe(plainPassword);
        expect(hashedPassword.length).toBeGreaterThan(20);
    });

    test('validatePassword: should return true for correct password', async () => {
        const result = await validatePassword(plainPassword, hashedPassword);
        expect(result).toBe(true);
    });

    test('validatePassword: should return false for wrong password', async () => {
        const result = await validatePassword(hashedPassword, 'wrongPassword');
        expect(result).toBe(false);
    });
});
