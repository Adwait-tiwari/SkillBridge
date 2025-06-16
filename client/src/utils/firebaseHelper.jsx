import {doc,setDoc,getDoc}  from "firebase/firestore";
import { db } from "../firebase";

export const createUserDocument = async(user) =>{
    if(!user) return;

    const userRef = doc(db,"users",user.uid);
    const snap = await getDoc(userRef);

    if(!snap.exists()){
        const {displayName,email,photoURL} = user;
        const createdAt = new Date();

        await setDoc(userRef,{
            displayName : displayName || "Anonymous",
            email,
            photoURL,
            createdAt,
            role : "learner",
        });
    }
}