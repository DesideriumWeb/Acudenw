/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useState} from "react";
import {CenterFutureServices} from "../../services/centerFutureServices/CenterFutureServices";
import {HTTP, STRINGS} from "../../config/config";
import {RiErrorWarningLine} from "react-icons/ri";
/**
 * Component that displays a single list item with a question and options.
 *
 * @param {Object} question - The question object containing the question details and answers.
 * @param {number} requestId - The ID of the request associated with the question.
 * @param {string} questionFormatted - Question text spanish in format with alphabet order.
 * @param {function} onResponseEvent - On answer response by user event.
 * @param {boolean} isLast - Last question from the list. Remove border.
 * @param {boolean} approved - Questionnaire administration state.
 * @returns {JSX.Element} The ListItem component.
 */
const ListItem = ({ question, requestId = 0, questionFormatted = STRINGS.DEFAULT_ON_EMPTY, onResponseEvent, isLast = false, approved = false}) => {

    const [state, setState] = useState( question.answers.length > 0 ? question.answers[0].answer : null);
    /**
     * Handles the state change of the answer for the question and updates it on the server.
     *
     * @param {boolean} answerState - The new state of the answer (true for "Si" and false for "No").
     * @return {void}
     */
    const onStateChangeHandler = async (answerState) => {
        try {

            setState(answerState)

            if (question.answers.length > 0) {

                const { data, status } = await CenterFutureServices.updateCDFQuestionnaireAnswer(question.answers[0].id, answerState);

                if (status === HTTP.OK) {
                    question.answers = [data.data]
                }
            } else {

                const {data, status} = await CenterFutureServices.createCDFQuestionnaireAnswer(requestId, question.id, answerState);

                if (status === HTTP.OK) {
                    question.answers = [data.data]
                }
            }

        } catch (error) {
            console.log(`Error on save answer for question: ${question.id}, error: ${error}`);
        }finally {
            onResponseEvent(answerState, question.id)
        }
    }

    return (
        <div className={`list-item-001 py-2 ${isLast ? '' : 'border-b'} border-b-gray-600 flex flex-row justify-between items-center w-full`}>
            <p className="text-sm py-3">{questionFormatted}</p>
            {
                state ?? (
                    <div className="flex flex-row items-center text-red-500">
                        <RiErrorWarningLine className="mr-2" />
                        <p className="text-sm font-semibold">Requerido.</p>
                    </div>
                )
            }
            <div className="flex flex-row gap-4 cursor-pointer">
                <div className="flex flex-row gap-1">
                    <div
                        className={`border-2 ${state !== null ? 'border-darkblue' : 'border-red-600' } p-[5px] rounded-full ${
                            state !== null ? state ? "bg-darkblue" : "" : ""
                        }`}
                        onClick={() => !approved && onStateChangeHandler(true)}
                    >
                        <div className="bg-white h-[10px] w-[10px] rounded-full"></div>
                    </div>
                    <div className={`${state !== null ? 'text-darkblue' : 'text-red-600' }`}>Sí</div>
                </div>
                <div className="flex flex-row gap-1">
                    <div
                        className={`border-2 ${state !== null ? 'border-darkblue' : 'border-red-600' } p-[5px] rounded-full ${
                            state !== null ? state ? "" : "bg-darkblue" : ""
                        }`}
                        onClick={() => !approved && onStateChangeHandler(false)}
                    >
                        <div className="bg-white h-[10px] w-[10px] rounded-full"></div>
                    </div>
                    <div className={`${state !== null ? 'text-darkblue' : 'text-red-600' }`}>No</div>
                </div>
            </div>
        </div>
    );
};

export default ListItem