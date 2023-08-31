import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormTitleFuture from "../../../components/Form/FormTitleFuture";
import {
  ENTITY_STATUS,
  OPTION_CENTER_FINANCING,
  OPTION_CENTER_FUTURE_ACCREDITATIONS,
  OPTION_CENTER_FUTURE_CENTER_RATIO,
  OPTION_CENTER_FUTURE_DAYS_SERVICES,
  OPTION_CENTER_FUTURE_HOURS_OF_SERVICES,
  OPTION_CENTER_FUTURE_POPULATION,
  OPTION_CENTER_FUTURE_YARD,
  OPTION_TYPE_AGENCY_OR_CITY,
  OPTION_TYPE_ENTITY,
  PORTAL_ROUTES,
  STRINGS,
  USER_STATUS,
} from "../../../config/config";
import {
  checkITextIsValid,
  checkIfNumberIsValid,
} from "../../../components/utils";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import FormCenterFutureCardMaster from "../../../components/CentersFuture/FormCenterFutureCardMaster";
import FormCenterFutureCardAssistant from "../../../components/CentersFuture/FormCenterFutureCardAssistant";
import FormCenterFutureCardCollaborationAgreement from "../../../components/CentersFuture/FormCenterFutureCardCollaborationAgreement";
import { setDataFormCenterFutureRequestGeneral } from "../../../stateManagement/slices/requestFormFutureCenterSlice";
import { Toast } from "primereact/toast";
import SmallSpinner from "../../../components/General/SmallSpinner";
import { CenterFutureServices } from "../../../services/centerFutureServices/CenterFutureServices";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { ConfirmDialog } from "primereact/confirmdialog";

/**
 * FormGeneralInformationCenter
 * This view represents the form for registering general information of the center.
 *
 * @return {JSX.Element}
 * @constructor
 */
function FormGeneralInformationCenter() {
  // STATE
  const [values, setValues] = useState({
    tipoOrganizacion: "",
    agenciaOMunicipio: "",
    financiamientoCentro: [],
    horarioServicio: [],
    diasServicio: [],
    poblacion: [],
    patio: [],
    acreditacion: [],
    acreditacionEspecificacion: "",
    relacionAccuden: [],
    relacionAccudenEspecificacion: "",
    maestro: [],
    asistente: [],
    acuerdoColaboracion: [],
    cantidadInfantes: "",
    cantidadMaternales: "",
    cantidadPreescolares: "",
    cantidadTotalEmpleados: "",
    createUser: localStorage.getItem("userEmail") || "",
  });

  const [errors, setErrors] = useState({});
  const [enviarSubmit, setEnviarSubmit] = useState(false);
  const [isvalidFormMaestro, setIsvalidFormMaestro] = useState(false);
  const [isvalidFormAsistente, setIsvalidFormAsistente] = useState(false);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [isvalidFormAcuerdoColaboracion, setIsvalidFormAcuerdoColaboracion] =
    useState(false);
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);
  const [loading, setLoading] = useState(false);
  // USE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formCenterFutureRequestBasic, formCenterFutureRequestGeneral } =
    useSelector((state) => state.centerFutureRequest);
  /**
   * Toast ref req.
   */
  let toastRef;
  /**
   * Funcion que permite ir a la pagina de inicio
   * @return {void}
   */
  function handleBack() {
    setConfirmPopupVisible(true);
    dispatch(setDataFormCenterFutureRequestGeneral(values));
    localStorage.setItem(
      `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_LOCAL_STORAGE}`,
      JSON.stringify(values)
    );
  }
  /**
   * Esta función se encarga de manejar los cambios en las opciones de un formulario.
   * Recibe dos parámetros: `e` que representa el evento del cambio, y `index` que indica el índice de la opción.
   * Si la opción seleccionada ya está presente en el estado `values`, la elimina; de lo contrario, la agrega.
   *
   *
   * @param {Event} e - Evento del cambio de opción
   * @param {number} index - Índice de la opción
   * @return {void}
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
   * La función validationRequiredInput se encarga de validar cada campo
   * del formulario para verificar si están completados o no.
   * @param {Object} valuesData - Objeto que contiene los valores de los campos del formulario.
   */
  function validationRequiredInput(valuesData) {
    const resetError = {
      error: false,
      message: "",
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      relacionAccudenEspecificacion: { ...resetError },
      acreditacionEspecificacion: { ...resetError },
    }));
    for (let [key, value] of Object.entries(valuesData)) {
      let v = typeof value;
      if (
        key !== `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_MASTER}` ||
        key !== `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_ASSISTANT}`
      ) {
        if (
          v.toString() === `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_OBJECT}`
        ) {
          if (value.length > 0) {
            if (errors[key] ? true : false) {
              errors[key] = {
                error: false,
                message: "",
              };
            } else {
              errors[key] = {
                error: false,
                message: "",
              };
            }
          } else {
            if (errors[key] ? true : false) {
              errors[key] = {
                error: true,
                message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
              };
            } else {
              errors[key] = {
                error: true,
                message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
              };
            }
          }
        }
      }

      if (
        v.toString() ===
        `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_TYPE_STRING}`
      ) {
        if (!value.trim().length > 0) {
          if (
            key === "relacionAccudenEspecificacion" ||
            key === "acreditacionEspecificacion"
          ) {
            setErrors((previuErrors) => ({
              ...previuErrors,
              [key]: {
                error: false,
                message: "",
              },
            }));
          } else {
            setErrors((previuErrors) => ({
              ...previuErrors,
              [key]: {
                error: true,
                message: `${STRINGS.THE_FIELD_IS_REQUIRED}`,
              },
            }));
          }
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
   * Esta funcion permite validar cada campo del formulario
   *  para posteriormente conducir al usurio al formulario siguiente que es datos generales del centro
   * @param {object} e -  Dentro de la función, se utiliza e.preventDefault() para evitar el comportamiento predeterminado
   * de envío del formulario y realizar un control personalizado.
   * @return {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setDataFormCenterFutureRequestGeneral(values));
    setLoading(true);
    setEnviarSubmit(true);
    validationRequiredInput(values);

    const maestros = values.maestro.map((item) => ({
      fullName: item.nombre,
      preparation: item.preparacionAcademica,
      speciality: item.especialidad,
      isAssistant: false,
      status: ENTITY_STATUS.ACTIVE,
    }));

    const asistentes = values.asistente.map((item) => ({
      fullName: item.nombre,
      preparation: item.preparacionAcademica,
      speciality: item.especialidad,
      isAssistant: true,
      status: ENTITY_STATUS.ACTIVE,
    }));

    const body = {
      cdfProviderInformation: {
        adminHours: formCenterFutureRequestBasic.horarioAdministrativo,
        isSchoolAgeConsidered: formCenterFutureRequestBasic.poblacion.includes(
          OPTION_CENTER_FUTURE_POPULATION[0]
        ),
        isMaternalConsidered: formCenterFutureRequestBasic.poblacion.includes(
          OPTION_CENTER_FUTURE_POPULATION[1]
        ),
        isPreschoolConsidered: formCenterFutureRequestBasic.poblacion.includes(
          OPTION_CENTER_FUTURE_POPULATION[2]
        ),
        hallsQuantity: formCenterFutureRequestBasic.cantidadSalones,
        kidsTotal: formCenterFutureRequestBasic.cantidadNinos,
        schoolAgeQuantity: formCenterFutureRequestBasic.infantes,
        maternalQuantity: formCenterFutureRequestBasic.maternales,
        preschoolQuantity: formCenterFutureRequestBasic.preescolares,
        isKidsDiversityConsidered: formCenterFutureRequestBasic.ninosDiversidad,
        status: ENTITY_STATUS.ACTIVE,
      },
      cdfProviderGeneral: {
        administrativeEntity: values.tipoOrganizacion,
        foundingSources: values.financiamientoCentro.join(", "),
        servicesAvailability: values.horarioServicio.join(", "), //TODO: No estoy seguro de que matcheen estos campos
        serviceDays: values.diasServicio.join(", "),
        licenses: values.acreditacion.join(", "),
        acudenRelations: values.relacionAccuden.join(", "),
        acudenRelationsOther: values.relacionAccudenEspecificacion,
        schoolAgeQuantityPerTeacher: values.cantidadInfantes, //TODO: Resolver duda si toca por profesor
        maternalQuantityPerTeacher: values.cantidadMaternales, //TODO: Resolver duda si toca por profesor
        preschoolQuantityPerTeacher: values.cantidadPreescolares, //TODO: Resolver duda si toca por profesor
        employeesTotal: values.cantidadTotalEmpleados,
        status: ENTITY_STATUS.ACTIVE,
        cdfProviderTeachers: [...maestros, ...asistentes],
        cdfProviderAgreements: values.acuerdoColaboracion.map((item) => ({
          agency: item.agencia,
          purpose: item.proposito,
          expirationDate: "2024-06-08T23:49:40",
          status: ENTITY_STATUS.ACTIVE,
        })),
      },
    };

    if (Object.values(errors).length === 19) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (
        isValidForm &&
        isvalidFormMaestro &&
        isvalidFormAsistente &&
        isvalidFormAcuerdoColaboracion
      ) {
        const profile = JSON.parse(localStorage.getItem("providerProfile"));
        createCDFRequest(profile.id) //TODO: Definir de donde viene el status o si va quemado
          .then((value) => {
            if (value.data?.id) {
              updateCenterFutureRequest(
                {
                  ...body,
                  providerId: profile.id,
                  status: value.data?.status,
                  cdfAccreditationStatus: value.data?.cdfAccreditationStatus,
                  mentorId: value.data?.mentor,
                },
                value.data?.id
              )
                .then((value) => {
                  if (value) {
                    localStorage.setItem(
                      `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_LOCAL_STORAGE}`,
                      JSON.stringify(values)
                    );
                    navigate(PORTAL_ROUTES.REQUEST_SENT_CENTERS_FUTURE);
                  }
                })
                .catch(() => {
                  setSeverity("warn");
                  setToastMsg(`${STRINGS.CONTACT_ADMIN}`);
                  setVisibleToast(true);
                })
                .finally(setLoading(false));
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
        setToastMsg(`${STRINGS.FILL_OUT_FORMS}`);
        setVisibleToast(true);
        setLoading(false);
      }
    } else {
      setSeverity("warn");
      setToastMsg(`${STRINGS.FILL_OUT_FORMS}`);
      setVisibleToast(true);
      setLoading(false);
    }
  };

  /**
   * Funcion que permite consumir el endpoint para crear los datos de la solicitud de un centro
   * @param {*} id
   * @returns data
   */
  async function createCDFRequest(id) {
    const { data } = await new CenterFutureServices().createCDFRequest(id);
    return data;
  }

  /**
   * Funcion que permite consumir el endpoint para actualizar los datos de la solicitud de un centro
   * @param {*} dat
   * @param id
   * @returns data
   */
  async function updateCenterFutureRequest(dat, id) {
    const { data } = await new CenterFutureServices().updateCDFRequest(dat, id);
    return data;
  }

  /**
   * La función validationRequiredInput se encarga de validar cada campo
   * del formulario para verificar si están completados o no.
   * @type {{cantidadInfantes: ((function(string): boolean)|*), cantidadTotalEmpleados: ((function(string): boolean)|*), agenciaOMunicipio: ((function(string): boolean)|*), cantidadPreescolares: ((function(string): boolean)|*), tipoOrganizacion: (function(*): boolean), cantidadMaternales: ((function(string): boolean)|*)}}
   */
  const validators = {
    tipoOrganizacion: (value) => true,
    agenciaOMunicipio: checkITextIsValid,
    cantidadInfantes: checkIfNumberIsValid,
    cantidadMaternales: checkIfNumberIsValid,
    cantidadPreescolares: checkIfNumberIsValid,
    cantidadTotalEmpleados: checkIfNumberIsValid,
  };
  function customMessage(nameInput) {
    if (nameInput === `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_CITY}`) {
      return `${STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED}`;
    }
    return "";
  }
  /**
   * Esta función se encarga de validar y manejar el evento de pérdida de foco en cada campo de entrada del formulario.
   * Recibe dos parámetros: `value`, que representa el valor del campo, y `nameInput`, que es el nombre del campo.
   * @param {string} value - Valor del campo de entrada
   * @param {string} nameInput - Nombre del campo
   * @return {void}
   */
  function handleBluerValidationInput(value, nameInput) {
    if (validators[nameInput]) {
      const isValid = validators[nameInput](value) && value.length > 0;
      if (!isValid) {
        setErrors((previuErrors) => ({
          ...previuErrors,
          [nameInput]: {
            error: true,
            message:
              value.length === 0
                ? `${STRINGS.THE_FIELD_IS_REQUIRED}`
                : customMessage(nameInput),
          },
        }));
      } else {
        setErrors((previuErrors) => ({
          ...previuErrors,
          [nameInput]: {
            error: false,
            message: "",
          },
        }));
      }
    }
  }
  /**
   * Esta función se utiliza para manejar el evento cuando el usuario pierde el foco de un campo de opción, como un checkbox.
   * @param {object} e - El evento del cambio de foco del campo.
   * @param {string} key - La clave que identifica el campo al que se le ha aplicado esta función.
   * @return {void}
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
   * Efecto que permite supervisar la data que se guardo en el estado global del centro
   *
   */
  useEffect(() => {
    if (formCenterFutureRequestGeneral) {
      setValues(formCenterFutureRequestGeneral);
    }
  }, [formCenterFutureRequestGeneral]);
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

  useEffect(() => {
    const resetError = {
      error: false,
      message: "",
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      createUser: { ...resetError },
      relacionAccudenEspecificacion: { ...resetError },
      acreditacionEspecificacion: { ...resetError },
    }));
  }, [values.relacionAccudenEspecificacion, values.acreditacionEspecificacion]);

  return (
    <>
      <BackArrow route={PORTAL_ROUTES.LANDING_CENTER_FUTURE} />
      <FormTitleFuture
        mainTitle="Datos generales del Centro"
        titleFirst="Perfil del Centro"
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle=""
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
          <form className="w-full flex flex-col gap-3" autoComplete="off">
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_1}
              </label>
              <select
                name="tipoOrganizacion"
                className={`${
                  errors?.tipoOrganizacion?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.tipoOrganizacion}
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
              {errors?.tipoOrganizacion?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.tipoOrganizacion?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_2}
              </label>
              <select
                name="agenciaOMunicipio"
                className={`${
                  errors?.agenciaOMunicipio?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                value={values.agenciaOMunicipio}
                placeholder="Agencia o municipio"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              >
                {OPTION_TYPE_AGENCY_OR_CITY.map((item, key) => (
                  <option key={key} value={item.default}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.agenciaOMunicipio?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.agenciaOMunicipio?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_3}
              </label>
              {OPTION_CENTER_FINANCING.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="financiamientoCentro"
                      checked={values.financiamientoCentro.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.financiamientoCentro?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.financiamientoCentro?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_4}
              </label>
              {OPTION_CENTER_FUTURE_HOURS_OF_SERVICES.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="horarioServicio"
                      checked={values.horarioServicio.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.horarioServicio?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.horarioServicio?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_5}
              </label>
              {OPTION_CENTER_FUTURE_DAYS_SERVICES.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="diasServicio"
                      checked={values.diasServicio.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.diasServicio?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.diasServicio?.message}
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
                      type="checkbox"
                      name="poblacion"
                      checked={values.poblacion.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
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
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_7}
              </label>
              {OPTION_CENTER_FUTURE_YARD.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="patio"
                      checked={values.patio.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.patio?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.patio?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8}
              </label>
              {OPTION_CENTER_FUTURE_ACCREDITATIONS.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="acreditacion"
                      checked={values.acreditacion.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.acreditacion?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.acreditacion?.message}
                </span>
              )}
            </div>
            {values.acreditacion[0] === "Otra (Especifique)" ? (
              <div className="flex flex-col w-full mb-3">
                <label className="text-xs mb-1">
                  {
                    STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8_SPECIFICATION
                  }
                </label>
                <input
                  name="acreditacionEspecificacion"
                  className={`${
                    errors?.acreditacionEspecificacion?.error
                      ? "form-input-error "
                      : "form-input"
                  }`}
                  type="text"
                  maxLength={100}
                  value={values.acreditacionEspecificacion}
                  placeholder="Escriba las caracteristicas"
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBluerValidationInput(e.target.value, e.target.name)
                  }
                />
                {errors?.acreditacionEspecificacion?.error && (
                  <span className="text-xs text-red-500 font-semibold">
                    {errors?.acreditacionEspecificacion?.message}
                  </span>
                )}
              </div>
            ) : null}
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-4 ">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9}
              </label>
              {OPTION_CENTER_FUTURE_CENTER_RATIO.map((item, key) => (
                <div key={key}>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="relacionAccuden"
                      checked={values.relacionAccuden.includes(item.name)}
                      defaultValue={item.name}
                      onChange={(e) => handleOptionChange(e, key)}
                      onBlur={(e) => handleBlurOption(e, key)}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-xs">{item.name}</label>
                  </div>
                </div>
              ))}
              {errors?.relacionAccuden?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.relacionAccuden?.message}
                </span>
              )}
            </div>
            {values.relacionAccuden[0] === "Otra (Especifique)" ? (
              <div className="flex flex-col w-full mb-3">
                <label className="text-xs mb-1">
                  {
                    STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9_SPECIFICATION
                  }
                </label>
                <input
                  name="relacionAccudenEspecificacion"
                  className={`${
                    errors?.relacionAccudenEspecificacion?.error
                      ? "form-input-error "
                      : "form-input"
                  }`}
                  type="text"
                  maxLength={100}
                  value={values.relacionAccudenEspecificacion}
                  placeholder="Escriba las caracteristicas"
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBluerValidationInput(e.target.value, e.target.name)
                  }
                />
                {errors?.relacionAccudenEspecificacion?.error && (
                  <span className="text-xs text-red-500 font-semibold">
                    {errors?.relacionAccudenEspecificacion?.message}
                  </span>
                )}
              </div>
            ) : null}
            <FormCenterFutureCardMaster
              setIsvalidFormMaestro={setIsvalidFormMaestro}
              enviarSubmit={enviarSubmit}
              setEnviarSubmit={setEnviarSubmit}
              setValues={setValues}
            />
            <FormCenterFutureCardAssistant
              setIsvalidFormAsistente={setIsvalidFormAsistente}
              enviarSubmit={enviarSubmit}
              setEnviarSubmit={setEnviarSubmit}
              setValues={setValues}
            />

            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_13}
              </label>
              <input
                name="cantidadInfantes"
                className={`${
                  errors?.cantidadInfantes?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                min={0}
                type="number"
                maxLength={50}
                placeholder="0"
                value={values.cantidadInfantes}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadInfantes?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadInfantes?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_14}
              </label>
              <input
                name="cantidadMaternales"
                className={`${
                  errors?.cantidadMaternales?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                min={0}
                type="number"
                maxLength={50}
                value={values.cantidadMaternales}
                placeholder="0"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadMaternales?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadMaternales?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_15}
              </label>
              <input
                name="cantidadPreescolares"
                className={`${
                  errors?.cantidadPreescolares?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                min={0}
                type="number"
                maxLength={50}
                value={values.cantidadPreescolares}
                placeholder="0"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadPreescolares?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadPreescolares?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_16}
              </label>
              <input
                className={"form-input"}
                disabled
                value={(values.cantidadInfantes?.length > 0 &&
                values?.cantidadMaternales?.length > 0 &&
                values?.cantidadPreescolares?.length > 0
                  ? parseInt(values?.cantidadInfantes) +
                    parseInt(values?.cantidadMaternales) +
                    parseInt(values?.cantidadPreescolares)
                  : ""
                ).toString()}
                placeholder="0"
              />
            </div>
            <div className="flex flex-col w-full mb-3">
              <label className="text-xs mb-1">
                {STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_17}
              </label>
              <input
                name="cantidadTotalEmpleados"
                className={`${
                  errors?.cantidadTotalEmpleados?.error
                    ? "form-input-error "
                    : "form-input"
                }`}
                min={0}
                type="number"
                maxLength={50}
                value={values.cantidadTotalEmpleados}
                placeholder="0"
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.cantidadTotalEmpleados?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.cantidadTotalEmpleados?.message}
                </span>
              )}
            </div>
            <FormCenterFutureCardCollaborationAgreement
              setIsvalidFormAcuerdoColaboracion={
                setIsvalidFormAcuerdoColaboracion
              }
              enviarSubmit={enviarSubmit}
              setEnviarSubmit={setEnviarSubmit}
              setValues={setValues}
            />
            <div className="flex md:flex-row flex-col gap-6">
              <button
                className="form-btn-outline"
                type="button"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button className="form-btn" type="button" onClick={handleSubmit}>
                <SmallSpinner loading={loading} />
                {STRINGS.BUTTON_CONTINUE}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast
        ref={(ref) => (toastRef = ref)}
        onHide={() => {
          toastRef.clear();
          setVisibleToast(false);
        }}
      />
      <ConfirmDialog
        visible={confirmPopupVisible}
        onHide={() => setConfirmPopupVisible(false)}
        header={"Salir"}
        message={`¿Estas seguro que deseas salir?`}
        accept={() =>
          navigate(PORTAL_ROUTES.FORM_BASIC_INFORMATION_CENTERS_FUTURE)
        }
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
export default ProtectedComponent(FormGeneralInformationCenter);
