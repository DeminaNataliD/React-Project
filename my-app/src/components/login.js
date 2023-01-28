import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullLogin } from "../graphQl/queries";
import { Link } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container">
        <h1 className="h-color">Вход на сайт</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onLogin(login, password)}
        >
          <Link to={`/pageuserspage`}>Войти</Link>
        </button>
      </div>
    </>
  );
};

export const CLogin = connect(null, { onLogin: actionFullLogin })(Login);
