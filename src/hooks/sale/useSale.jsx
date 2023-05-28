import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSale = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { logout } = useLogout();

  const newSale = async (
    saleTypeId,
    saleTypeName,
    customer,
    total,
    currencyType,
    note,
    user
  ) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      saleTypeId: saleTypeId,
      saleTypeName: saleTypeName,
      customerId: customer._id,
      customerName: customer.firstName + " " + customer.lastName,
      price: total,
      currency: currencyType,
      note: note,
      assignedId: user._id,
    };
    saveSale(formData, "new", 0);
    if (error !== null) {
      return false;
    } else {
      return true;
    }
  };

  const getSaleIG = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/sale/IG/${id}`, {
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

  const getSales = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/sale/list`, {
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

  const updateSale = async (
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

  const changeSaleStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/sale/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Satış durumu güncellendi");
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

  async function saveSale(data, type, id) {
    if (type === "new") {
      // new sale
      try {
        const response = await axios.post(`${BACKEND_URL}/api/sale/new`, data, {
          withCredentials: true,
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setIsLoading(false);
          navigate(`/sale/list`);
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
      // update sale
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/sale/${id}`,
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

  const addNewNoteSaleIG = async (id, note) => {
    setIsLoading(true);
    setError(null);
    const data = {
      note: note,
    };
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/sale/IG/note/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Yeni proje notu eklendi.");
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

  const updateSaleDetailIG = async (
    saleId,
    detailId,
    isEducationTaken,
    educationTakenDate,
    isWorkplaceOpen,
    workplaceOpenDate,
    isPartnered,
    hasTraderRecord,
    hasPttRecord,
    declarationSent,
    declarationApproved,
    kosgebFormFiled,
    machineInfoFilled,
    projectFileReady,
    isProjectUploaded,
    kosgebStatus,
    submittedDate,
    revisionDate,
    revisionReason,
    denyDate,
    denyReason,
    denyCounter,
    status
  ) => {
    const formData = {
      detailId,
      isEducationTaken,
      educationTakenDate,
      isWorkplaceOpen,
      workplaceOpenDate,
      isPartnered,
      hasTraderRecord,
      hasPttRecord,
      declarationSent,
      declarationApproved,
      kosgebFormFiled,
      machineInfoFilled,
      projectFileReady,
      isProjectUploaded,
      kosgebStatus,
      submittedDate,
      revisionDate,
      revisionReason,
      denyDate,
      denyReason,
      denyCounter,
      status,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/sale/IG/${saleId}`,
        formData,
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
  };

  const uploadFileIG = async (id, document) => {
    setIsLoading(true);
    setError(null);
    const data = new FormData();
    data.append("detailId", id);
    for (let i = 0; i < document.length; i++) {
      data.append("document", document[i]);
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/sale/IG/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response.data.message);
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

  const deleteFileIG = async (detailId, docId, docKey) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      docId: docId,
      docKey: docKey,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/sale/IG/documentDelete/${detailId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response.data.message);
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

  const getFileIG = async (detailId, docId, docKey) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      docId: docId,
      docKey: docKey,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/sale/IG/documentGet/${detailId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response.data.message);
        return response.data.fileUrl;
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

  const changeAssignee = async (saleId, newAssignee) => {
    setIsLoading(true);
    setError(null);
    const formData = {
      newAssigneeId: newAssignee,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/sale/IG/assigneeChange/${saleId}`,
        formData,
        {
          withCredentials: true,
        }
      );
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

  const approveSale = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/sale/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Satış durumu güncellendi");
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
    newSale,
    getSales,
    getSaleIG,
    updateSale,
    changeSaleStatus,
    addNewNoteSaleIG,
    updateSaleDetailIG,
    uploadFileIG,
    deleteFileIG,
    getFileIG,
    changeAssignee,
    approveSale,
    isLoading,
    error,
  };
};
