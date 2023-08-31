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
import {removeInactiveAndDeleted} from "../../components/utils";
/**
 * Custom hook for retrieving CDF WorkFlow data, logs and others.
 *
 * @param requestId - Provider CDF Request Id
 * @param refresh - Refresh CDF WorkFlow data - Recall API
 * @return {{isLoading: boolean, logData: *[]}}
 */
export default function useCDFWorkFlow(requestId = 0, refresh = 0){

    const [isLoading, setIsLoading] = useState(true);
    const [logData, setLogData] = useState([])
    const [mentor, setMentor] = useState({})

    useEffect(() => {

        const getWorkFlowLog = async() => {
            try{

                const { data, status } = await CenterFutureServices.getRequestLog(requestId)

                if(status === HTTP.OK){

                    const logFiltered = removeInactiveAndDeleted(data?.data)

                    setLogData(logFiltered)
                }
            }catch (error){
                console.log(`Get CDF Request: ${requestId}, error: ${error}`)
                setLogData([])
            }finally {
                setIsLoading(false)
            }
        }

        getWorkFlowLog()

    },[refresh])

    return {isLoading, logData}
}