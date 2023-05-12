import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usePermission = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const getPermissions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/setting/permission/list`,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        setIsLoading(false);
        return response.data.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        await logout();
      }
      toast.error(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const addPermission = async (menu, role, type) => {
    const formData = {
      menu,
      role,
      type,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/setting/permission/add`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        setIsLoading(false);
        return response.data.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        await logout();
      }
      toast.error(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const removePermission = async (menu, role, type) => {
    const formData = {
      menu,
      role,
      type,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/setting/permission/remove`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        setIsLoading(false);
        return response.data.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        await logout();
      }
      toast.error(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { getPermissions, addPermission, removePermission, isLoading, error };
};
