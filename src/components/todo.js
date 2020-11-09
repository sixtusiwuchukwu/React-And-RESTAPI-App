import React, { useState, useEffect, Fragment } from "react";

import Edit from "./edit";
import "../styles/todo.css";
const Axios = require("axios");

const Todo = (props) => {
  const { history } = props;
  const [user, setUser] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({});
  const [currentedit, setCurrentedit] = useState("");

  const deletetodo = async (id) => {
    let token = await JSON.parse(localStorage.getItem("current-user-token"));
    Axios.delete(`http://localhost:2080/todo/deletepost/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const removeAll = async () => {
    let token = await JSON.parse(localStorage.getItem("current-user-token"));
    Axios.delete(`http://localhost:2080/todo/deletetodo`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const Edit = async (id) => {
    setEdit(true);
    const edit_ = todo[id];
    await setValue(edit_);

    setCurrentedit(edit_._id);
  };

  useEffect(() => {
    async function getdetails() {
      const details = JSON.parse(localStorage.getItem("current-user"));
      setUser(details);
    }
    async function Gettodo() {
      let token = await JSON.parse(localStorage.getItem("current-user-token"));
      Axios.get(`http://localhost:2080/todo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((result) => {
          setTodo(result.data);
        })
        .catch((err) => console.log(err));
    }
    getdetails();
    Gettodo();
  }, []);

  return (
    <Fragment>
      {edit ? (
        <div>
          <Edit
            value={value}
            setEdit={setEdit}
            currentedit={currentedit}
            history={history}
            todo={todo}
          />
        </div>
      ) : (
        <div>
          <button onClick={() => props.history.push("/addtodo")}>
            go back
          </button>
          <button onClick={() => removeAll()}>clear Todos</button>
          {todo ? (
            todo.map((item, index) => (
              <div key={index} className="todo">
                <button onClick={() => deletetodo(item._id)}>x</button>
                <h1>{item.title}</h1>
                <h1>{item.description}</h1>
                <button onClick={() => Edit(index)}>Edit</button>
              </div>
            ))
          ) : (
            <h1>you have not added a todo yet</h1>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Todo;
