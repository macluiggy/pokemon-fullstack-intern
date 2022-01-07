// import { Router } from "express";
// const router = Router();
const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import pool from "../db";
import authorization from "../middleware/authorization";

router.route("/").get(authorization, async (req, res: Response) => {
  try {
    // req.user has the payload of the jwt token
    // res.json(req.user);
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
    // console.log(user.rows[0]);d
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// router.route("/api/hello").get((req, res) => res.json({ msg: "Hello World!" }));
export default router;
