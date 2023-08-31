/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { justifyRequestId } from "../../../components/utils";
import { CONSTANTS, PORTAL_ROUTES, STRINGS } from "../../../config/config";
import Results from "./Results";
import ThematicScoreCards from "./ThematicScoreCards";
import ScoreDefinitions from "./ScoreDefinitions";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BackArrowExtended from "../../../components/BackArrow/BackArrowExtended";
import { PulseLoader } from "react-spinners";
import { CenterFutureServices } from "../../../services/centerFutureServices/CenterFutureServices";
import certificadoCDF from "../../../assets/documents/Certificados.Centros.del.Futuro.pdf";
import { Toast } from "primereact/toast";

/**
 * Renders the score-related results and information for a specific request.
 *
 * @component
 * @version 1.0.0
 * @returns {JSX.Element} - The JSX element representing the ScoreResults component.
 */
const ScoreResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);

  const {
    data: dat,
    requestNumber,
    scoreResultsDTO,
    scoreResults,
  } = location.state.request;
 
  /**
   * Toast ref req.
   */
  let toastRef;
  /**
   * Handles the extended route event, navigating to a specific route with additional state data.
   * @return {void}
   */
  const onExtendedRouteEvent = () => {
    navigate(PORTAL_ROUTES.CDF_HISTORY_ROUTE, {
      state: {
        request: {
          dat,
          requestNumber,
        },
      },
    });
  };
  /**
   * Handles the action to download the certification for the request.
   *
   * @function
   * @version 1.0.1
   * @returns {void}
   */

  const downloadCertificationHandler = async () => {
    const { data } = await new CenterFutureServices().getCertificateScoresFile(
      dat.id
    );
    if (data) {
      const url = URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificado-CDF-${justifyRequestId(
        requestNumber,
        5
      )}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } else {
      setSeverity("warn");
      setSummary("Certificación");
      setToastMsg("No se ha encontrado el archivo.");
      setVisibleToast(true);
    }
  };
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
      <div>
        <section className="w-full p-3">
          {scoreResultsDTO.length < 1 ? (
            <div className="flex flex-col h-login-screen w-full items-center justify-center">
              <PulseLoader
                color={CONSTANTS.LOADING_SPINNER_COLOR}
                size={CONSTANTS.DEFAULT_PULSAR_SIZE}
                className="m-5 p-5"
              />
            </div>
          ) : (
            <>
              <div className="flex px-3 mt-6 lg:ml-20">
                <BackArrowExtended
                  extendedHandler={onExtendedRouteEvent}
                  text={STRINGS.MY_REQUEST_CDF}
                />
              </div>
              <div className="mx-auto w-full max-w-5xl mt-4">
                <h2 className="py-3 text-gray-700 font-semibold text-lg">
                  {`Solicitud #${justifyRequestId(requestNumber, 5)}  ${
                    STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST
                  }`}
                </h2>

                <h1 className="text-center font-semibold text-darkblue text-2xl py-3 mb-8 max-w-md mx-auto">
                  {STRINGS.THEMATIC_RESULTS_TITLE}
                </h1>

                <p className="mb-8 text-gray-700 max-w-md mx-auto text-justify text-sm">
                  {STRINGS.THEMATIC_RESULTS_MESSAGE}
                </p>
              </div>

              <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                {scoreResultsDTO &&
                  scoreResultsDTO.length > 0 &&
                  scoreResultsDTO.map((score, index) => (
                    <ThematicScoreCards key={index} configuration={score} />
                  ))}
              </div>

              <Results
                score={scoreResults.finalScore}
                downloadHandler={downloadCertificationHandler}
              />

              <ScoreDefinitions />
            </>
          )}
        </section>
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
};

export default ProtectedComponent(ScoreResults);