import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import FormTitle from "../../../components/Form/FormTitle";
import { PORTAL_ROUTES, STRINGS, MESES } from "../../../config/config";
import { useSelector } from "react-redux";
import { AccesaServices } from "../../../services/accesaSevices/AccesaServices";
import { Toast } from "primereact/toast";
import SmallSpinner from "../../../components/General/SmallSpinner";
import { format } from "date-fns";
import { scrollToTop } from "../../../components/utils";
/**
 * TermsConditions
 *
 * Esta view representa los terminos y condiciones de una solicitud de beca
 * de un empleado.
 *
 */
function TermsConditions() {
  // USE
  const {
    formAcademicData,
    formEmployee,
    formSupplier,
    formDocumentsRequired,
  } = useSelector((state) => state.employee);
  //STATE
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [loading, setLoading] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [isValidBody, setIsValidBody] = useState(true);
  const navigate = useNavigate();
  /**
   * Toast ref req.
   */
  let toastRef;
  /**
   *Funcion que permite volver a la pagina anterior beneficios
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.BENEFITS);
  }
  function obtenerNumeroMes(nombreMes) {
    const numeroMes = MESES.findIndex((mes) =>
      mes.toLowerCase().startsWith(nombreMes.toLowerCase())
    );

    return numeroMes;
  }
  /**
   *Funcion que permite ir a la pagina de solicitud exitosa y ademas
   *guardar la informacion de los formularios  de una solicitud de beca de un empleado.
   *
   */
  async function handleNext(e) {
    e.preventDefault();
    setLoading(true);

    const academicStartDate = formAcademicData.academicStartDate;
    const academicEndDate = formAcademicData.academicEndDate;
    const startWorkingDate = formSupplier.startWorkingDate;
    const [mes, anio] = startWorkingDate.split("-");
    const numeroMes = obtenerNumeroMes(mes);
    const academicStartDate0 = new Date(academicStartDate);
    const academicEndDate0 = new Date(academicEndDate);
    const fecha = new Date(anio, numeroMes, 1);
    const academicStartDate1 = format(
      academicStartDate0,
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    const academicEndDate1 = format(academicEndDate0, "yyyy-MM-dd'T'HH:mm:ss");
    const startWorkingDateFormate = format(fecha, "yyyy-MM-dd'T'HH:mm:ss");

    let body = {
      name: formEmployee.name,
      lastname: formEmployee.lastname,
      socialSecurity: formEmployee.socialSecurity,
      phoneNumber: formEmployee.phoneNumber,
      email: formEmployee.email,
      zipCode: formEmployee.codeZip,
      postalAddress: formEmployee.postalAddress,
      physicalAddress: formEmployee.physicalAddress,
      city: formEmployee.city,
      gender: formEmployee.gender,
      occupation: formEmployee.occupation,
      hasCDA: !!formEmployee.hasCDA,
      isWorkingWithProvider: !!formSupplier.isWorkingWithProvider,
      providerName: formSupplier.providerName,
      providerCity: formSupplier.providerCity,
      providerEntitytype: formSupplier.providerEntitytype,
      providerCategory: formSupplier.providerCategory,
      licensedHomeCareStatus: formSupplier.licensedHomeCareStatus,
      startWorkingDate: startWorkingDateFormate,
      workedHours: formSupplier.workedHours,
      educationalInstituteName: formAcademicData.educationalInstituteName,
      academicGrade: formAcademicData.academicGrade,
      courseName: formAcademicData.courseName,
      academicPeriod: formAcademicData.academicPeriod,
      academicStartDate: academicStartDate1,
      academicEndDate: academicEndDate1,
      academicPeriodCost: formAcademicData.academicPeriodCost,
      hasEconomicAid: !!formAcademicData.hasEconomicAid,
      hasStudentLoan: !!formAcademicData.hasStudentLoan,
    };
    isUndifinedField(body);
    let currentDate = new Date();
    const currentDat = format(currentDate, "yyyy-MM-dd");
    const validatePeriod = await getAccesaRequestIsPeriodOpen(currentDat);
    if (validatePeriod) {
      if (isValidBody && formDocumentsRequired !== null) {
        addAccesaRequest(body)
          .then((value) => {
            if (value?.id) {
              for (
                let index = 0;
                index < formDocumentsRequired.length;
                index++
              ) {
                addAccesaRequestDocuments(
                  formDocumentsRequired[index],
                  value?.id
                )
                  .then((value) => {
                    if (value) {
                      setSeverity("success");
                      setToastMsg(`${STRINGS.REQUEST_SUCCESSFUL}`);
                      setVisibleToast(true);
                      localStorage.removeItem("formEmployee");
                      localStorage.removeItem("formSupplier");
                      localStorage.removeItem("formAcademicData");
                      navigate(PORTAL_ROUTES.SUCCESSFULL_REQUEST);
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
              }
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
        setLoading(false);
        setSeverity("warn");
        setToastMsg(`${STRINGS.FIELD_INVALID}`);
        setVisibleToast(true);
      }
    } else {
      setLoading(false);
      setSeverity("warn");
      setToastMsg(`${STRINGS.PERIOD_INVALID}`);
      setVisibleToast(true);
    }
  }
  /**
   *Funcion que permite verificar si uno de los atributos del objeto body es indefinido
   *
   */
  function isUndifinedField(body) {
    for (var propiedad in body) {
      if (body[propiedad] === undefined) {
        setIsValidBody(false);
        return false;
      }
    }
  }
  /**
   *Funcion que permite consumir el endpoint saber si hay periodos validos
   *
   */
  async function getAccesaRequestIsPeriodOpen(periodoValidate) {
    const { status } = await new AccesaServices().getAccesaRequestIsPeriodOpen(
      periodoValidate
    );
    return status;
  }
  /**
   *Funcion que permite consumir el endpoint para guardar los datos de la solicitud de beca de un empleado
   *
   */
  async function addAccesaRequest(dat) {
    const { data } = await new AccesaServices().addRequestAccesa(dat);
    return data;
  }
  /**
   *Funcion que permite consumir el endpoint para guardar los documentos requeridos
   *
   */
  async function addAccesaRequestDocuments(file, id) {
    const { data } =
      await new AccesaServices().addDocumentRequeridAplicationEmployee(
        file,
        id
      );
    return data;
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
  /**
   *Efecto que permite supervisar la navegacion.
   *
   */
   useEffect(() => {
    scrollToTop();
  }, [navigate]);
  // RENDER
  return (
    <>
      <Link to="/">
        <div className="flex flex-row justify-start items-center p-4 ml-4 ">
          <ArrowLeftIcon className="acu-blue w-6 mt-1" />
          <h4 className="exit-text ml-1">| {STRINGS.BUTTON_EXIT}</h4>
        </div>
      </Link>
      <FormTitle
        mainTitle="Términos y Condiciones"
        // eslint-disable-next-line react/style-prop-object
        style="font-bold text-2xl mt-2"
        secondTitle=""
        subTitle="Certifico que he leido las Guías del Programa ACCESA (ACUDEN Child Care Educational Scholarship Award), y que entiendo y acepto los términos y condiciones que dispone. <br/> <br/> Certifico que cumplo con los requisitos de elegibilidad dispuestos en las Guías del Programa ACCESA. <br/> <br/> Certifico, so pena de nulidad, que toda la información incluida en esta solicitud es completamente verdadera."
        children=""
        url="true"
      />
      <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row gap-6">
              <button
                className="form-btn-outline"
                type="submit"
                onClick={handleBack}
              >
                {STRINGS.BUTTON_BACK}
              </button>
              <button className="form-btn" type="button" onClick={handleNext}>
                <SmallSpinner loading={loading} />
                {STRINGS.BUTTON_CONTINUE_ACCEPT}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast
        ref={(ref) => (toastRef = ref)}
        onHide={() => {
          toastRef.clear();
          setVisibleToast(false);
        }}
      />
    </>
  );
}
export default TermsConditions;
