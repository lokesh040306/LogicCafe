import bcrypt from "bcryptjs";
import { User } from "../../models/User.model.js";
import { generateToken } from "../../utils/jwt.js";
import ApiError from "../../utils/ApiError.js";

/**
 * Register a new user
 */
export const registerUser = async ({ name, email, password }) => {
  // Validate input
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Hash password before saving to DB 
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB 
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT token for the new user
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

/**
 * Login existing user
 */
export const loginUser = async ({ email, password }) => {
  // Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user + password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Compare password 
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token for the user
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
