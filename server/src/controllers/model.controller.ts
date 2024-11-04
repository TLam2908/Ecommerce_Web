import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { modelSchema } from "../validation/model.validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getModelsHandler = catchErrors(async (req, res) => {
  const models = await prisma.model.findMany({});
  appAssert(models, NOT_FOUND, "Model not found");
  return res.status(OK).json({
    data: models,
  });
});

export const getModelByIdHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const model = await prisma.model.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  appAssert(model, NOT_FOUND, "Model not found");
  return res.status(OK).json({
    data: model,
  });
});

export const createModelHandler = catchErrors(async (req, res) => {
  const request = modelSchema.parse(req.body);

  const findModel = await prisma.model.findFirst({
    where: {
      name: request.name,
      year: request.year,
    },
  });

  appAssert(!findModel, UNPROCESSABLE_CONTENT, "Model already exists");

  const model = await prisma.model.create({
    data: {
      name: request.name,
      make: request.make,
      year: request.year,
    },
  });
  appAssert(model, UNPROCESSABLE_CONTENT, "Model creation failed");
  return res.status(OK).json(model);
});

export const updateModelHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const request = modelSchema.parse(req.body);

  const model = await prisma.model.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: request.name,
      make: request.make,
      year: request.year,
    },
  });
  appAssert(model, UNPROCESSABLE_CONTENT, "Model update failed");
  return res.status(OK).json(model);
});

export const deleteModelHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const model = await prisma.model.delete({
    where: {
      id: parseInt(id),
    },
  });
  appAssert(model, UNPROCESSABLE_CONTENT, "Model deletion failed"); 
  return res.status(OK).json(model);
});


