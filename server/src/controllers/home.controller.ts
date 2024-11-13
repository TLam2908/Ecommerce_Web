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
  return res.status(200).json({
    data: autopart,
  });
});
