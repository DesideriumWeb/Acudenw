import React, { useEffect } from "react";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { useNavigate, Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { DOCUMENTS, PORTAL_ROUTES } from "../../../config/config";
import { LogoAccesa } from "../../../components/LogoAccesa";
import { IconBookOpen } from "../../../components/IconBookOpen";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { STRINGS } from "../../../config/config";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { scrollToTop } from "../../../components/utils";

/**
 * LandingEmployee
 *
 * Esta view representa la landing de empleado, donde se
 * pueden descargar  los archivos para la solicitud de beca de un empleado
 *
 *
 */
function LandingEmployee() {
  const navigate = useNavigate();
  /**
   *Funcion que permite decargar los archivos requeridos en formato pdf para
   *una  solicitud de beca de un empleado
   *
   */
  function handleDownloadDocument(index) {
    const downloadLink = document.createElement("a");
    downloadLink.href = index.url;
    downloadLink.download = `${index.name}`;
    downloadLink.click();
  }
  /**
   *Funcion que permite llevar a la pagina siguiente para realizar
   *una  solicitud de beca de un empleado
   *
   */
  function handleComenzarSolicitud() {
    navigate(PORTAL_ROUTES.START_REQUEST);
  }
  /**
   *Funcion que permite llevar a la pagina de mis solicitudes
   *
   */
  function handleVerSolicitud() {
    navigate(PORTAL_ROUTES.MY_REQUEST);
  }
  /**
   *Efecto que permite supervisar la navegacion.
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  /**
   *
   */
  return (
    <div className="w-full flex flex-col md:flex-row h-[80%] items-center">
      <div className="w-3/4 mx-10 mb-10">
        <BackArrow />
        <div
          className={`flex flex-col justify-center content-center items-center mt-10 mx-20 mb-10 text-[#092C4C] font-bold `}
        >
          <LogoAccesa />
        </div>
        <div className="w-full text-center mb-7 ml-2">
          <h1 className="text-center text-2xl font-bold">
            {STRINGS.ACCESA_TITLE_LANDING} <br />
            {STRINGS.ACCESA_TITLE_LANDING_1}
          </h1>
          <p className="w-full mt-7 text-left">
            {STRINGS.ACCESA_TITLE_PROGRAM_CHILD}
          </p>
          <p className="w-full mt-7 text-left">
            {STRINGS.ACCESA_TITLE_PROGRAM_CHILD_P2}
          </p>
          <p className="w-full mt-7 text-left">
            {STRINGS.ACCESA_TITLE_PROGRAM_CHILD_P3}
          </p>
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
          <p>{STRINGS.ACCESA_TITLE_LANDING_P}</p>
        </div>
        <div className="flex flex-col mt-10 mx-6 gap-4">
          {DOCUMENTS?.map((index, key) => (
            <div
              key={key}
              className="flex flex-row justify-between content-center justify-items-center items-center font-medium rounded-lg text-sm  bg-[#FFFF] h-20 gap-2 "
            >
              <div className="flex flex-row justify-center content-center justify-items-center items-center w-20 bg-[#FF933B] h-20 rounded-tl-lg  rounded-bl-lg">
                {key > 0 ? (
                  <DocumentTextIcon className="w-9 text-white " />
                ) : (
                  <IconBookOpen color="#fff" />
                )}
              </div>
              <div className="bg-[#fff] w-[70%]">{index.text}</div>
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

export default ProtectedComponent(LandingEmployee);
