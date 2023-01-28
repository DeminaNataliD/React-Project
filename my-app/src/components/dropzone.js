import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { fullActionUploadFiles } from "../graphQl/queries";
import { actionUploadFiles } from "../graphQl/queries";

function MyDropzone({ onUpload }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles) {
      onUpload(acceptedFiles);
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="container">
      <div id="form" {...getRootProps({ className: "dropzone disabled" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export const CMyDropzone = connect(null, { onUpload: fullActionUploadFiles })(
  MyDropzone
);
