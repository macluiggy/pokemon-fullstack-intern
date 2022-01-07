import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();
// require("dotenv").config();
// basically here will be the logic to check if the user is authenticated, this is done by checking if the token is valid, that means if the token providen is the same as the one created by the server with the secret key
export default async (req, res: Response, next: NextFunction) => {
  try {
    // 1. desctructure the token
    const jwtToken = req.header("token");
    // console.log(jwtToken);

    // 2. check if the token exists
    if (!jwtToken) return res.status(403).send("Unauthorized");
    // 3. check if the token is valid
    const payload: any = jwt.verify(
      // any because we don't know what the payload will be
      jwtToken,
      process.env.JWT_SECRET as unknown as GetPublicKeyOrSecret | Secret
    ); // verify is a method of jwt that takes the token and the secret and returns the payload wich we can use within our routes, this returns the payload of the token which contains the user id
    req.user = payload.user; // we can use the payload.user to access the user in our routes
    return next();
  } catch (error: any) {
    console.log(error);
    return res.status(403).send("Not Authorized"); // 403 means forbidden
  }
};
