import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useLoginStatus = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const getLoginStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/authentications/checklogin`,
        { withCredentials: true }
      );
      setIsLoading(false);
      if (response.data.status) {
        dispatch({ type: "LOGIN", payload: response.data });
      } else {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT", payload: null });
      }
      return response.data.status;
    } catch (error) {
      setError(error.response.data.message);
      //toast.error(error.response.data.message);
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT", payload: null });
      setIsLoading(false);
    }
  };

  return { getLoginStatus, isLoading };
};
