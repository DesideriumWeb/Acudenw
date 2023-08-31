/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useEffect, useState } from "react";
import { TITLE_QUESTION_CDF_FORM } from "../../config/config";
/**
 * Custom hook get data basic information and general information cdf.
 * @version 1.0.1
 */
export default function useDetailsMyRequestCDF(data) {

  const [basicInformationData, setBasicInformationData] = useState([]);
  const [informationGeneralData, setInformationGeneralData] = useState([]);
  const [idRequest, setIdRequest] = useState("");
  const [logMyRequestCDF, setLogMyRequestCDF] = useState(data);

  useEffect(() => {
    const getInformationDetailstMyRequestCDF = () => {

      if (logMyRequestCDF) {

        const infante =
          logMyRequestCDF.cdfProviderInformation?.isInfantConsidered === true
            ? "Infantes"
            : "";

        const maternal =
          logMyRequestCDF.cdfProviderInformation?.isMaternalConsidered === true
            ? "Maternales"
            : "";

        const preescolar =
          logMyRequestCDF.cdfProviderInformation?.isPreschoolConsidered === true
            ? "Preescolares"
            : "";

        const poblation = [infante, maternal, preescolar];

        const horarioA = JSON.stringify(logMyRequestCDF.cdfProviderInformation.provider?.schedule);

        const horarioString = horarioA
          .replace(/"|{|}/g, "")
          .replace(/\\/g, "")
          .replace(/,/g, ", ")
          .replace(/\\n/g, "\n");

        const serviceDay =
          logMyRequestCDF.cdfProviderGeneral?.serviceDays === null
            ? ""
            : logMyRequestCDF.cdfProviderGeneral?.serviceDays;

        const diasServicio = [serviceDay];

        const newObject = {
          name: logMyRequestCDF.cdfProviderInformation.provider?.name ?? "",
          nombreDirigeCentro: logMyRequestCDF.cdfProviderInformation.provider?.ownerFullName ?? "",
          phoneNumber: logMyRequestCDF.cdfProviderInformation.provider?.phoneNumber1 ?? "",
          city: logMyRequestCDF.cdfProviderInformation.provider?.country ?? "",
          physicalAddress: logMyRequestCDF.cdfProviderInformation.provider?.addressLine1 ?? "",
          postalAddress: logMyRequestCDF.cdfProviderInformation.provider?.addressLine2 ?? "",
          email: logMyRequestCDF.cdfProviderInformation.provider?.email ?? "",
          web: logMyRequestCDF.cdfProviderInformation.provider?.websiteUrl ?? "",
          horarioAdministrativo: horarioString ?? "",
          poblacion: poblation ?? "",
          cantidadSalones: logMyRequestCDF.cdfProviderInformation?.hallsQuantity ?? "",
          cantidadNinos: logMyRequestCDF.cdfProviderInformation.provider?.kidQTyWithSubsidy ?? "",
          infantes: logMyRequestCDF.cdfProviderInformation.provider?.infantCapacity ?? "",
          maternales: logMyRequestCDF.cdfProviderInformation.provider?.maternalCapacity ?? "",
          preescolares: logMyRequestCDF.cdfProviderInformation.provider?.preschoolCapacity ?? "",
          total:
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.infantCapacity
            ) +
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.maternalCapacity
            ) +
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.preschoolCapacity
            ),
          ninosDiversidad: logMyRequestCDF.cdfProviderInformation.provider?.ninosDiversidad ?? true, //preguntar falta incluir
          diversidad: logMyRequestCDF?.diversidad ?? "",
          tipoOrganizacion: logMyRequestCDF.cdfProviderGeneral?.tipoOrganizacion ?? "Cooporacion sin fines de lucro", // preguntar
          agenciaOMunicipio: logMyRequestCDF.cdfProviderGeneral?.agenciaOMunicipio ?? "Agencia", //preguntar
          financiamientoCentro: logMyRequestCDF.cdfProviderGeneral?.financiamientoCentro ?? ["Fondos privados", "Child Care"], //preguntar
          horarioServicio: logMyRequestCDF.cdfProviderGeneral
            ?.horarioServicio ?? [
            "Tiempo completo (6 horas o más al día)",
            "Fines de semana",
          ], // preguntar
          diasServicio: diasServicio ?? "",
          poblacionGeneral: poblation ?? "", //preguntar si es la misma poblacion
          patio: logMyRequestCDF.cdfProviderGeneral?.patio ?? [
            "No cuenta con patio",
          ], //preguntar
          acreditacion: logMyRequestCDF.cdfProviderGeneral?.acreditacion ?? [
            "Certificación Proveedor elegible de Child Care",
          ], //preguntar
          acreditacionEspecificacion:
            logMyRequestCDF?.acreditacionEspecificacion ?? "", //preguntar
          relacionAccuden: logMyRequestCDF.cdfProviderGeneral
            ?.acudenRelations ?? [
            "Centro participante Programa Vales",
            "Centro administrado",
          ],
          relacionAccudenEspecificacion: logMyRequestCDF?.relacionAccudenEspecificacion ?? "", //preguntar
          maestro: logMyRequestCDF.cdfProviderGeneral?.cdfProviderTeachers ?? "",
          asistente: logMyRequestCDF.cdfProviderGeneral?.cdfProviderTeachers ?? "",
          cantidadInfantes: logMyRequestCDF.cdfProviderInformation.provider?.infantCapacity ?? "",
          cantidadMaternales: logMyRequestCDF.cdfProviderInformation.provider?.maternalCapacity ?? "",
          cantidadPreescolares: logMyRequestCDF.cdfProviderInformation.provider?.preschoolCapacity ?? "",
          cantidadTotalNinos:
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.infantCapacity
            ) +
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.maternalCapacity
            ) +
            parseInt(
              logMyRequestCDF.cdfProviderInformation.provider?.preschoolCapacity
            ),
          cantidadTotalEmpleados:
            logMyRequestCDF.cdfProviderGeneral?.employeesTotal ?? "",
          acuerdoColaboracion:
            logMyRequestCDF.cdfProviderGeneral?.cdfProviderAgreements ?? "",
        };
        const arrayRes = Object.values(newObject);
        const newArray = [];
        for (let i = 0; i < arrayRes.length; i++) {
          if (i >= 0 && i < 37) {
            const pregunta = TITLE_QUESTION_CDF_FORM[i];
            const preguntaKey = Object.values(pregunta)[0];
            const respuestaValue = arrayRes[i];
            const newObj = { [preguntaKey]: respuestaValue };
            newArray.push(newObj);
          }
        }
        const firstArray = newArray.slice(0, 18);
        const secondArray = newArray.slice(18, 38);
        setBasicInformationData(firstArray);
        setInformationGeneralData(secondArray);
        setIdRequest(logMyRequestCDF.id);
      }
    };
    getInformationDetailstMyRequestCDF();
  }, [logMyRequestCDF]);

  return { basicInformationData, informationGeneralData, idRequest };
}
