import React, { useState } from "react";
import { Link } from "react-router-dom";
import { actionCreateComment } from "../actions/actions";
import { connect } from "react-redux";

export const CreateComment = ({ onComm }) => {
  const [comment, setComment] = useState("");
  const [submit, setSubmit] = useState("");

  return (
    <>
      <div className="container col row-cols-1 row-cols-md-12 p-4 border bg-light">
        <h1 className="h-color">Ваш комментарий:</h1>
        <form className="col gy-2 gx-3 align-items-center">
          <div className="col-auto">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Добавьте Ваш комментарий"
            />
          </div>

          <div className="col-auto">
            <button
              onClick={(e) => setSubmit(e.target.value)}
              disabled={comment.length < 1}
              type="submit"
              className="btn btn-secondary"
            >
              <Link to={`/pageonepost`}>Отправить комментарий</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const CCreateComment = connect(
  (state) => ({ state: state.promise.actionCreateComment?.payload || [] }),
  { onComm: actionCreateComment }
)(CreateComment);
