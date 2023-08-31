import React, { useEffect, useState } from "react";
import { OPTION_ACADEMIC_PREPARATION, STRINGS } from "../../config/config";
import { checkITextIsValid } from "../utils";
/**
Esta vista representa el subformulario de registro para el maestro.
*@param {function} setIsvalidFormMaestro - Función para actualizar la información del formulario del maestro.
*@param {boolean} enviarSubmit - Estado del envío de los datos.
*@param {function} setEnviarSubmit - Función para actualizar el estado del envío de los datos.
*@param {function} setValues - Función para actualizar todos los datos.
*@returns {JSX.Element} - Retorna el subformulario del maestro.
*/
export default function FormCenterFutureCardMaster({
  setIsvalidFormMaestro,
  enviarSubmit,
  setEnviarSubmit,
  setValues,
}) {
  const [errorsChildren, setErrorsChildren] = useState({});
  const [maestroInterno, setMaestroInterno] = useState([
    {
      nombre: "",
      preparacionAcademica: "",
      especialidad: "",
    },
  ]);
  /**
   * La función handleChangemaestroInterno se utiliza para manejar los cambios en los campos de entrada del formulario para el maestro en la posición de índice especificada.
   * @param {number} index - El índice del maestro en el arreglo.
   * @param {object} event - El objeto event contiene información sobre el evento desencadenado por el cambio en el campo de entrada. Proporciona el nombre del campo modificado y su nuevo valor.
   */
  const handleChangeMaestro = (index, event) => {
    const { name, value } = event.target;
    const newArray = [...maestroInterno];
    const updatedObject = { ...newArray[index] };
    updatedObject[name] = value;
    newArray[index] = updatedObject;
    setMaestroInterno(newArray);
  };
  /**
   * La función handleAdd se utiliza para agregar un nuevo maestro al formulario.
   * Agrega un nuevo objeto maestro vacío al arreglo de maestros y actualiza el estado correspondiente.
   */
  const handleAdd = () => {
    const values = [...maestroInterno];
    values.push({ nombre: "", preparacionAcademica: "", especialidad: "" });
    setMaestroInterno(values);
    setIsvalidFormMaestro(false);
  };
  /**
   * La función handleRemove se utiliza para eliminar un maestro del formulario en la posición de índice especificada.
   * Elimina el objeto maestro correspondiente del arreglo de maestros y actualiza el estado correspondiente.
   * @param {number} index - El índice del maestro a eliminar.
   */
  const handleRemove = (index) => {
    const values = [...maestroInterno];
    values.splice(index, 1);
    setMaestroInterno(values);
    const error = { ...errorsChildren };
    delete error[index];
    setErrorsChildren({ ...error });
  };
  /**
   * El objeto validators contiene funciones de validación para cada campo del formulario de maestro.
   * Cada función de validación retorna true si el valor es válido y false en caso contrario.
   */
  const validators = {
    nombre: checkITextIsValid,
    preparacionAcademica: (value) => true,
    especialidad: checkITextIsValid,
  };
  /**
   * La función customMessage retorna un mensaje de validación personalizado para el campo de entrada con el nombre especificado.
   * Retorna un mensaje que indica que no se permiten caracteres especiales para los campos "nombre" y "especialidad".
   * @param {string} nameInput - El nombre del campo de entrada a validar.
   * @returns {string} - Mensaje de validación personalizado.
   */
  function customMessage(nameInput) {
    if (nameInput === `${STRINGS.CENTER_FUTURE_CARD_NAME}`) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    if (nameInput === `${STRINGS.CENTER_FUTURE_CARD_SPECIALTY}`) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    return "";
  }
  /**
   * La función handleBluerValidationInput se encarga de validar y manejar el evento de pérdida de foco en cada campo de entrada del formulario.
   * Recibe tres parámetros: `value`, que representa el valor del campo, `nameInput`, que es el nombre del campo, y `i`, que es el índice relacionado al maestro.
   * @param {string} value - Valor del campo de entrada
   * @param {string} nameInput - Nombre del campo
   * @param {number} i - Índice relacionado al maestro
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

    Object.values(maestroInterno).forEach((item) => {
      if (
        item.nombre.trim() === "" ||
        item.preparacionAcademica.trim() === "" ||
        item.especialidad.trim() === ""
      ) {
        setIsvalidFormMaestro(false);
      } else {
        setIsvalidFormMaestro(true);
      }
    });
  }
  /**
   * La función handleSubmit se encarga de validar los campos de cada maestro en el formulario y actualizar los errores correspondientes.
   * Si un campo de nombre, preparación académica o especialidad está vacío, se establece el error correspondiente.
   * Si los campos están completos, se actualiza el estado de errores estableciendo el error como falso.
   * Al finalizar, se actualizan los valores de los maestros en el estado principal.
   */
  function handleSubmit() {

    for (let i = 0; i < maestroInterno.length; i++) {
      if (maestroInterno[i].nombre.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            nombre: {
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
            nombre: {
              error: false,
              message: "",
            },
          },
        }));
      }
      if (maestroInterno[i].preparacionAcademica.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            preparacionAcademica: {
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
            preparacionAcademica: {
              error: false,
              message: "",
            },
          },
        }));
      }
      if (maestroInterno[i].especialidad.trim().length === 0) {
        setErrorsChildren((previuErrors) => ({
          ...previuErrors,
          [i]: {
            ...previuErrors[i],
            especialidad: {
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
            especialidad: {
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
      maestro: [...maestroInterno],
    }));
  },[maestroInterno])
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
        {maestroInterno?.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col w-full mb-3">
              <div className="flex flex-row justify-between mb-8">
                <div className="text-sm">
                  {STRINGS.CENTER_FUTURE_CARD_MASTER_TILE_}
                  {index + 1}
                </div>
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
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_20}
              </label>
              <input
                name="nombre"
                className={`${
                  errorsChildren[index]?.nombre?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={100}
                value={maestroInterno.nombre}
                onChange={(e) => handleChangeMaestro(index, e)}
                placeholder="Nombre y apellidos"
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              />
              {errorsChildren[index]?.nombre?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.nombre?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_21}
              </label>
              <select
                name="preparacionAcademica"
                className={`${
                  errorsChildren[index]?.preparacionAcademica?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={maestroInterno.preparacionAcademica}
                onChange={(e) => handleChangeMaestro(index, e)}
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              >
                {OPTION_ACADEMIC_PREPARATION.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errorsChildren[index]?.preparacionAcademica?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.preparacionAcademica?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_22}
              </label>
              <input
                name="especialidad"
                className={`${
                  errorsChildren[index]?.especialidad?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={100}
                value={maestroInterno.especialidad}
                onChange={(e) => handleChangeMaestro(index, e)}
                placeholder="Concentración/Especialidad"
                onBlur={(e) =>
                  handleBluerValidationInput(
                    e.target.value,
                    e.target.name,
                    index
                  )
                }
              />
              {errorsChildren[index]?.especialidad?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errorsChildren[index]?.especialidad?.message}
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
          {STRINGS.CENTER_FUTURE_CARD_MASTER_ADD_MASTER}
        </button>
      </div>
    </>
  );
}
