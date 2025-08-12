import cloudinary from "../utils/cloudinary.js";
import Portfolio from "../models/Portfolio.js";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../const/http.js";
import User from "../models/User.js";
import { uploadCloudinary } from "../utils/cloudinaryUpload.js";

const validatePhoneNumber = (number) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(number);
}

export const createPortfolio = async (req, res) => {
  try {
    const userId = req.user;
    const portfolioExists = await Portfolio.findOne({ userId: userId });
    if (portfolioExists) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Portfolio already exits!" });
    }
    const {
      username,
      profileImage,
      bio,
      skills,
      education,
      experience,
      socialLinks,
      contact,
      projects,
    } = req.body;

    const { gmail, number } = contact;

    if (!username) {
      return res.status(BAD_REQUEST).json({ message: "Username is required!" });
    }

    if (!gmail || !number) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Both Gmail and number are required!" });
    }

    if (!validatePhoneNumber(number)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Invalid number!" });
    }

    if (!bio || !education || !experience) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Bio, education, and experience are required!" });
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Skills must be a non-empty array." });
    }

    if (!projects || !Array.isArray(projects) || projects.length === 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Projects must be a non-empty array." });
    }

    if (!socialLinks || typeof socialLinks !== "object") {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Social links are required." });
    }

    if (!profileImage) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Profile picture is required!" });
    }

    const uploadedProfileImage = await uploadCloudinary(profileImage, username);

    const existingUser = await Portfolio.findOne({ userId });

    if (existingUser) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Portfolio already exists for this user." });
    }

    const portfolio = await Portfolio.create({
      userId,
      username,
      profileImage: uploadedProfileImage,
      bio,
      skills,
      education,
      experience,
      socialLinks,
      contact,
      projects,
    });

    res.status(CREATED).json({
      message: "Profile created successfully!",
      portfolio,
    });
  } catch (err) {
    console.log("Error in portfolioController:createPortfolio", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const authUser = await User.findById(req.user).select(
      "-password -createdAt -updatedAt -__v"
    );
    res.status(200).json(authUser);
  } catch (err) {
    console.log("Error in portfolioController:sendData", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const portfolioId = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      return res.status(BAD_REQUEST).json({ message: "Portfolio not found." });
    }
    res.status(OK).json(portfolio);
  } catch (err) {
    console.log("Error in portfolioController:sendPortfolio", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const sendPortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(BAD_REQUEST).json({ message: "Portfolio not found." });
    }
    res.status(OK).json(portfolio);
  } catch (err) {
    console.log("Error in portfolioController:sendPortfolio", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const {
      username,
      profileImage,
      bio,
      skills,
      education,
      experience,
      socialLinks,
      contact,
      projects,
    } = req.body;

    const portfolio = await Portfolio.findOne({ userId: req.user });

    const {gmail,number} = contact;

    if (!portfolio) {
      return res.status(BAD_REQUEST).json({ message: "Portfolio not found." });
    }

      if (!gmail || !number) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Both Gmail and number are required!" });
    }

    if (!validatePhoneNumber(number)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Invalid number!" });
    }

    if (username) portfolio.username = username;
    if (bio) portfolio.bio = bio;
    if (education) portfolio.education = education;
    if (experience) portfolio.experience = experience;
    if (contact) portfolio.contact = contact;

    if (skills && Array.isArray(skills)) {
      portfolio.skills = skills;
    } else if (skills && !Array.isArray(skills)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Skills must be an array." });
    }

    if (projects && Array.isArray(projects)) {
      portfolio.projects = projects;
    } else if (projects && !Array.isArray(projects)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Projects must be an array." });
    }

    if (socialLinks && typeof socialLinks === "object") {
      portfolio.socialLinks = socialLinks;
    } else if (socialLinks && typeof socialLinks !== "object") {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Social links must be an object." });
    }

    if (profileImage) {
      if (!profileImage.startsWith("data:image")) {
        portfolio.profileImage = profileImage;
      } else {
        const uploadedProfileImage = await uploadCloudinary(
          profileImage,
          portfolio.username
        );
        portfolio.profileImage = uploadedProfileImage;
      }
    }

    await portfolio.save();

    res.status(OK).json({
      message: "Portfolio updated successfully!",
      portfolio,
    });
  } catch (err) {
    console.log("Error in portfolioController:updatePortfolio", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};
