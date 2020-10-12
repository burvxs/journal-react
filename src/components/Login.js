import React, {useState, useEffect} from 'react';
import {LOGIN_AUTH_URL, EMAIL_TEST_LOGIN, PASSWORD_TEST_LOGIN} from '../constants'
import axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState(EMAIL_TEST_LOGIN);
    const [password, setPassword] = useState(PASSWORD_TEST_LOGIN);
    const [isError404, setIsError404] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            auth : {
                email : email,
                password : password
            }
        }
        console.log(password);
        axios.post(LOGIN_AUTH_URL, request)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("jwt", res.data.jwt)
            console.log(props.history.location);
            props.history.push("/D2D", {
              params : localStorage.getItem("jwt")
            });
        })
        .catch(err => {
            setIsError404(true)
            console.warn(err);
        });

        console.log(localStorage.getItem('jwt'));
    }
    
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            value={email}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
          <button>Login</button>
        </form>
      </div>
    );
}

export default Login;
