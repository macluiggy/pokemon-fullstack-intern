import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { proxy } from "../../config";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [currentFavoitePokemon, setCurrentFavoitePokemon] = useState<any>("");
  async function setFavoritePokemon(pokemon_name) {
    console.log(id);
    const body = { user_id: id, pokemon_name };
    const response = await fetch(`${proxy}/dashboard/set-favorite/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log(parseRes);
    setCurrentFavoitePokemon(parseRes.pokemon_name);
  }
  async function getFavoritePokemons() {
    try {
      const response = await fetch(`${proxy}/dashboard/set-favorite/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setFavoritePokemons([...new Set(parseRes)]);
      console.log(favoritePokemons);
    } catch (error) {
      console.error(error);
    }
  }
  async function getName() {
    try {
      const response = await fetch(`${proxy}/dashboard`, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
      setId(parseRes.user_id);
      console.log(parseRes);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  async function getPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const parseRes = await response.json();
      setPokemons(parseRes.results);
    } catch (error) {
      console.error(error);
    }
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout Successfully!");
  };
  useEffect(() => {
    getName();
    getPokemons();
  }, []);
  useEffect(() => {
    getFavoritePokemons();
  }, [currentFavoitePokemon]);
  return (
    <Fragment>
      <h1>Hello {name}</h1>
      {/* <button onClick={() => setAuth(false)}>Logout</button> */}
      <button
        className="btn btn-primaty"
        onClick={logout}
        style={{ backgroundColor: "red" }}
      >
        logout
      </button>
      <div
        className="pokemons-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div className="pokemons">
          {pokemons.map((pokemon) => {
            return (
              <div
                key={pokemon.name}
                style={{ border: "solid", margin: "1em auto" }}
              >
                <h3>{pokemon.name}</h3>
                <button onClick={() => setFavoritePokemon(pokemon.name)}>
                  set favorite
                </button>
              </div>
            );
          })}
        </div>
        <div
          className="favorite-pokemons"
          style={{
            border: "solid",
          }}
        >
          {favoritePokemons.map((pokemon, i) => {
            return (
              <div key={i}>
                <h3>{pokemon.pokemon_name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
