import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Tech Stack should be a non-empty array of strings.",
      },
    },
    githubLink: {
      type: String,
      match: /^(https?:\/\/)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/i,
    },
    liveLink: {
      type: String,
      match: /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)+)(\/.*)?$/i,
    },
    // image: {
    //   type: String,
    //   match: /https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+/,
    // },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema({
  gmail: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: { type: String, required: true, trim: true },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Skills should be a non-empty array of strings.",
      },
    },
    education: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    socialLinks: {
      github: {
        type: String,
        match: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/.*)?$/,
      },
      linkedin: {
        type: String,
        match:
          /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+(?:\/.*)?$/,
      },
      twitter: {
        type: String,
        match:
          /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+(?:\/.*)?$/,
      },
      instagram: {
        type: String,
        match: /^(https?:\/\/)?www\.instagram\.com\/[a-zA-Z0-9_]+(?:\/.*)?$/,
      },
      facebook: {
        type: String,
        match: /^(https?:\/\/)?www\.facebook\.com\/[a-zA-Z0-9.]+(?:\/.*)?$/,
      },
      website: {
        type: String,
        match: /^(https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)+$/,
      },
    },
    contact: contactSchema,
    projects: [projectSchema],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
