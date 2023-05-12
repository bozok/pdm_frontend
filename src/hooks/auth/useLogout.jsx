import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/authentication/logout`, {
        withCredentials: true,
      });
      // remove user from storage
      localStorage.removeItem("user");
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return { logout };
};
