import React from "react";
import { connect } from "react-redux";
import { actionOnePost } from "../actions/actions";
import { Link } from "react-router-dom";
import image from "../img/image.jpg";
import { backendURL } from "../backendurl";
import { fullActionOnePost } from "../graphQl/queries";

const OneImage = ({ images = [] }) => {
  return (
    <>
      <div className="container row">
        <p className="row">
          {images?.url === undefined ? (
            <img className="mx-auto imageforpost" src={image} />
          ) : (
            <img
              className="card-img-top mx-auto"
              src={backendURL + images?.[0]?.url}
            />
          )}
        </p>
      </div>
    </>
  );
};

const OnePost = ({ onepost = {} }) => {
  console.log(onepost);
  let { text, images = [] } = onepost;
  return (
    <>
      <div className="container">
        <div>
          {images.map((img) => (
            <OneImage key={Math.random()} img={img} />
          ))}
        </div>
        <div className="container col row-cols-12 row-cols-md-8 p-6 border">
          <p>{text}</p>
        </div>

        <button href="#" className="btn btn-secondary">
          <Link to={`/pagecreatecomment`}>Оставить комментарий </Link>
        </button>
        <button href="#" className="btn btn-secondary">
          <Link to={`/pagecomments`}>Прочитать комментарии </Link>
        </button>
      </div>
    </>
  );
};

export const COnePost = connect(
  (state) => ({ onepost: state.promise.actionOnePost?.payload || [] }),
  { onPost: fullActionOnePost }
)(OnePost);
