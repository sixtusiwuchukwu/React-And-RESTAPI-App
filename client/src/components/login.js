import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
const Axios = require("axios");

const Login = props => {
  const { history } = props;
  const Schema = {
    username: "",
    password: ""
  };
  const [user, setUser] = useState(Schema);

  const Handlesubmit = e => {
    e.preventDefault();
    if (
      user.username.length < 5 ||
      user.username === null ||
      user.username === undefined
    ) {
      alert("incorrect username");
      return false;
    } else if (
      user.password.length < 8 ||
      user.password === null ||
      user.password === undefined
    ) {
      alert("incorrect password");
    } else {
      Axios.post(`http://localhost:2001/login`, {
        username: user.username,
        password: user.password
      })
        .then(res => {
          if (res.data === "user not found") {
            alert("invalid username and password");
            return false;
          } else if (res.data === "incorrect user password") {
            alert("incorrect password");
            return false;
          }
          localStorage.setItem("current-user", JSON.stringify(res.data));
          // history.push("/addtodo");
          window.location.replace("http://localhost:3000/addtodo");
        })
        .catch(err => console.log(err));
    }
  };
  const Handlechange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <center>
      <div className="login">
        <div className="title">
          <h2>LOGIN</h2>
        </div>
        <form>
          <input
            placeholder="USERNAME"
            onChange={Handlechange}
            name="username"
            value={user.username}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={Handlechange}
            name="password"
            value={user.password}
          />
          <button className="login-btn" onClick={Handlesubmit}>
            Login
          </button>
          <Link to="/">Don't have an account? create account</Link>
        </form>
      </div>
    </center>
  );
};
export default Login;
