import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useSale } from "../../hooks/sale/useSale";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useUser } from "../../hooks/user/useUser";
import SaleIgHeader from "../../components/saleIg/SaleIgHeader";
import SaleIgActionMenu from "../../components/saleIg/SaleIgActionMenu";
import SaleIgProjectTagHistory from "../../components/saleIg/SaleIgProjectTagHistory";
import SaleIgProjectTagNotes from "../../components/saleIg/SaleIgProjectTagNotes";
import SaleIgProjectTagCustomer from "../../components/saleIg/SaleIgProjectTagCustomer";
import SaleIgProjectTagProcess from "../../components/saleIg/SaleIgProjectTagProcess";
import SaleIgProjectTagDocuments from "../../components/saleIg/SaleIgProjectTagDocuments";

import {
  Text,
  Tabs,
  Group,
  rem,
  Radio,
  Accordion,
  Modal,
  useMantineTheme,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

export default function SaleIG() {
  const param = useParams();
  const {
    getSaleIG,
    addNewNoteSaleIG,
    updateSaleDetailIG,
    uploadFileIG,
    deleteFileIG,
    getFileIG,
    changeAssignee,
    isLoading,
  } = useSale();
  const [openedNewNote, { open: openNewNote, close: closeNewNote }] =
    useDisclosure(false);
  const [openedAssignee, { open: openNewAssignee, close: closeNewAssignee }] =
    useDisclosure(false);

  const theme = useMantineTheme();
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getUserListByOffice } = useUser();
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState();
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const [saleId, setSaleId] = useState("");
  const [detailId, setDetailId] = useState("");
  const [isEducationTaken, setIsEducationTaken] = useState(false);
  const [educationTakenDate, setEducationTakenDate] = useState(null);
  const [isWorkplaceOpen, setIsWorkplaceOpen] = useState(false);
  const [workplaceOpenDate, setWorkplaceOpenDate] = useState(null);
  const [isPartnered, setIsPartnered] = useState(false);
  const [hasTraderRecord, setHasTraderRecord] = useState(false);
  const [hasPttRecord, setHasPttRecord] = useState(false);
  const [declarationSent, setDeclarationSent] = useState(false);
  const [declarationApproved, setDeclarationApproved] = useState(false);
  const [kosgebFormFiled, setKosgebFormFiled] = useState(false);
  const [machineInfoFilled, setMachineInfoFilled] = useState(false);
  const [projectFileReady, setProjectFileReady] = useState(false);
  const [notes, setNotes] = useState([]);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");

  const [customerInfo, setCustomerInfo] = useState({});
  const [saleInfo, setSaleInfo] = useState({});
  const [newNote, setNewNote] = useState("");

  // file uplad actions
  const [mustFiles, setMustFiles] = useState([]);
  const [notMustFiles, setNotMustFiles] = useState([]);

  // project status tab
  const [isProjectUploaded, setIsProjectUploaded] = useState(false);
  const [kosgebStatus, setKosgebStatus] = useState("");
  const [submittedDate, setSubmittedDate] = useState(null);
  const [revisionDate, setRevisionDate] = useState(null);
  const [revisionReason, setRevisionReason] = useState("");
  const [denyDate, setDenyDate] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [denyCounter, setDenyCounter] = useState(0);

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (param.id) {
      regionListGet();
      getSaleInfo();
      setSaleId(param.id);
    }
  }, [param.id, saleId]);

  useEffect(() => {
    if (region) {
      async function officeListGet() {
        const officeList = await getOfficesByRegion(region);
        if (officeList.length > 0) {
          setOffices(officeList);
          setOffice(officeList[0].name);
        } else {
          setOffices([]);
          setOffice("");
          setUsers([]);
          setUser({});
        }
      }
      officeListGet();
    }
  }, [region]);

  useEffect(() => {
    if (office) {
      async function userListGet() {
        const userList = await getUserListByOffice(office);
        if (userList) {
          setUsers(userList);
          setUser(userList[0]);
        } else {
          setUsers([]);
          setUser({});
        }
      }
      userListGet();
    }
  }, [office]);

  async function regionListGet() {
    const regionList = await getRegions();
    setRegions(regionList);
    setRegion(regionList[0].name);
  }

  async function getSaleInfo() {
    const response = await getSaleIG(param.id);
    setDetailId(response.detailInfo._id);
    setIsEducationTaken(response.detailInfo.isEducationTaken);
    setEducationTakenDate(
      response.detailInfo.educationTakenDate === null
        ? null
        : new Date(response.detailInfo.educationTakenDate)
    );
    setIsWorkplaceOpen(response.detailInfo.isWorkplaceOpen);
    setWorkplaceOpenDate(
      response.detailInfo.workplaceOpenDate === null
        ? null
        : new Date(response.detailInfo.workplaceOpenDate)
    );
    setIsPartnered(response.detailInfo.isPartnered);
    setHasTraderRecord(response.detailInfo.hasTraderRecord);
    setHasPttRecord(response.detailInfo.hasPttRecord);
    setDeclarationSent(response.detailInfo.declarationSent);
    setDeclarationApproved(response.detailInfo.declarationApproved);

    // 2. tab info
    setKosgebFormFiled(response.detailInfo.kosgebFormFiled);
    setMachineInfoFilled(response.detailInfo.machineInfoFilled);
    setProjectFileReady(response.detailInfo.projectFileReady);

    // 3. tab info
    setDocuments(response.detailInfo.documents);

    // 4. tab info
    setIsProjectUploaded(response.detailInfo.isProjectUploaded);
    setKosgebStatus(response.detailInfo.kosgebStatus);
    setSubmittedDate(
      response.detailInfo.submittedDate === null
        ? null
        : new Date(response.detailInfo.submittedDate)
    );
    setRevisionDate(
      response.detailInfo.revisionDate === null
        ? null
        : new Date(response.detailInfo.revisionDate)
    );
    setRevisionReason(response.detailInfo.revisionReason);
    setDenyDate(
      response.detailInfo.denyDate === null
        ? null
        : new Date(response.detailInfo.denyDate)
    );
    setDenyReason(response.detailInfo.denyReason);
    setDenyCounter(response.detailInfo.denyCounter);

    setStatus(response.status);
    setNotes(response.notes);
    setHistory(response.history);

    setCustomerInfo(response.customerInfo);
    setSaleInfo(response);
  }

  function checkStatus() {
    let val = status;
    if (
      !declarationApproved ||
      !declarationSent ||
      !hasPttRecord ||
      !hasTraderRecord
    ) {
      val = "Eksik bilgi/belge var";
    }
    if (!isWorkplaceOpen) {
      val = "İş yeri açılışı bekleniyor";
    }
    if (!isEducationTaken) {
      val = "Eğitim tamamlanacak";
    }
    if (
      isEducationTaken &&
      isWorkplaceOpen &&
      hasTraderRecord &&
      hasPttRecord &&
      declarationSent &&
      declarationApproved
    ) {
      val = "Proje Yazılacak";
    }
    if (kosgebFormFiled && machineInfoFilled && projectFileReady) {
      val = "Proje Kontrol Bekliyor";
    }
    if (isProjectUploaded) {
      val = "Proje Durumu Takip Ediliyor";
    }
    if (kosgebStatus == "Kurula sevk edildi") {
      val = "Kurula sevk edildi";
    }
    if (kosgebStatus == "Revize isteniyor") {
      val = "Revize isteniyor";
    }
    if (kosgebStatus == "Ret") {
      val = "Ret";
    }
    return val;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEducationTaken && educationTakenDate === null) {
      return toast.warning("Eğitim tarihini giriniz");
    }
    if (isWorkplaceOpen && workplaceOpenDate === null) {
      return toast.warning("İş yeri açılış tarihini giriniz");
    }
    if (
      isEducationTaken &&
      educationTakenDate !== null &&
      isWorkplaceOpen &&
      workplaceOpenDate !== null &&
      workplaceOpenDate <= educationTakenDate
    ) {
      return toast.warning(
        "İş yeri açılış tarihi, eğitim tarihinden önce olduğu için İleri Girişimcilik Projesine başvurulamaz."
      );
    }
    if (isPartnered) {
      return toast.warning(
        "Son üç yıl içinde açık işletmeniz bulunduğu için İleri Girişimcilik Projesine başvurulamaz."
      );
    }
    if (kosgebStatus == "Kurula sevk edildi" && submittedDate == null) {
      return toast.warning("Kurul tarih ve saatini giriniz.");
    }
    if (kosgebStatus == "Revize isteniyor" && revisionDate == null) {
      return toast.warning("Son revize tarihini giriniz.");
    }
    const newStatus = checkStatus();
    if (denyCounter < 2) {
      let tmpDenyCounter = denyCounter;
      if (kosgebStatus == "Ret") {
        tmpDenyCounter = denyCounter + 1;
      }
      await updateSaleDetailIG(
        saleId,
        detailId,
        isEducationTaken,
        isEducationTaken ? educationTakenDate : null,
        isWorkplaceOpen,
        isWorkplaceOpen ? workplaceOpenDate : null,
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
        kosgebStatus == "Kurula sevk edildi" ? submittedDate : null,
        kosgebStatus == "Revize isteniyor" ? revisionDate : null,
        kosgebStatus == "Revize isteniyor" ? revisionReason : "",
        kosgebStatus == "Ret" ? denyDate : null,
        kosgebStatus == "Ret" ? denyReason : "",
        kosgebStatus == "Ret" ? tmpDenyCounter : denyCounter,
        newStatus
      );
      //setSaleId(0);
      getSaleInfo();
    } else {
      return toast.error(
        "Proje iki kez reddedildiği için süreç sonlandırılacaktır."
      );
    }
  };

  const addNewNote = async () => {
    let result = isEmptyOrSpaces(newNote);
    if (!result) {
      await addNewNoteSaleIG(param.id, newNote);
      getSaleInfo();
    } else {
      // do nothing...
    }
  };

  const changeAssigneePerson = async () => {
    const response = await changeAssignee(param.id, user._id);
    if (response) {
      getSaleInfo();
    }
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleAssigneeChange = (e) => {
    setUser(users[e.target.value]);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMustFiles([]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = mustFiles;
    if (documents.length < 5) {
      if (documents.length + files.length > 5) {
        let errormsg = `${documents.length} adet dosya zaten yüklü, ${
          5 - files.length
        } tane daha yüklenebilir.`;
        toast.warning(errormsg);
      } else {
        const res = await uploadFileIG(detailId, files);
        if (res) {
          setMustFiles([]);
          getSaleInfo();
        }
        // for (const file of files) {
        //   const tmpURL = URL.createObjectURL(file);
        // }
      }
    } else {
      toast.warning("Proje için 5 adet dosya zaten yüklediniz.");
    }
  };

  const handleFileGet = async (docId, docKey) => {
    const file = await getFileIG(detailId, docId, docKey);
    if (file) {
      window.open(file, "_blank");
    }
  };

  const handleFileDelete = async (docId, docKey) => {
    await deleteFileIG(detailId, docId, docKey);
    getSaleInfo();
  };

  const handleMustFileDrop = (files) => {
    if (files.length > 0) {
      for (const file of files) {
        setMustFiles((oldItems) => [...oldItems, file]);
      }
    }
  };

  const handleNotMustFileDrop = async (files) => {
    setNotMustFiles(files);
  };

  const checkActiveTab = () => {
    let result = "first";
    switch (status) {
      case "Yeni":
      case "Eğitim tamamlanacak":
      case "İş yeri açılışı bekleniyor":
      case "Eksik bilgi/belge var":
        result = "first";
        break;

      case "Proje Yazılacak":
        result = "second";
        break;

      case "Proje Yüklenecek":
        result = "forth";
        break;
      case "Proje Durumu Takip Ediliyor":
        result = "forth";
        break;
      case "Kurula sevk edildi":
        result = "forth";
        break;
      case "Revize isteniyor":
        result = "forth";
        break;
      case "Ret":
        result = "forth";
        break;

      default:
        break;
    }
    return result;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-between">
        <SaleIgHeader
          projectCode={saleInfo.projectCode}
          status={saleInfo.status}
        />
        <div className="m-1">
          <SaleIgActionMenu
            openNewNote={openNewNote}
            setNewNote={setNewNote}
            openNewAssignee={openNewAssignee}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {/* Tabs */}
        <div className="col-span-1 grid gap-3 md:col-span-3">
          <form onSubmit={handleSubmit} disabled>
            <Tabs color="blue" defaultValue={checkActiveTab()}>
              <Tabs.List className=" flex">
                <Tabs.Tab value="first">Bilgi Kontrol</Tabs.Tab>
                <Tabs.Tab value="second">Proje Kontrol</Tabs.Tab>
                <Tabs.Tab value="third">Belge Kontrol</Tabs.Tab>
                <Tabs.Tab value="forth">Proje Durumu</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="first" pt="xs">
                <div
                  className={`rounded-md border border-gray-200 ${
                    status == "Eğitim tamamlanacak" ||
                    status == "Yeni" ||
                    status == "İş yeri açılışı bekleniyor" ||
                    status == "Eksik bilgi/belge var"
                      ? ""
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <div className="m-2">
                    <div className="flex items-center justify-start">
                      <div className="pb-2 pl-1 pt-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={isEducationTaken}
                          onChange={() =>
                            setIsEducationTaken(!isEducationTaken)
                          }
                        />
                        <label>İleri Girişimcilik Eğitimi alındı mı?</label>
                      </div>
                      <DatePickerInput
                        className={`${
                          isEducationTaken ? "block" : "hidden"
                        } ml-2`}
                        clearable
                        valueFormat="DD.MM.YYYY"
                        placeholder="Eğitim tarihi"
                        value={educationTakenDate}
                        onChange={setEducationTakenDate}
                        mx="auto"
                        maw={190}
                        miw={190}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="flex items-center justify-between">
                      <div className="pb-2 pl-1 pt-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={isWorkplaceOpen}
                          onChange={(e) => setIsWorkplaceOpen(!isWorkplaceOpen)}
                        />
                        <label>İş yeri açık mı?</label>
                      </div>
                      <DatePickerInput
                        className={`${
                          isWorkplaceOpen ? "block" : "hidden"
                        } ml-2`}
                        clearable
                        valueFormat="DD.MM.YYYY"
                        placeholder="İş yeri açılış tarihi"
                        value={workplaceOpenDate}
                        onChange={setWorkplaceOpenDate}
                        mx="auto"
                        maw={190}
                        miw={190}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="p-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={isPartnered}
                          onChange={(e) => setIsPartnered(!isPartnered)}
                        />
                        <label>
                          Son 3 yıl içerisinde bir şahıs işletmesi veya %30'dan
                          fazla ortak olduğu bir işletme var mı?
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="p-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={hasTraderRecord}
                          onChange={(e) => setHasTraderRecord(!hasTraderRecord)}
                        />
                        <label>Esnaf odası kaydı var mı?</label>
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="p-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={hasPttRecord}
                          onChange={(e) => setHasPttRecord(!hasPttRecord)}
                        />
                        <label>PTT UETS kaydı var mı?</label>
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="p-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={declarationSent}
                          onChange={(e) => setDeclarationSent(!declarationSent)}
                        />
                        <label>
                          İşletme beyannamesi KOSGEB'e gönderildi mi?
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="p-1">
                        <input
                          type="checkbox"
                          className="mr-4 h-4 w-4"
                          checked={declarationApproved}
                          onChange={(e) =>
                            setDeclarationApproved(!declarationApproved)
                          }
                        />
                        <label>
                          İşletme beyannamesi KOSGEB tarafından onaylandı mı?
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="second" pt="xs">
                <div
                  className={`rounded-md border border-gray-200 ${
                    status == "Proje Yazılacak"
                      ? ""
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <div className="m-2">
                    <div className="pb-2 pl-1 pt-1">
                      <input
                        type="checkbox"
                        className="mr-4 h-4 w-4"
                        checked={kosgebFormFiled}
                        onChange={() => setKosgebFormFiled(!kosgebFormFiled)}
                      />
                      <label>
                        Proje girişimci bilgileri, KOSGEB sisteminde dolduruldu
                        mu?
                      </label>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="pb-2 pl-1 pt-1">
                      <input
                        type="checkbox"
                        className="mr-4 h-4 w-4"
                        checked={machineInfoFilled}
                        onChange={() =>
                          setMachineInfoFilled(!machineInfoFilled)
                        }
                      />
                      <label>
                        Proje makine talepleri KOSGEB sistemine girildi mi?
                      </label>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="pb-2 pl-1 pt-1">
                      <input
                        type="checkbox"
                        className="mr-4 h-4 w-4"
                        checked={projectFileReady}
                        onChange={() => setProjectFileReady(!projectFileReady)}
                      />
                      <label>Proje dosyası hazır mı?</label>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel
                value="third"
                pt="xs"
                className={`mt-2 rounded-md border border-gray-200 ${
                  isProjectUploaded ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <div className="flex gap-3">
                  <Dropzone
                    maxFiles={5}
                    className="mb-2 ml-2 w-2/3"
                    disabled={isProjectUploaded || documents.length == 5}
                    accept={[
                      MIME_TYPES.pdf,
                      MIME_TYPES.jpeg,
                      MIME_TYPES.png,
                      MIME_TYPES.doc,
                      MIME_TYPES.docx,
                    ]}
                    onDrop={(files) => handleMustFileDrop(files)}
                    onReject={(files) =>
                      toast.warning("5 adet dosya yüklenebilir.")
                    }
                    maxSize={3 * 1024 ** 2}
                  >
                    <Group
                      position="center"
                      spacing="xl"
                      style={{ minHeight: rem(220), pointerEvents: "none" }}
                    >
                      <div>
                        <Text size="xl">
                          Vergi levhasını, nüfus kayıt örneğini, işletme
                          fotoğraflarını (en az 5 adet) yükleyiniz.
                        </Text>
                        <Text size="sm" color="red" inline mt={7}>
                          Bu belgelerin yüklenmesi zorunludur.
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Maksimum dosya boyutu 5mb dır.
                        </Text>
                        <Text
                          size="sm"
                          color="dimmed"
                          inline
                          mt={7}
                          className="mb-3"
                        >
                          Desteklenen dosya türleri: pdf, jpg, jpeg, png, doc,
                          docx
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                  <div className="grid">
                    <div>
                      <p className="mb-3 text-gray-600 underline">
                        Yüklenecek Dosyalar
                      </p>
                      {mustFiles.map((file, index) => {
                        return (
                          <div className="flex items-center" key={index}>
                            <p className="break-words">{file.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mb-2 mr-3 flex gap-2 self-end">
                      <button
                        disabled={mustFiles.length > 0 ? false : true}
                        onClick={handleClear}
                        className="flex items-center justify-center rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Temizle
                      </button>
                      <button
                        disabled={mustFiles.length > 0 ? false : true}
                        onClick={handleUpload}
                        className="flex items-center justify-center rounded-md bg-green-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          />
                        </svg>
                        Yükle
                      </button>
                    </div>
                  </div>

                  {/* <Dropzone
                    className="w-1/2 disabled:opacity-25"
                    disabled={status == "Proje Kontrol Bekliyor" ? false : true}
                    accept={[
                      MIME_TYPES.pdf,
                      MIME_TYPES.jpeg,
                      MIME_TYPES.png,
                      MIME_TYPES.doc,
                      MIME_TYPES.docx,
                    ]}
                    onDrop={(files) => handleNotMustFileDrop(files)}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={3 * 1024 ** 2}
                  >
                    <Group
                      position="center"
                      spacing="xl"
                      style={{ minHeight: rem(220), pointerEvents: "none" }}
                    >
                      <div>
                        <Text size="xl" inline>
                          Esnaf veya ticaret sicil gazetesi, diploma, iş yeri
                          ruhsatı vb. yükleyiniz
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Bu belgelerin yüklenmesi isteğe bağlıdır.
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Maksimum dosya boyutu 5mb dır.
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Desteklenen dosya türleri: pdf, jpeg, png, doc, docx
                        </Text>
                      </div>
                    </Group>
                  </Dropzone> */}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="forth" pt="xs">
                <div
                  className={`rounded-md border border-gray-200 ${
                    status == "Proje Yüklenecek" ||
                    status == "Proje Durumu Takip Ediliyor" ||
                    status == "Kurula sevk edildi" ||
                    status == "Revize isteniyor" ||
                    status == "Ret"
                      ? ""
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <div className="m-2">
                    <div className="pb-2 pl-1 pt-1">
                      <input
                        disabled={status == "Proje Yüklenecek" ? false : true}
                        type="checkbox"
                        className="mr-4 h-4 w-4"
                        checked={isProjectUploaded}
                        onChange={() =>
                          setIsProjectUploaded(!isProjectUploaded)
                        }
                      />
                      <label>Proje dosyası KOSGEB'e yüklendi mi?</label>
                    </div>
                    <div
                      className={`flex ${
                        status == "Proje Durumu Takip Ediliyor" ||
                        status == "Kurula sevk edildi" ||
                        status == "Revize isteniyor" ||
                        status == "Ret"
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <Radio.Group
                        value={kosgebStatus}
                        onChange={setKosgebStatus}
                        name="projectStatuses"
                        label="Proje Durumları"
                        description="Projenin KOSGEB'deki durumunu seçiniz"
                        withAsterisk
                      >
                        <Radio
                          value="Kurula sevk edildi"
                          label="Kurula sevk edildi"
                          className="mb-2 mt-2"
                        />
                        <Radio value="Ret" label="Ret" className="mb-1 mt-1" />
                        <Radio
                          value="Revize isteniyor"
                          label="Revize isteniyor"
                          className="mb-1 mt-2"
                        />
                      </Radio.Group>
                      <div className="w-1/7 ml-10">
                        {/* Submitted */}
                        <div
                          className={`${
                            kosgebStatus == "Kurula sevk edildi"
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <DateTimePicker
                            label="Kurul tarihi:"
                            className=" mt-5"
                            placeholder="Kurula sevk tarihi"
                            maw={170}
                            miw={170}
                            mx="auto"
                            value={submittedDate}
                            onChange={setSubmittedDate}
                            clearable
                            minDate={new Date()}
                            valueFormat="DD.MM.YYYY HH:mm"
                          />
                        </div>
                        {/* Revision Request */}
                        <div
                          className={`flex gap-2 ${
                            kosgebStatus == "Revize isteniyor"
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <DatePickerInput
                            label="Son revize tarihi:"
                            className="mt-[65px]"
                            placeholder="Son revize tarihi"
                            maw={170}
                            miw={170}
                            mx="auto"
                            value={revisionDate}
                            onChange={setRevisionDate}
                            clearable
                            minDate={new Date()}
                            valueFormat="DD.MM.YYYY"
                          />
                          <div className="mt-[65px]">
                            <label className="text-[14px] font-semibold">
                              Revize sebebi:
                            </label>
                            <textarea
                              type="text"
                              value={revisionReason}
                              minLength={10}
                              onChange={(e) =>
                                setRevisionReason(e.target.value)
                              }
                              className="w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500"
                            />
                          </div>
                        </div>
                        {/* Deny */}
                        <div
                          className={`flex gap-2 ${
                            kosgebStatus == "Ret" ? "block" : "hidden"
                          }`}
                        >
                          <DatePickerInput
                            label="Son itiraz tarihi:"
                            className="mt-[65px]"
                            placeholder="Son itiraz tarihi"
                            maw={170}
                            miw={170}
                            mx="auto"
                            value={denyDate}
                            onChange={setDenyDate}
                            clearable
                            minDate={new Date()}
                            valueFormat="DD.MM.YYYY"
                          />
                          <div className="mt-[65px]">
                            <label className="text-[14px] font-semibold">
                              Ret sebebi:
                            </label>
                            <textarea
                              type="text"
                              value={denyReason}
                              minLength={10}
                              onChange={(e) => setDenyReason(e.target.value)}
                              className="w-full rounded-md border-0 px-3.5 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs>
            {/* Action buttons */}
            <div className="mt-2 flex items-center justify-end gap-3">
              <Link className="" to="/sale/list">
                <span className="flex w-full items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-1 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                  Geri Dön
                </span>
              </Link>
              <button
                type="submit"
                className="flex items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                Kaydet
              </button>
            </div>
          </form>
        </div>
        {/* History & Notes & Documents & Customer Info & Process Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="rounded-md border border-gray-200 pb-4">
            <div className="mb-4 bg-gray-200 p-2">Proje Geçmişi</div>
            <div className="ml-2 max-h-[490px] overflow-y-auto">
              <Accordion defaultValue="history">
                <SaleIgProjectTagHistory history={history} />
                <SaleIgProjectTagNotes notes={notes} />
                <SaleIgProjectTagDocuments
                  documents={documents}
                  handleFileDelete={handleFileDelete}
                  handleFileGet={handleFileGet}
                />
                <SaleIgProjectTagCustomer
                  firstName={customerInfo.firstName}
                  lastName={customerInfo.lastName}
                  companyName={customerInfo.companyName}
                  identityNo={customerInfo.identityNo}
                  email={customerInfo.email}
                  mobileNumber={customerInfo.mobileNumber}
                  comment={customerInfo.comment}
                />
                <SaleIgProjectTagProcess
                  assignedName={saleInfo.assignedName}
                  assignedSurname={saleInfo.assignedSurname}
                  assignedOffice={saleInfo.assignedOffice}
                  registrantName={saleInfo.registrantName}
                  registrantSurname={saleInfo.registrantSurname}
                  registrantOffice={saleInfo.registrantOffice}
                  createdAt={saleInfo.createdAt}
                />
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      {/* New note modal */}
      <Modal
        centered
        opened={openedNewNote}
        onClose={closeNewNote}
        title="Yeni Not Ekle"
        // overlayProps={{
        //   color:
        //     theme.colorScheme === "dark"
        //       ? theme.colors.dark[9]
        //       : theme.colors.gray[2],
        //   opacity: 0.55,
        //   blur: 3,
        // }}
      >
        {/* Modal content */}
        <Textarea
          data-autofocus
          placeholder="Notunuz..."
          withAsterisk
          value={newNote}
          required
          minLength={2}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Group mt="xl" className="justify-end">
          <button
            className="flex items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            onClick={closeNewNote}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            İptal
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={() => {
              addNewNote();
              closeNewNote();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
              />
            </svg>
            Kaydet
          </button>
        </Group>
      </Modal>
      {/* New assignee modal */}
      <Modal
        centered
        opened={openedAssignee}
        onClose={closeNewAssignee}
        title="Atananı Çalışanı Değiştir"
      >
        {/* Modal content */}
        <div className="relative flex-auto p-2">
          <div className="m-2">
            <label className="text-sm font-semibold leading-6 text-gray-900">
              Bölge
            </label>
            <div className="mt-1">
              <select
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
              >
                {regions.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="m-2">
            <label className="text-sm font-semibold leading-6 text-gray-900">
              Ofis
            </label>
            <div className="mt-1">
              <select
                required
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
              >
                {offices?.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="m-2">
            <label className="text-sm font-semibold leading-6 text-gray-900">
              Çalışanlar
            </label>
            <div className="mt-1">
              <select
                required
                onChange={(e) => {
                  handleAssigneeChange(e);
                }}
                // onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
              >
                {users?.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.firstName} {item.lastName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <Group mt="xl" className="justify-end">
          <button
            className="flex items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            onClick={closeNewAssignee}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            İptal
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={() => {
              changeAssigneePerson();
              closeNewAssignee();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
              />
            </svg>
            Kaydet
          </button>
        </Group>
      </Modal>
    </>
  );
}
