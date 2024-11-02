import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";
import { categorySchema } from "../validation/category.validation";

const prisma = new PrismaClient();

export const getCategoriesHandler = catchErrors(async (req, res) => {
    const categories = await prisma.category.findMany()
    appAssert(categories, NOT_FOUND, "Categories not found")
    return res.status(OK).json({
        data: categories
    })
})

export const getCategoryByIdHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(category, NOT_FOUND, "Category not found")
    return res.status(OK).json({
        data: category
    })
})

export const createCategoryHandler = catchErrors(async (req, res) => {
    const request = categorySchema.parse(req.body)
    const category = await prisma.category.create({
        data: {
            name: request.name,
            description: request.description,
            code: request.code,
            billboard_id: parseInt(request.billboard_id)
        }
    })
    appAssert(category, UNPROCESSABLE_CONTENT ,"Category creation failed")
    return res.status(OK).json(category)
})

export const updateCategoryHandler = catchErrors(async (req, res) => {
    const request = categorySchema.parse(req.body)
    const { id } = req.params

    const updatedCategory = await prisma.category.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: request.name,
            description: request.description,
            code: request.code,
            billboard_id: parseInt(request.billboard_id)
        }
    })
    appAssert(updatedCategory, UNPROCESSABLE_CONTENT, "Category update failed")
    return res.status(OK).json(updatedCategory)
})

export const deleteCategoryHandler = catchErrors(async (req, res) => {
    const { id } = req.params
    const deletedCategory = await prisma.category.delete({
        where: {
            id: parseInt(id)
        }
    })
    appAssert(deletedCategory, NOT_FOUND, "Category not found")
    return res.status(OK).json({
        message: "Category deleted successfully"
    })
})