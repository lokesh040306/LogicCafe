import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { registerUser, loginUser } from "./auth.service.js";

/**
 * Register user
 */
export const register = async (req, res, next) => {
  try {
    // Extract user details from request body
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // Register user via service layer
    const result = await registerUser({ name, email, password });

    return res.status(201).json(
      new ApiResponse(201, result, "User registered successfully")
    );

  } 
  catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {

    // Extract login credentials from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // Login user via service layer
    const result = await loginUser({ email, password });

    return res.status(200).json(
      new ApiResponse(200, result, "Login successful")
    );

  } 
  catch (error) {
    next(error);
  }
};
