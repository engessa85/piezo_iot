
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtIuiWHkttrBSUlHkbNc17287vm9HvEC8",
  authDomain: "iotproject-5822b.firebaseapp.com",
  databaseURL: "https://iotproject-5822b-default-rtdb.firebaseio.com",
  projectId: "iotproject-5822b",
  storageBucket: "iotproject-5822b.firebasestorage.app",
  messagingSenderId: "68079034019",
  appId: "1:68079034019:web:5af5a73521bb0007856916"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export {database}

