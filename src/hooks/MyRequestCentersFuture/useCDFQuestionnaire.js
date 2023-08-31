/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {CenterFutureServices} from "../../services/centerFutureServices/CenterFutureServices";
import {HTTP} from "../../config/config";
import {buildCDFQuestionAnswersDTO, extractQuestionIds} from "../../components/utils";
/**
 * Custom hook to fetch a questionnaire for a given requestId.
 *
 * @version 1.0.0
 * @param {number} requestId - The ID of the request for which the questionnaire is to be fetched.
 * @returns {Object} An object containing the current loading status and the questionnaire data.
 *                   - 'isLoading' (boolean): Indicates whether the API request is still loading (true) or complete (false).
 *                   - 'questionnaire' (Object): The fetched questionnaire data, or an empty object if not yet fetched or an error occurred.
 */
export default function useCDFQuestionnaire(requestId = 0){

    const [isLoading, setIsLoading] = useState(true)
    const [questionnaire, setQuestionnaire] = useState({})
    const [questionnaireListDTO, setQuestionnaireListDTO] = useState([])
    const [questionWithAnswers, setQuestionWithAnswers] = useState([])
    const [answers, setAnswers] = useState({})

    useEffect(() => {

        const getQuestionnaire = async() => {

            try {

                const { data, status } = await CenterFutureServices.getRequestQuestionnaire(requestId)

                if(status === HTTP.OK){

                    setQuestionnaire(data?.data)

                    const { data:answersList, status:answerStatus } = await CenterFutureServices.getCDFQuestionnaireAnswers(requestId)

                    if(answerStatus === HTTP.OK){

                        setAnswers(answersList?.data)

                        const questionIds = extractQuestionIds(answersList.data)
                        setQuestionWithAnswers(questionIds)

                        const processedQuestionnaireList = buildCDFQuestionAnswersDTO(data?.data.questionnaireList, answersList?.data)
                        setQuestionnaireListDTO(processedQuestionnaireList)
                    }
                }
            }catch (error){
                console.log(`Error in hook getCDFQuestionnaire requestId: ${requestId}, error: ${error}`)
            }finally {
                setIsLoading(false)
            }
        }

        getQuestionnaire()

    }, [requestId])

    return { isLoading, questionnaire, questionnaireListDTO, answers, questionWithAnswers, setQuestionWithAnswers }
}