/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {STRINGS} from "../../../config/config";
import ListItem from "../../../components/CentersFuture/ListItem";
import {formatQuestion, generateUniqueKey, isQuestionIdInArray} from "../../../components/utils";
import React, {useState} from "react";
/**
 * ThematicQuestions Component
 *
 * This component represents a set of questions organized by sections in a thematic table. It allows the user
 * to answer the questions and displays the total number of questions answered and the total number of positive answers.
 *
 * @param {Object} table - The thematic table data.
 * @param {Object} data - The data for the request.
 * @param {number[]} questionWithAnswers - An array of question IDs with previously answered questions.
 * @param {boolean} approved - Admin questionnaire state.
 * @returns {JSX.Element} - The ThematicQuestions component JSX.
 */
const ThematicQuestions = ({table, data, questionWithAnswers, approved = false}) => {

    const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(table.totalQuestionsAnswered)
    const [totalPositiveAnswers, setTotalPositiveAnswers] = useState(table.totalPositiveAnswers)
    const [qwa, setQwa] = useState(questionWithAnswers)
    /**
     * Handles the response event when the user answers a question.
     *
     * @param {boolean} answer - The user's answer (true for Yes, false for No).
     * @param {number} questionId - The ID of the question that was answered.
     * @return {void}
     */
    const onResponseEvent = (answer, questionId) => {

        if(isQuestionIdInArray(questionId, qwa)){
            if(!answer){
                setTotalPositiveAnswers(prevState => prevState - 1)
            }else{
                setTotalPositiveAnswers(prevState => prevState + 1)
            }
        }else{
            setQwa(prevState => [...prevState, questionId])
            setTotalQuestionsAnswered(prevState => prevState + 1)
            if(answer){
                setTotalPositiveAnswers(prevState => prevState + 1)
            }
        }
    }

    return(
        <>
            {
                table && table?.sections && table.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="p-4 border-b-2 border-b-darkblue">
                        <p className="text-gray-700 mb-4">
                            <b>
                                {`${section.name || STRINGS.DEFAULT_ON_EMPTY}: ${section.description || STRINGS.DEFAULT_ON_EMPTY}`}
                            </b>
                        </p>

                        <div className="flex flex-col">
                            {
                                section?.questions?.map((q, index) => (
                                    <ListItem
                                        onResponseEvent={onResponseEvent}
                                        question={q} questionFormatted={q ? formatQuestion(index, q.question) : STRINGS.DEFAULT_ON_EMPTY}
                                        key={generateUniqueKey(12)}
                                        requestId={data.id}
                                        isLast={section.questions.length === index + 1}
                                        approved={approved}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            <div key={generateUniqueKey(10)} className="bg-blue-100 p-4 flex flex-row justify-between items-center font-semibold">
                <div>Subtotal</div>
                <div>
                    {totalQuestionsAnswered ?? 0}/{table.totalQuestions ?? 0}
                    <span className="text-xs"> Contestaciones compeletadas</span>
                </div>
                <div>
                    {totalPositiveAnswers ?? 0}/{table.totalQuestions ?? 0}
                    <span className="text-xs"> Total de respuestas Sí</span>
                </div>
            </div>
        </>
    );
}

export default ThematicQuestions