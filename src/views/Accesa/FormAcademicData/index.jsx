import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import FormTitle from "../../../components/Form/FormTitle";
import { setDataAcademicData } from "../../../stateManagement/slices/requestFormsSlice";
import {
  checkITextIsValid,
  checkINumberIsValid,
  checkINumberCostPeriodAdademicIsValid,
  scrollToTop,
} from "../../../components/utils";
import {
  ACADEMIC_DEGREE,
  ACADEMIC_PERIOD,
  HAS_OPTION_TRUE_OR_FALSE,
  PORTAL_ROUTES,
  STRINGS,
} from "../../../config/config";
import BackArrow from "../../../components/BackArrow/BackArrow";

/**
 * FormAcademicData
 *
 * Esta view representa el formulario de para solicitud de beca de un empleado donde se recogen los datos
 * de la formacion academica del solicitante
 *
 */
function FormAcademicData() {
  /**
   *Use utilizados
   *
   */
  const dispatch = useDispatch();
  const { formAcademicData } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  /**
   *Estados locales del formulario
   *
   */
  const [values, setValues] = useState({
    educationalInstituteName: "",
    academicGrade: "",
    courseName: "",
    academicPeriod: "",
    academicStartDate: "",
    academicEndDate: "",
    academicPeriodCost: "",
    hasEconomicAid: "",
    hasStudentLoan: "",
    createUser: localStorage.getItem("userEmail") || "",
  });
  const [errors, setErrors] = useState({});
  /**
   *Funcion que permite volver a la pagina anterior
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.FORM_SUPPLIER_REQUEST);
  }
  /**
   *Funcion que permite setear la data cuando hay algun cambio  en un input
   *
   */
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  /**
   *Funcion que permite guardar la data del formulario y pasar al siguente formulario si los campos
   * no tienen errores
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    validationRequiredInput(values);
    if (Object.values(errors).length === 10) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (isValidForm) {
        localStorage.setItem("formAcademicData", JSON.stringify(values));
        dispatch(setDataAcademicData(values));
        navigate(PORTAL_ROUTES.DOCUMENT_REQUIRED);
      }
    }
  };
  /**
   *Funcion que permite validar errores en los campos del formulario
   *
   */
  function validationRequiredInput(valuesData) {
    for (let [key, value] of Object.entries(valuesData)) {
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
   *Objeto que permite validar cada uno de los campos del formulario
   *
   */
  const validators = {
    educationalInstituteName: checkITextIsValid,
    academicGrade: (value) => true,
    courseName: checkITextIsValid,
    academicPeriod: (value) => true,
    academicStartDate: (value) => true,
    academicEndDate: (value) => true,
    academicPeriodCost: checkINumberCostPeriodAdademicIsValid,
    hasEconomicAid: (value) => true,
    hasStudentLoan: (value) => true,
  };
  /**
   *Funcion que retorna el mensaje de error de cada uno de los campos del formulario
   *
   */
  function customMessage(nameInput) {
    if (nameInput === "educationalInstituteName") {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    if (nameInput === "courseName") {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    if (nameInput === "academicPeriodCost") {
      return `${STRINGS.INVALID_COST_ACADEMIC}`;
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
   *Efecto que permite supervisar la data que se guardo en el estado
   * global del formacion academica del solicitante
   *
   */
  useEffect(() => {
    if (formAcademicData) {
      setValues(formAcademicData);
      validationRequiredInput(formAcademicData);
    }
  }, [formAcademicData]);
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
      <BackArrow route={PORTAL_ROUTES.LANDING_ACCESA}/>
      <FormTitle
        mainTitle="Datos Académicos y de Estudio"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle="En esta sección deberá completar todos los campos de información relacionados a su programa de estudios, institución educativa, asistencia económica, entre otra información relacionada."
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
                {STRINGS.ACCESA_FIELDS_NAME_EDUCATIONAL_INSTITUTION}{" "}
                <p>{STRINGS.ACCESA_FIELDS_NAME_EDUCATIONAL_INSTITUTION_P}</p>
              </label>
              <input
                name="educationalInstituteName"
                className={`${
                  errors?.educationalInstituteName?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={values.educationalInstituteName}
                placeholder="Nombre de la Instutición Educativa"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.educationalInstituteName?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.educationalInstituteName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELD_ACADEMIC_GRADE}
              </label>
              <select
                name="academicGrade"
                className={`${
                  errors?.academicGrade?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.academicGrade}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {ACADEMIC_DEGREE.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.academicGrade?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.academicGrade?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_COURSE_NAME}{" "}
                <p>{STRINGS.ACCESA_FIELDS_COURSE_NAME_P}</p>
              </label>
              <input
                name="courseName"
                className={`${
                  errors?.courseName?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                maxLength={50}
                value={values.courseName}
                onChange={handleChange}
                placeholder="Área o programa de estudio"
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.courseName?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.courseName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_ACADEMIC_PERIOD}
              </label>
              <select
                name="academicPeriod"
                className={`${
                  errors?.academicPeriod?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.academicPeriod}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {ACADEMIC_PERIOD.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.academicPeriod?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.academicPeriod?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_ACADEMIC_START_DATE}
              </label>
              <input
                name="academicStartDate"
                className={`${
                  errors?.academicStartDate?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="date"
                value={values.academicStartDate}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.academicStartDate?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.academicStartDate?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_ACADEMIC_END_DATE}
              </label>
              <input
                name="academicEndDate"
                className={`${
                  errors?.academicEndDate?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="date"
                value={values.academicEndDate}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.academicEndDate?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.academicEndDate?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_ACADEMIC_PERIOD_COST}{" "}
                <p>{STRINGS.ACCESA_FIELDS_ACADEMIC_PERIOD_COST_P}</p>
              </label>
              <input
                name="academicPeriodCost"
                className={`${
                  errors?.academicPeriodCost?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                type="number"
                min={0}
                value={values.academicPeriodCost}
                placeholder="$0.00"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.academicPeriodCost?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.academicPeriodCost?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_HAS_ECONOMIC_AID}
              </label>
              <select
                name="hasEconomicAid"
                className={`${
                  errors?.hasEconomicAid?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.hasEconomicAid}
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
              {errors?.hasEconomicAid?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.hasEconomicAid?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.ACCESA_FIELDS_HAS_STUDENT_LOAN}
              </label>
              <select
                name="hasStudentLoan"
                className={`${
                  errors?.hasStudentLoan?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.hasStudentLoan}
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
              {errors?.hasStudentLoan?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.hasStudentLoan?.message}
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
export default FormAcademicData;
