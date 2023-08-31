import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { PORTAL_ROUTES, STRINGS } from "../../../config/config";
import FormTitleFuture from "../../../components/Form/FormTitleFuture";
import BackArrow from "../../../components/BackArrow/BackArrow";
/**
 * SuccessfullRequestCentersFuture
 *
 * Esta view representa el exito de la solicitud de un centro del futuro
 *
 */
function SuccessfullRequestCentersFuture(props) {
  // USE
  const navigate = useNavigate();
  /**
   *Funcion que permite volver a la pagina anterior que es formulario
   *
   */
  function handleSeeRequest() {
    navigate(PORTAL_ROUTES.MY_REQUEST_CENTERS_FUTURE);
  }
  /**
   *Funcion que permite ir al inicio de la solicitud de beca de un empleado
   *
   */
  function handleSucessfull() {
    navigate(PORTAL_ROUTES.DASHBOARD_ROUTE);
  }
  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_CENTER_FUTURE} />
      <FormTitleFuture
        mainTitle={STRINGS.REQUEST_ACCEPTED}
        titleFirst="Solicitud de Acreditación"
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
                onClick={handleSeeRequest}
              >
                {STRINGS.BUTTON_SEE_REQUEST}
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
export default ProtectedComponent(SuccessfullRequestCentersFuture);
