import React, { Fragment, useState, useEffect } from "react";
import { proxy } from "../../config";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
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
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      {/* <button onClick={() => setAuth(false)}>Logout</button> */}
      <button className="btn btn-primaty" onClick={logout}>
        logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
