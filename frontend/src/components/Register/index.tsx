import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { proxy } from "../../config";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;
  const onChange = ({ target: { name, value } }) => {
    // console.log(name, value);f

    setInputs({ ...inputs, [name]: value });
  };
  const onSubmitForm = async (e) => {
    // console.log(e);

    e.preventDefault();
    console.log("submitting form", e);

    try {
      const body = { email, password, name };
      const response = await fetch(`${proxy}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log("response", response, parseRes);
      if (parseRes.userAlreadyExists)
        return console.log(parseRes.userAlreadyExists);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
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
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={onChange}
        />
        <button className="btn btn-success btn-block">Submit</button>
        <Link to="/login" className="btn btn-light btn-block my-3">
          {" "}
          Login{" "}
        </Link>
      </form>
    </Fragment>
  );
};

export default Register;
