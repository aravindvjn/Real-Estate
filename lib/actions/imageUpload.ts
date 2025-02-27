import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function imageUpload(base64Images: string[]) {
  try {
    const processedUrls = [];

    for (const image of base64Images) {
      if (image.startsWith("https://res.cloudinary.com/")) {
        processedUrls.push(image);
        continue;
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "nextjs_base64_images",
      });

      processedUrls.push(uploadResponse.secure_url);
    }

    return processedUrls;
  } catch (error) {
    console.error("Error processing base64 images:", error);
    throw new Error("Error uploading base64 images to Cloudinary.");
  }
}
