import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export default async (req, res: Response, next: NextFunction) => {
  try {
    // 1. desctructure the token
    const jwtToken = req.header("token");
    // 2. check if the token exists
    if (!jwtToken) return res.status(403).send("Unauthorized");
    // 3. check if the token is valid
    const payload: any = jwt.verify(
      // any because we don't know what the payload will be
      jwtToken,
      process.env.JWT_SECRET as unknown as GetPublicKeyOrSecret | Secret
    ); // verify is a method of jwt that takes the token and the secret and returns the payload wich we can use within our routes
    req.user = payload.user; // we can use the payload.user to access the user in our routes
  } catch (error: any) {
    console.log(error);
    res.status(403).send("Not Authorized"); // 403 means forbidden
  }
};
