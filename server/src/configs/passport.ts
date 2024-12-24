const passport = require("passport");
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from "passport-google-oauth20";

import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import { signToken } from "../utils/jwt";
import {
  refreshTokenOptions,
  RefreshTokenPayload,
  verifyToken,
} from "../utils/jwt";
import { APP_ORIGIN } from "../constants/env";

const moment = require("moment");
const prisma = new PrismaClient();
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:4000/api/auth/google/callback",
    passReqToCallback: true,
  },
  async (
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback
  ) => {
    let user = await prisma.user.findUnique({
      where: {
        email: profile.emails![0].value,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.emails![0].value,
          name: profile.displayName,
          role: "user",
          password: "",
          image_src: profile.photos![0].value,
          verified: true,
          provider: "google",
          provider_id: profile.id,
          createdAt: new Date(),
        },
      });
    } else if (user.provider !== "google") {
      const errorMessage =
        "Email already exists, please use another email or login with your email and password";
      console.error(errorMessage);

      // Redirect to login page with an error message
      return done(null, false, {
        message: errorMessage,
        redirect: `${APP_ORIGIN}/auth/login?error=email_exists`,
      });
    }

    // create session
    const session = await prisma.session.create({
      data: {
        user_id: user.id,
        userAgent: req.headers["user-agent"],
        createdAt: moment().toDate(),
        expiresAt: moment().add(30, "days").toDate(), // 30 days
      },
    });

    // sign access token and refresh token
    const refreshTokenGG = signToken(
      { sessionId: session.id },
      refreshTokenOptions
    );

    const accessTokenGG = signToken({
      sessionId: session.id,
      userId: user.id,
    });
    return done(null, { user, accessTokenGG, refreshTokenGG });
  }
);

passport.use(strategy);

export default passport;
