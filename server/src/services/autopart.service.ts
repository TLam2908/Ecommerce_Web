import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { uploadImage, deleteImage, updateImage } from "../utils/imageUpload";

const prisma = new PrismaClient();
export type CreateAutopartParams = {
    name: string,
    description: string,
    price: string,
    oem_number: string,
    category_id: string,
    manufacturer_id: string,
    model_id: string
    images: string[]
}

export const createAutopart = async (data: CreateAutopartParams) => {
    const product = await prisma.autopart.create({
        data: {
            name: data.name,
            description: data.description,
            oem_number: data.oem_number,
            price: parseInt(data.price),
            category_id: parseInt(data.category_id),
            manufacturer_id: parseInt(data.manufacturer_id)
        }
    });
    appAssert(product, INTERNAL_SERVER_ERROR, "Product creation failed");
    const autopartModel = await prisma.autopart_Model.create({
        data: {
            autopart_id: product.id,
            model_id: parseInt(data.model_id)
        }
    })
    appAssert(autopartModel, INTERNAL_SERVER_ERROR, "Autopart model creation failed");
    const autopartImages = data.images.map(async (image) => {
        const uploadResponse = await uploadImage({
            image_src: image,
            uploadPreset: "ImageUploads"
        });
        appAssert(uploadResponse, INTERNAL_SERVER_ERROR, "Image upload failed");
        
        const autopartImage = await prisma.images.create({
            data: {
                src: uploadResponse.image_src,
                cloudinary_id: uploadResponse.image_id,
                autopart_id: product.id
            }
        })
        appAssert(autopartImage, INTERNAL_SERVER_ERROR, "Image creation failed");
    })
    
    appAssert(product, INTERNAL_SERVER_ERROR, "Product creation failed");
    return product;
}

export const getAutoparts = catchErrors(async (req, res) => {
    const autoparts = await prisma.autopart.findMany({
        include: {
            Images: true,
            Autopart_Model: {
                include: {
                    Model: true
                }
            }
        }
    });
    appAssert(autoparts, INTERNAL_SERVER_ERROR, "Autoparts not found");
    return autoparts
})

export const getAutopartById = catchErrors(async (req, res) => {
    const { id } = req.params;
    const autopart = await prisma.autopart.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            Images: true,
            Autopart_Model: {
                include: {
                    Model: true
                }
            }
        }
    });
    appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");
    return autopart
})

export const updateAutopart = async (id: string, data: CreateAutopartParams) => {

    const autopart = await prisma.autopart.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            Images: true
        }
    })
    appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");

    const updateAutopart = await prisma.autopart.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: data.name,
            description: data.description,
            price: parseInt(data.price),
            oem_number: data.oem_number,
            category_id: parseInt(data.category_id),
            manufacturer_id: parseInt(data.manufacturer_id),
        }
    })
    appAssert(updateAutopart, INTERNAL_SERVER_ERROR, "Autopart update failed");
    // update images
    const autopartImages = data.images.map(async (image, index) => {
        const uploadResponse = await updateImage({
            image_src: image,
            image_id: autopart.Images[index].cloudinary_id,
            uploadPreset: "ImageUploads"
        });
        appAssert(uploadResponse, INTERNAL_SERVER_ERROR, "Image upload failed");
        const autopartImage = await prisma.images.update({
            where: {
                id: autopart.Images[index].id
            },
            data: {
                src: uploadResponse.image_src,
                cloudinary_id: uploadResponse.image_id,
            }
        })
        appAssert(autopartImage, INTERNAL_SERVER_ERROR, "Image creation failed");
    })

    // update model
    const autopartModel = await prisma.autopart_Model.updateMany({
        where: {
            autopart_id: parseInt(id)
        },
        data: {
            model_id: parseInt(data.model_id)
        }
    })
    appAssert(autopartModel, INTERNAL_SERVER_ERROR, "Autopart model update failed");

    return updateAutopart;    
}

export const deleteAutopart = async (id: string) => {
    const autopart = await prisma.autopart.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            Images: true
        }
    })

    appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");

    const deleteImages = autopart.Images.map(async (image) => {
        const deleteImageResponse = await deleteImage(image.cloudinary_id);
        appAssert(deleteImageResponse, INTERNAL_SERVER_ERROR, "Image deletion failed");
    })

    const deleteAutopartImages = await prisma.images.deleteMany({
        where: {
            autopart_id: parseInt(id)
        }
    })
    appAssert(deleteAutopartImages, INTERNAL_SERVER_ERROR, "Autopart images deletion failed");

    const deleteAutopartModel = await prisma.autopart_Model.deleteMany({
        where: {
            autopart_id: parseInt(id)
        }
    })
    appAssert(deleteAutopartModel, INTERNAL_SERVER_ERROR, "Autopart model deletion failed")



    const deleteAutopart = await prisma.autopart.delete({
        where: {
            id: parseInt(id)
        },
    })
    appAssert(deleteAutopart, INTERNAL_SERVER_ERROR, "Autopart deletion failed");
    return true;
}