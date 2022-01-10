// import { config } from "dotenv";
// config();

// export const isProduction = process.env.NODE_ENV === "production";ddd
export const proxy = true
  ? "https://postgres-node-login.herokuapp.com"
  : "http://localhost:3000";
