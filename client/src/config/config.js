import dotenv from "dotenv";
dotenv.config();

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:9999/api";

export const PUBLIC_URL =
  process.env.REACT_APP_PUBLIC_URL || "http://localhost:9999";
