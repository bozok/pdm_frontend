import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const changePassword = async (password, newPassword, newPasswordAgain) => {
    if (newPassword !== newPasswordAgain) {
      setError("Yeni şifreleriniz aynı değil");
      return toast.error("Yeni şifreleriniz aynı değil");
    }
    if (password === newPassword) {
      setError("Yeni şifreniz mevcut şifrenizle aynı olamaz");
      return toast.error("Yeni şifreniz mevcut şifrenizle aynı olamaz");
    }
    const credentials = {
      password: password,
      newPassword: newPassword,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/authentication/changepassword`,
        credentials,
        { withCredentials: true }
      );
      if (response.statusText === "OK") {
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

  return { changePassword, isLoading, error };
};
