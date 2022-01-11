// import { config } from "dotenv";
// config();

// export const isProduction = process.env.NODE_ENV === "production";
export const proxy = false
  ? "https://macluiggy-backend-pokemon-api.herokuapp.com"
  : "http://localhost:3000";
