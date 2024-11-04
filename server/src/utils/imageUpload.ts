const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type uploadImageType = {
  image_src: string;
  uploadPreset: string;
  image_id?: string;
};

export const uploadImage = async ({
  image_src,
  uploadPreset,
}: uploadImageType) => {
  const uploadResponse = await cloudinary.uploader.upload(image_src, {
    upload_preset: uploadPreset,
    timeout: 100000,
  });
  const fix_id = uploadResponse.public_id.split("/")[1];

  return {
    image_src: uploadResponse.secure_url,
    image_id: fix_id,
  };
};

export const deleteImage = async (image_id: string) => {
  return await cloudinary.uploader.destroy(image_id, {
    resource_type: "image",
    type: "upload",
    timeout: 100000,
  });
};

export const updateImage = async ({
  image_src,
  image_id,
  uploadPreset,
}: uploadImageType) => {
  const uploadResponse = await cloudinary.uploader.upload(image_src, {
    upload_preset: uploadPreset,
    public_id: image_id,
    timeout: 100000,
  });
  return {
    image_src: uploadResponse.secure_url,
    image_id: uploadResponse.public_id,
  };
};


