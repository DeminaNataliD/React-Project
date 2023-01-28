import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fullActionFollowing } from "../graphQl/queries";
import avatarka from "../img/Avatar_.jpg";
import { backendURL } from "../backendurl";

const F = ({ item }) => {
  let { _id, nick, avatar } = item;

  return (
    <>
      <div className="container col row-cols-1 row-cols-md-12 p-4 border bg-light">
        <div className="card">
          {avatar?.url === null || avatar?.url === undefined ? (
            <img className="mx-auto imgfoll" src={avatarka} />
          ) : (
            <img
              className="card-img-top mx-auto"
              src={backendURL + avatar?.url}
            />
          )}
          <div className="card-body class-a">
            <Link to={`/pageuserspage/${_id}`}>{nick}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

const FollowingsItem = ({ foll = { foll } }) => {
  console.log(foll.following);
  return (
    <div className="container">
      <div>
        {foll.following &&
          foll.following.map((item) => <F key={Math.random()} item={item} />)}
      </div>
    </div>
  );
};

export const Followings = ({ folls = [], onFoll }) => {
  console.log(folls);
  const [flag, setFlag] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (flag && fetch) {
      onFoll();
      setFlag(false);
      setFetching(false);
    }
  }, [flag, fetching]);
  return (
    <div className="container">
      <h1 className="h-color">Подписки</h1>
      {folls.length <= 1 ? (
        <p className="non-info">У Вас пока ещё нет подписок</p>
      ) : (
        <div>
          {folls.map((foll) => (
            <FollowingsItem key={Math.random()} foll={foll} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CFollowings = connect(
  (state) => ({ folls: state.promise.actionFollowing?.payload || [] }),
  { onFoll: fullActionFollowing }
)(Followings);
