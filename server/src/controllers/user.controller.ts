import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserHandler = catchErrors(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        }
    })
    appAssert(user, NOT_FOUND, "User not found")

    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        verified: user.verified,
        createdAt: user.createdAt
    }

    return res.status(OK).json(safeUser)  
})