import React, { useEffect } from "react";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { LogoAccesa } from "../../../components/LogoAccesa";
import { STRINGS, PORTAL_ROUTES } from "../../../config/config";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { scrollToTop } from "../../../components/utils";

/**
 * LandingEmployee
 *
 * Esta view representa el comienzo de la solicitud de la beca para empleado.
 *
 *
 */
function StartRequest() {
  const navigate = useNavigate();
  /**
   *Funcion que permite llevar a la pagina siguiente para realizar
   *una  solicitud de beca de un empleado
   *
   */
  function handleStart() {
    navigate(PORTAL_ROUTES.FORM_EMPLOYEE_REQUEST);
  }
  /**
   *Efecto que permite supervisar la navegacion.
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <div className="">
      <BackArrow
        route={PORTAL_ROUTES.LANDING_ACCESA}
        text={STRINGS.BUTTON_VOLVER_ACCESA}
      />
      <div className=" flex flex-col justify-center items-center gap-4">
        <div className={`text-[#092C4C] font-bold`}>
          <LogoAccesa />
        </div>
        <div className="bg-white w-[70%]">
          <h1 className="text-2xl font-bold text-center">
            {STRINGS.ACCESA_TITLE_PROGRAM_CHILD_P_File}
          </h1>
          <p
            className="mt-10"
            dangerouslySetInnerHTML={{
              __html: STRINGS.ACCESA_TITLE_PROGRAM_CHILD_P1_File,
            }}
          />
        </div>
        <div className="flex flex-row gap-6 w-[200px]">
          <button
            className="form-btn m-10 "
            type="button"
            onClick={handleStart}
          >
            {STRINGS.BUTTON_START_REQUEST_FORM_EMPLOYEE}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProtectedComponent(StartRequest);
