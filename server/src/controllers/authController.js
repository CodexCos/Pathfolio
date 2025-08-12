import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "../const/http.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Password must be atleast 6 characters long!" });
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(CONFLICT).json({ message: "User already exits!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(CREATED).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error in authController:signup", err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: "Invalid credentials!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(UNAUTHORIZED).json({ message: "Invalid credentials!" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge:  15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 86400000,
    });

    res.status(OK).json({ message: "Logged In successfully!" });
  } catch (err) {
    console.log("Error in authController:login", err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      return res
        .status(FORBIDDEN)
        .json({ message: "No refresh token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res
            .status(FORBIDDEN)
            .json({ message: "Invalid refresh token" });
        }
        const userId = decoded.userId;
        const newAccessToken = generateAccessToken(userId);

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
          maxAge:  15 * 60 * 1000,
        });

        return res.status(OK).json({ message: "Access token refreshed" });
      }
    );
  } catch (err) {
    console.log("Error in authController:refresh", err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in authController:logout", err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error!" });
  }
};
