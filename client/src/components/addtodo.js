import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Profile from "./profile";
import "../styles/header.css";
import About from "./about";
const axios = require("axios");

const Addtodo = props => {
  const { history } = props;
  const schema = {
    id: null,
    title: "",
    description: ""
  };
  const [input, setInput] = useState(schema);
  const [todo] = useState([]);
  const [user, setUser] = useState({});

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + user.token
  };

  const logout = () => {
    let check = window.confirm("you are about to logout");
    if (check) {
      localStorage.removeItem("current-user");
      history.push("/login");
    }
  };

  const About = () => {
    history.push("/about");
  };
  const Profile = () => {
    history.push("/profile");
  };
  const getdetails = async () => {
    const details = await JSON.parse(localStorage.getItem("current-user"));
    setUser(details.existing_user);
  };

  useEffect(() => {
    getdetails();
  }, [todo]);

  const HandleSubmit = e => {
    e.preventDefault();
    console.log(user);
    if (!input.title && !input.description) {
      alert("pls enter todo");
    } else {
      axios
        .post(
          "http://localhost:2001/add_todo",
          {
            title: input.title,
            description: input.description,
            creator: user._id
          },
          { headers }
        )
        .then(res => {
          alert(`todo of ${input.title} as title was Saved!!`);
        })
        .catch(err => console.log(err));

      alert(`todo of ${input.title} is saved!!`);
    }
  };
  const HandleInput = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <div className="header">
        <h1>MY TODO</h1>
        <div className="logout">
          <h2>Signedin As {user.username}</h2>
          <div className={"Option"}>
            <h2>☰</h2>
            <div className={"Optionitem"}>
              <li onClick={Profile}>profile</li>
              <li onClick={About}>about</li>
              <li onClick={logout}>signout</li>
            </div>
          </div>
        </div>
      </div>
      {/* <Profile /> */}
      <div>
        <form onSubmit={HandleSubmit}>
          <label>TITLE</label>
          <input
            className="input"
            onChange={HandleInput}
            type="text"
            name="title"
            value={input.title}
            autoFocus
          />
          <label>DESCRIPTION</label>
          <textarea
            onChange={HandleInput}
            className="describ"
            type="text"
            name="description"
            value={input.description}
          />

          <button className="addtodo-btn">ADD TODO</button>
        </form>
        <Link to="/todos">
          <center>
            <button className="view">VIEW TO DO</button>
          </center>
        </Link>
      </div>
    </div>
  );
};

export default Addtodo;
