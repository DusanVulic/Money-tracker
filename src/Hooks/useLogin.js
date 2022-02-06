import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const login = async(email, password) => {
        setError(null);
        setIsPending(true);

        //sign user out

        try {
            const response = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );
            //dispatch logout action
            dispatch({ type: "LOGIN", payload: response.user });
            //update local state

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
        } catch (error) {
            if (!isCancelled) {
                console.log(error);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { login, error, isPending };
};