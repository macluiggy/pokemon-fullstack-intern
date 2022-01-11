import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { proxy } from "../../config";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<any[]>([]);
  async function setFavoritePokemon(token) {
    
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
  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      {/* <button onClick={() => setAuth(false)}>Logout</button> */}
      <button className="btn btn-primaty" onClick={logout}>
        logout
      </button>
      <div
        className="pokemons-container"
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid red",
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
                <button onClick={() => setFavoritePokemon(localStorage.token)}>set favorite</button>
              </div>
            );
          })}
        </div>
        <div
          className="favorite-pokemons"
          style={{
            border: "solid",
          }}
        ></div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
