import React, { useState, useEffect, Fragment } from "react";
import Edit from "./edit";
import "../styles/todo.css";
const Axios = require("axios");
const Todo = props => {
  const { history } = props;
  const [user, setUser] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({});
  const [currentedit, setCurrentedit] = useState();

  const getdetails = async () => {
    const details = await JSON.parse(localStorage.getItem("current-user"));
    setUser(details.existing_user);
  };

  useEffect(() => {
    getdetails();
    Gettodo();
  }, [todo]);

  const Gettodo = () => {
    fetch(`http://localhost:2001/todo/${user._id}`, {
      Headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + user.token
      }
    })
      .then(res => res.json())
      .then(result => {
        setTodo(result);
      })
      .catch(err => console.log(err));

    const deletetodo = id => {
      Axios.delete(`http://localhost:2001/delete-todo/${id}`)
        .then(res => console.log(`deleted${res}`))
        .catch(err => console.log(err));
    };

    const removeAll = () => {
      Axios.delete(`http://localhost:2001/delete-todo`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
    const Edit_ = id => {
      setEdit(true);
      const edit_ = todo[id];
      setValue(edit_);
      setCurrentedit(edit_._id);
    };

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
            {todo.map((item, index) => (
              <div key={index} className="todo">
                <button onClick={() => deletetodo(item._id)}>x</button>
                <h1>{item.title}</h1>
                <h1>{item.description}</h1>
                <button onClick={() => Edit_(index)}>Edit</button>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    );
  };
};
export default Todo;
