// import initializeFirebase from "../Login/Login/Firebase/firebase.init";
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile,  signOut } from "firebase/auth";


// const baseUrl=require("./../constant/baseUrl.json").baseUrl;

// // initialize firebase app
// initializeFirebase();

const useDatabase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
 

    // const auth = getAuth();
   

    const registerUser = (email, password, name, history) => {
        // setIsLoading(true);
        console.log(email,password)
        setUser({
            "setUser":"lami"
        });
        return true;
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         setAuthError('');
        //         const newUser = { email, displayName: name };
        //         setUser(newUser);
        //         // save user to the database
        //         saveUser(email, name, 'POST');
        //         // send name to firebase after creation
        //         updateProfile(auth.currentUser, {
        //             displayName: name
        //         }).then(() => {
        //         }).catch((error) => {
        //         });
        //         history.replace('/');
        //     })
        //     .catch((error) => {
        //         setAuthError(error.message);
        //         console.log(error);
        //     })
        //     .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);

        const userData = 
        axios.post('http://localhost:4000/api/v1/user/login', userData)
        .then(response => {
            setUser(userData);
            const destination = location?.state?.from || '/';
            history.replace(destination);
            setAuthError('');
        })
        .catch(error => {
            setAuthError(error.message);
            console.error('There was an error!', error);
        })
        .finally(() => setIsLoading(false));

    }


    // // observer user state
    // useEffect(() => {
    //     const unsubscribed = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser({})
    //         }
    //         setIsLoading(false);
    //     });
    //     return () => unsubscribed;
    // }, [])

    // useEffect(() => {
    //     fetch(baseUrl+`/users/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data.admin))
    // }, [user.email])

    // const logout = () => {
    //     setIsLoading(true);
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //     }).catch((error) => {
    //         // An error happened.
    //     })
    //         .finally(() => setIsLoading(false));
    // }

    // const saveUser = (email, displayName, method) => {
    //     const user = { email, displayName };
    //     fetch(baseUrl+'/users', {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then()
    // }

    return {
        //  user,
        // admin,
        //   isLoading : isLoading,
        //  authError,
        // registerUser : registerUser,
        //  loginUser,
        // logout,
    }
}

export default useDatabase;