import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { INTERNAL_SERVER_ERROR, OK } from "../constants/http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCommentHandler = catchErrors(async (req, res) => {
  const request = req.body;

  const comment = await prisma.comment.create({
    data: {
      text: request.text,
      rating: request.rating,
      user_id: request.user_id,
      autopart_id: parseInt(request.autopart_id),
    },
  });

  appAssert(comment, INTERNAL_SERVER_ERROR, "Comment creation failed");
  return res.status(OK).json({
    data: comment,
  });
});

export const getCommentsHandlerByAutoPart = catchErrors(async (req, res) => {
  const { id } = req.params;

  const comments = await prisma.comment.findMany({
    where: {
      autopart_id: parseInt(id),
    },
    include: {
      User: true,
    },
  });

  appAssert(comments, INTERNAL_SERVER_ERROR, "Comments not found");
  return res.status(OK).json({
    data: comments,
  });
});

export const getCommentHandlerById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      User: true,
    }
  });
  appAssert(comment, INTERNAL_SERVER_ERROR, "Comment not found");
  return res.status(OK).json({
    data: comment,
  });
});

export const editCommentHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const request = req.body;

  const updatedComment = await prisma.comment.update({
    where: {
      id: parseInt(id),
    },
    data: {
      text: request.text,
      rating: request.rating,
      createdAt: new Date(),
    },
  });

  appAssert(updatedComment, INTERNAL_SERVER_ERROR, "Comment update failed");

  return res.status(OK).json({
    data: updatedComment,
  });
});

export const deleteCommentHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const deletedComment = await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  });

  appAssert(deletedComment, INTERNAL_SERVER_ERROR, "Comment delete failed");

  return res.status(OK).json({
    message: "Comment deleted",
  });
});
