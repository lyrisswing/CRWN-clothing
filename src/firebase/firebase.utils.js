import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCbAtCC5T3-cEJQ88v8CtPmMh26yW4uH8o",
    authDomain: "crwn-db-e43b5.firebaseapp.com",
    databaseURL: "https://crwn-db-e43b5.firebaseio.com",
    projectId: "crwn-db-e43b5",
    storageBucket: "crwn-db-e43b5.appspot.com",
    messagingSenderId: "872071211278",
    appId: "1:872071211278:web:a50ae10980a762f54f4f5f",
    measurementId: "G-PEJNXKYC3J"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.timeLog("error creating user", error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
