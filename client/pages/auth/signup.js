import React, { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "http://localhost:4000/api/users/signup",
    method: "POST",
    body: {
      email,
      password,
    },
  });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const response = await doRequest();

    if (!errors) {
      Router.push("/");
    }
  };

  return (
    <form onSubmit={onSignup}>
      {errors}
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          value={email}
          onChange={onEmailChange}
        ></input>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={onPasswordChange}
        ></input>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Signup;
