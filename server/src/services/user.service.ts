import { PrismaClient } from "@prisma/client";
import { CONFLICT, NOT_FOUND, UNPROCESSABLE_CONTENT } from "../constants/http";
import { APP_ORIGIN } from "../constants/env";

import appAssert from "../utils/appAssert";
import { uploadImage, updateImage, deleteImage } from "../utils/imageUpload";
import { hashValue } from "../utils/bcrypt";
import { sendMail } from "../utils/sendMail";
import { getVerifyEmailTemplate } from "../utils/emailTemplates";
const moment = require("moment");

const prisma = new PrismaClient();

export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
  phone_number?: string;
  address?: string;
  image_src?: string;
};

export const createUser = async (data: CreateUserParams) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  appAssert(!existingUser, CONFLICT, "Email already exists");
  const hashedPassword = await hashValue(data.password);

  // if image is provided, upload image to cloudinary and save the url
  let uploadResponse = { image_src: "", image_id: "" };
  if (data.image_src) {
    uploadResponse = await uploadImage({
      image_src: data.image_src,
      uploadPreset: "ImageUploads",
    });
    appAssert(uploadResponse, UNPROCESSABLE_CONTENT, "Image upload failed");
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone_number: data.phone_number,
      address: data.address,
      image_src: uploadResponse.image_src,
      image_id: uploadResponse.image_id,
      role: "user",
      verified: false,
      createdAt: moment().toDate(),
    },
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    phone_number: user.phone_number,
    address: user.address,
    image_src: user.image_src,
    role: user.role,
    verified: user.verified,
    createdAt: user.createdAt,
  };

  // create verification code
  const verificationCode = await prisma.verificationCode.create({
    data: {
        user_id: user.id,
        type: "verify_email",
        createdAt: moment().toDate(),
        expiresAt: moment().add(24, "hours").toDate(), // 24 hours
    }
  })

  // send verification email
    const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;
    try {
        const response = await sendMail({
          to: user.email,
          ...getVerifyEmailTemplate(url), // Ensure this returns the required fields like subject, text, html
        });
        console.log("Email sent successfully", response); // Handle success case
      } catch (error) {
        console.error(error); // Handle error case
      }

  return safeUser;
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    appAssert(user, NOT_FOUND, "User not found");
    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone_number: user.phone_number,
        address: user.address,
        image_src: user.image_src,
        image_id: user.image_id,
        role: user.role,
        verified: user.verified,
        createdAt: user.createdAt,
    }
    return safeUser;
}

export const getUsers = async () => {
    const users = await prisma.user.findMany();
    appAssert(users, NOT_FOUND, "Users not found");
    const safeUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        phone_number: user.phone_number,
        address: user.address,
        image_src: user.image_src,        
        role: user.role,
        verified: user.verified,
        createdAt: user.createdAt,
    }))

    return safeUsers;
}

export const updateUser = async (id: string, data: CreateUserParams) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    appAssert(user, NOT_FOUND, "User not found");

    let uploadResponse = { image_src: "", image_id: "" };
    if (user.image_src && user.image_id) {
      uploadResponse = await updateImage({
        image_src: user.image_src,
        image_id: user.image_id,
        uploadPreset: "ImageUploads",
      });
      appAssert(uploadResponse, UNPROCESSABLE_CONTENT, "Image update failed");
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            email: data.email,
            name: data.name,
            phone_number: data.phone_number,
            address: data.address,
            image_src: uploadResponse.image_src,
            image_id: uploadResponse.image_id,
        }
    })

    const safeUser = {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone_number: updatedUser.phone_number,
        address: updatedUser.address,
        image_src: updatedUser.image_src,
        image_id: updatedUser.image_id,
        role: updatedUser.role,
        verified: updatedUser.verified,
        createdAt: updatedUser.createdAt,
    }
    return safeUser;
}

export const deleteUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    appAssert(user, NOT_FOUND, "User not found");
    if (user.image_id) {
        const deletedImage = await deleteImage(user.image_id);
        appAssert(deletedImage, UNPROCESSABLE_CONTENT, "Image delete failed");
    }

    await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })

    return true;
}

export const currentUser = async (id: number) => {
    const currentUser = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    appAssert(currentUser, NOT_FOUND, "User not found");
    const safeUser = {
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        phone_number: currentUser.phone_number,
        address: currentUser.address,
        image_src: currentUser.image_src,
        image_id: currentUser.image_id,
        role: currentUser.role,
        verified: currentUser.verified,
        createdAt: currentUser.createdAt,
    }
    return safeUser;
}