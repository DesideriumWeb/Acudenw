/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import TimeLineCard from "./TimeLineCard";
import {CDF_LOG_TYPE, LOG_ACTION_TYPES, PORTAL_ROUTES, STRINGS} from "../../config/config";
import Title from "./Title";
import React from "react";
import {Session} from "../../services/Session";
import {FaCalendarAlt, FaClock, FaRocket, FaUser} from "react-icons/fa";
import {
    capitalizeFirstLetter,
    doesActionTypeExist, formatCDFPopulationTitle,
    formatDate,
    formatTimeTo12Hour,
    getCDFThemeColor, getColorForScore, getNameForScore, hasTypeInLogArray
} from "../utils";
import Instruction from "./Instruction";
import EvaluationModal from "./EvaluationModal";
import PropTypes from "prop-types";
import { RiBarChartBoxFill } from "react-icons/ri";
/**
 * A dynamic timeline card component displaying various information about an activity log.
 * @version 1.0.0
 * @param {object} props - The component props.
 * @param {number} props.keyIndex - The unique key index of the timeline card.
 * @param {object} props.log - The log data object for the timeline card.
 * @param {array} props.logData - The complete log data array for the timeline card.
 * @param {object} [props.providerProfile={}] - The provider profile data.
 * @param {number} props.logLength - The total number of logs in the timeline.
 * @param {function} [props.handlerNavigationLinks=null] - Handler for navigation links.
 * @param {object} [props.questionnaire=null] - The questionnaire data object.
 * @param {array} [props.questionnaireListDTO=null] - The list of questionnaire data.
 * @param {function} [props.handlerOpenQuestionnaire=null] - Handler for opening questionnaires.
 * @param {function} [props.openScoreHandler=null] - Handler for opening questionnaires scores.
 * @param {function} [props.openEvaluationModal=null] - Handler for opening the evaluation modal.
 * @param {boolean} [props.showModal=false] - Flag to show or hide the modal.
 * @param {boolean} [props.evaluationLoading=false] - Flag to indicate loading of evaluation.
 * @param {function} [props.setShowModal=null] - Function to set the modal visibility.
 * @param {function} [props.handleSubmitEvaluation=null] - Handler for submitting evaluation.
 * @param {object} [props.scoreResults=null] - The score data object.
 * @returns {JSX.Element} A dynamic timeline card component.
 */
const DynamicTimeLineCard = ({
                                 keyIndex,
                                 log = {},
                                 logData = [],
                                 providerProfile = {},
                                 logLength = 0,
                                 handlerNavigationLinks = null,
                                 questionnaire= null,
                                 questionnaireListDTO= null,
                                 handlerOpenQuestionnaire = null,
                                 openScoreHandler = null,
                                 openEvaluationModal = null,
                                 showModal= false,
                                 evaluationLoading= false,
                                 setShowModal = null,
                                 handleSubmitEvaluation = null,
                                 scoreResults = {}
}) => {

    return(
        <TimeLineCard key={keyIndex} type={log.cdfActivityLogType} last={keyIndex + 1 === logLength ? CDF_LOG_TYPE.LAST : null}>
            <div className="flex flex-col gap-4">

                <Title type={log.cdfActivityLogType}>{log.title || STRINGS.DEFAULT_ON_EMPTY}</Title>

                <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">

                    <div className="flex flex-row gap-3 items-center text-darkblue">
                        {providerProfile.email === log.createdBy ? (
                            <img
                                src={Session.getLogoImage()}
                                className="object-cover bg-blue-400 rounded-full h-10 w-10 overflow-hidden"
                                alt="icon"
                            />
                        ) : (
                            <FaUser className="object-cover rounded-full border-1 h-10 w-10 overflow-hidden" />
                        )}
                        <div className="flex flex-col">
                            {
                                providerProfile.email === log.createdBy ?
                                    (
                                        <p className="font-medium">
                                            {providerProfile.ownerFullName || STRINGS.DEFAULT_ON_EMPTY}
                                        </p>
                                    )
                                    :
                                    (
                                        <p className="font-medium">
                                            {log.createdBy || STRINGS.DEFAULT_ON_EMPTY}
                                        </p>
                                    )
                            }
                            <a href="#" className="text-xs">
                                Contacto
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center gap-1">
                            <FaCalendarAlt color="#092C4C" className="mb-1"/>
                            <div>
                                {log.createdOn ? formatDate(log.createdOn) : STRINGS.DEFAULT_ON_EMPTY}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaClock color="#092C4C" className="mb-1"/>
                            <div>
                                {log.createdOn ? formatTimeTo12Hour(log.createdOn) : STRINGS.DEFAULT_ON_EMPTY}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">

                    <p className="text-sm">{log.description || STRINGS.DEFAULT_ON_EMPTY}</p>

                    {providerProfile.email === log.createdBy ? (
                        <button
                            onClick={() =>
                                handlerNavigationLinks && handlerNavigationLinks(`${PORTAL_ROUTES.DETAILTS_REQUEST_CENTERS_FUTURE}${providerProfile.id}`)
                            }
                            className="border border-darkblue text-darkblue rounded p-2
                                                                                px-4 font-medium hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A]
                                                                                hover:shadow-md transition-all"
                        >
                            Ver Perfil del Centro
                        </button>
                    ) : null}
                </div>

                {
                    typeof log.instructions === 'string' && true && log.instructions.length > 0 ? <Instruction instruction={log.instructions}/> : null
                }

                {/*Dynamic Questionnaire Functionality*/}

                {
                    doesActionTypeExist(LOG_ACTION_TYPES.QUESTIONNAIRE, log.cdfActivityLogActionList) &&
                    (questionnaire && questionnaireListDTO.length > 0 ? (
                        <>
                            <table className="w-full border-separate border-spacing-y-4">
                                <thead>
                                <tr className="text-lg font-medium">
                                    <th className="text-left"></th>
                                    <th className="text-left px-2">Evaluación</th>
                                    <th className="text-left px-2">Porciento completado</th>
                                    <th className="text-left font-normal"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {questionnaire && questionnaireListDTO && questionnaireListDTO.map((q, index) => (
                                    <tr
                                        key={index}
                                        style={{ boxShadow: "0px 0px 4px #9996" }}
                                        className="bg-white  rounded-xl"
                                    >
                                        <td className={`p rounded-l-xl ${getCDFThemeColor(q.theme)} text-white font-bold w-12`}>
                                            <p className="mx-auto text-center">{capitalizeFirstLetter(q.theme)}</p>
                                        </td>
                                        <td className="p-2 max-w-sm text-sm md:text-base">
                                            {`${q.name || STRINGS.DEFAULT_ON_EMPTY}: ${q.description || STRINGS.DEFAULT_ON_EMPTY} ${q.population && formatCDFPopulationTitle(q.population)}`}
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row items-center gap-1">
                                                    <div className="bg-gray-200 flex-1 h-[3px] mx-2">
                                                        <div
                                                            className={`h-full ${q.progress === 100 ? 'bg-acuGreen' : 'bg-darkblue'}`}
                                                            style={{ width: `${q.progress ?? 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className={`${q.progress === 100 ? 'text-acuGreen font-bold' : 'text-darkblue font-semibold'}`}>
                                                        { q.progress ?? 0}%
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handlerOpenQuestionnaire && handlerOpenQuestionnaire(q, hasTypeInLogArray(logData, CDF_LOG_TYPE.APPROVED))}
                                                    className="p-2 text-sm border-2 border-cyan-900 text-cyan-900 font-semibold rounded-md md:hidden
                                                    hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all">
                                                    { STRINGS.CDF_EVALUATION_OPEN_QUESTIONNAIRE }
                                                </button>
                                            </div>
                                        </td>

                                        <td className="p-2 rounded-r-xl text-right w-fit hidden md:block">
                                            <button
                                                onClick={() => handlerOpenQuestionnaire && handlerOpenQuestionnaire(q, hasTypeInLogArray(logData, CDF_LOG_TYPE.APPROVED))}
                                                className="py-2 px-4 text-sm border-2 border-cyan-900 text-cyan-900 font-semibold rounded-md
                                                hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all">
                                                { STRINGS.CDF_EVALUATION_OPEN_QUESTIONNAIRE }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {
                                !hasTypeInLogArray(logData, CDF_LOG_TYPE.APPROVED) &&
                                (
                                    <>
                                        <EvaluationModal
                                            loading={evaluationLoading}
                                            showModal={showModal}
                                            setShowModal={setShowModal}
                                            submitEvaluation={handleSubmitEvaluation}
                                        />
                                        <button
                                            onClick={openEvaluationModal}
                                            className="border mx-auto border-darkblue bg-darkblue text-white rounded p-2 px-4 font-medium
                                            hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all">
                                            Someter para evaluación
                                        </button>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <div className="text-center">{STRINGS.CDF_QUESTIONNAIRE_UNAVAILABLE}</div>
                    ))
                }

                {/*Dynamic Results Functionality*/}

                {
                    log.cdfActivityLogType === CDF_LOG_TYPE.RESULTS && scoreResults &&
                    (
                        <table className="w-full border-separate border-spacing-y-4">
                            <tbody>
                            <tr
                                style={{ boxShadow: "0px 0px 4px #9996" }}
                                className="bg-white  rounded-xl"
                            >
                                <td className="p rounded-l-xl bg-blue-900 text-white font-bold w-12">
                                    <div className="flex justify-center items-center h-full">
                                        <RiBarChartBoxFill className="text-white text-2xl" />
                                    </div>
                                </td>
                                <td className="p-2 max-w-xs">
                                    <div className="flex flex-col md:flex-row md:justify-between">
                                        <p>{STRINGS.CDF_CERTIFICATION_SCORE}</p>
                                        <div className="flex gap-2 items-center">
                                            <FaRocket color={getColorForScore(scoreResults.finalScore)} /> {scoreResults.finalScore ?? 0}%
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 text-xl font-semibold">
                                    <div className="flex flex-col md:flex-row md:justify-between items-center">

                                        <p className="text-center text-sm">{getNameForScore(scoreResults.finalScore)}</p>

                                        <button
                                            onClick={openScoreHandler}
                                            className="py-2 px-4 text-sm border-2 border-cyan-900 text-cyan-900 font-semibold rounded-md
                                            hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all">
                                            Abrir Resultados
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    )
                }

            </div>
        </TimeLineCard>
    );
}

DynamicTimeLineCard.propTypes = {
    keyIndex: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired,
    logData: PropTypes.array.isRequired,
    logLength: PropTypes.number.isRequired,
    providerProfile: PropTypes.object.isRequired,
    handlerNavigationLinks: PropTypes.func.isRequired
}

export default DynamicTimeLineCard