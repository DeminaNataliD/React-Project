import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatarka from "../img/Avatar_.jpg";
import { CButtonLogOut } from "../components/buttonLogOut";
import { backendURL } from "../backendurl";

export const UsersPage = ({ user, fullUser }) => {
  return (
    <>
      <div className="container col row-cols-12 row-cols-md-8 p-6 border bg-light">
        <div className="badge d-grid gap-2 d-md-block">
          {fullUser?.avatar?.url === null ||
          fullUser?.avatar?.url === undefined ? (
            <img className="mx-auto imgfoll" src={avatarka} />
          ) : (
            <img
              className="card-img-top mx-auto"
              src={backendURL + fullUser?.avatar?.url}
            />
          )}
        </div>

        <div className="badge bg-secondary">
          <p>Логин пользователя: {user?.login || "Пользователь без логина"}</p>
          {fullUser?.nick ? (
            <p>Ник пользователя: {fullUser?.nick}</p>
          ) : (
            <p> </p>
          )}
          <p>Айди пользователя: {user?.id || "Пользователь без айди"}</p>
        </div>

        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-secondary" type="button">
            <Link to={`/pagesettings`}>Настройки пользователя</Link>
          </button>
        </div>

        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-secondary" type="button">
            <Link to={`/pagecreatepost`}>Добавить пост</Link>
          </button>
        </div>

        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-secondary" type="button">
            <Link to={`/pageallposts/`}>Посты</Link>
          </button>
          <button className="btn btn-secondary" type="button">
            <Link to={`/pagefollowers`}>Подписчики</Link>
          </button>
          <button className="btn btn-secondary" type="button">
            <Link to={`/pagefollowings`}>Подписки</Link>
          </button>
        </div>
      </div>
      <CButtonLogOut />
    </>
  );
};

export const CUsersPage = connect((state) => ({
  user: state?.auth?.payload?.sub || [],
  fullUser: state?.promise?.actionInfoAboutUser?.payload || [],
}))(UsersPage);
