import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormTitle from "../../../components/Form/FormTitle";
import useTowns from "../../../hooks/Towns/useTowns";
import useProviderCategories from "../../../hooks/Provider/useProviderCategories";
import { setDataSupplier } from "../../../stateManagement/slices/requestFormsSlice";
import {
  HAS_OPTION_TRUE_OR_FALSE,
  OPTION_CLOSE_OPEN,
  PORTAL_ROUTES,
  OPTION_TYPE_ENTITY,
  STRINGS,
} from "../../../config/config";
import { checkIYearMonth, checkITextIsValid, scrollToTop } from "../../../components/utils";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import BackArrow from "../../../components/BackArrow/BackArrow";
/**
 * FormSupplierRequest
 *
 * Esta view representa el formulario de para solicitud de beca de un empleado donde se recogen los datos
 * del proveedor
 *
 */
function FormSupplierRequest() {
  /**
   *Use utilizados
   *
   */
  const { towns } = useTowns();
  const { categories } = useProviderCategories();
  const dispatch = useDispatch();
  const { formSupplier } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  /**
   *Estados locales del formulario
   *
   */
  const [formValues, setFormValues] = useState({
    isWorkingWithProvider: "",
    providerName: "",
    providerCity: "",
    providerCategory: "",
    providerEntitytype: "",
    licensedHomeCareStatus: "",
    startWorkingDate: "",
    workedHours: "",
    createUser: localStorage.getItem("userEmail") || "",
  });
  const [errors, setErrors] = useState({});

  /**
   *Funcion que permite volver a la pagina anterior
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.FORM_EMPLOYEE_REQUEST);
  }
  /**
   *Funcion que setea la data cuando hay algun cambio  en un input
   *
   */
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
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
   *Funcion para guardar la data del formulario y pasar al siguente formulario si los campos
   * no tienen errores
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    validationRequiredInput(formValues);
    if (Object.values(errors).length === 9) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (isValidForm) {
        localStorage.setItem("formSupplier", JSON.stringify(formValues));
        dispatch(setDataSupplier(formValues));
        navigate(PORTAL_ROUTES.ACADEMY_DATA);
      }
    }
  };
  /**
   *Objeto que permite validar cada uno de los campos del formulario
   *
   */
  const validators = {
    isWorkingWithProvider: (value) => true,
    providerName: checkITextIsValid,
    providerCity: (value) => true,
    providerCategory: (value) => true,
    providerEntitytype: (value) => true,
    licensedHomeCareStatus: (value) => true,
    startWorkingDate: checkIYearMonth,
    workedHours: (value) => true,
  };
  /**
   *Funcion que retorna el mensaje de error de cada uno de los campos del formulario
   *
   */
  function customMessage(nameInput) {
    if (nameInput === "providerName") {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    if (nameInput === "startWorkingDate") {
      return `${STRINGS.INVALID_DATE}`;
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
   *Efecto que permite supervisar la data que se guardo en el estado global del proveedor
   *
   */
  useEffect(() => {
    if (formSupplier) {
      setFormValues(formSupplier);
      validationRequiredInput(formSupplier);
    }
  }, [formSupplier]);
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
  /**
   *Efecto que permite supervisar la navegacion
   *
   */
   useEffect(() => {
    scrollToTop();
  }, [navigate]);
  // RENDER
  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_ACCESA} />
      <FormTitle
        mainTitle="Datos del Proveedor"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle="En esta sección deberá completar todos los campos acerca del
            proveedor con el que usted trabaja al momento de someter esta
            solicitud."
        children=""
        url="true"
      />
      <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <div
            className="bg-[#EEF2F6] text-black font-semibold	 p-2 rounded-lg text-center mb-10"
            role="alert"
          >
            {STRINGS.ALL_FIELDS_ARE_REQUIRED}
          </div>
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_1}
              </label>
              <select
                name="isWorkingWithProvider"
                className={`${
                  errors?.isWorkingWithProvider?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={formValues.isWorkingWithProvider}
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
              {errors?.isWorkingWithProvider?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.isWorkingWithProvider?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.EMPLOYEE_QUESTION_2}
              </label>
              <input
                name="providerName"
                className={`${
                  errors?.providerName?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={formValues.providerName}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.providerName?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.providerName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_3}
              </label>
              <select
                name="providerCity"
                className={`${
                  errors?.providerCity?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={formValues.providerCity}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                <option value="">{STRINGS.ACCESA_FIELDS_SELECT_OPTION}</option>
                {towns.map((index, key) => {
                  return (
                    <option key={key} value={index.name}>
                      {index.name}
                    </option>
                  );
                })}
              </select>
              {errors?.providerCity?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.providerCity?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_4}
              </label>
              <select
                name="providerCategory"
                className={`${
                  errors?.providerCategory?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={formValues.providerCategory}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                <option value="">{STRINGS.ACCESA_FIELDS_SELECT_OPTION}</option>
                {categories.map((index, key) => {
                  return (
                    <option key={key} value={index.id}>
                      {index.description}
                    </option>
                  );
                })}
              </select>
              {errors?.providerCategory?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.providerCategory?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_5}
              </label>
              <select
                name="providerEntitytype"
                className={`${
                  errors?.providerEntitytype?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={formValues.providerEntitytype}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {OPTION_TYPE_ENTITY.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.providerEntitytype?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.providerEntitytype?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_6}
              </label>
              <select
                name="licensedHomeCareStatus"
                className={`${
                  errors?.licensedHomeCareStatus?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={formValues.licensedHomeCareStatus}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {OPTION_CLOSE_OPEN.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.licensedHomeCareStatus?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.licensedHomeCareStatus?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_7}
              </label>
              <input
                name="startWorkingDate"
                className={`${
                  errors?.startWorkingDate?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                placeholder="Mes-0000"
                value={formValues.startWorkingDate}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.startWorkingDate?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.startWorkingDate?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.SUPPLIER_QUESTION_8}
              </label>
              <input
                name="workedHours"
                className={`${
                  errors?.workedHours?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="number"
                min="1"
                maxLength={20}
                value={formValues.workedHours}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.workedHours?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.workedHours?.message}
                </span>
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-6">
              <button
                className="form-btn-outline"
                type="submit"
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
export default ProtectedComponent(FormSupplierRequest);
