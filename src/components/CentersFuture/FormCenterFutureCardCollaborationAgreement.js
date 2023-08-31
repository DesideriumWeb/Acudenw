import React, { useEffect, useState } from "react";
import { OPTION_ACADEMIC_PREPARATION, STRINGS } from "../../config/config";
import { checkITextIsValid } from "../utils";
/**
 * FormCenterFutureCardCollaborationAgreement
 * Este componente representa una tarjeta llamada "Acuerdo de Colaboración" en el formulario de datos generales de centros del futuro.
 * @param {boolean} setIsvalidFormAcuerdoColaboracion - Una variable de bandera para controlar la validez del formulario de acuerdo de colaboración.
 * @param {boolean} enviarSubmit - Una variable de bandera para controlar el envío del formulario.
 * @param {function} setEnviarSubmit - Una función para establecer el estado de la variable de bandera enviarSubmit.
 * @param {function} setValues - Una función para establecer el estado del objeto que guarda todos los datos del formulario de datos generales de centros del futuro.
 */
export default function FormCenterFutureCardCollaborationAgreement({
  setIsvalidFormAcuerdoColaboracion,
  enviarSubmit,
  setEnviarSubmit,
  setValues,
}) {
  const [errorsChildren, setErrorsChildren] = useState({});
  const [acuerdoColaboracion, setAcuerdoColaboracion] = useState([
    {
      agencia: "",
      proposito: "",
      vencimiento: "",
    },
  ]);
  /**
   * La función handleChangeAcuerdoColaboracion se utiliza para manejar los cambios en los campos de entrada del formulario para el acuerdo de colaboracion en la posición de índice especificada.
   * @param {number} index - El índice del acuerdo de colaboracion en el arreglo.
   * @param {object} event - El objeto event contiene información sobre el evento desencadenado por el cambio en el campo de entrada. Proporciona el nombre del campo modificado y su nuevo valor.
   */
  const handleChangeAcuerdoColaboracion = (index, event) => {
    const { name, value } = event.target;
    const newArray = [...acuerdoColaboracion];
    const updatedObject = { ...newArray[index] };
    updatedObject[name] = value;
    newArray[index] = updatedObject;
    setAcuerdoColaboracion(newArray);
  };
  /**
   * La función handleAdd se utiliza para agregar un nuevo acuerdo de colaboracion al formulario.
   * Agrega un nuevo objeto acuerdo de colaboracion vacío al arreglo de acuerdo de colaboraciones y actualiza el estado correspondiente.
   */
  const handleAdd = () => {
    const values = [...acuerdoColaboracion];
    values.push({ agencia: "", proposito: "", vencimiento: "" });
    setAcuerdoColaboracion(values);
    setIsvalidFormAcuerdoColaboracion(false);
  };
  /**
   * La función handleRemove se utiliza para eliminar un acuerdo de colaboracion del formulario en la posición de índice especificada.
   * Elimina el objeto acuerdo de colaboracion correspondiente del arreglo de acuerdo de colaboraciones y actualiza el estado correspondiente.
   * @param {number} index - El índice del acuerdo de colaboracion a eliminar.
   */
  const handleRemove = (index) => {
    const values = [...acuerdoColaboracion];
    values.splice(index, 1);
    setAcuerdoColaboracion(values);
    const error = { ...errorsChildren };
    delete error[index];
    setErrorsChildren({ ...error });
  };
  /**
   * El objeto validators contiene funciones de validación para cada campo del formulario de acuerdo de colaboracion.
   * Cada función de validación retorna true si el valor es válido y false en caso contrario.
   */
  const validators = {
    agencia: checkITextIsValid,
    proposito: (value) => true,
    vencimiento: checkITextIsValid,
  };
  /**
   * La función customMessage se utiliza para retornar un mensaje personalizado basado en el nombre de un campo de formulario específico.
   * Esta función es invocada cuando se requiere un mensaje de validación adicional para un campo en particular.
   * @param {string} nameInput - El nombre del campo que se está validando.
   * @returns {string} - El mensaje de retorno personalizado.
   */
  function customMessage(nameInput) {
    if (nameInput === `${STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_AGENCY}` || nameInput === `${STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_EXPIRATION}` ) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    return "";
  }
  /**
   * La función handleBluerValidationInput se encarga de validar y manejar el evento de pérdida de foco en cada campo de entrada del formulario.
   * Recibe tres parámetros: `value`, que representa el valor del campo, `nameInput`, que es el nombre del campo, y `i`, que es el índice relacionado al maestro.
   * @param {string} value - Valor del campo de entrada
   * @param {string} nameInput - Nombre del campo
   * @param {number} i - Índice relacionado al acuerdo de colaboración
   */
  function handleBluerValidationInput(value, nameInput, i) {
    if (validators[nameInput]) {
      const isValid = validators[nameInput](value) && value.length > 0;
      if (!isValid) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            [nameInput]: {
              error: true,
              message:
                value.length === 0
                  ? `${STRINGS.THE_FIELD_IS_REQUIRED}`
                  : customMessage(nameInput),
            },
          },
        }));
      } else {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            [nameInput]: {
              error: false,
              message: "",
            },
          },
        }));
      }
    }

    Object.values(acuerdoColaboracion).forEach((item) => {
      if (
        item.agencia.trim() === "" ||
        item.proposito.trim() === "" ||
        item.vencimiento.trim() === ""
      ) {
        setIsvalidFormAcuerdoColaboracion(false);
      } else {
        setIsvalidFormAcuerdoColaboracion(true);
      }
    });
  }
  /**
   * La función handleSubmit se encarga de validar los campos de cada acuerdo de colaboracion en el formulario y actualizar los errores correspondientes.
   * Si un campo de agencia, proposito o vencimiento está vacío, se establece el error correspondiente.
   * Si los campos están completos, se actualiza el estado de errores estableciendo el error como falso.
   * Al finalizar, se actualizan los valores de los acuerdo de colaboraciones en el estado principal.
   */
  function handleSubmit() {
    for (let i = 0; i < acuerdoColaboracion.length; i++) {
      if (acuerdoColaboracion[i].agencia.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            agencia: {
              error: true,
              message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
            },
          },
        }));
      } else {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            agencia: {
              error: false,
              message: "",
            },
          },
        }));
      }
      if (acuerdoColaboracion[i].proposito.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            proposito: {
              error: true,
              message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
            },
          },
        }));
      } else {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            proposito: {
              error: false,
              message: "",
            },
          },
        }));
      }
      if (acuerdoColaboracion[i].vencimiento.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            vencimiento: {
              error: true,
              message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
            },
          },
        }));
      } else {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            vencimiento: {
              error: false,
              message: "",
            },
          },
        }));
      }
    }

  }
  useEffect(()=>{
    setValues((previuValues) => ({
      ...previuValues,
      acuerdoColaboracion: [...acuerdoColaboracion],
    }));
  },[acuerdoColaboracion])
   /**
   * La función useEffect se utiliza para ejecutar la función handleSubmit cuando el estado de enviarSubmit cambia.
   * Si enviarSubmit es verdadero, se ejecuta la función handleSubmit para validar los campos del formulario.
   * Luego, se establece enviarSubmit como falso para evitar ejecuciones adicionales innecesarias.
   */
  useEffect(() => {
    if (enviarSubmit) {
      handleSubmit();
    }
    setEnviarSubmit(false);
  }, [enviarSubmit]);

  return (
    <>
      <div className="flex flex-col w-full  gap-3">
        <label className="text-xs mb-4 ">
          {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_10}
        </label>
        {acuerdoColaboracion?.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col w-full mb-3">
              <div className="flex flex-row justify-between mb-8">
                <div className="text-sm">{STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT} {index + 1}</div>
                {index > 0 && (
                  <div
                    className="text-[#DB224E] cursor-pointer text-sm"
                    onClick={() => handleRemove(index)}
                  >
                    {STRINGS.CENTER_FUTURE_CARD_DELETE}
                  </div>
                )}
              </div>
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_CARD_NAME_PARTNERSHIP_AGREEMENT}
              </label>
              <input
                name="agencia"
                className={`${
                  errorsChildren[index]?.agencia?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                value={acuerdoColaboracion.agencia}
                onChange={(e) => handleChangeAcuerdoColaboracion(index, e)}
                placeholder="Agencia"
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              />
              {errorsChildren[index]?.agencia?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.agencia?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_CARD_PURPOSE_PARTNERSHIP_AGREEMENT}
              </label>
              <input
                name="proposito"
                placeholder="Propósito"
                className={`${
                  errorsChildren[index]?.proposito?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={acuerdoColaboracion.proposito}
                onChange={(e) => handleChangeAcuerdoColaboracion(index, e)}
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              />
              {errorsChildren[index]?.proposito?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.proposito?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_CARD_EXPIRATION_PARTNERSHIP_AGREEMENT}
              </label>
              <input
                name="vencimiento"
                className={`${
                  errorsChildren[index]?.vencimiento?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                value={acuerdoColaboracion.vencimiento}
                onChange={(e) => handleChangeAcuerdoColaboracion(index, e)}
                placeholder="Vencimiento del acuerdo"
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              />
              {errorsChildren[index]?.vencimiento?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.vencimiento?.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex md:flex-row flex-col gap-6">
        <button
          className="form-btn-outline flex flex-row justify-center items-center text-center gap-3"
          type="button"
          onClick={handleAdd}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 15C0 6.71484 6.71484 0 15 0C23.2852 0 30 6.71484 30 15C30 23.2852 23.2852 30 15 30C6.71484 30 0 23.2852 0 15ZM15 21.5625C15.7793 21.5625 16.4062 20.9355 16.4062 20.1562V16.4062H20.1562C20.9355 16.4062 21.5625 15.7793 21.5625 15C21.5625 14.2207 20.9355 13.5938 20.1562 13.5938H16.4062V9.84375C16.4062 9.06445 15.7793 8.4375 15 8.4375C14.2207 8.4375 13.5938 9.06445 13.5938 9.84375V13.5938H9.84375C9.06445 13.5938 8.4375 14.2207 8.4375 15C8.4375 15.7793 9.06445 16.4062 9.84375 16.4062H13.5938V20.1562C13.5938 20.9355 14.2207 21.5625 15 21.5625Z"
              fill="#092C4C"
            />
          </svg>
          {STRINGS.CENTER_FUTURE_CARD_ADD_PARTNERSHIP_AGREEMENT}
        </button>
      </div>
    </>
  );
}
