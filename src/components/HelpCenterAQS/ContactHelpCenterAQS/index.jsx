/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import { STRINGS } from "../../../config/config";
import { checkITextIsValid, checkIfEmailIsValid } from "../../utils";
import { Toast } from "primereact/toast";

/**
 * Formulario que representa el contacto Acuden
 * @returns
 */
export const ContactHelpCenterAQS = () => {
  const [sendData, setSendData] = useState({
    name: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);
  const [loading, setLoading] = useState(false);
  /**
   * Toast ref req.
   */
  let toastRef;
  /**
   *Objeto que permite validar cada uno de los campos del formulario
   *
   */
  const validators = {
    name: checkITextIsValid,
    lastname: checkITextIsValid,
    email: checkIfEmailIsValid,
    subject: checkITextIsValid,
    message: checkITextIsValid,
  };
  /**
   *Funcion que permite guardar la data del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    validationRequiredInput(sendData);
    if (Object.values(errors).length === 5) {
      let isValidForm = Object.values(errors).every(
        (item) => item?.error === false
      );
      if (isValidForm) {
        const mailtoLink = `mailto:${
          sendData.email
        }?subject=${encodeURIComponent(
          sendData.subject
        )}&body=${encodeURIComponent(`Hola, soy ${sendData.name} ${sendData.lastname}.\n\n Solicitud.\n\n${sendData.message}`)}`;
        window.location.href = mailtoLink;
      }else{
        setLoading(false);
        setSeverity("warn");
        setToastMsg(`${STRINGS.HELP_CENTER_FIELD_INVALID}`);
        setVisibleToast(true);
      }
    }else{
      setLoading(false);
      setSeverity("warn");
      setToastMsg(`${STRINGS.HELP_CENTER_FIELD_INVALID}`);
      setVisibleToast(true);
    }
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
   *Funcion que permite setear la data cuando hay algun cambio  en un input
   *
   */
  const handleChange = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };
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
   *Funcion que retorna el mensaje de error de cada uno de los campos del formulario
   *
   */
   function customMessage(nameInput) {
    const restrictedInputs = ["name", "lastname", "email", "subject", "message"];
    
    if (restrictedInputs.includes(nameInput)) {
      return STRINGS.SPECIAL_CHARACTERS_ARE_NOT_ALLOWED;
    }
    
    return "";
  }
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
  return (
    <>
      <section
        id={STRINGS.MENU_BUTTON_CONTACT}
        className="p-3 py-10 bg-[#BBF2DD]"
      >
        <div className="flex flex-col w-full max-w-xl mx-auto bg-white rounded-md p-8">
          <h1 className="text-center font-semibold text-2xl my-2">
            {STRINGS.HELP_CENTER_TITLE_CONTACT}
          </h1>
          <p className="text-center font-semibold text-[#092C4C]">
            {STRINGS.HELP_CENTER_TITLE_CONTACT_1}
          </p>
          <form
            className="grid grid-cols-2 gap-2 py-8 text-sm gap-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label>{STRINGS.HELP_CENTER_CONTACT_FIELD_NAME}</label>
              <input
                className={`${
                  errors?.name?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="name"
                maxLength={50}
                placeholder="Nombre"
                value={sendData.name}
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
            <div className="flex flex-col gap-1">
              <label>{STRINGS.HELP_CENTER_CONTACT_FIELD_lAST_NAME}</label>
              <input
                className={`${
                  errors?.lastname?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="lastname"
                maxLength={50}
                placeholder="Apellido"
                value={sendData.lastname}
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
            <div className="flex flex-col gap-1 col-span-2">
              <label>{STRINGS.HELP_CENTER_CONTACT_FIELD_E_MAIL}</label>
              <input
                className={`${
                  errors?.email?.error ? "form-input-error " : "form-input"
                }`}
                type="email"
                name="email"
                maxLength={50}
                placeholder="Correo electrónico"
                value={sendData.email}
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
            <div className="flex flex-col gap-1 col-span-2">
              <label>{STRINGS.HELP_CENTER_CONTACT_FIELD_SUBJECT}</label>
              <input
                className={`${
                  errors?.subject?.error ? "form-input-error " : "form-input"
                }`}
                type="text"
                name="subject"
                maxLength={50}
                placeholder="Asunto"
                value={sendData.subject}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.subject?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.subject?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label>{STRINGS.HELP_CENTER_CONTACT_FIELD_MESSAGE}</label>
              <textarea
                className={`${
                  errors?.message?.error
                    ? "form-input-error border border-gray-400 rounded-md outline-none p-2 h-32"
                    : "form-input border border-gray-400 rounded-md outline-none p-2 h-32"
                }`}
                name="message"
                maxLength={250}
                placeholder="Mensaje"
                value={sendData.message}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBluerValidationInput(e.target.value, e.target.name)
                }
              />
              {errors?.message?.error && (
                <span className="text-xs text-red-500 font-semibold">
                  {errors?.message?.message}
                </span>
              )}
            </div>
            <div className="flex justify-center col-span-2">
              <button
                className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md "
                type="submit"
              >
                {STRINGS.HELP_CENTER_MENU_BUTTON_SEND}
              </button>
            </div>
          </form>
        </div>
      </section>
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
