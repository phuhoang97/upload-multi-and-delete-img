// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Xjnlyfe7nr3w7XruSxKYf44uaxWG2S8",
  authDomain: "upload-img-ft02.firebaseapp.com",
  projectId: "upload-img-ft02",
  storageBucket: "upload-img-ft02.appspot.com",
  messagingSenderId: "69139421570",
  appId: "1:69139421570:web:7ab2675aca9d292b13179b",
  measurementId: "G-QYHM5NT3TG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
// Nhận tham chiếu đến dịch vụ lưu trữ,
// được sử dụng để tạo tham chiếu trong bộ chứa lưu trữ của bạn
export const storage = getStorage(app);
