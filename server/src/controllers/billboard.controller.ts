import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { uploadImage, updateImage, deleteImage } from "../utils/imageUpload";

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
    return res.status(OK).json({
        data: billboard
    })
})

export const createBillboardHandler = catchErrors(async (req, res) => {
    const request = billboardSchema.parse(req.body)
    const uploadResponse = await uploadImage({
        image_src: request.image_src,
        uploadPreset: "ImageUploads"
    });

    appAssert(uploadResponse, UNPROCESSABLE_CONTENT, "Image upload failed")

    const billboard = await prisma.billboard.create({
        data: {
            title: request.title,
            image_src: uploadResponse.image_src,
            image_id: uploadResponse.image_id
        }
    })
    return res.status(OK).json(billboard)
})


export const updateBillboardHandler = catchErrors(async (req, res) => {
    const request = req.body
    const { id } = req.params
    
    // Find current billboard
    const currentBillboard = await prisma.billboard.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(currentBillboard, NOT_FOUND, "Billboard not found")
    
    // Update image in cloudinary
    const updatedImage = await updateImage({
        image_src: request.image_src,
        image_id: currentBillboard.image_id,
        uploadPreset: "ImageUploads"
    })

    appAssert(updatedImage, UNPROCESSABLE_CONTENT, "Image update failed")

    // Update billboard in database
    const updatedBillboard = await prisma.billboard.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title: request.title,
            image_src: updatedImage.image_src,
            image_id: updatedImage.image_id
        }
    })
    return res.status(OK).json(updatedBillboard)
})

export const deleteBillboardHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const billboard = await prisma.billboard.delete({
        where: {
            id: parseInt(id)
        }
    })

    return res.status(OK).json(billboard)
})