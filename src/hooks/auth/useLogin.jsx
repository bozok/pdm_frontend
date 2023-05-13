import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const credentials = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/authentication/login`,
        credentials,
        { withCredentials: true }
      );
      console.log(response);
      if (response.statusText === "OK") {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Oturum açma başarılı");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
