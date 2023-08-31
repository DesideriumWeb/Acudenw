/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { AccesaServices } from "../../../services/accesaSevices/AccesaServices";
import { ModalRequest } from "../../../components/ModalRequest";
import {
  PORTAL_ROUTES,
  STRINGS,
  CONSTANTS,
  ENTITY_STATUS,
} from "../../../config/config";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataEmployeeMyRequestDetails,
  setDocumentRequired,
} from "../../../stateManagement/slices/employeeMyRequest";
import Paginator from "../../../components/Paginator";
import useMyRequest from "../../../hooks/MyRequest/useMyRequest";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { PulseLoader } from "react-spinners";
import SmallSpinner from "../../../components/General/SmallSpinner";
import { scrollToTop } from "../../../components/utils";
import useMyRequestDToEnmiendasAplicaction from "../../../hooks/MyRequest/useMyRequestDToEnmiendasAplicaction";
import { IconAfirmationMessage } from "../../../components/IconAfirmationMessage";

/**
 * Este view representa todas las solicitudes que un empleado ha realizado.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function MyRequests() {
  const displayPerPage = 10;
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [loadingButton, setLoadingButton] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataEmployeeAplication, setDataEmployeeAplication] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0);
  // const { totalElements, spinnerLoading } = useMyRequest(
  //   currentPaginationIndex,
  //   displayPerPage
  // );
  const { totalElements, spinnerLoading } = useMyRequestDToEnmiendasAplicaction(
    currentPaginationIndex,
    displayPerPage
  );
  const { employeeMyRequest } = useSelector((state) => state.employeeMyRequest);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * Toast ref req.
   */
  let toastRef;

  /**
   * Funcion que permite ver el detalle de cada solicitud de beca
   */
  async function handleSeeRequest(item) {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [item.id]: true,
    }));

    try {
      setTimeout(() => {
        getAccesaRequestEmployeeAplicationById(item?.id)
          .then((value) => {
            if (value) {
              dispatch(setDataEmployeeMyRequestDetails(value));
              getAccesaRequestEmployeeAplicationDocuments(item?.id)
                .then((value) => {
                  if (value) {
                    dispatch(setDocumentRequired(value));
                    navigate(`${PORTAL_ROUTES.DETAILTS_REQUEST}/${item?.id}`);
                  } else {
                    setSeverity("warn");
                    setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
                    setVisibleToast(true);
                  }
                })
                .catch(() => {
                  setSeverity("warn");
                  setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
                  setVisibleToast(true);
                })
                .finally(setLoadingButton(false));
            } else {
              setSeverity("warn");
              setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
              setVisibleToast(true);
            }
          })
          .catch(() => {
            setSeverity("warn");
            setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
            setVisibleToast(true);
          })
          .finally(setLoadingButton(false));
      }, 2000);
    } catch (error) {
      console.log(
        `Handle see my request (ACCESA). RequestId: ${item?.id} error: ${error}`
      );

      setSeverity("warn");
      setToastMsg(STRINGS.CONTACT_ADMIN);
      setVisibleToast(true);

      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [item.id]: false,
      }));
    }
  }

  /**
   *Funcion que permite consumir el endpoint para consultar una  solicitud de beca por medio del id
   *
   */
  async function getAccesaRequestEmployeeAplicationById(id) {
    const { data } =
      await new AccesaServices().getAccesaRequestEmployeeAplicationById(id);
    return data;
  }
  /**
   *Funcion que permite consumir el endpoint para consultar los documentos de la solicitud de beca por medio del id
   *
   */
  async function getAccesaRequestEmployeeAplicationDocuments(id) {
    const { data } =
      await new AccesaServices().getAccesaRequestEmployeeAplicationDocumentsById(
        id
      );

    return data;
  }
  /**
   * Funcion que permmite cambio de estado de la variable setCurrentStoredPaginationIndex proveniente del componente paginator
   * @param {*} newIndex
   */
  const handleChildStoreChange = (newIndex) => {
    setCurrentPaginationIndex(newIndex);
  };
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

  /**
   *Efecto que permite supervisar la navegacion
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  /**
   *Efecto que permite supervisar la data de las solicitudes
   *
   */
  useEffect(() => {
    setDataEmployeeAplication(employeeMyRequest);
  }, [employeeMyRequest]);

  return (
    <>
      {spinnerLoading ? (
        <>
          <div className="flex flex-col h-login-screen w-full items-center justify-center">
            <PulseLoader
              color={CONSTANTS.LOADING_SPINNER_COLOR}
              size={CONSTANTS.DEFAULT_PULSAR_SIZE}
              className="m-5 p-5"
            />
          </div>
        </>
      ) : (
        <>
          <Link to={PORTAL_ROUTES.LANDING_ACCESA}>
            <div className=" flex flex-row justify-start items-center px-5 sm:px-10 lg:px-32 pt-10">
              <ArrowLeftIcon className="acu-blue w-6 mt-1" />
              <h4 className="exit-text ml-1">
                | {STRINGS.BUTTON_VOLVER_ACCESA}
              </h4>
            </div>
          </Link>
          <div className="px-5 sm:px-10 lg:px-32 py-10 text-lg font-semibold">
            {STRINGS.MY_REQUEST}
          </div>
          <div className="flex-col  gap-3 w-full pl-2 pr-8 md:px-10 lg:px-32 py-10 bg-[#EEF2F6]">
            {dataEmployeeAplication?.length > 0 ? (
              <div className="hidden  md:flex xl:flex justify-between gap-3  w-full px-6 ml-3">
                <div className="w-full md:w-3/6">{STRINGS.NUMBER_REQUEST}</div>
                <div className="w-full md:w-3/6">{STRINGS.DATE_REQUEST}</div>
                <div className="w-full md:w-3/6">{STRINGS.STATE_REQUEST}</div>
                <div className="w-full md:w-3/6"></div>
                <div className="w-full md:w-3/6"></div>
              </div>
            ) : (
              <div className="text-center">
                {STRINGS.THERE_ARE_NO_PENDING_REQUESTS}
              </div>
            )}

            {dataEmployeeAplication?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between md:justify-items-center md:content-center md:items-center
                gap-3 w-full px-6 py-4 border border-gray-200 rounded-2xl shadow hover:bg-gray-100 bg-gray-50 m-3"
              >
                <div className="w-full flex flex-col md:w-3/6 uppercase font-medium">
                  <small className="md:hidden text-[10px] font-normal lowercase">
                    {STRINGS.NUMBER_REQUEST}
                  </small>
                  {STRINGS.MASK_NUMBER_REQUEST}
                  {item?.id || STRINGS.DEFAULT_ON_EMPTY}
                </div>
                <div className="w-full flex flex-col md:w-3/6 uppercase font-medium">
                  <small className="md:hidden text-[10px] font-normal lowercase">
                    {STRINGS.DATE_REQUEST}
                  </small>
                  {item?.createdOn || STRINGS.DEFAULT_ON_EMPTY}
                </div>
                <div className="w-full flex flex-col md:w-3/6  font-medium">
                  <small className="md:hidden text-[10px] font-normal lowercase">
                    {STRINGS.STATE_REQUEST}
                  </small>
                  {item?.applicationStatus === ENTITY_STATUS.PENDING
                    ? "Pendiente"
                    : item?.applicationStatus === ENTITY_STATUS.DENIED
                    ? "Denegada"
                    : item?.applicationStatus === ENTITY_STATUS.SUBMITTED
                    ? "Enviada"
                    : item?.applicationStatus === ENTITY_STATUS.APPROVED
                    ? "Aprobada"
                    : ""}
                </div>
                <div className="w-3/6 z-50">
                  {item && item.amendmentData && item.amendmentData.length ? (
                    <>
                      <div className="cursor-pointer z-40"     onClick={() => setShowModal(true)}>
                        <IconAfirmationMessage />
                      </div>
                      <ModalRequest
                        item={item}
                        amendmentData={item?.amendmentData}
                        showModal={showModal}
                        setShowModal={setShowModal}
                      />
                    </>
                  ) : null}
                </div>
                <div className="w-full md:w-3/6 flex flex-row md:justify-end items-center">
                  <button
                    id={item.id}
                    className="form-btn-outline-sm w-full md:w-32 md:h-12 hover:bg-[#A7D02A] hover:text-[#092C4C]"
                    onClick={() => handleSeeRequest(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{ marginLeft: loadingStates[item.id] ? "8px" : 0 }}
                    >
                      {STRINGS.BUTTON_SEE_REQUEST_T}
                    </span>
                    {loadingStates[item.id] && <SmallSpinner loading={true} />}
                  </button>
                </div>
              </div>
            ))}

            <section className="my-20 ml-8 sm:ml-0">
              <Paginator
                currentPaginationIndex={currentPaginationIndex}
                setCurrentPaginationIndex={handleChildStoreChange}
                total={totalElements}
                displayPerPage={displayPerPage}
                loading={spinnerLoading}
              />
            </section>
          </div>

          <Toast
            ref={(ref) => (toastRef = ref)}
            onHide={() => {
              toastRef.clear();
              setVisibleToast(false);
            }}
          />
        </>
      )}
    </>
  );
}

export default ProtectedComponent(MyRequests);
