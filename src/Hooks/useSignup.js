import { projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";

import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const signup = async(email, password, displayName) => {
        setError(null);
        setIsPending(true);
        try {
            //signup
            const response = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!response) {
                throw new Error("could not complete signup");
            }
            //add a display name to user
            await response.user.updateProfile({ displayName });

            //dispatch login action

            dispatch({ type: "LOGIN", payload: response.user });

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { error, isPending, signup };
};