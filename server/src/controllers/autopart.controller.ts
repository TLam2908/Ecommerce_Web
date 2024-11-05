import { NOT_FOUND, OK } from "../constants/http";
import catchErrors from "../utils/catchError";

import { createAutopart, getAutoparts, getAutopartById, updateAutopart, deleteAutopart } from "../services/autopart.service";

import { autopartSchema } from "../validation/autopart.validation";

export const createAutopartHandler = catchErrors(async (req, res) => {
  const request = autopartSchema.parse(req.body);
  const autopart = await createAutopart(request);
  return res.status(OK).json(autopart);
});

export const getAutopartsHandler = catchErrors(async (req, res) => {
  const autoparts = await getAutoparts();
  return res.status(OK).json({
    data: autoparts,
  });
});

export const getAutopartByIdHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const autopart = await getAutopartById(id);
  return res.status(OK).json({
    data: autopart,
  });
});

export const updateAutopartHandler = catchErrors(async (req, res) => {
  const request = req.body;
  const { id } = req.params;

  const autopart = await updateAutopart(id, request);
  return res.status(OK).json(autopart);
});


export const deleteAutopartHandler = catchErrors(async (req, res) => {
    const { id } = req.params;
    const autopart = await deleteAutopart(id);
    return res.status(OK).json(autopart);
})