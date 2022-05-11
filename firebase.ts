// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAX2j1e3BV_C-3jv2ERbDdWycfflM_uo6U',
  authDomain: 'nextjs-netflix-e6e9f.firebaseapp.com',
  projectId: 'nextjs-netflix-e6e9f',
  storageBucket: 'nextjs-netflix-e6e9f.appspot.com',
  messagingSenderId: '1010503982572',
  appId: '1:1010503982572:web:9bcdeb962fd7ae3a3474c9',
  measurementId: 'G-5BL09QRKV2',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }
