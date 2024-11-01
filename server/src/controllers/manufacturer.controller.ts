import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";

const prisma = new PrismaClient();

export const getManufacturersHandler = catchErrors(async (req, res) => {
    const manufacturers = await prisma.manufacturer.findMany()
    appAssert(manufacturers, NOT_FOUND, "Manufacturers not found")
    return res.status(OK).json({
        data: manufacturers
    })
})

export const getManufacturerByIdHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const manufacturer = await prisma.manufacturer.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(manufacturer, NOT_FOUND, "Manufacturer not found")
    return res.status(OK).json({
        data: manufacturer
    })
})

export const createManufacturerHandler = catchErrors(async (req, res) => {
    const request = req.body 
    const manufacturer = await prisma.manufacturer.create({
        data: {
            name: request.name,
            country: request.country,
            type_of_product: request.type_of_product,
            abbreviation: request.abbreviation  
        }
    })
    appAssert(manufacturer, UNPROCESSABLE_CONTENT ,"Manufacturer creation failed")
    return res.status(OK).json(manufacturer)
})

export const updateManufacturerHandler = catchErrors(async (req, res) => {
    const request = req.body
    const { id } = req.params

    const updatedManufacturer = await prisma.manufacturer.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: request.name,
            country: request.country,
            type_of_product: request.type_of_product,
            abbreviation: request.abbreviation  
        }
    })
    appAssert(updatedManufacturer, UNPROCESSABLE_CONTENT, "Manufacturer update failed")
    return res.status(OK).json(updatedManufacturer)
})

export const deleteManufacturerHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const deletedManufacturer = await prisma.manufacturer.delete({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(deletedManufacturer, NOT_FOUND, "Manufacturer not found")
    return res.status(OK).json(deletedManufacturer)
})