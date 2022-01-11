import { Router } from "express";
const router = Router();
// const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import pool from "../db";
import authorization from "../middleware/authorization";

router.route("/no-used").get(authorization, async (req: any, res: Response) => {
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
router
  .route("/")
  .get(authorization, async (req: any, res: Response) => {
    try {
      // req.user has the payload of the jwt token
      // res.json(req.user);
      const user = await pool.query(
        "SELECT * FROM favorite_pokemon WHERE user_id = $1",
        [req.user]
      );
      res.json(user.rows[0]);
      // console.log(user.rows[0]);d
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  })
  .post(async (req, res) => {
    try {
      const { user_id, pokemon_name } = req.body;
      const newFavoritePokemon = await pool.query(
        "INSERT INTO favorite_pokemons (user_id, pokemon_name) VALUES ($1, $2) RETURNING *",
        [user_id, pokemon_name]
      );
      res.json(newFavoritePokemon.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  });

// router.route("/api/hello").get((req, res) => res.json({ msg: "Hello World!" }));
export default router;
