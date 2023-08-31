/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import {HTTP} from "../../config/config";
import {axiosInstance, LMSServicePath, UserEmployeeService} from "../ApiRest";

export class LMSService {
    /**
     * Performs a login request to the LMSService.
     * @version 1.0.0
     * @param {string} token - user session token.
     * @returns {Object} An object containing the response data and status.
     */
    static async login(token){
        try{

            const { data, status } = await axiosInstance.get(`${LMSServicePath}login`, {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })

            if(status !== HTTP.OK)
                return {data: null, status}

            return { data, status }

        }catch (error){
            console.log(`LMC Service login error: ${error}`)
            return { status: HTTP.INTERNAL_ERROR, data: null };
        }
    }
    /**
     * Retrieves the list of courses from the LMSService.
     * @version 1.0.0
     * @returns {Object} An object containing the response data and status.
     */
    static async getCourses(){
        try{

            const { data, status } = await axiosInstance(`${LMSServicePath}courses`)

            return { data, status }

        }catch (error){
            console.log(`LMC Service get courses error: ${error}`)
            return { status: HTTP.INTERNAL_ERROR, data: null };
        }
    }
    /**
     * Retrieves the list of completed courses from the LMSService.
     * @version 1.0.1
     * @returns {Object} An object containing the response data and status.
     */
    static async getCompletedCourses(){
        try{

            const { data, status } = await axiosInstance(`${UserEmployeeService}badge/course`)

            return { data, status }

        }catch (error){
            console.log(`LMC Service get courses error: ${error}`)
            return { status: HTTP.INTERNAL_ERROR, data: null };
        }
    }
    /**
     * Retrieves the list of courses badges from the LMSService.
     * @version 1.0.0
     * @returns {Object} An object containing the response data and status.
     */
    static async getBadges(){
        try{

            const { data, status } = await axiosInstance(`${UserEmployeeService}badge`)

            return { data, status }

        }catch (error){
            console.log(`LMC Service get courses error: ${error}`)
            return { status: HTTP.INTERNAL_ERROR, data: null };
        }
    }
}