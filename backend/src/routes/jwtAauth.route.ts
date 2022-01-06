import { trace } from "console";
import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
const router = Router();

router.route("/register").post(async (req, res) => {
  try {
    // 1. desctructure the req.body
    const { name, email, password } = req.body;
    // 2. check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows[0]) return res.status(401).send("User already exists"); // 401 means unauthorized
    // res.json(user.rows);
    // 3.bcrypt the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter the user in the database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    res.json(newUser.rows[0]);
    //5. generating our jwt token
  } catch (error) {
    trace(error);
    res.status(500).send("Server error");
  }
});

export default router;
