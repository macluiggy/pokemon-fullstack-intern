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
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        req.user,
      ]);
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
      // 1. verify if the user with the id exists
      await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]); // if the id is invalid the catch will be called
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

router
  .route("/set-favorite")
  .post(async (req: any, res: Response) => {
    try {
      const { user_id, pokemon_name } = req.body;
      // 1. verify if the user with the id exists
      await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]); // if the id is invalid the catch will be called
      // const newFavoritePokemon = await pool.query(
      //   "UPDATE favorite_pokemons SET pokemon_name = $1 WHERE user_id = $2 RETURNING *",
      //   [pokemon_name, user_id]
      // );
      const newFavoritePokemon = await pool.query(
        "INSERT INTO favorite_pokemons (user_id, pokemon_name) VALUES ($1, $2) RETURNING *",
        [user_id, pokemon_name]
      );
      res.json(newFavoritePokemon.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  })
  .get(authorization, async (req: any, res: Response) => {
    try {
      const favoritesPokemons = await pool.query(
        "SELECT * FROM favorite_pokemons WHERE user_id = $1",
        [req.user]
      );
      return res.json(favoritesPokemons.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  });
// router.route("/api/hello").get((req, res) => res.json({ msg: "Hello World!" }));
export default router;
