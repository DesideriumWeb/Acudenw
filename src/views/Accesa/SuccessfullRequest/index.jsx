import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import FormTitle from "../../../components/Form/FormTitle";
import { PORTAL_ROUTES, STRINGS } from "../../../config/config";
import { scrollToTop } from "../../../components/utils";
/**
 * SuccessfullRequest
 *
 * Esta view representa el exito de la solicitud de beca de un empleado
 *
 */
export function SuccessfullRequest(props) {
  // USE
  const navigate = useNavigate();
  /**
   *Funcion que permite volver a la pagina anterior que es terminos y condiciones
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.TERMS_CONDITIONS);
  }
  /**
   *Funcion que permite ir al inicio de la solicitud de beca de un empleado
   *
   */
  function handleSucessfull() {
    navigate(PORTAL_ROUTES.DASHBOARD_ROUTE);
  }

  /**
   *Funcion que permite ir al inicio
   *
   */
  function handleExit() {
    navigate(PORTAL_ROUTES.LANDING_ROUTE);
  }
/**
   *Efecto que permite supervisar la navegacion.
   *
   */
   useEffect(() => {
    scrollToTop();
  }, [navigate]);
  // RENDER
  return (
    <>
      <button
        className="flex flex-row justify-start items-center p-4 ml-4"
        onClick={handleExit}
      >
        <ArrowLeftIcon className="acu-blue w-6 mt-1" />
        <h4 className="exit-text ml-1">| {STRINGS.BUTTON_EXIT}</h4>
      </button>
      <FormTitle
        mainTitle={STRINGS.REQUEST_ACCEPTED}
        // eslint-disable-next-line react/style-prop-object
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle={ STRINGS.REQUEST_ACCEPTED_SUBTITLE.replace("#{solicitud}", props.numeroSolicitud || 'no especificado')}
        children=""
        url="true"
      />
      <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row gap-6">
              <button
                className="form-btn-outline"
                type="submit"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button
                className="form-btn"
                type="button"
                onClick={handleSucessfull}
              >
                {STRINGS.BUTTON_GO_DASHBOARD}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SuccessfullRequest;
