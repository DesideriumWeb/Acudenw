/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {LMSService} from "../../services/lmsService/LMSService";
import {HTTP} from "../../config/config";
/**
 * Custom hook for retrieving courses from LMS API.
 * @version 1.0.1
 * @param {number} reload - refresh or update courses data. Important use incremental on external logic.
 * @returns {object} - Object with properties related to the library items.
 */
export default function useCourses(reload = 0){

    const [courses, setCourses] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(true);
    const [inError, setInError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

        const getCourses = async() => {

            try{

                const { data, status } = await LMSService.getCourses()

                if (status === HTTP.OK)
                    setCourses(data?.data)

            }catch (error){
                console.log(`Error on LMS getCourses error: ${error}`)
            }finally {
                setSpinnerLoading(false)
            }

        }

        getCourses()

    }, [reload])

    return {courses, setCourses, spinnerLoading, inError, errorMsg}
}