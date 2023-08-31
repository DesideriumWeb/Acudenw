import React, { useEffect, useState } from "react";
import FormTitle from "../../../components/Form/FormTitle";
import useTowns from "../../../hooks/Towns/useTowns";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataEmployee } from "../../../stateManagement/slices/requestFormsSlice";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import {
  PORTAL_ROUTES,
  HAS_OPTION_TRUE_OR_FALSE,
  STRINGS,
} from "../../../config/config";
import {
  checkIfEmailIsValid,
  checkITextIsValid,
  checkIfPhoneNumberIsValid,
  checkIfNumberIsValid,
  checkIfSeguritySocialIsValid,
  checkIfPostalAddressIsValid,
  scrollToTop,
} from "../../../components/utils";
import { InputMask } from "primereact/inputmask";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import BackArrow from "../../../components/BackArrow/BackArrow";

/**
 * FormEmployeeRequest
 *
 * Esta view representa el formulario para la solicitud de beca de un empleado donde se recolectan
 * los datos de un empleado
 *
 */
function FormEmployeeRequest() {
  /**
   *Estados locales del formulario
   *
   */
  const [employeeData, setEmployeeData] = useState({
    name: "",
    lastname: "",
    socialSecurity: "",
    phoneNumber: "",
    email: "",
    codeZip: "",
    postalAddress: "",
    physicalAddress: "",
    city: "",
    gender: "",
    occupation: "",
    hasCDA: "",
    createUser: localStorage.getItem("userEmail") || "",
  });
  const [employeeDataLocalStorage, setEmployeeDataLocalStorage] = useState({
    createUser: localStorage.getItem("userEmail") || "",
  });
  const [errors, setErrors] = useState({});
  const { towns } = useTowns();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formEmployee } = useSelector((state) => state.employee);

  /**
   *Funcion que permite setear la data cuando hay algun cambio  en un input
   *
   */
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
    setEmployeeDataLocalStorage({
      ...employeeDataLocalStorage,
      [e.target.name]: e.target.name === "socialSecurity" ? "" : e.target.value,
    });
  };
  /**
   *Funcion que permite validar errores en los campos del formulario
   *
   */
  function validationRequiredInput(valueData) {
    for (let [key, value] of Object.entries(valueData)) {
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
    }
  }
  /**
   *Funcion que permite guardar la data del formulario y pasar al siguente formulario si los campos
   * no tienen errores
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    validationRequiredInput(employeeData);
    if (Object.values(errors).length === 13) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (isValidForm) {
        localStorage.setItem(
          "formEmployee",
          JSON.stringify(employeeDataLocalStorage)
        );
        dispatch(setDataEmployee(employeeData));
        navigate(PORTAL_ROUTES.FORM_SUPPLIER_REQUEST);
      }
    }
  };
  /**
   *Objeto que permite validar cada uno de los campos del formulario
   *
   */
  const validators = {
    email: checkIfEmailIsValid,
    name: checkITextIsValid,
    lastname: checkITextIsValid,
    socialSecurity: checkIfSeguritySocialIsValid,
    phoneNumber: checkIfPhoneNumberIsValid,
    codeZip: checkIfPostalAddressIsValid,
    postalAddress: (value) => true,
    physicalAddress: (value) => true,
    city: (value) => true,
    gender: (value) => true,
    occupation: checkITextIsValid,
    hasCDA: (value) => true,
  };
  /**
   *Funcion que retorna el mensaje de error de cada uno de los campos del formulario
   *
   */
  function customMessage(nameInput) {
    if (
      nameInput === "name" ||
      nameInput === "lastname" ||
      nameInput === "occupation"
    ) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    if (
      nameInput === "phoneNumber" ||
      nameInput === "socialSecurity" ||
      nameInput === "codeZip"
    ) {
      return `${STRINGS.INVALID_NUMBER}`;
    }
    return "";
  }
  /**
   *Funcion que permite verificar si hay errores en los campos del formulario, cuando el usuario pierde el foco en el
   *campo que este ne ese momento
   *
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
   *Funcion que permite volver a la pagina anterior
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.START_REQUEST);
  }

  /**
   *  Funcion para controlar el cursor en el Input Mask
   */
  function handleCursorPlacement(e) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    let cursorPosition = digitsOnly.length;

    if (cursorPosition <= 3) {
      cursorPosition = cursorPosition;
    } else if (cursorPosition >= 4 && cursorPosition <= 5) {
      cursorPosition += 1;
    } else if (cursorPosition >= 6 && cursorPosition <= 9) {
      cursorPosition += 2;
    }

    if (e.target.selectionStart > cursorPosition) {
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
  /**
   *Efecto que permite supervisar la navegacion
   *
   */
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  /**
   *Efecto que permite supervisar la data que se guardo en el estado global de empleado
   *
   */
  useEffect(() => {
    if (formEmployee) {
      setEmployeeData(formEmployee);
      validationRequiredInput(formEmployee);
    }
  }, [formEmployee]);
  /**
   *Efecto que permite inicializar createUser
   *
   */
  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      createUser: {
        error: false,
        message: "",
      },
    }));
  }, []);
  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_ACCESA} />
      <FormTitle
        mainTitle="Datos del Solicitante"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle="En esta sección deberá completar todos los campos de su información personal."
        children=""
        url="true"
      />
      <div className=" flex flex-col  w-full items-center justify-center mt-8 mb-8 ">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <form
            className="w-full flex flex-col gap-3"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div
              className="bg-[#EEF2F6] text-black font-semibold   p-2 rounded-lg text-center mb-10"
              role="alert"
            >
              {STRINGS.ACCESA_TITLE_REQUIRED_FIELDS}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_NAME}
              </label>
              <input
                className={`${
                  errors?.name?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="name"
                maxLength={50}
                placeholder="Nombre"
                value={employeeData.name}
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
                {STRINGS.ACCESA_FIELDS_LASTNAME}
              </label>
              <input
                className={`${
                  errors?.lastname?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="lastname"
                maxLength={50}
                placeholder="Apellido"
                value={employeeData.lastname}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.lastname?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.lastname?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_NUMBER_SOCIAL_SECURITY}
              </label>
              <InputMask
                className={`${
                  errors?.socialSecurity?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                id="ssn"
                mask="999-99-9999"
                maxLength={15}
                placeholder="999-99-9999"
                name="socialSecurity"
                value={employeeData.socialSecurity}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
                onClick={handleCursorPlacement}
              ></InputMask>
              {errors?.socialSecurity?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.socialSecurity?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_NUMBER_PHONE}
              </label>
              <InputMask
                className={`${
                  errors?.phoneNumber?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                id="phone"
                mask="999-999-9999"
                maxLength={50}
                placeholder="999-999-9999"
                name="phoneNumber"
                value={employeeData.phoneNumber}
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
                {STRINGS.ACCESA_FIELDS_EMAIL}
              </label>
              <input
                className={`${
                  errors?.email?.error ? "form-input-error " : "form-input"
                }`}
                type="email"
                name="email"
                maxLength={50}
                placeholder="Correo electrónico"
                value={employeeData.email}
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
                {STRINGS.ACCESA_FIELDS_CODE_ZIP}
              </label>
              <InputMask
                className={`${
                  errors?.codeZip?.error ? "form-input-error " : "form-input"
                }`}
                mask="99999"
                maxLength={50}
                placeholder="00000"
                name="codeZip"
                value={employeeData.codeZip}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
                onClick={(e) => {
                  const inputValueLength = e.target.value.replace(
                    /[^0-9-]/g,
                    ""
                  ).length;
                  e.target.setSelectionRange(
                    inputValueLength,
                    inputValueLength
                  );
                }}
              ></InputMask>
              {errors?.codeZip?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.codeZip?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_POSTAL_ADDRESS}
              </label>
              <input
                className={`${
                  errors?.postalAddress?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={150}
                name="postalAddress"
                placeholder="Dirección postal"
                value={employeeData.postalAddress}
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
                {STRINGS.ACCESA_FIELDS_PHYSICAL_ADDRESS}
              </label>
              <input
                className={`${
                  errors?.physicalAddress?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={150}
                name="physicalAddress"
                placeholder="Dirección Física"
                value={employeeData.physicalAddress}
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
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full mb-3">
                <label className="text-xs mb-1">
                  {STRINGS.ACCESA_FIELDS_CITY}
                </label>
                <select
                  className={`${
                    errors?.city?.error ? "form-input-error " : "form-input"
                  }`}
                  name="city"
                  maxLength={50}
                  placeholder="city"
                  value={employeeData.city}
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBluerValidationInput(e.target.value, e.target.name)
                  }
                >
                  <option value="">
                    {STRINGS.ACCESA_FIELDS_SELECT_OPTION}
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
                  {STRINGS.ACCESA_FIELDS_GENDER}
                </label>
                <select
                  className={`${
                    errors?.gender?.error ? "form-input-error " : "form-input"
                  }`}
                  name="gender"
                  placeholder="Género"
                  value={employeeData.gender}
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBluerValidationInput(e.target.value, e.target.name)
                  }
                >
                  <option value="">
                    {STRINGS.ACCESA_FIELDS_SELECT_OPTION}
                  </option>
                  <option value="MASCULINO">
                    {STRINGS.ACCESA_FIELDS_MALE}
                  </option>
                  <option value="FEMENINO">
                    {STRINGS.ACCESA_FIELDS_FAMALE}
                  </option>
                </select>
                {errors?.gender?.error && (
                  <span className="text-xs text-red-500 font-semibold">
                    {errors?.gender?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_OCUPATION}
              </label>
              <input
                className={`${
                  errors?.occupation?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="occupation"
                maxLength={50}
                placeholder="Ocupación"
                value={employeeData.occupation}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.occupation?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.occupation?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_HASCDA}
              </label>
              <select
                className={`${
                  errors?.hasCDA?.error ? "form-input-error " : "form-input"
                }`}
                name="hasCDA"
                placeholder="Posee credencial Child Development Associate"
                value={employeeData.hasCDA}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {HAS_OPTION_TRUE_OR_FALSE.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.hasCDA?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.hasCDA?.message}
                </span>
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-6">
              <button
                className="form-btn-outline"
                type="button"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button className="form-btn" type="submit">
                {STRINGS.BUTTON_CONTINUE}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ProtectedComponent(FormEmployeeRequest);
