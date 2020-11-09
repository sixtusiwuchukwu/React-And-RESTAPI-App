import React, { useEffect, useState } from "react";
import "../styles/header.css";
const Axios = require("axios");

const Edit = (props) => {
  const [value, setValue] = useState(props.value);
  const [todo] = useState(props.todo);

  const Handlesubmit = async (e) => {
    e.preventDefault();

    let token = await JSON.parse(localStorage.getItem("current-user-token"));
    Axios.put(
      `http://localhost:2080/todo/updatepost/${props.currentedit}`,
      {
        title: value.title,
        description: value.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => console.log(`updated${res}`))
      .catch((err) => console.log(err));
    props.setEdit(false);
  };
  const HandleInput = (e) => {
    const { name, value } = e.target;

    setValue({ ...value, [name]: value });
  };

  useEffect(() => {}, [todo]);

  return (
    <div>
      <div className="header">
        <h1>EDIT</h1>
      </div>
      <form onSubmit={Handlesubmit}>
        <label>TITLE</label>
        <input
          className="input"
          onChange={HandleInput}
          type="text"
          name="title"
          value={value.title}
          autoFocus
        />
        <label>DESCRIPTION</label>
        <textarea
          onChange={HandleInput}
          className="describ"
          type="text"
          name="description"
          value={value.description}
        />

        <button className="addtodo-btn">UPDATE</button>
      </form>
      <center>
        <button onClick={() => props.setEdit(false)} className="view">
          CANCEL
        </button>
      </center>
    </div>
  );
};
export default Edit;
