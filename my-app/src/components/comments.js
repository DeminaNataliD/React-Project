import React from "react";
import { connect } from "react-redux";
import { actionOnePost } from "../graphQl/queries";

const Comments = ({ onepost }) => {
  let { comments = [] } = onepost;
  return (
    <>
      <div className="container">
        {comments.map((comm) => (
          <div
            key={Math.random()}
            className="container col row-cols-12 row-cols-md-8 p-6 border bg-light"
          >
            <div>
              <p>Комментарий: {comm?.text}</p>
              <p>ID пользователя: {comm?.owner?._id}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const CComments = connect(
  (state) => ({ onepost: state.promise.actionOnePost?.payload || [] }),
  { onPost: actionOnePost }
)(Comments);
