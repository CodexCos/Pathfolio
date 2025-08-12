import cloudinary from "../utils/cloudinary.js";


export const uploadCloudinary = async(ImageData,username) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(ImageData,{
            folder:`user_portfolio/${username}`
        })
        return uploadResponse.secure_url;
    } catch (error) {
        throw new Error("Cloudinary upload failed");
    }
}