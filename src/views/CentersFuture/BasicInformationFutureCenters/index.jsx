import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  PORTAL_ROUTES,
  HAS_OPTION_TRUE_OR_FALSE,
  BASIC_INFORMATION_ABOUT_CENTER,
  STRINGS,
  OPTION_CENTER_FUTURE_POPULATION,
} from "../../../config/config";
import {
  checkITextIsValid,
  checkITextIsValidAccentuation,
  checkIfEmailIsValid,
  checkIfNumberIsValid,
  checkIfPhoneNumberIsValid,
} from "../../../components/utils";
import useTowns from "../../../hooks/Towns/useTowns";
import FormTitleFuture from "../../../components/Form/FormTitleFuture";
import { setDataFormCenterFutureRequestBasic } from "../../../stateManagement/slices/requestFormFutureCenterSlice";
import { InputMask } from "primereact/inputmask";
import { Session } from "../../../services/Session";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { Toast } from "primereact/toast";
/*
 *BasicInformationFutureCenters
 * Esta view representa el formulario de registro de la informacion basica del centro.
 */
function BasicInformationFutureCenters() {
  // USE
  const { towns } = useTowns();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    nombreDirigeCentro: "",
    phoneNumber: "",
    city: "",
    physicalAddress: "",
    postalAddress: "",
    email: "",
    web: "",
    horarioAdministrativo: "",
    poblacion: [],
    cantidadSalones: "",
    cantidadNinos: "",
    infantes: "0",
    maternales: "0",
    preescolares: "0",
    diversidad: "",
    ninosDiversidad: "",
    createUser: localStorage.getItem("userEmail") || "",
  });
  const [errors, setErrors] = useState({});
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const { formCenterFutureRequestBasic } = useSelector(
    (state) => state.centerFutureRequest
  );
  /**
   * El objeto validators es un conjunto de funciones de validación que se utilizan para
   * validar los diferentes campos de un formulario. Cada propiedad del objeto representa
   * el name de un campo y el valor asociado es una función de validación específica para ese campo.
   */
  const validators = {
    name: checkITextIsValid,
    nombreDirigeCentro: checkITextIsValidAccentuation,
    phoneNumber: checkIfPhoneNumberIsValid,
    city: (value) => true,
    physicalAddress: (value) => true,
    postalAddress: (value) => true,
    email: checkIfEmailIsValid,
    web: (value) => true,
    horarioAdministrativo: (value) => true,
    poblacion: (value) => true,
    cantidadSalones: checkIfNumberIsValid,
    cantidadNinos: checkIfNumberIsValid,
    infantes: checkIfNumberIsValid,
    maternales: checkIfNumberIsValid,
    preescolares: checkIfNumberIsValid,
    ninosDiversidad: (value) => true,
    diversidad: (value) => checkITextIsValid,
  };

  /**
   * Esta funcion permite validar cada campo del formulario
   *  para posteriormente conducir al usurio al formulario siguiente que es datos generales del centro
   * @param {object} e -  Dentro de la función, se utiliza e.preventDefault() para evitar el comportamiento predeterminado
   * de envío del formulario y realizar un control personalizado.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    validationRequiredInput();
    if (Object.values(errors).length === 19) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (isValidForm) {
        localStorage.setItem(
          `${STRINGS.FORM_CENTER_FUTURE_REQUEST_BASIC}`,
          JSON.stringify(values)
        );
        dispatch(setDataFormCenterFutureRequestBasic(values));
        //  accesaRequest(employeeData);
        navigate(PORTAL_ROUTES.FORM_GENERAL_INFORMATION_CENTER);
      }
    }
  };
  /**
   * La función validationRequiredInput se encarga de validar cada campo
   * del formulario para verificar si están completados o no.
   */
  function validationRequiredInput() {
    for (let [key, value] of Object.entries(values)) {
      let tipo = typeof value;
      if (key === "ninosDiversidad" && value === "false") {
        setErrors((previuErrors) => ({
          ...previuErrors,
          [key]: {
            error: false,
            message: "",
          },
          ["diversidad"]: {
            error: false,
            message: "",
          },
        }));
        break;
      }
      if (
        tipo.toString() ===
        `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_TYPE_STRING}`
      ) {
        if (!value.trim().length > 0) {
          setErrors((previuErrors) => ({
            ...previuErrors,
            [key]: {
              error: true,
              message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
            },
          }));
        } else {
          setErrors((previuErrors) => ({
            ...previuErrors,
            [key]: {
              error: false,
              message: "",
            },
          }));
        }
      } else {
        const isvalid = value.some((item) => item !== undefined);
        if (!isvalid) {
          setErrors((previuErrors) => ({
            ...previuErrors,
            [key]: {
              error: true,
              message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
            },
          }));
        } else {
          setErrors((previuErrors) => ({
            ...previuErrors,
            [key]: {
              error: false,
              message: "",
            },
          }));
        }
      }
    }
  }

  /**
   * La función handleChange se utiliza para actualizar el objeto values cada vez que el usuario realiza un cambio en los campos de entrada (input) del formulario.
   * @param {object} e - El objeto e contiene el evento desencadenado por el cambio en el campo de entrada. Proporciona información sobre el campo modificado, como el nombre y el valor actualizado.
   */
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  /**
   * La función customMessage se utiliza para retornar un mensaje personalizado basado en el nombre de un campo de formulario específico.
   * Esta función es invocada cuando se requiere un mensaje de validación adicional para un campo en particular.
   * @param {string} nameInput - El nombre del campo que se está validando.
   * @return {string} - El mensaje personalizado de retorno.
   */
  function customMessage(nameInput) {
    if (
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_NAME}` ||
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_NAME_CENTER}` ||
      nameInput ===
        `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PHYSICAL_ADDRESS}`
    ) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }

    if (nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PHONE}`) {
      return `${STRINGS.INVALID_NUMBER}`;
    }
    if (nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_EMAIL}`) {
      return `${STRINGS.INVALID_EMAIL}`;
    }
    if (
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_NUMBER_ROOMS}` ||
      nameInput ===
        `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_NUMBER_CHILDREN}` ||
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_INFANTS}` ||
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_MATERNALS}` ||
      nameInput === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS}`
    ) {
      return `${STRINGS.QUANTITY_MUST_BE_POSITIVE}`;
    }
    return "";
  }

  /**
   * Esta función se encarga de validar y manejar el evento de pérdida de foco en cada campo de entrada del formulario.
   * Recibe dos parámetros: `value`, que representa el valor del campo, y `nameInput`, que es el nombre del campo.
   * @param {string} value - Valor del campo de entrada
   * @param {string} nameInput - Nombre del campo
   */
  function handleBluerValidationInput(value, nameInput) {
    if (validators[nameInput]) {
      const isValid = validators[nameInput](value) && value.length > 0;
      if (!isValid) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [nameInput]: {
            error: true,
            message:
              value.length === 0
                ? `${STRINGS.THE_FIELD_IS_REQUIRED}`
                : customMessage(nameInput),
          },
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [nameInput]: {
            error: false,
            message: "",
          },
        }));
      }
    }
  }

  /**
   *Esta función se utiliza para manejar el evento cuando el usuario pierde el foco de un campo de opción, como un checkbox.
   *@param {object} e - El evento del cambio de foco del campo.
   *@param {string} key - La clave que identifica el campo al que se le ha aplicado esta función.
   */
  function handleBlurOption(e, key) {
    if (values[e.target.name].length === 0) {
      setErrors((previuErrors) => ({
        ...previuErrors,
        [e.target.name]: {
          error: true,
          message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
        },
      }));
    } else {
      setErrors((previuErrors) => ({
        ...previuErrors,
        [e.target.name]: {
          error: false,
          message: "",
        },
      }));
    }
  }
  /**
   * Esta función se encarga de manejar los cambios en las opciones de un formulario.
   * Recibe dos parámetros: `e` que representa el evento del cambio, y `index` que indica el índice de la opción.
   * Si la opción seleccionada ya está presente en el estado `values`, la elimina; de lo contrario, la agrega.
   * @param {Event} e - Evento del cambio de opción
   * @param {number} index - Índice de la opción
   */
  const handleOptionChange = (e, index) => {
    const optionValue = e.target.value;

    if (values[e.target.name].includes(optionValue)) {
      setValues({
        ...values,
        [e.target.name]: values[e.target.name].filter(
          (option) => option !== optionValue
        ),
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: [...values[e.target.name], optionValue],
      });
    }
  };
  /**
   * Funcion que permite ir a la pagina de inicio
   */
  function handleBack() {
    setConfirmPopupVisible(true);
    localStorage.setItem(
      `${STRINGS.FORM_CENTER_FUTURE_REQUEST_BASIC}`,
      JSON.stringify(values)
    );
    dispatch(setDataFormCenterFutureRequestBasic(values));
  }

  function handleCursorPlacement(e) {
    {
      const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
      let cursorPosition = digitsOnly.length;

      if (cursorPosition <= 3) {
        cursorPosition = cursorPosition;
      } else if (cursorPosition >= 4 && cursorPosition <= 6) {
        cursorPosition += 1;
      } else if (cursorPosition >= 7 && cursorPosition <= 10) {
        cursorPosition += 2;
      }

      if (e.target.selectionStart > cursorPosition) {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }
  /**
   *Efecto que permite supervisar la data que se guardo en el estado global del centro
   *
   */
  useEffect(() => {
    if (formCenterFutureRequestBasic) {
      setValues(formCenterFutureRequestBasic);
    }
  }, [formCenterFutureRequestBasic]);

  /**
   *Efecto que permite inicializar el objeto de errores
   *
   */
  useEffect(() => {
    const resetError = {
      error: false,
      message: "",
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      createUser: { ...resetError },
      infantes: { ...resetError },
      maternales: { ...resetError },
      preescolares: { ...resetError },
    }));
  }, []);
  /**
   *Efecto que permite inicializar diversidad ninos
   *
   */
  useEffect(() => {
    if (values.ninosDiversidad === "false") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        diversidad: {
          error: false,
          message: "",
        },
      }));
    }
  }, [values.ninosDiversidad]);

  // RENDER
  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_CENTER_FUTURE} />
      <FormTitleFuture
        titleFirst="Perfil del Centro"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle={BASIC_INFORMATION_ABOUT_CENTER}
        children=""
        url="true"
      />
      <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <div
            className="bg-[#EEF2F6] text-black font-semibold	 p-2 rounded-lg text-center mb-10"
            role="alert"
          >
            {STRINGS.ACCESA_TITLE_REQUIRED_FIELDS}
          </div>
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_1}
              </label>
              <input
                name="name"
                className={`${
                  errors?.name?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={values.name}
                placeholder="Nombre del Centro"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.name?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_2}
              </label>
              <input
                name="nombreDirigeCentro"
                className={`${
                  errors?.nombreDirigeCentro?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={values.nombreDirigeCentro}
                placeholder="Nombre de persona que dirige el Centro"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.nombreDirigeCentro?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.nombreDirigeCentro?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_3}
              </label>
              <InputMask
                className={`${
                  errors?.phoneNumber?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                mask="999-999-9999"
                maxLength={50}
                placeholder="999-999-9999"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
                onClick={handleCursorPlacement}
              ></InputMask>
              {errors?.phoneNumber?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.phoneNumber?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_4}
              </label>
              <select
                name="city"
                maxLength={50}
                className={`${
                  errors?.city?.error ? "form-input-error" : "form-input"
                }`}
                value={values.city}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                <option value="">
                  {STRINGS.CENTER_FUTURE_FIELDS_SELECT_OPTION}
                </option>
                {towns?.map((index, key) => {
                  return (
                    <option key={key} value={index.name}>
                      {index.name}
                    </option>
                  );
                })}
              </select>
              {errors?.city?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.city?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_5}
              </label>
              <input
                name="physicalAddress"
                maxLength={150}
                className={`${
                  errors?.physicalAddress?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                value={values.physicalAddress}
                placeholder="Dirección Física del Centro"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.physicalAddress?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.physicalAddress?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_6}
              </label>
              <input
                name="postalAddress"
                maxLength={150}
                className={`${
                  errors?.postalAddress?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                value={values.postalAddress}
                placeholder="Dirección Postal del Centro"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.postalAddress?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.postalAddress?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_7}
              </label>
              <input
                name="email"
                maxLength={50}
                className={`${
                  errors?.email?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                value={values.email}
                placeholder="email electrónico del Centro"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.email?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_8}
              </label>
              <input
                name="web"
                maxLength={150}
                className={`${
                  errors?.web?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                value={values.web}
                placeholder="Página web y/o redes sociales "
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.web?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.web?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_9}
              </label>
              <input
                name="horarioAdministrativo"
                className={`${
                  errors?.horarioAdministrativo?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={values.horarioAdministrativo}
                placeholder="Horario de Trabajos"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.horarioAdministrativo?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.horarioAdministrativo?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_6}
              </label>
              {OPTION_CENTER_FUTURE_POPULATION.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name="poblacion"
                      checked={values.poblacion.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ring-offset-gray-800 focus:ring-2"
                    />
                    <label htmlFor="default-checkbox" className="ml-2 text-xs">
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
              {errors?.poblacion?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.poblacion?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_10}
              </label>
              <input
                name="cantidadSalones"
                className={`${
                  errors?.cantidadSalones?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.cantidadSalones}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadSalones?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadSalones?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_11}
              </label>
              <input
                name="cantidadNinos"
                className={`${
                  errors?.cantidadNinos?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.cantidadNinos}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadNinos?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadNinos?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_12}
                <br />
                <br />
                <p>{STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_12_P}</p>
              </label>
              <input
                name="infantes"
                className={`${
                  errors?.infantes?.error ? "form-input-error " : "form-input"
                }`}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.infantes}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.infantes?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.infantes?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_13}
              </label>
              <input
                name="maternales"
                className={`${
                  errors?.maternales?.error ? "form-input-error " : "form-input"
                }`}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.maternales}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.maternales?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.maternales?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_14}
              </label>
              <input
                name="preescolares"
                className={`${
                  errors?.preescolares?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.preescolares}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.preescolares?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.preescolares?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_15}
              </label>
              <input
                className={"form-input"}
                disabled
                placeholder="0"
                value={(values.infantes.length > 0 &&
                values.maternales.length > 0 &&
                values.preescolares.length > 0
                  ? parseInt(values.infantes) +
                    parseInt(values.maternales) +
                    parseInt(values.preescolares)
                  : ""
                ).toString()}
              />
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_16}
              </label>
              <select
                name="ninosDiversidad"
                className={`${
                  errors?.ninosDiversidad?.error
                    ? "form-input-error"
                    : "form-input"
                }`}
                value={values.ninosDiversidad}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {HAS_OPTION_TRUE_OR_FALSE.map((index, key) => {
                  return (
                    <option key={key} value={index.default}>
                      {index.name}
                    </option>
                  );
                })}
              </select>
              {errors?.ninosDiversidad?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.ninosDiversidad?.message}
                </span>
              )}
            </div>
            {values.ninosDiversidad === "true" ? (
              <div className="flex flex-col w-full mb-3">
                <label className="text-xs mb-1">
                  {STRINGS.CENTER_FUTURE_BASIC_INFORMATION_QUESTION_17}
                </label>
                <input
                  name="diversidad"
                  className={`${
                    errors?.diversidad?.error
                      ? "form-input-error "
                      : "form-input"
                  }`}
                  type="text"
                  maxLength={50}
                  value={values.diversidad}
                  placeholder="Escriba las caracteristicas"
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBluerValidationInput(e.target.value, e.target.name)
                  }
                />
                {errors?.diversidad?.error && (
                  <span className="text-xs text-red-500 font-semibold">
                    {errors?.diversidad?.message}
                  </span>
                )}
              </div>
            ) : null}
            <div className="flex md:flex-row flex-col gap-6">
              <button
                className="form-btn-outline"
                type="button"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button className="form-btn" type="button" onClick={handleSubmit}>
                {STRINGS.BUTTON_CONTINUE}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmDialog
        visible={confirmPopupVisible}
        onHide={() => setConfirmPopupVisible(false)}
        header={"Salir"}
        message={`¿Estas seguro que deseas salir?`}
        accept={() => navigate(PORTAL_ROUTES.LANDING_CENTER_FUTURE)}
        acceptLabel={"Si"}
        acceptClassName={
          "flex text-lg rounded-md border-0 bg-[#092C4C] hover:bg-[#A7D02A] hover-background-color"
        }
        reject={() => setConfirmPopupVisible(false)}
        rejectLabel={"No"}
        rejectClassName={
          "flex text-lg rounded-md border-0 bg-[#092C4C] hover:bg-[#A7D02A] hover-background-color"
        }
        className={"text-lg z-50"}
      />
    </>
  );
}

export default BasicInformationFutureCenters;
