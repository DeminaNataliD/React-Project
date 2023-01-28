import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import image from "../img/image.jpg";
import { fullActionAllPosts } from "../graphQl/queries";
import { backendURL } from "../backendurl";
import { actionAllPosts } from "../graphQl/queries";

const OneImage = ({ post = {}, images = [] }) => {
  return (
    <>
      <div className="container row">
        <div className="row">
          <Link to={`/pageonepost/${post?._id}`}>
            {images?.url === undefined || images?.url === null ? (
              <img className="mx-auto imageforpost" src={image} />
            ) : (
              <img
                className="card-img-top mx-auto"
                src={`${backendURL}${images?.url}`}
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

const AllPosts = ({ posts = [], onPost }) => {
  console.log(posts);

  const [flag, setFlag] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (flag && fetch) {
      onPost();
      setFlag(false);
      setFetching(false);
    }
  }, [flag, fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    setFetching(true);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [posts]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      setFlag(true);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="h-color">Ваши посты:</h1>
        {posts.length <= 1 ? (
          <div>
            <p className="non-info">У Вас пока ещё нет постов</p>
            <div className="d-grid gap-2 d-md-block">
              <button className="btn btn-secondary" type="button">
                <Link to={`/pagecreatepost`}>Добавить пост</Link>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <div
                key={Math.random()}
                className="container col row-cols-12 row-cols-md-8 p-6 border bg-light"
              >
                <div>
                  <OneImage post={post} images={post?.images} />
                  {post?.payload?.text ? (
                    <p>Текст поста: {post?.payload?.text}</p>
                  ) : (
                    <p> Пост без описания </p>
                  )}
                  <p>Логин: {post?.owner?.login}</p>
                  <p>ID поста: {post?._id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const CAllPosts = connect(
  (state) => ({ posts: state?.promise?.actionAllPosts?.payload || [] }),
  { onPost: fullActionAllPosts }
)(AllPosts);
