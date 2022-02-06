import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign user out

    try {
      await projectAuth.signOut();
      //dispatch logout action
      dispatch({ type: "LOGOUT" });
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

  return { logout, error, isPending };
};
