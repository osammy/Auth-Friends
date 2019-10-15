import React, { useState } from "react";
import "./login.css";
import axios from "axios";

const initUser = {
    username:"Lambda School",
    password:"i<3Lambd4"
}

export default function Login(props) {
  const [user, setUser] = useState(initUser);

  const handleSubmit = e => {
    e.preventDefault();
    const options = {
        method:'POST',
        url:"http://localhost:5000/api/login",
        data:user
    }
    axios(options)
      .then(res => {
          console.log(res.data);
          
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/friends");
      })
      .catch(err => {
          console.log(err)
        alert("An error occurred!");
      });
  };

  const handleInput = e =>
    setUser({ ...user, ...{ [e.target.name]: e.target.value } });

  return (
    <div className="lg-container">
      <form className="lg-form" onSubmit={handleSubmit}>
        <h4 style={{ color: "#f4811f" }}>LOGIN</h4>
        <div>
          <input
            required
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleInput}
            className="lg-form-input"
          />
        </div>
        <div>
          <input
            required
            name="password"
            value={user.password}
            type="password"
            placeholder="Password"
            onChange={handleInput}
            className="lg-form-input"
          />
        </div>

        <div>
          <button type="submit" className="lg-form-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
