import { PrismaClient } from '@prisma/client';
import { hashValue, compareValue } from '../utils/bcrypt';

const prisma = new PrismaClient();

export type CreateAcountParams = {
    email: string;
    password: string;
    name: string;
    role: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAcountParams) => {
    // verify existing user does not exist
    // create user
    // create validation code
    // send verification email
    // create session
    // sign access token and refresh token
    // return user and tokens
}