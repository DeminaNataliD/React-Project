import React from "react";
import { connect } from "react-redux";
import { store } from "../reducers/reducers";
import { actionAuthLogout } from "../actions/actions";
import { Link } from "react-router-dom";

export const ButtonLogOut = ({ onLogOut }) => {
  return (
    <>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => store.dispatch(onLogOut)}
      >
        <Link to={`/`}>Выйти</Link>
      </button>
    </>
  );
};

export const CButtonLogOut = connect(null, { onLogOut: actionAuthLogout })(
  ButtonLogOut
);
