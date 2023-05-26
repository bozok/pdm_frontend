import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useCustomer = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newCustomer = async (
    identityNo,
    firstName,
    lastName,
    mobileNumber,
    email,
    taxIdNo,
    companyName,
    financialAdvisor,
    supplierMachinist,
    comment
  ) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      identityNo: identityNo,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: email,
      taxIdNo: taxIdNo,
      companyName: companyName,
      financialAdvisor: financialAdvisor,
      supplierMachinist: supplierMachinist,
      comment: comment,
    };
    saveCustomer(formData, "new", 0);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const getCustomer = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/customer/${id}`, {
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

  const getCustomerList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/customer/list`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        //const json = await response.json();
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

  const updateCustomer = async (
    id,
    identityNo,
    firstName,
    lastName,
    mobileNumber,
    email,
    taxIdNo,
    companyName,
    financialAdvisor,
    supplierMachinist,
    comment
  ) => {
    const formData = {
      identityNo: identityNo,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: email,
      taxIdNo: taxIdNo,
      companyName: companyName,
      financialAdvisor: financialAdvisor,
      supplierMachinist: supplierMachinist,
      comment: comment,
    };
    setIsLoading(true);
    setError(null);
    saveCustomer(formData, "update", id);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const changeCustomerStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/user/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Kullanıcı durumu güncellendi");
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

  async function saveCustomer(data, type, id) {
    if (type === "new") {
      // new customer
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/customer/new`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
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
      // update customer
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/customer/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
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

  return {
    newCustomer,
    getCustomerList,
    getCustomer,
    updateCustomer,
    isLoading,
    error,
  };
};
