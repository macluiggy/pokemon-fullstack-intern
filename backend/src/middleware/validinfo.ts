import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  function validEmail(userEmail: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // if the path is register
    console.log(!!email);
    if (![email, name, password].every(Boolean)) {
      // if the email, name and password are not all filled
      return res.status(401).json("Missing credentials"); // 401 means unauthenticated
    } else if (!validEmail(email)) {
      // if the email is not valid
      return res.status(401).json("Invalid email"); // return invalid email
    }
  } else if (req.path === "/login") {
    // if the path is login
    if (![email, password].every(Boolean)) {
      // if the email and password are not all filled
      return res.json("Missing credentials"); // 401 means unauthenticated
    } else if (!validEmail(email)) {
      // if the email is not valid
      return res.status(401).json("Invalid email"); // return invalid email
    }
  }

  next();
};
