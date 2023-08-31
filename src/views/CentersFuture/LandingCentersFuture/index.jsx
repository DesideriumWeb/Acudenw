/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect } from "react";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { useNavigate, Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { DOCUMENTS_SUPPLIER, PORTAL_ROUTES } from "../../../config/config";
import { IconBookOpen } from "../../../components/IconBookOpen";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { STRINGS } from "../../../config/config";
import CDFLogo from "../../../assets/images/logo_centros_del_futuro.svg"
import BackArrow from "../../../components/BackArrow/BackArrow";
/*
 *LandingCentersFuture
 * Esta view representa la landing principal de centros del futuro donde
 *puedes descargar los documentos de acompañamiento para una solicitud
 */
function LandingCentersFuture() {
  const navigate = useNavigate();

  /**
   *Funcion que permite descargar cada uno de los documentos de acompañamiento en centros del futuro
   * @param {index} -Recibe como parametro el indice del documento que desea descargar.
   */
  function handleDownloadDocument(index) {
    const downloadLink = document.createElement("a");
    downloadLink.href = index.url;
    downloadLink.download = `${index.name}`;
    downloadLink.click();
  }
  /**
   *Funcion que permite ir a la pagina siguiente que es el formulario de informacion basica del centro.
   */
  function handleComenzarSolicitud() {
    navigate(PORTAL_ROUTES.FORM_BASIC_INFORMATION_CENTERS_FUTURE);
  }
  /**
   *Funcion que permite ir a la pagina de mis solicitudes.
   */
  function handleVerSolicitud() {
    navigate(PORTAL_ROUTES.MY_REQUEST_CENTERS_FUTURE);
  }
  /**
   *Efecto que supervisa la navegacion.
   */
  useEffect(() => {}, [navigate]);

  return (
    <div className="w-full flex flex-col md:flex-row h-[80%] items-center ">
      <div className="w-3/4 mx-10 mb-10">
      <BackArrow/>
        <div
          className={`flex flex-col justify-center content-center items-center mt-10 mx-20 mb-10 text-[#092C4C] font-bold `}
        >
          <img src={CDFLogo} alt={`CDF Logo`}/>
        </div>
        <div className="w-full text-center mb-7 ml-2">
          <h1 className="text-center text-2xl font-bold">
            {STRINGS.CENTER_FUTURE_TITLE_LANDING}
          </h1>
          <p
            className="w-full mt-7 text-left"
            dangerouslySetInnerHTML={{
              __html: STRINGS.CENTER_FUTURE_ACCREDITATION,
            }}
          />
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex md:flex-row flex-col gap-6 md:w-[55%] xl:w-[40%] w-full">
            <button
              className="form-btn-outline"
              type="button"
              onClick={handleVerSolicitud}
            >
              {STRINGS.BUTTON_SEE_REQUEST}
            </button>
            <button
              className="form-btn"
              type="button"
              onClick={handleComenzarSolicitud}
            >
              {STRINGS.BUTTON_START_REQUEST}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#EEF5F6] text-[#092C4C] font-medium rounded-lg text-sm h-[650px] m-7">
        <div className="m-6">
          <p>{STRINGS.CENTER_FUTURE_TITLE_DOCUMENT}</p>
        </div>
        <div className="flex flex-col mt-10 mx-6 gap-4">
          {DOCUMENTS_SUPPLIER?.map((index, key) => (
            <div
              key={key}
              className="flex flex-row justify-between content-center justify-items-center items-center font-medium rounded-lg text-sm  bg-[#FFFF] h-28 gap-2 md:h-20"
            >
              <div className="flex flex-row justify-center content-center justify-items-center items-center w-20 bg-[#12A7A3] h-28 md:h-20 rounded-tl-lg  rounded-bl-lg">
                {key > 0 ? (
                  <DocumentTextIcon className="w-9 text-white " />
                ) : (
                  <IconBookOpen color="#fff" />
                )}
              </div>
              <div className="bg-[#fff] w-[70%] ">{index.text}</div>
              <div
                className="flex flex-row justify-center content-center justify-items-center items-center w-20 bg-[#fff] h-20 rounded-tl-lg  rounded-br-lg font-medium rounded-lg text-sm  cursor-pointer "
                onClick={() => handleDownloadDocument(index)}
              >
                <FaDownload fontSize={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProtectedComponent(LandingCentersFuture);
