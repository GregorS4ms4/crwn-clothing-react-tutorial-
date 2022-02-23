// Import the functions you need from the SDKs you need

import 'firebase/compat/firestore'; 
import 'firebase/compat/auth'; 

import { getFirestore,doc, getDoc,setDoc } from "firebase/firestore";
import {getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRef } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY8vP1Qpbut6TecfWQg45LZAd1Uh11vFs",
  authDomain: "crwn-db-2892f.firebaseapp.com",
  projectId: "crwn-db-2892f",
  storageBucket: "crwn-db-2892f.appspot.com",
  messagingSenderId: "43819902775",
  appId: "1:43819902775:web:6a9c2784d46a169177dcb2"
};

export const createUserProfileDocument=async(userAuth,additionalData)=>{
  if (!userAuth) return;
 // console.log(userAuth)

  const docRef= doc(firestore,`users/${userAuth.uid}`);
  const docSnap = await getDoc(docRef);

  if(!docSnap.exists()){ 
    const {displayName,email}=userAuth;
    //const {displayName}=additionalData;
    console.log(additionalData)
    const createdAt =new Date();

    try{
      await setDoc(docRef,{
        
        displayName,
        email,
        createdAt,
        ...additionalData
       
      });
      
    }catch(error){
      console.log('error creating user', error.message);
    }
  }

  return docRef;
   
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>signInWithPopup(auth,provider);
//export function signUpUser(authentification,email, password)  {
  //  createUserWithEmailAndPassword(authentification, email, password)}

