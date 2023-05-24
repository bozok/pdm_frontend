import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const forgotPassword = async (email) => {
    if (!email) {
      setError("E-posta adresinizi yazmadınız");
      return toast.error("E-posta adresinizi yazmadınız");
    }
    const credentials = {
      email: email,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/authentication/forgotpassword`,
        credentials
      );
      if (response.status === 200) {
        setError(null);
        toast.success(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading, error };
};
