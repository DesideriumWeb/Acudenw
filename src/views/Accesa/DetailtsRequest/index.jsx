/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import {
  PORTAL_ROUTES,
  STRINGS,
  TITLE_QUESTION_ACCESA,
} from "../../../config/config";
import { TabPanel, TabView } from "primereact/tabview";
import { IconAfirmationMessage } from "../../../components/IconAfirmationMessage";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import { FaDownload } from "react-icons/fa";
import useFormatDate from "../../../hooks/Date/useFormatDate";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { AccesaServices } from "../../../services/accesaSevices/AccesaServices";
import { Toast } from "primereact/toast";
import { scrollToTop } from "../../../components/utils";
/**
 *DetailtsRequest
 * View que permite ver el detalle de cada solisitud de beca del empleado
 *
 */
function DetailtsRequest() {
  //state
  const [tabIndex, setTabIndex] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);

  const navigate = useNavigate();
  const { employeeMyRequestDetails: employeeMyRequest, documentRequired } =
    useSelector((state) => state.employeeMyRequest);
  /**
   * Toast ref req.
   */
  let toastRef;

  /**
   *Hooks que permite dar formato a una fecha dd/mm/yyyy
   *
   */
  const formattedDateStartWorkingDate = useFormatDate(
    employeeMyRequest?.startWorkingDate
  );
  const formattedDateAcademicStartDate = useFormatDate(
    employeeMyRequest?.academicStartDate
  );
  const formattedDateAcademicEndDate = useFormatDate(
    employeeMyRequest?.academicEndDate
  );

  /**
   *Funcion que permite descargar los documentos requeridos
   *
   */
  async function handleDownloadDocument(index) {
    const { data } = await new AccesaServices().getDownloadDocumentFile(
      index.id
    );
    if (data) {
      const url = URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = index.documentName + ".pdf";
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } else {
      setSeverity("warn");
      setSummary("Certificación");
      setToastMsg("No se ha encontrado el archivo.");
      setVisibleToast(true);
    }
  }

  /**
   *Funcion que permite supervisar la navegacion
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  /**
   *Funcion que permite guardar la informacion de un empleado de un estado global al estado local
   *
   */
  useEffect(() => {
    if (employeeMyRequest) {
      const newObject = {
        id: "",
        name: employeeMyRequest?.name ?? "",
        lastname: employeeMyRequest?.lastname ?? "",
        socialSecurity: employeeMyRequest?.socialSecurity ?? "",
        phoneNumber: employeeMyRequest?.phoneNumber ?? "",
        email: employeeMyRequest?.email ?? "",
        postalAddress: employeeMyRequest?.postalAddress ?? "",
        physicalAddress: employeeMyRequest?.physicalAddress ?? "",
        city: employeeMyRequest?.city ?? "",
        zipCode: employeeMyRequest?.zipCode ?? "",
        gender: employeeMyRequest?.gender ?? "",
        occupation: employeeMyRequest?.occupation ?? "",
        hasCDA: employeeMyRequest?.hasCDA ?? "",
        workingWithProvider: employeeMyRequest?.workingWithProvider ?? "",
        providerName: employeeMyRequest?.providerName ?? "",
        providerCity: employeeMyRequest?.providerCity ?? "",
        providerCategory: employeeMyRequest?.providerCategory ?? "",
        providerEntitytype: employeeMyRequest?.providerEntitytype ?? "",
        licensedHomeCareStatus: employeeMyRequest?.licensedHomeCareStatus ?? "",
        startWorkingDate: employeeMyRequest?.startWorkingDate ?? "",
        workedHours: employeeMyRequest?.workedHours ?? "",
        educationalInstituteName:
          employeeMyRequest?.educationalInstituteName ?? "",
        academicGrade: employeeMyRequest?.academicGrade ?? "",
        courseName: employeeMyRequest?.courseName ?? "",
        academicPeriod: employeeMyRequest?.academicPeriod ?? "",
        academicStartDate: employeeMyRequest?.academicStartDate ?? "",
        academicEndDate: employeeMyRequest?.academicEndDate ?? "",
        academicPeriodCost: employeeMyRequest?.academicPeriodCost ?? "",
        hasEconomicAid: employeeMyRequest?.hasEconomicAid ?? "",
        hasStudentLoan: employeeMyRequest?.hasStudentLoan ?? "",
      };
      const arrayRes = Object.values(newObject);
      const newArray = [];
      for (let i = 0; i < arrayRes.length; i++) {
        if (i > 0 && i < 30) {
          const pregunta = TITLE_QUESTION_ACCESA[i - 1];
          const preguntaKey = Object.values(pregunta)[0];
          const respuestaValue = arrayRes[i];
          const newObj = { [preguntaKey]: respuestaValue };
          newArray.push(newObj);
        }
      }
      const firstArray = newArray.slice(0, 12);
      const secondArray = newArray.slice(12, 20);
      const thirdArray = newArray.slice(20);

      setEmployeeData(firstArray);
      setSupplierData(secondArray);
      setAcademicData(thirdArray);
    }
  }, [employeeMyRequest]);
  useEffect(() => {
    if (employeeMyRequest) {
    }
  }, []);
  /**
   * useEffect to display the Toast component when `visibleToast` changes.
   */
  useEffect(() => {
    if (visibleToast) {
      toastRef.show({
        severity: severity,
        detail: toastMsg,
        summary: summary,
      });
    }
  }, [visibleToast]);
  return (
    <>
      <Link to={PORTAL_ROUTES.MY_REQUEST}>
        <div className=" flex flex-row justify-start items-center px-5 sm:px-10 lg:px-32 pt-10">
          <ArrowLeftIcon className="acu-blue w-6 mt-1" />
          <h4 className="exit-text ml-1">
            | {STRINGS.BUTTON_BACK_ACCESA_REQUEST}
          </h4>
        </div>
      </Link>
      <div className="w-full flex flex-row gap-2 px-5 sm:px-10 lg:px-32 py-10 text-lg font-semibold">
        <h1 className="text-xl font-semibold">
          {STRINGS.MASK_NUMBER_REQUEST_DETAILS}
          {STRINGS.MASK_NUMBER_REQUEST} {employeeMyRequest.id}
        </h1>
        <div>
          {employeeMyRequest?.applicationStatus === "PENDING" ? (
            <IconAfirmationMessage />
          ) : null}
        </div>
        <div className="text-xs mt-2">
          Enmienda{" "}
          {employeeData.applicationStatus === "PENDING"
            ? "Pendiente"
            : employeeData?.applicationStatus === "DENIED"
            ? "Denegada"
            : employeeData?.applicationStatus === "SUBMITTED"
            ? "Enviada"
            : employeeData?.applicationStatus === "APPROVED"
            ? "Aprobada"
            : ""}
        </div>
      </div>
      <div className="bg-white  px-5 sm:px-10 lg:px-32  rounded-lg">
        <TabView
          className="responsive-tab-view"
          activeIndex={tabIndex}
          onTabChange={(e) => setTabIndex(e.index)}
        >
          <TabPanel header="Datos del Solicitante">
            <div className=" flex flex-col  w-full items-center justify-center mt-8 mb-8 ">
              <div className="flex flex-col items-center w-full max-w-xs gap-3">
                <form className="w-full flex flex-col gap-3" autoComplete="off">
                  <div
                    className=" font-semibold  text-2xl text-black p-2 rounded-lg text-center mb-10"
                    role="alert"
                  >
                    {STRINGS.TITLE_DATA_MY_REQUEST_EMPLOYEE}
                  </div>
                  {employeeData.map((employeeDat, j) => (
                    <div key={j} className="flex flex-col w-full mb-3">
                      <label className="text-xs mb-1">
                        {Object.keys(employeeDat)[0]}
                      </label>
                      <input
                        className="form-input"
                        value={
                          employeeDat[Object.keys(employeeDat)[0]] === true
                            ? "Si"
                            : employeeDat[Object.keys(employeeDat)[0]] === false
                            ? "No"
                            : employeeDat[Object.keys(employeeDat)[0]]
                        }
                        disabled
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Datos del Proveedor">
            <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
              <div className="flex flex-col items-center w-full max-w-xs gap-3">
                <div
                  className=" text-black font-bold	text-2xl p-2 rounded-lg text-center mb-10"
                  role="alert"
                >
                  {STRINGS.TITLE_DATA_My_REQUEST_SUPPLIER}
                </div>
                <form className="w-full flex flex-col gap-3" autoComplete="off">
                  {supplierData.map((supplierDat, j) => (
                    <div key={j} className="flex flex-col w-full mb-3">
                      <label className="text-xs mb-1">
                        {Object.keys(supplierDat)[0]}
                      </label>
                      <input
                        className="form-input"
                        value={
                          supplierDat[Object.keys(supplierDat)[0]] === true
                            ? "Si"
                            : supplierDat[Object.keys(supplierDat)[0]] === false
                            ? "No"
                            : supplierDat[Object.keys(supplierDat)[0]]
                        }
                        disabled
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Datos Académicos y de Estudio">
            <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
              <div className="flex flex-col items-center w-full max-w-xs gap-3">
                <div
                  className=" text-black font-bold	text-2xl p-2 rounded-lg text-center mb-10"
                  role="alert"
                >
                  {STRINGS.TITLE_DATA_My_REQUEST_ACADEMIC}
                </div>
                <form className="w-full flex flex-col gap-3" autoComplete="off">
                  {academicData.map((academicDat, j) => (
                    <div key={j} className="flex flex-col w-full mb-3">
                      <label className="text-xs mb-1">
                        {Object.keys(academicDat)[0]}
                      </label>
                      <input
                        className="form-input"
                        value={
                          academicDat[Object.keys(academicDat)[0]] === true
                            ? "Si"
                            : academicDat[Object.keys(academicDat)[0]] === false
                            ? "No"
                            : j === 4
                            ? formattedDateAcademicStartDate
                            : j === 5
                            ? formattedDateAcademicEndDate
                            : academicDat[Object.keys(academicDat)[0]]
                        }
                        disabled
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Documentos requeridos">
            <div className=" flex flex-col  w-full items-center justify-center mt-8 mb-8 ">
              <div className="flex flex-col items-center w-full max-w-xs gap-3">
                <div
                  className="text-black font-bold  text-2xl  p-2 rounded-lg text-center mb-10"
                  role="alert"
                >
                  {STRINGS.TITLE_DATA_My_REQUEST_DOCUMENTS_REQUIRED}
                </div>
                {documentRequired?.map((item, key) => (
                  <div key={key} className="flex flex-col w-full mb-3">
                    <label className="text-xs mb-1"></label>
                    <div className="w-full flex justify-center ">
                      <div className="w-full">
                        <div className=" flex flex-row max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 justify-between items-center">
                          <div>
                            <DocumentCheckIcon className="w-9  text-[#002F56] text-center" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold">
                              {item?.documentName || ""}
                            </p>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => handleDownloadDocument(item)}
                          >
                            <FaDownload fontSize={20} color="#002F56" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
      <Toast
        ref={(ref) => (toastRef = ref)}
        onHide={() => {
          toastRef.clear();
          setVisibleToast(false);
        }}
      />
    </>
  );
}
export default ProtectedComponent(DetailtsRequest);
