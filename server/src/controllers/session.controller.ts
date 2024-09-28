import catchErrors from "../utils/catchError";
import { PrismaClient } from "@prisma/client";
import { OK, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
const prisma = new PrismaClient();

export const getSessionHandler = catchErrors(async (req, res) => {
    const sessions = await prisma.session.findMany({
        where: {
            user_id: req.userId,
            expiresAt: { gt: new Date() }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.status(OK).json(sessions.map((session) => (
        {
            ...session,
            ...(session.id === req.sessionId && { isCurrent: true })
        }
    )))
})

export const deleteSessionHandler = catchErrors(async (req, res) => {
    const deleteId = parseInt(req.params.id, 10)    
    const session = await prisma.session.delete({
        where: {
            user_id: req.userId,
            id: deleteId
        }
    })

    appAssert(session, NOT_FOUND, "Session not found")

    return res.status(OK).json({ message: "Session deleted" }) 
})