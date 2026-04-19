import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 */
export const UplaodImage = async (file: any, folder: string) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const bytes = Buffer.isBuffer(file)
    ? file
    : file.buffer
    ? Buffer.from(file.buffer)
    : file.arrayBuffer
    ? Buffer.from(await file.arrayBuffer())
    : null;

  if (!bytes) {
    throw new Error("Invalid file data");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder,
      },
      (err: any, result: any) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(bytes);
  });
};

/**
 * Delete image from Cloudinary
 */
export const DeleteImage = async (public_id: string) => {
  if (!public_id) {
    throw new Error("No public_id provided");
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err: any, result: any) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};