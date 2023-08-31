import { initializeApp } from "firebase/app";
import {
     getAuth, 
     GoogleAuthProvider,
     signInWithRedirect,
     signInWithPopup,
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDaJPHTQxg0l_BVpoENe46Coplo3xFkJ3w",
  authDomain: "crwn-clothing-db-34348.firebaseapp.com",
  projectId: "crwn-clothing-db-34348",
  storageBucket: "crwn-clothing-db-34348.appspot.com",
  messagingSenderId: "1086503605088",
  appId: "1:1086503605088:web:bf1206b23ebcd80be2c405"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    propmt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef); 

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date(); 

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};