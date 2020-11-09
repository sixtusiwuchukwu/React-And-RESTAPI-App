import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/signup.css";
const Axios = require("axios");

const Signup = props => {
  const Schema = {
    fullname: "",
    email: "",
    username: "",
    password: ""
  };
  const errors = {
    email: false,
    fullname: false,
    username: false,
    password: false
  };
  const [first, setFirst] = useState(true);
  const [input, setinput] = useState(Schema);
  const [error, setError] = useState(errors);
  const { history } = props;

  const Handlesubmit = e => {
    e.preventDefault();
    if (
      input.username.length < 6 ||
      input.username === null ||
      input.username === undefined
    ) {
      setError({ username: true });
      return false;
    } else if (
      input.password.length < 8 ||
      input.password === null ||
      input.password === undefined ||
      input.password === input.username
    ) {
      setError({ password: true });
      return false;
    }
    Axios.post("http://localhost:2080/todo/signup", {
      fullname: input.fullname,
      email: input.email,
      username: input.username,
      password: input.password
    })
      .then(res => {
        if (res.data.name_error) {
          return console.log(res.data.name_error);
        }
        setinput(Schema);
        history.push("/login");
      })
      .catch(err => console.log(err));
  };

  const Handlechange = e => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const Handlenext = e => {
    e.preventDefault();
    if (
      input.fullname.length < 6 ||
      input.fullname === null ||
      input.fullname === undefined
    ) {
      setError({ fullname: true });
      return false;
    } else if (
      input.email.length < 8 ||
      input.email === null ||
      input.email === undefined
    ) {
      setError({ fullname: false });
      setError({ lastname: true });
      return false;
    } else {
      setError({ email: false });
      setFirst(false);
    }
  };
  const check = JSON.parse(localStorage.getItem("current-user"));
  return (
    <div>
      {check ? (
        <Redirect to="/addtodo" />
      ) : (
        <center>
          <div className="signup">
            <div className="title">
              <h2>SIGNUP</h2>
            </div>
            <form>
              <div className="errors">
                {error.fullname ? (
                  <h4>
                    fullname should not be empty or less than 3 characters
                  </h4>
                ) : error.email ? (
                  <h4>
                    {" "}
                    email should not be empty or less than 7 characters
                  </h4>
                ) : error.username ? (
                  <h4>
                    {" "}
                    username should not be empty or less than 5 characters
                  </h4>
                ) : error.password ? (
                  <h4>
                    {" "}
                    password should not contain your username or less than 8
                    characters
                  </h4>
                ) : (
                  ""
                )}
              </div>
              {first ? (
                <div className="first1">
                  <div className="line">
                    <button
                      className="one"
                      onClick={() => {
                        setFirst(true);
                      }}
                    >
                      1
                    </button>
                    <hr className="hri" />
                    <hr className="hrii" />
                    <button className="two">2</button>
                    <hr className="hriii" />
                    <hr className="hriv" />
                  </div>

                  <input
                    name="fullname"
                    value={input.fullname}
                    onChange={Handlechange}
                    className="first"
                    placeholder="FULLNAME"
                    onFocus={() => {
                      setError({ fullname: false });
                      const one = document.querySelector(".hri");
                      one.style = "background-color:red";
                    }}
                  />

                  <input
                    name="email"
                    value={input.email}
                    onChange={Handlechange}
                    placeholder="EMAIL"
                    onFocus={() => {
                      setError({ email: false });
                      const two = document.querySelector(".hrii");
                      two.style = "background-color:red";
                    }}
                  />
                  <button onClick={Handlenext}>Next</button>
                  <br />
                  <Link to="/login">Already have an Acoount? Login</Link>
                </div>
              ) : (
                <div className="second">
                  <div className="line">
                    <button className="one">1</button>
                    <hr className="hri" />
                    <hr className="hrii" />
                    <button className="two">2</button>
                    <hr className="hriii" />
                    <hr className="hriv" />
                  </div>
                  <input
                    name="username"
                    value={input.username}
                    onChange={Handlechange}
                    className="first"
                    placeholder="USERNAME"
                    onFocus={() => {
                      const three = document.querySelector(".hriii");
                      three.style = "background-color:red";
                    }}
                  />
                  <input
                    name="password"
                    value={input.password}
                    onChange={Handlechange}
                    type="password"
                    placeholder="PASSWORD"
                    onFocus={() => {
                      const four = document.querySelector(".hriv");
                      four.style = "background-color:red";
                    }}
                  />
                  <button onClick={Handlesubmit}>SIGNUP</button>
                </div>
              )}
            </form>
          </div>
        </center>
      )}
    </div>
  );
};
export default Signup;
