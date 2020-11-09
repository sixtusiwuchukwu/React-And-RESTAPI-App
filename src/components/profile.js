import React, { useState, useEffect } from "react";
import avarter from "../images/avater.png";
import "../styles/profile.css";
const Axios = require("axios");

const Profile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");

  const Upload = async (e) => {
    e.preventDefault();
    let btn = document.querySelector(".upload");

    btn.textContent = "uploading...";
    btn.disabled = true;
    console.log(btn, " btttt");
    // btn. document
    // .setAttribute("disabled","disabled");

    let token = await JSON.parse(localStorage.getItem("current-user-token"));
    Axios.put(
      `http://localhost:2080/todo/profileimage`,
      {
        averter: image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        setImage("");
        getCurrentUser();
      })
      .catch((err) => console.log(err));
  };

  const Handlechange = (file) => {
    let input = file.target;
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const Getdetails = () => {
    let hol = JSON.parse(localStorage.getItem("current-user"));
    setUser(hol);
  };

  const getCurrentUser = async () => {
    let token = await JSON.parse(localStorage.getItem("current-user-token"));
    Axios.get(`http://localhost:2080/todo/currentuser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.setItem("current-user", JSON.stringify(res.data));
        Getdetails();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Getdetails();
  }, []);

  return (
    <center>
      <div>
        <form encType="multipart/form-data">
          <label>
            <div className="hold">
              {image === "" ? (
                <img
                  src={user.avarter ? user.avarter : avarter}
                  className="image-value"
                  alt="user averter"
                />
              ) : (
                <img src={image} className="image-value" alt="user averter" />
              )}
              <input
                type="file"
                accept="image/*"
                className="inputfile"
                name="image"
                onChange={Handlechange}
              />
            </div>
          </label>
        </form>
        <div>
          {image === "" ? (
            ""
          ) : (
            <button disabled={true} onClick={Upload} className="upload">
              upload
            </button>
          )}
        </div>
        <div>
          <h2>{user.username}</h2>
          <br />
          <label>
            FULLNAME:
            <br />
            {user.fullname}
          </label>

          <br />
          <label>
            Gmail:
            <br /> {user.email}
          </label>

          <br />
          <label>TODO:</label>
          {"10"}
          <br />
          <button className="upload">EDIT PROFILE</button>
        </div>
      </div>
    </center>
  );
};
export default Profile;
