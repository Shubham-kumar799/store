import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCqCuWZ9oj4YkqRrLyf5SciffGbr5zvbRg',
  authDomain: 'store-63fbd.firebaseapp.com',
  projectId: 'store-63fbd',
  storageBucket: 'store-63fbd.appspot.com',
  messagingSenderId: '952664661704',
  appId: '1:952664661704:web:29537302ee6808af0a0ffd',
  measurementId: 'G-P4T27RG3FY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
