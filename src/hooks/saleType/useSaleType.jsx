import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSaleType = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newSaleType = async (name) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      name: name,
    };
    saveSaleType(formData, "new", 0);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const updateSaleType = async (id, name) => {
    const formData = {
      name: name,
    };
    setIsLoading(true);
    setError(null);
    saveSaleType(formData, "update", id);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  async function saveSaleType(data, type, id) {
    if (type === "new") {
      // new sale type
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/saletype/new`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          toast.success("Yeni satış türü kaydı başarılı");
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          await logout();
        }
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      // update sale type
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/saletype/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success("Satış türü bilgileri güncellendi");
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          await logout();
        }
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        setIsLoading(false);
      }
    }
  }

  const getSaleType = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/saletype/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
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

  const getSaleTypes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/saletype/list`, {
        withCredentials: true,
      });
      if (response.status === 200) {
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

  const changeSaleTypeStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/saletype/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Satış türü durumu güncellendi");
        return true;
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

  return {
    newSaleType,
    updateSaleType,
    getSaleType,
    getSaleTypes,
    changeSaleTypeStatus,
    isLoading,
    error,
  };
};
