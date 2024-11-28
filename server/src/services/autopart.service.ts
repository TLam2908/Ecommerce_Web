import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { uploadImage, deleteImage, updateImage } from "../utils/imageUpload";

const prisma = new PrismaClient();
export type CreateAutopartParams = {
  name: string;
  description: string;
  price: string;
  oem_number: string;
  category_name: string;
  manufacturer_name: string;
  quantity: string;
  model_id: string[];
  images: string[];
};

export const createAutopart = async (data: CreateAutopartParams) => {
  // Step 1: Upload images first and collect responses
  const uploadedImages = await Promise.all(
    data.images.map(async (image) => {
      const uploadResponse = await uploadImage({
        image_src: image,
        uploadPreset: "ImageUploads",
      });
      appAssert(uploadResponse, INTERNAL_SERVER_ERROR, "Image upload failed");
      return {
        src: uploadResponse.image_src,
        cloudinary_id: uploadResponse.image_id,
      };
    })
  );

  // Step 2: Begin transaction for database operations
  return await prisma.$transaction(async (prisma) => {
    const category = await prisma.category.findUnique({
      where: {
        name: data.category_name,
      },
    });
    appAssert(category, INTERNAL_SERVER_ERROR, "Category not found");

    const manufacturer = await prisma.manufacturer.findUnique({
      where: {
        name: data.manufacturer_name,
      },
    });
    appAssert(manufacturer, INTERNAL_SERVER_ERROR, "Manufacturer not found");

    const autopart = await prisma.autopart.create({
      data: {
        name: data.name,
        description: data.description,
        oem_number: data.oem_number,
        quantity: parseInt(data.quantity),
        price: parseInt(data.price),
        category_id: category.id,
        manufacturer_id: manufacturer.id,
      },
    });
    appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart creation failed");

    const autopartModel = await prisma.autopart_Model.createMany({
      data: data.model_id.map((modelId) => ({
        autopart_id: autopart.id,
        model_id: parseInt(modelId),
      })),
    });
    appAssert(autopartModel, INTERNAL_SERVER_ERROR, "Autopart model creation failed");

    await Promise.all(
      uploadedImages.map(async (image) => {
        const autopartImage = await prisma.images.create({
          data: {
            src: image.src,
            cloudinary_id: image.cloudinary_id,
            autopart_id: autopart.id,
          },
        });
        appAssert(autopartImage, INTERNAL_SERVER_ERROR, "Image creation failed");
      })
    );

    return autopart;
  });
};



export const getAutoparts = async () => {
  const autoparts = await prisma.autopart.findMany({
    include: {
      Images: true,
      Manufacturer: true,
      Category: true,
      Autopart_Model: {
        include: {
          Model: true,
        },
      },
    },
  });
  appAssert(autoparts, INTERNAL_SERVER_ERROR, "Autoparts not found");
  return autoparts;
};

export const getAutopartById = async (id: string) => {
  const autopart = await prisma.autopart.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Images: true,
      Category: true,
      Manufacturer: true,
      Autopart_Model: {
        include: {
          Model: true,
        },
      },
    },
  });
  appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");
  return autopart;
};

export const updateAutopart = async (
  id: string,
  data: CreateAutopartParams
) => {
  const autopart = await prisma.autopart.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Images: true,
    },
  });
  appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");

  const category = await prisma.category.findUnique({
    where: {
      name: data.category_name,
    },
  });
  appAssert(category, INTERNAL_SERVER_ERROR, "Category not found");

  const manufacturer = await prisma.manufacturer.findUnique({
    where: {
      name: data.manufacturer_name,
    },
  });
  appAssert(manufacturer, INTERNAL_SERVER_ERROR, "Manufacturer not found");

  const updateAutopart = await prisma.autopart.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      description: data.description,
      price: parseInt(data.price),
      oem_number: data.oem_number,
      quantity: parseInt(data.quantity),
      category_id: category.id,
      manufacturer_id: manufacturer.id,
    },
  });
  appAssert(updateAutopart, INTERNAL_SERVER_ERROR, "Autopart update failed");
  // update images
  await Promise.all(
    data.images.map(async (image, index) => {
      const uploadResponse = await updateImage({
        image_src: image,
        image_id: autopart.Images[index]?.cloudinary_id,
        uploadPreset: "ImageUploads",
      });
      appAssert(uploadResponse, INTERNAL_SERVER_ERROR, "Image upload failed");

      const autopartImage = await prisma.images.update({
        where: {
          id: autopart.Images[index]?.id,
        },
        data: {
          src: uploadResponse.image_src,
          cloudinary_id: uploadResponse.image_id,
        },
      });
      appAssert(autopartImage, INTERNAL_SERVER_ERROR, "Image update failed");
    })
  );

  // update model
  await prisma.autopart_Model.deleteMany({
    where: {
      autopart_id: parseInt(id),
    },
  });

  const autopartModel = await prisma.autopart_Model.createMany({
    data: data.model_id.map((modelId) => ({
      autopart_id: parseInt(id),
      model_id: parseInt(modelId),
    })),
  });
  appAssert(
    autopartModel,
    INTERNAL_SERVER_ERROR,
    "Autopart model update failed"
  );

  return updateAutopart;
};

export const deleteAutopart = async (id: string) => {
  const autopart = await prisma.autopart.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Images: true,
    },
  });

  appAssert(autopart, INTERNAL_SERVER_ERROR, "Autopart not found");

  await Promise.all(
    autopart.Images.map(async (image) => {
      const deleteImageResponse = await deleteImage(image.cloudinary_id);
      appAssert(
        deleteImageResponse,
        INTERNAL_SERVER_ERROR,
        "Image deletion failed"
      );
    })
  );

  const deleteAutopartImages = await prisma.images.deleteMany({
    where: {
      autopart_id: parseInt(id),
    },
  });
  appAssert(
    deleteAutopartImages,
    INTERNAL_SERVER_ERROR,
    "Autopart images deletion failed"
  );

  const deleteAutopartModel = await prisma.autopart_Model.deleteMany({
    where: {
      autopart_id: parseInt(id),
    },
  });
  appAssert(
    deleteAutopartModel,
    INTERNAL_SERVER_ERROR,
    "Autopart model deletion failed"
  );

  const deleteAutopart = await prisma.autopart.delete({
    where: {
      id: parseInt(id),
    },
  });
  appAssert(deleteAutopart, INTERNAL_SERVER_ERROR, "Autopart deletion failed");
  return true;
};
