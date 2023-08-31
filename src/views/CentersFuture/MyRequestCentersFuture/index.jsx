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
import { ModalRequest } from "../../../components/ModalRequest";
import {STRINGS, CONSTANTS, ENTITY_STATUS, PORTAL_ROUTES} from "../../../config/config";
import {PulseLoader} from "react-spinners";
import { Toast } from "primereact/toast";
import Paginator from "../../../components/Paginator";
import useMyRequestCentersFuture from "../../../hooks/MyRequestCentersFuture/useMyRequestCentersFuture";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import {Session} from "../../../services/Session";
import {formatDateToSpanishWordsForDateTime, isObjEmpty, justifyRequestId} from "../../../components/utils";
/**
 * MyRequestCentersFuture
 *
 * Esta view representa todas las solicitudes que proveedor realizado.
 *
 */
function MyRequestCentersFuture() {

  const provider = Session.getProviderProfile()

  const displayPerPage = 10;
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0);
  const { totalElements, isLoading, spinnerLoading, myRequestItems } = useMyRequestCentersFuture(currentPaginationIndex, displayPerPage, ENTITY_STATUS.ACTIVE, provider.id);

  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);

  const navigate = useNavigate();
  /**
   * Handles the action to see a request.
   *
   * @param {object} request - The request object to be viewed.
   * @returns {void} - This function does not return any value.
   */
  const handlerSeeRequest = (request = {}) => {
    if(isObjEmpty(request)){

      setSeverity('warn')
      setSummary("Centros del Futuro")
      setToastMsg('Solicitud Inválida.')
      setVisibleToast(true)

    }else{
      navigate(PORTAL_ROUTES.CDF_HISTORY_ROUTE, {
        state:{
          request:{
            data:request,
            requestNumber:request.id
          }
        }
      })
    }
  }
  /**
   * Toast ref req.
   */
  let toastRef;
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
    {
      isLoading ?
        (<>
          <div className="flex flex-col h-login-screen w-full items-center justify-center">
            <PulseLoader
              color={CONSTANTS.LOADING_SPINNER_COLOR}
              size={CONSTANTS.DEFAULT_PULSAR_SIZE}
              className="m-5 p-5"
          />
          </div>
        </>) : 
        ( <>
          <Link to={PORTAL_ROUTES.LANDING_CENTER_FUTURE}>
            <div className="flex flex-row justify-start items-center px-5 sm:px-10 lg:px-32 pt-10">
              <ArrowLeftIcon className="acu-blue w-6" />
              <h4 className="exit-text ml-1">| {STRINGS.BUTTON_VOLVER_CDF}</h4>
            </div>
          </Link>
          <div className="px-5 sm:px-10 lg:px-32 py-10 text-lg font-semibold">
            {STRINGS.MY_REQUEST_CDF}
          </div>
          <div className="flex-col gap-3 w-full pl-2 pr-8 md:px-10 lg:px-32 py-10 bg-[#EEF2F6]">
            {myRequestItems?.length > 0 ? (
              <div className="hidden md:flex xl:flex justify-between gap-3 w-full px-6 ml-3">
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
            {myRequestItems?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between md:justify-items-center md:content-center md:items-center
                gap-3 w-full px-6 py-4 border border-gray-200 rounded-2xl shadow hover:bg-gray-100 bg-gray-50 m-3"
              >
                <div className="w-full flex flex-col md:w-1/5 font-medium">
                  <small className="md:hidden text-[10px] font-normal text-capitalize">
                    {STRINGS.NUMBER_REQUEST}
                  </small>
                  {STRINGS.MASK_NUMBER_REQUEST_CDF}
                  {justifyRequestId(item?.id)}
                </div>
                <div className="w-full flex flex-col md:w-1/5 font-medium text-capitalize">
                  <small className="md:hidden text-[10px] font-normal">
                    {STRINGS.DATE_REQUEST}
                  </small>
                  {formatDateToSpanishWordsForDateTime(item?.createdOn)}
                </div>
                <div className="w-full flex flex-col md:w-1/5  font-medium">
                  <small className="md:hidden text-[10px] font-normal text-capitalize">
                    {STRINGS.STATE_REQUEST}
                  </small>
                  {item?.status === ENTITY_STATUS.ACTIVE
                    ? "Activa"
                    : item?.status === ENTITY_STATUS.PENDING
                    ? "Pendiente"
                    : item?.status === ENTITY_STATUS.INACTIVE
                    ? "Inactiva"
                    : item?.status === ENTITY_STATUS.DELETED
                    ? "Eliminada"
                    : ""}
                </div>
                <div className="w-1/5">
                  {item?.status === "PENDING" ? (
                    <ModalRequest item={item} />
                  ) : null}
                </div>
                <div className="w-full md:w-1/5 flex flex-row md:justify-end items-center">
                  <button
                    className="form-btn-outline-sm w-full md:w-32 md:h-12 hover:bg-[#A7D02A]
                    hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                    onClick={() => handlerSeeRequest(item)}
                  >
                    {STRINGS.BUTTON_SEE_REQUEST_T}
                  </button>
                </div>
              </div>
            ))}
            <section className="my-20 ml-8 sm:ml-0">
              <Paginator
                  currentPaginationIndex={currentPaginationIndex}
                  setCurrentPaginationIndex={setCurrentPaginationIndex}
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
        </>)
    }
    </>
  );
}

export default ProtectedComponent(MyRequestCentersFuture);
