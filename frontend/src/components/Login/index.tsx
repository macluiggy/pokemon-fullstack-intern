import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { proxy } from "../../config";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("submitting form", e);

    try {
      const body = { email, password };
      const response = await fetch(`${proxy}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log("response", response, parseRes);
      if (parseRes.missingCredentials) {
        console.log(parseRes.missingCredentials);
        return toast.error(parseRes.missingCredentials);
      }
      if (parseRes.passwordOrEmailIsIncorrect) {
        console.log(parseRes.passwordOrEmailIsIncorrect);
        return toast.error(parseRes.passwordOrEmailIsIncorrect);
      }
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successfully!");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form action="" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={onChange}
        />
        {/* <button onClick={() => setAuth(true)}>authenticate</button> */}
        <button className="btn btn-success btn-block">Submit</button>
        <Link to="/register" className="btn btn-light btn-block my-3">
          Register
        </Link>
      </form>
    </Fragment>
  );
};

export default Login;
