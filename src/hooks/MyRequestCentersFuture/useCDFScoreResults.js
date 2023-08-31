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
import {addScoreConfigToQuestionnaire} from "../../components/utils";
/**
 * Custom hook to fetch a questionnaire scores / results for a given requestId.
 *
 * @version 1.0.0
 * @param {number} requestId - The ID of the request for which the score is to be fetched.
 * @returns {Object} An object containing the current loading status and the score data.
 *                   - 'isLoading' (boolean): Indicates whether the API request is still loading (true) or complete (false).
 *                   - 'scoreResults' (Object): The fetched score data, or an empty object if not yet fetched or an error occurred.
 */
export default function useCDFScoreResults(requestId = 0){

    const [isLoading, setIsLoading] = useState(true)
    const [scoreResults, setScoreResults] = useState({})
    const [scoreResultsDTO, setScoreResultsDTO] = useState([])

    useEffect(() => {

        const getResults = async() => {
            try{

                const { data, status } = await CenterFutureServices.getCDFQuestionnaireResults(requestId)

                if(status === HTTP.OK){

                    setScoreResults(data?.data)

                    const scoresDTO = addScoreConfigToQuestionnaire(data?.data.questionnaireScoreList)
                    setScoreResultsDTO(scoresDTO)
                }

            }catch (error){
                console.log(`Error on hook useCDFScoreResults, error: ${error}`)
            }finally {
                setIsLoading(false)
            }
        }

        getResults()

    }, [])

    return { isLoading, scoreResults, scoreResultsDTO }
}