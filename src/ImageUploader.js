import React, { useState } from "react";
import storage from "./chatPage"

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUploadButtonClick = () => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child("images");
    const imageRef = imagesRef.child(file.name);

    imageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        onUpload(downloadURL);
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      <button onClick={handleUploadButtonClick}>Upload</button>
    </div>
  );
}

export default ImageUploader;