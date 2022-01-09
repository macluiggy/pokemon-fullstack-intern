export const isProduction = process.env.NODE_ENV === "production";
export const proxy = isProduction
  ? "https://postgres-node-login.herokuapp.com/"
  : "http://localhost:3000/";
