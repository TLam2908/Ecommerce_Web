import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hashValue, compareValue } from "../utils/bcrypt";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

const prisma = new PrismaClient();

export type CreateAcountParams = {
  email: string;
  password: string;
  name: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAcountParams) => {
  // verify existing user does not exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const hashedPassword = await hashValue(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: "user",
    },
  });
  console.log(user)

  // create verification code
  const verificationCode = await prisma.verificationCode.create({
    data: {
      user_id: user.id,
      type: "verify_email",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    },
  });

  // send verification email
  // create session
  const session = await prisma.session.create({
    data: {
      user_id: user.id,
      userAgent: data.userAgent,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });

  // sign access token and refresh token
  const refreshToken = jwt.sign(
    {
      session_id: session.id,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "30d", audience: ["user"] }
  );

  const accessToken = jwt.sign(
    {
      session_id: session.id,
      user_id: user.id,
    },
    JWT_SECRET,
    { expiresIn: "30m", audience: ["user"] }
  );

  // return user and tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};
