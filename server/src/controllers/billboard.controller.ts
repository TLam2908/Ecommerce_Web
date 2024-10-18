import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";

import { billboardSchema } from "../validation/billboard.validation";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBillboardHandler = catchErrors(async (req, res) => {
    const billboard = await prisma.billboard.findMany()
    appAssert(billboard, NOT_FOUND, "Billboard not found")
    return res.status(OK).json(billboard)
})

export const getBillboardByIdHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const billboard = await prisma.billboard.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(billboard, NOT_FOUND, "Billboard not found")
    return res.status(OK).json(billboard)
})

export const createBillboardHandler = catchErrors(async (req, res) => {
    const request = billboardSchema.parse(req.body)
    const billboard = await prisma.billboard.create({
        data: {
            title: request.title,
            image_src: request.image_src,
        }
    })
    return res.status(OK).json(billboard)
})


export const updateBillboardHandler = catchErrors(async (req, res) => {
    const request = billboardSchema.parse(req.body)
    const { id } = req.params
    const billboard = await prisma.billboard.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title: request.title,
            image_src: request.image_src,
        }
    })
    return res.status(OK).json(billboard)
})