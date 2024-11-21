import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
const prisma = new PrismaClient();

export const getHomeBillboards = catchErrors(async (req, res) => {
  const billboards = await prisma.billboard.findMany();
  appAssert(billboards, 500, "Billboards not found");
  return res.status(200).json(billboards);
});

export const getHomeBillboardById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  appAssert(billboard, 500, "Billboard not found");
  return res.status(200).json({
    data: billboard,
  });
});

export const getHomeAutoparts = catchErrors(async (req, res) => {
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
  appAssert(autoparts, 500, "Autoparts not found");
  return res.status(200).json(autoparts);
});

export const getHomeAutopartById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const autopart = await prisma.autopart.findUnique({
    where: {
      id: parseInt(id),
    },
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
  appAssert(autopart, 500, "Autopart not found");
  return res.status(200).json(autopart);
});

export const getAutopartsByCategory = catchErrors(async (req, res) => {
  const { id } = req.params;
  const autopart = await prisma.autopart.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Category: true,
    },
  });
  appAssert(autopart, 500, "Autopart not found");

  const relatedAutoparts = await prisma.autopart.findMany({
    where: {
      category_id: autopart.Category.id,
    },
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
  appAssert(relatedAutoparts, 500, "Related autoparts not found");
  return res.status(200).json(relatedAutoparts);
});

export const getCategoryById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Billboard: true,
    }
  });
  appAssert(category, 500, "Category not found");
  return res.status(200).json(category);
});

export const getManufacturers = catchErrors(async (req, res) => {
  const manufacturers = await prisma.manufacturer.findMany();
  appAssert(manufacturers, 500, "Manufacturers not found");
  return res.status(200).json(manufacturers);
})

export const getModels = catchErrors(async (req, res) => {
  const models = await prisma.model.findMany();
  appAssert(models, 500, "Models not found");
  return res.status(200).json(models);
})

export const getFilterAutoparts = catchErrors(async (req, res) => {
  const { categoryId, manufacturerId, modelId, search } = req.query;



  const autoparts = await prisma.autopart.findMany({
    where: {
      category_id: categoryId ? parseInt(categoryId as string) : undefined,
      manufacturer_id: manufacturerId ? parseInt(manufacturerId as string) : undefined,
      Autopart_Model: modelId ? { some: { model_id: parseInt(modelId as string) } } : undefined,
      OR: search
        ? [
            { oem_number: { contains: search as string, mode: "insensitive" }},
            { name: {contains: search as string, mode: "insensitive" }},
          ]
        : undefined,
    },
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
  appAssert(autoparts, 500, "Autoparts not found");
  return res.status(200).json(autoparts);
})