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
 * Custom hook to fetch and LMS courses and badges items.
 * @returns {{badges: *[], completeCourses: *[]}}
 */
export default function useCompleteBadge(){

    const [completeCourses, setCompleteCourses] = useState([])
    const [badges, setBadges] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const getLMSDataForProfile = async() => {

            try{

                const { data, status } = await LMSService.getCompletedCourses()

                if(status === HTTP.OK)
                    setCompleteCourses(data?.data)

                const { data:badgeData, status: badgeStatus } = await LMSService.getBadges()

                if(badgeStatus === HTTP.OK)
                    setBadges(badgeData?.data)

            }catch (error){
                console.log(`Error on LMS GetBadges error: ${error}`)
            }finally {
                setLoading(false)
            }
        }

        getLMSDataForProfile()
    },[])

    return {completeCourses, badges, loading}
}