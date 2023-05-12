import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newUser = async (
    identityNo,
    firstName,
    lastName,
    email,
    region,
    office,
    mobileNumber,
    role,
    photo
  ) => {
    setIsLoading(true);
    setError(null);

    const formData = {
      identityNo: identityNo,
      firstName: firstName,
      lastName: lastName,
      email: email,
      photo: photo,
      region: region,
      office: office,
      mobileNumber: mobileNumber,
      role: role,
      password: "1234qwer",
    };
    if (photo == import.meta.env.VITE_DEFAULT_PROFILE_IMG) {
      saveUser(formData, "new", 0);
    } else {
      uploadPhotoToCloudinary(formData, "new", 0);
    }
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const getUser = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/${id}`, {
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

  const getUserList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/list`, {
        withCredentials: true,
      });
      if (response.statusText === "OK") {
        setIsLoading(false);
        //const json = await response.json();
        return response.data;
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

  const getUserListByRole = async (role) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/list/role/${role}`,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
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

  const getUserListByOffice = async (office) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/list/office/${office}`,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
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

  const updateUser = async (
    id,
    identityNo,
    firstName,
    lastName,
    region,
    office,
    mobileNumber,
    email,
    role,
    photo
  ) => {
    const formData = {
      identityNo: identityNo,
      firstName: firstName,
      lastName: lastName,
      email: email,
      region: region,
      office: office,
      mobileNumber: mobileNumber,
      role: role,
      photo: photo,
    };
    setIsLoading(true);
    setError(null);
    if (photo == import.meta.env.VITE_DEFAULT_PROFILE_IMG) {
      saveUser(formData, "update", id);
    } else {
      uploadPhotoToCloudinary(formData, "update", id);
    }
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const changeUserStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/user/${id}`, {
        withCredentials: true,
      });
      if (response.statusText === "OK") {
        setIsLoading(false);
        toast.success(response.data.message);
        return response.data.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        await logout();
      }
      toast.error(error.response.data.message);
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  async function saveUser(data, type, id) {
    if (type === "new") {
      // new user
      try {
        const response = await axios.post(`${BACKEND_URL}/api/user/new`, data, {
          withCredentials: true,
        });
        if (response.statusText === "Created") {
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
      // update user
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/user/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.statusText === "OK") {
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

  async function uploadPhotoToCloudinary(formData, type, id) {
    // upload files to claudinary and get links
    const claudinaryFile = new FormData();
    claudinaryFile.append("file", formData.photo);
    claudinaryFile.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
    claudinaryFile.append("upload_preset", import.meta.env.VITE_CLOUDINARY_API);
    claudinaryFile.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER_1);
    await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: claudinaryFile,
    })
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        else return response.json();
      })
      .then((data) => {
        formData.photo = data.secure_url;
        saveUser(formData, type, id);
      })
      .catch((error) => {
        setError("Cloud service error: " + error);
        toast.error("Cloud service error: " + error);
        setIsLoading(false);
      });
  }

  return {
    newUser,
    getUserList,
    getUser,
    updateUser,
    changeUserStatus,
    getUserListByRole,
    getUserListByOffice,
    isLoading,
    error,
  };
};
