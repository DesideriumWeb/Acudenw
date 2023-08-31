/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import { IconAfirmationMessage } from "../IconAfirmationMessage";
import { FormInputFileDocumentRequiredDetail } from "../Form/FormInputFileDocumentRequiredDetail";
import { STRINGS } from "../../config/config";
import { AccesaServices } from "../../services/accesaSevices/AccesaServices";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { setIdDocumentRequired } from "../../stateManagement/slices/employeeMyRequest";

/**
 * ModalRequest
 * Esta modal representa los archivos pendientes para enmendar en cada solicitud de beca de un empleado.
 *
 * @params {Object} item - The object containing the details of the request.
 * @return {JSX.Element} The JSX element representing the modal my request component.
 */
export const ModalRequest = ({
  item,
  amendmentData,
  showModal,
  setShowModal,
}) => {
  // STATE

  const [documentsArray, setDocumentsArray] = useState([]);
  const [positionDelete, setPositionDelete] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [loading, setLoading] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const dispatch = useDispatch();
  const { idDocumentRequired } = useSelector(
    (state) => state.employeeMyRequest
  );

  /**
   * Toast ref req.
   */
  let toastRef;

  /**
   *Funcion  que permite guardar el documento requerido
   *
   */
  function handleUploadDocument(id) {
    if (documentsArray.length > 0) {
      addDocumentAmendmentAplicationEmployeeForMyRequest(id, documentsArray[0])
        .then((value) => {
          if (value) {
            setSeverity("success");
            setToastMsg(`${STRINGS.REQUEST_SUCCESSFUL}`);
            setVisibleToast(true);
            setShowModal(false);
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
        .finally(setLoading(false));
    } else {
      setSeverity("warn");
      setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
      setVisibleToast(true);
    }
  }
  /**
   *Funcion que permite consumir el endpoint para guardar los documentos para la enmienda
   *
   */
  async function addDocumentAmendmentAplicationEmployeeForMyRequest(
    id,
    document
  ) {
    const { data, status } =
      await new AccesaServices().addDocumentAmendmentAplicationEmployeeForMyRequest(
        id,
        document
      );
    return status;
  }

  /**
   *Efecto que permite supervisar la posicion de cada documento
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
  /**
   *Funcion que permite guardar la informacion de un empleado de un estado global al estado local
   *
   */
  useEffect(() => {
    if (item) {
      setEmployeeData(item);
    }
  }, [item]);

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
  // RENDER
  return (
    <>
      {showModal
        ? amendmentData.map((item, key) => (
            <>
              <div
                key={key}
                className="flex flex-row justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
              >
                <div className="my-2">
                  <div className="max-w-[460px]">
                    <div className="border-0 rounded-lg shadow-lg flex flex-col px-6 py-3 bg-white outline-none focus:outline-none">
                      <div className="flex justify-end py-4">
                        <button
                          className="border-0 text-[#092C4C] text-3xl"
                          onClick={() => setShowModal(false)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M29.1165 24.8816C30.2883 26.0534 30.2883 27.9517 29.1165 29.1235C28.5353 29.7094 27.7666 30 26.9979 30C26.2292 30 25.4624 29.7071 24.8774 29.1212L14.9988 19.2477L5.12116 29.1188C4.53527 29.7094 3.76752 30 2.99977 30C2.23201 30 1.4652 29.7094 0.878838 29.1188C-0.292946 27.947 -0.292946 26.0487 0.878838 24.877L10.7593 14.9965L0.878838 5.12069C-0.292946 3.94891 -0.292946 2.05062 0.878838 0.878838C2.05062 -0.292946 3.94891 -0.292946 5.12069 0.878838L14.9988 10.764L24.8793 0.883525C26.0511 -0.288258 27.9494 -0.288258 29.1212 0.883525C30.2929 2.05531 30.2929 3.9536 29.1212 5.12538L19.2407 15.0059L29.1165 24.8816Z"
                              fill="#092C4C"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-row text-2xl font-bold my-3 mx-4">
                        {STRINGS.TITLE_REQUEST_FOR_PROOF_REGISTRATION}{" "}
                        {item?.amendmentTypes === "MATRICULA"
                          ? "matrícula"
                          : item?.amendmentTypes === "NOTAS"
                          ? "notas"
                          : item?.amendmentTypes === "ENMIENDA"
                          ? "enmienda"
                          : ""}
                      </div>
                      <div className="flex flex-row text-base font-normal mb-3 mx-4">
                        {item.accesaApplication?.createdOn ||
                          STRINGS.DEFAULT_ON_EMPTY}
                      </div>
                      <div className="flex flex-row text-1xl font-bold mx-4">
                        {STRINGS.INSTRUCTION}:
                      </div>
                      <div className="mx-4 mt-2">
                        <p>
                          {item?.instruction} asociada a la{" "}
                          <b>
                            solicitud {STRINGS.MASK_NUMBER_REQUEST}{" "}
                            {employeeData?.id}.
                          </b>
                        </p>
                      </div>

                      <div className="text-base b-5 font-semibold my-6 mx-4">
                        {STRINGS.WRITE_COMMENT}:
                      </div>

                      <div className="mx-4">
                        <textarea
                          className="form-input mb-6 resize-none mr-6"
                          rows="4"
                          cols="60"
                          maxLength="255"
                          placeholder="Escriba su comentario..."
                        ></textarea>
                      </div>

                      <FormInputFileDocumentRequiredDetail
                        setDocumentsArray={setDocumentsArray}
                        documentsArray={documentsArray}
                        posicion={1}
                        setPositionDelete={setPositionDelete}
                      />

                      <button
                        className="form-btn mt-4 hover:bg-[#A7D02A] hover:text-[#092C4C]"
                        type="button"
                        onClick={() => handleUploadDocument(item?.id)}
                      >
                        {STRINGS.BUTTON_ANSWER_AMENDMENT}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="opacity-25 fixed inset-0 z-40 bg-black"
                onClick={() => setShowModal(false)}
              ></div>
            </>
          ))
        : null}
      <Toast
        ref={(ref) => (toastRef = ref)}
        onHide={() => {
          toastRef.clear();
          setVisibleToast(false);
        }}
      />
    </>
  );
};
