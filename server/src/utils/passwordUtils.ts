import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainTextPassword: string) => {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

