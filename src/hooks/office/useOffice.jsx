import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useOffice = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newOffice = async (name, regionName, mobileNumber) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      name: name,
      regionName: regionName,
      mobileNumber: mobileNumber,
    };
    let responseStatus = 0;
    responseStatus = saveOffice(formData, "new", 0);
    return responseStatus;
  };

  const updateOffice = async (id, name, regionName, mobileNumber) => {
    const formData = {
      name: name,
      regionName: regionName,
      mobileNumber: mobileNumber,
    };
    setIsLoading(true);
    setError(null);
    let responseStatus = 0;
    responseStatus = saveOffice(formData, "update", id);
    return responseStatus;
  };

  async function saveOffice(data, type, id) {
    if (type === "new") {
      // new office
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/office/new`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setIsLoading(false);
        }
        return response.status;
      } catch (error) {
        if (error.response.status === 401) {
          await logout();
        }
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        setIsLoading(false);
        return 400;
      }
    } else {
      // update office
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/office/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsLoading(false);
        }
        return response.status;
      } catch (error) {
        if (error.response.status === 401) {
          await logout();
        }
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        setIsLoading(false);
        return 400;
      }
    }
  }

  const getOffice = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/office/${id}`, {
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

  const getOffices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/office/list`, {
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

  const getOfficesByRegion = async (regionName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/office/list/${regionName}`,
        {
          withCredentials: true,
        }
      );
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

  const changeOfficeStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/office/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response.data.message);
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

  return {
    newOffice,
    updateOffice,
    getOffice,
    getOffices,
    getOfficesByRegion,
    changeOfficeStatus,
    isLoading,
    error,
  };
};
