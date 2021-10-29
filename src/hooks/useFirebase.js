import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebaseApp from "../Firebase/firebase.init";
import axios from 'axios';

initializeFirebaseApp();

const googleProvider = new GoogleAuthProvider();

const auth = getAuth();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOutController = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('tour-x-user')
            setUser({})
        }).catch((error) => {
            setError(error)
        });
    }


    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('tour-x-user'));
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (localUser?._id) {
                    const userInfo = {
                        _id: localUser._id,
                        email: user.email,
                        displayName: user.displayName
                    }
                    setUser(userInfo);
                } else {
                    setUser(user);
                }

                setLoading(false);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [])

    return {
        user,
        error,
        loading,
        googleSignIn,
        logOutController,
        setLoading,
        setError,
        setUser
    }
}

export default useFirebase;