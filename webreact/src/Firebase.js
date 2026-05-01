import { initializeApp }  from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChYdPMSBPWhTLCirh2sU1mgwfjd2KusWU",
  authDomain: "webreact-525c9.firebaseapp.com",
  projectId: "webreact-525c9",
  storageBucket: "webreact-525c9.firebasestorage.app",
  messagingSenderId: "529860031477",
  appId: "1:529860031477:web:41170eee88754a538a66bc"
};

const Firebase = initializeApp(firebaseConfig);

// exportando o 'app'
export default Firebase;