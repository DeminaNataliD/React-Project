import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullRegister } from "../graphQl/queries";
import { Link } from "react-router-dom";

export const Registration = ({ onReg }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  let checkIdenticalPassword = false;
  if (password !== checkPassword) {
    checkIdenticalPassword = true;
  }
  return (
    <>
      <div className="container">
        <h1 className="h-color">Регистрация</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Логин
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Повторите пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          disabled={checkIdenticalPassword}
          onClick={() => onReg(login, password)}
        >
          <Link to={`/pageuserspage`}>Зарегистрироваться</Link>
        </button>
      </div>
    </>
  );
};

export const CRegistration = connect(null, { onReg: actionFullRegister })(
  Registration
);
