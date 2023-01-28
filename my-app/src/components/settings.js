import React from "react";
import { connect } from "react-redux";
import { actionOnePost } from "../graphQl/queries";

export const Settings = ({}) => {
  return (
    <>
      <div className="container">
        <p>Здесь будут настройки пользователя: добавление ника и аватарки</p>
      </div>
    </>
  );
};
