import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { PORTAL_ROUTES, STRINGS } from "../../../config/config";

import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import SmallSpinner from "../../../components/General/SmallSpinner";
import userSolid from "../../../assets/images/icons/user-solid.svg";
const dataDetailtsMyrequestCentersFuture = [
  {
    titleCenter: "Perfil del Centro",
    nameCenter: "Bright Beginnings",
    contactCenter: "Contacto",
    fechaRequest: "10/02/2023",
    horaRequest: "10:00pm",
  },
];
/**
 *DetailtsRequestCentersFuture
 * View que permite ver el detalle de cada solisitud de un proveedor
 *
 */
function DetailtsRequestCentersFuture() {
  //state
  const [loadingButton, setLoadingButton] = useState();

  const navigate = useNavigate();
  function handleSeeRequest(item) {}

  /**
   *Funcion que permite supervisar la navegacion
   *
   */
  useEffect(() => {}, [navigate]);

  return (
    <>
      <Link to={PORTAL_ROUTES.MY_REQUEST_CENTERS_FUTURE}>
        <div className=" flex flex-row justify-start items-center px-5 sm:px-10 lg:px-32 pt-10">
          <ArrowLeftIcon className="acu-blue w-6 mt-1" />
          <h4 className="exit-text ml-1">
            | {STRINGS.BUTTON_BACK_CENTERS_FUTURE_REQUEST}
          </h4>
        </div>
      </Link>
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-row gap-2 pl-5 sm:pl-20 md:pl-20 lg:pl-20 py-10 text-lg font-semibold">
          <h1 className="text-xl font-semibold">
            {STRINGS.MASK_NUMBER_REQUEST_DETAILS}
            {STRINGS.MASK_NUMBER_REQUEST_CENTERS_FUTURE}
            {"01 "} {STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST}
          </h1>
        </div>
        <div className="w-full flex flex-row gap-2 px-1 py-10 text-sm">
          <h6 className="w-full text-center">
            {STRINGS.TITLE_CENTERS_FUTURE_DETAILS_DATE} 10/10/2023
          </h6>
        </div>
        <div className="w-full flex flex-row gap-2 pr-5 sm:p-r8 py-10 text-sm">
          <div className="h-16 w-16 rounded-full  border-white border-[4px] overflow-hidden bg-white bg-cover">
            <img className="h-full w-full object-fill" src={userSolid} />
          </div>
          <div>
            <h1 className="w-full text-center">Bright Beginnings</h1>
            <a>Contacto</a>
          </div>
        </div>
      </div>

      <div className="flex-col  gap-3 w-full pl-2 pr-8 md:px-10 lg:px-32 py-10 bg-[#EEF2F6]">
        {dataDetailtsMyrequestCentersFuture?.map((item, index) => (
          <>
            <div className="flex flex-row">
              <div className="flex flex-col gap-3">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30ZM43.5703 24.8203C44.8477 23.543 44.8477 21.457 43.5703 20.1797C42.293 18.9023 40.207 18.9023 38.9297 20.1797L26.25 32.8594L21.0703 27.6797C19.793 26.4023 17.707 26.4023 16.4297 27.6797C15.1523 28.957 15.1523 31.043 16.4297 32.3203L23.9297 39.8203C25.207 41.0977 27.293 41.0977 28.5703 39.8203L43.5703 24.8203Z"
                    fill="#002F56"
                  />
                </svg>
                <div className="flex flex-col w-10 pl-5 h-20 ">
                  <div className="bg-[#002F56] w-1 h-20"></div>
                </div>
              </div>
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between md:justify-items-center md:content-center md:items-center gap-3 w-full px-6  py-4 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 m-3"
              >
                <div className="w-full flex flex-col md:w-3/6 text-xl font-semibold">
                  {item.titleCenter}
                </div>
                <div className="w-full md:w-3/6 flex flex-row md:justify-end items-center">
                  <button
                    className="form-btn-outline-sm w-full md:w-32 md:h-12 "
                    onClick={() => handleSeeRequest(item)}
                  >
                    <SmallSpinner loading={loadingButton} />
                    {STRINGS.BUTTON_SEE_PROFILE_CENTER}
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
export default ProtectedComponent(DetailtsRequestCentersFuture);
