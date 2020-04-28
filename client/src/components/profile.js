import React, { useState, useEffect } from "react";
import avarter from "../images/avater.png";
import "../styles/profile.css";
const Axios = require("axios");

const Profile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");

  const value = e => {
    e.preventDefault();
    alert("uploaded...");
  };

  const Upload = e => {
    e.preventDefault();
    Axios.put(`http://localhost:2001/update-post`, {
      averter: image
    })
      .then(() => {
        alert("update sucessful");
        console.log(image);
      })
      .catch(err => console.log(err));
  };

  const Handlechange = file => {
    let input = file.target;
    let reader = new FileReader();
    reader.onload = function() {
      let dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const Getdetails = () => {
    let hol = JSON.parse(localStorage.getItem("current-user"));
    setUser(hol.existing_user);
  };

  useEffect(() => {
    Getdetails();
  }, []);

  return (
    <center>
      <div>
        <form encType="multipart/form-data" onSubmit={value}>
          <label>
            <div className="hold">
              {image == "" ? (
                <img src={avarter} className="image-value" />
              ) : (
                <img src={image} className="image-value" />
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
          {image == "" ? (
            ""
          ) : (
            <button onClick={Upload} className="upload">
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
