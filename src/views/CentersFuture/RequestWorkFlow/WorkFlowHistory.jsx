/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calculateScoreDifferenceAndPercentage,
  formatDate,
  isObjEmpty,
  justifyRequestId,
} from "../../../components/utils";
import {
  CDF_LOG_TYPE,
  CONSTANTS,
  ENTITY_STATUS,
  HTTP,
  LOG_ACTION_TYPES,
  PORTAL_ROUTES,
  STRINGS,
} from "../../../config/config";
import useCDFWorkFlow from "../../../hooks/MyRequestCentersFuture/useCDFWorkFlow";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import BackArrowExtended from "../../../components/BackArrow/BackArrowExtended";
import { Session } from "../../../services/Session";
import useCDFQuestionnaire from "../../../hooks/MyRequestCentersFuture/useCDFQuestionnaire";
import { Toast } from "primereact/toast";
import { CenterFutureServices } from "../../../services/centerFutureServices/CenterFutureServices";
import DynamicTimeLineCard from "../../../components/CentersFuture/DynamicTimeLineCard";
import useCDFScoreResults from "../../../hooks/MyRequestCentersFuture/useCDFScoreResults";
/**
 * This component displays the workflow history for a Center of the Future request in the CDF portal.
 * It shows logs, questionnaires, evaluation forms, and score results.
 *
 * @component
 * @version 1.0.0
 */
const WorkFlowHistory = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { data, requestNumber } = location.state.request;
  const [wfRefresh, setWFRefresh] = useState(0);
  const { isLoading, logData } = useCDFWorkFlow(requestNumber, wfRefresh);
  const {
    isLoading: questionnaireLoading,
    questionnaire,
    questionnaireListDTO,
    questionWithAnswers,
    setQuestionWithAnswers,
  } = useCDFQuestionnaire(requestNumber);

  const [severity, setSeverity] = useState("warn");
  const [toastMsg, setToastMsg] = useState("");
  const [summary, setSummary] = useState("Mensaje");
  const [visibleToast, setVisibleToast] = useState(false);
  const [toastLife, setToastLive] = useState(3000);
  const [showModal, setShowModal] = useState(false);
  const [evaluationLoading, setEvaluationLoading] = useState(false);

  const { scoreResults, scoreResultsDTO } = useCDFScoreResults(requestNumber)

  const providerProfile = Session.getProviderProfile();

  /**
   * Toast ref req.
   */
  let toastRef;

  /**
   * useEffect to display the Toast component when `visibleToast` changes.
   */
  useEffect(() => {
    if (visibleToast) {
      toastRef.show({
        severity: severity,
        detail: toastMsg,
        summary: summary,
        life: toastLife,
      });
    }
  }, [visibleToast]);
  /**
   * Handles navigation to a specific route using the 'navigate' function.
   * @version 1.0.0
   * @param {string} route - The route to navigate to.
   */
  const handlerNavigationLinks = (route) => {
    navigate(route, {
        state: {
          request: {
            questionnaire,
            requestNumber,
            data,
            questionWithAnswers,
          },
        },
      });
  };
  /**
   * Handles the action to open the questionnaire.
   * @version 1.0.2
   * @param {Object} questionnaire - The questionnaire object to open.
   * @param {boolean} approved - state of questionnaire.
   * @return {void}
   */
  const handlerOpenQuestionnaire = (questionnaire = {}, approved = false) => {
    if (isObjEmpty(questionnaire)) {
      setSummary(STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST);
      setToastMsg(STRINGS.CDF_QUESTIONNAIRE_ERROR_MSG);
      setVisibleToast(true);
    } else {
      navigate(PORTAL_ROUTES.CDF_THEMATIC_TABLE_ROUTE, {
        state: {
          request: {
            questionnaire,
            requestNumber,
            data,
            questionWithAnswers,
            approved
          },
        },
      });
    }
  };
  /**
   * Handles the action to open questionnaire score / results.
   * @version 1.0.1
   * @return {void}
   */
  const openScoreHandler = () => {
    navigate(PORTAL_ROUTES.CDF_RESULTS_ROUTE, {
      state: {
        request: {
          requestNumber,
          data,
          scoreResultsDTO,
          scoreResults,
        },
      },
    });
  };
  /**
   * Handle the submission of the evaluation form.
   * @version 1.0.0
   * @param {Object} evaluationData - The data submitted from the evaluation form.
   */
  const handleSubmitEvaluation = async (evaluationData) => {
    setEvaluationLoading(true);

    const {
      isValid,
      difference,
      percentageNeeded,
      total,
      sumOfScores,
      progress,
    } = calculateScoreDifferenceAndPercentage(questionnaireListDTO);

    if (isValid) {
      try {
        setSummary(STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST);

        const { data, status } =
          await CenterFutureServices.submitCDFQuestionnaireEvaluation(
            requestNumber,
            evaluationData
          );

        if (status === HTTP.OK) {
          setSeverity("success");
          setToastMsg(STRINGS.CDF_EVALUATION_SUBMIT_SUCCESS);
          setVisibleToast(true);
          setToastLive(2000);
          setTimeout(async () => {
            await createRequestLog({
              cdfAccreditationId: requestNumber,
              cdfActivityLogType: CDF_LOG_TYPE.COMPLETED,
              title: STRINGS.THEMATIC_HEADER_DEFAULT_TITLE_PLURAL,
              description: STRINGS.CDF_SUBMIT_EVALUATION_LOG_DESCRIPTION,
              status: ENTITY_STATUS.ACTIVE,
              cdfActivityLogActionList: [LOG_ACTION_TYPES.BASIC],
              instructions: null,
            });
          }, 5000);
        } else {
          setSeverity("warn");
          setToastMsg(STRINGS.CDF_EVALUATION_SUBMIT_ERROR);
        }
      } catch (error) {
        console.log(
          `Error on submit evaluation. RequestId: ${requestNumber}, error: ${error}`
        );
        setSeverity("error");
        setToastMsg(STRINGS.GENERIC_ERROR);
      } finally {
        setEvaluationLoading(false);
        setShowModal(false);
        setToastLive(4000);
        setVisibleToast(true);
      }
    } else {
      setEvaluationLoading(false);
      setSeverity("error");
      setSummary(STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST);
      setToastMsg(
        `${STRINGS.CDF_EVALUATION_SUBMIT_ERROR_P1}${progress}
                ${STRINGS.CDF_EVALUATION_SUBMIT_ERROR_P2}
                ${total}${STRINGS.CDF_EVALUATION_SUBMIT_ERROR_P3}
                ${percentageNeeded}${STRINGS.CDF_EVALUATION_SUBMIT_ERROR_P4}`
      );
      setToastLive(10000);
      setVisibleToast(true);
    }
  };
  /**
   * Open the evaluation modal for the user to provide evaluation details.\
   */
  const openEvaluationModal = () => {
    setEvaluationLoading(false);
    setShowModal(true);
  };
  /**
   * @name createRequestLog
   * This function is used to create a log for a request event and display a corresponding toast message.
   * @version 1.0.1
   * @param {object} log - The log object containing information about the request event.
   * @return {void}
   */
  const createRequestLog = async (log) => {
    try {
      const { data, status } = await CenterFutureServices.createRequestLog(log);

      setSummary(STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST);

      if (status === HTTP.OK) {
        setSeverity("success");
        setToastMsg(STRINGS.CDF_GENERIC_SUBMIT_LOG_SUCCESS);
        setWFRefresh((prevState) => prevState + 1);
      } else {
        setSeverity("warn");
        setToastMsg(STRINGS.CDF_GENERIC_SUBMIT_LOG_FAIL);
      }
    } catch (error) {
      console.log(`Error on createRequestLog jsx: ${error}`);
      setSeverity("error");
      setToastMsg(STRINGS.CDF_GENERIC_SUBMIT_LOG_FAIL);
    } finally {
      setVisibleToast(true);
    }
  };

  return (
    <>
      {isLoading || questionnaireLoading ? (
        <div className="flex flex-col h-login-screen w-full items-center justify-center">
          <PulseLoader
            color={CONSTANTS.LOADING_SPINNER_COLOR}
            size={CONSTANTS.DEFAULT_PULSAR_SIZE}
            className="m-5 p-5"
          />
        </div>
      ) : (
        <div>
          <div className="flex px-3 mt-6 lg:ml-24">
            <BackArrowExtended
              route={PORTAL_ROUTES.MY_REQUEST_CENTERS_FUTURE}
              text={STRINGS.MY_REQUEST_CDF}
            />
          </div>
          <div className="flex px-3 pb-20 pt-10 flex-col gap-3 md:flex-row justify-between md:items-center w-full max-w-5xl mx-auto">
            <p className="text-lg font-semibold">
              Solicitud #{justifyRequestId(requestNumber, 5)} Centros del Futuro
            </p>
            <p className="text-sm">
              Fecha de Solictud:{" "}
              {data.createdOn
                ? formatDate(data.createdOn)
                : STRINGS.DEFAULT_ON_EMPTY}
            </p>
            <div className="flex flex-row gap-3 items-center text-darkblue">
              <img
                src={Session.getLogoImage()}
                className="bg-blue-400 rounded-full h-12 w-12 overflow-hidden"
                alt="icon"
              />
              <div className="flex flex-col">
                <p className="font-medium">
                  {data.cdfProviderInformation.provider.ownerFullName ||
                    STRINGS.DEFAULT_ON_EMPTY}
                </p>
                <a href="#1" className="text-xs">
                  Contácto
                </a>
              </div>
            </div>
          </div>

          <section className="bg-gray-100 w-full py-20 px-3">
            <div className="flex flex-col gap-3 md:gap-6 w-full max-w-5xl mx-auto">
              {logData && logData.length > 0
                ? logData.map((log, index) => {
                    return (
                      <DynamicTimeLineCard
                        keyIndex={index}
                        log={log}
                        logData={logData}
                        providerProfile={providerProfile}
                        logLength={logData.length}
                        handlerNavigationLinks={handlerNavigationLinks}
                        questionnaire={questionnaire}
                        questionnaireListDTO={questionnaireListDTO}
                        handlerOpenQuestionnaire={handlerOpenQuestionnaire}
                        openScoreHandler={openScoreHandler}
                        openEvaluationModal={openEvaluationModal}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        evaluationLoading={evaluationLoading}
                        handleSubmitEvaluation={handleSubmitEvaluation}
                        scoreResults={scoreResults}
                      />
                    );
                  })
                : null}
            </div>
          </section>
        </div>
      )}
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

export default ProtectedComponent(WorkFlowHistory);
