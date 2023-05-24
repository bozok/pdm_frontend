import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const resetPassword = async (newPassword1, newPassword2, resetToken) => {
    if (!newPassword1 || !newPassword2) {
      return toast.error("Yeni şifrenizi belirlemediniz.");
    }
    if (newPassword1 != newPassword2) {
      setError("Yeni şifreleriniz aynı değil");
      return toast.error("Yeni şifreleriniz aynı değil");
    }
    const credentials = {
      password: newPassword1,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/authentication/resetpassword/${resetToken}`,
        credentials
      );
      if (response.status === 200) {
        setError(null);
        toast.success(response.data.message);
        setIsLoading(false);
        return response.data.data;
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, error };
};
