import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { saveUserCookies } from '../helpers/cookies';
import { getCookie } from '../helpers/cookies';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let history = useHistory();

    useEffect(() =>{
      if(!!getCookie('accessToken')){
        history.push("/home")
      }
    }, [])
    const login = () => {
      const data = { username: username, password: password };
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //localStorage.setItem("accessToken", response.data.token);
          console.log(response.data);
          saveUserCookies(response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          history.push("/home");
        }
      });
    };


    return (
      <div className="loginContainer">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
  
        <button onClick={login}> Login </button>
      </div>
    );
  }

export default Login;
