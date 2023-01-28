import React, { useState, useEffect } from "react";
import { actionFullCreatePost } from "../graphQl/queries";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CMyDropzone } from "./dropzone";
import { actionUploadFiles } from "../graphQl/queries";

export const CreatePost = ({ onCreatePost, onUpload, upload = [] }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState(upload);
  console.log(upload);
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="drag-border">
            <CMyDropzone />
          </div>
          <div className="card-body">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Ваш описание поста"
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <button
              href="#"
              className="btn btn-secondary wordsBlack"
              onClick={() => onCreatePost(text, images)}
            >
              <Link to={`/pageuserspage`}>Добавить пост</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const CCreatePost = connect(
  (state) => ({ upload: state?.promise?.uploadFile?.payload }),
  {
    onCreatePost: actionFullCreatePost,
    onUpload: actionUploadFiles,
  }
)(CreatePost);
