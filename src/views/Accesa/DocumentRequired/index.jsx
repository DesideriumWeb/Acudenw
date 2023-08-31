import React, { useEffect, useState } from "react";
import FormTitle from "../../../components/Form/FormTitle";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { FormInputFileDocumentRequired } from "../../../components/Form/FormInputFileDocumentRequired";
import {
  PORTAL_ROUTES,
  STRINGS,
  TITLE_DOCUMENTS,
} from "../../../config/config";
import { setDataDocumentsRequired } from "../../../stateManagement/slices/requestFormsSlice";
import { useDispatch } from "react-redux";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { scrollToTop } from "../../../components/utils";
/**
 * DocumentRequired
 *
 * Esta view representa el formulario para cargar los archivos (pdf,doc)  requeridos para realiar
 * la solicitud de beca de un empleado
 *
 */
function DocumentRequired() {
  const [documentsArray, setDocumentsArray] = useState([]);
  const [positionDelete, setPositionDelete] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   *Funcion que permite guardar los archivos pdf en un formData
   *
   */
  function saveDocuments(e) {
    e.preventDefault();
    scrollToTop();
    if (documentsArray.length === 14) {
      dispatch(setDataDocumentsRequired(documentsArray));
      navigate(PORTAL_ROUTES.BENEFITS);
    } else {
      setErrorMsg(STRINGS.ACCESA_TITLE_REQUIRED_DOCUMENTS_MSG_ERROR);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  }
  /**
   *Funcion que permite volver a la pagina anterior
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.ACADEMY_DATA);
  }
  /**
   *Efecto que permite supervisar la navegacion
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  /**
   *Efecto  que permmite supervisar la posicion del array de documentos
   *
   */
  useEffect(() => {
    if (positionDelete) {
      const p = documentsArray.filter(
        (item) => item.posicion !== positionDelete
      );
      setDocumentsArray([...p]);
      setPositionDelete(null);
    }
  }, [positionDelete]);
  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_ACCESA} />
      <FormTitle
        mainTitle="Documentos requeridos"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle="Aquí debe subir TODOS los documentos requeridos según establece la Sección VI (B) de las Guías del Programa ACCESA. <br/> <br/>
        Para conocer cuáles son los documentos que debe someter junto con su solicitud puede acceder a la guía a través del siguiente enlace: https://acudenpecc.familia.pr.gov/"
        children=""
        url="true"
      />
      <div className=" flex flex-col  w-full items-center justify-center mt-8 mb-8 ">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          {errorMsg && (
            <div
              className="bg-red-500 text-white p-3 rounded text-center"
              role="alert"
            >
              {errorMsg}
            </div>
          )}
          <div
            className="bg-[#EEF2F6] text-black font-semibold   p-2 rounded-lg text-center mb-10"
            role="alert"
          >
            {STRINGS.ACCESA_TITLE_REQUIRED_DOCUMENTS_MSG_ERROR}
          </div>
          {TITLE_DOCUMENTS?.map((item, key) => (
            <div key={key} className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">{item.name}</label>
              <div className="w-full flex justify-center ">
                <div className="w-full">
                  <FormInputFileDocumentRequired
                    setDocumentsArray={setDocumentsArray}
                    documentsArray={documentsArray}
                    posicion={key}
                    setPositionDelete={setPositionDelete}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex flex-col gap-3">
            <div className="flex md:flex-row flex-col gap-6">
              <button
                className="form-btn-outline"
                type="submit"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button
                className="form-btn"
                type="submit"
                onClick={saveDocuments}
              >
                {STRINGS.BUTTON_CONTINUE}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProtectedComponent(DocumentRequired);
