import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useCurrencyType = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newCurrencyType = async (name, shortCode, symbol) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      name: name,
      shortCode: shortCode,
      symbol: symbol,
    };
    saveCurrencyType(formData, "new", 0);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const updateCurrencyType = async (id, name, shortCode, symbol) => {
    const formData = {
      name: name,
      shortCode: shortCode,
      symbol: symbol,
    };
    setIsLoading(true);
    setError(null);
    saveCurrencyType(formData, "update", id);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  async function saveCurrencyType(data, type, id) {
    if (type === "new") {
      // new sale type
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/currency/new`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.statusText === "Created") {
          toast.success("Yeni para birimi türü kaydı başarılı");
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
          `${BACKEND_URL}/api/currency/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.statusText === "OK") {
          toast.success("Satış para birimi türü bilgileri güncellendi");
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

  const getCurrencyType = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/currency/${id}`, {
        withCredentials: true,
      });
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

  const getCurrencyTypes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/currency/list`, {
        withCredentials: true,
      });
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

  const changeCurrencyTypeStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/currency/${id}`, {
        withCredentials: true,
      });
      if (response.statusText === "OK") {
        setIsLoading(false);
        toast.success("Para birimi türü durumu güncellendi");
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
    newCurrencyType,
    updateCurrencyType,
    getCurrencyType,
    getCurrencyTypes,
    changeCurrencyTypeStatus,
    isLoading,
    error,
  };
};
