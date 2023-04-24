import "./App.css";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  getStorage,
} from "firebase/storage";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadFiles = (files) => {
    Promise.all(
      files.map((file) => {
        const imageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      })
    ).then((urls) => {
      setImageUrls((prev) => [...prev, ...urls]);
      alert("Upload thành công");
    });
  };

  const handleUpload = () => {
    if (!imageUpload || imageUpload.length === 0) return;
    uploadFiles(imageUpload);
  };

  const handleSelectFiles = (event) => {
    const files = Array.from(event.target.files);
    setImageUpload(files);
  };

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const deleteImage = (url) => {
    const storageRef = getStorage();
    const imageRef = ref(storageRef, url);
    deleteObject(imageRef).then(() => {
      setImageUrls((prev) => prev.filter((item) => item !== url));
    });
  };

  return (
    <div className='App'>
      <input type='file' onChange={handleSelectFiles} multiple />
      <button onClick={handleUpload}>Upload Images</button>
      {imageUrls.map((url) => (
        <div>
          <img key={url} src={url} alt='uploaded' />
          <button onClick={() => deleteImage(url)}>Delete Image</button>
        </div>
      ))}
    </div>
  );
}

export default App;
