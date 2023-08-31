/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import axios from 'axios';
import {
    ApiUrl,
    axiosInstance,
    InvitationRefuse, ProviderEmployeeService,
    UploadFile,
    UserEmployeeService, UserWorkExperienceService,
} from '../ApiRest';
import { HTTP } from "../../config/config";

export default class EmployeeService {


    static async getAll(options = {}) {
        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(options)) {
            params.append(key, value)
        }
        const { data } = await axiosInstance.get(ProviderEmployeeService, { params })
        return data
    }

    get(id) {
        return axios.get(ApiUrl + UserEmployeeService + id).then(res => res.data);
    }

    async save(form, token) {
        try {
            const fileUrl = await this.uploadFile(form.file)
            form.file = fileUrl.message
            const { data } = await axiosInstance.post(`${UserEmployeeService}register/${token}`, form)
            return { status: data?.httpCode === 200, data }
        } catch (error) {
            return { status: false, data: {} }
        }
    }

    async uploadFile(file) {
        const formData = new FormData()
        formData.append("file", file)

        const { data } = await axiosInstance.post(UploadFile, formData)
        return data
    }
    /**
     * Deletes an employee by their ID.
     * @param {string} id - The ID of the employee.
     * @returns {Promise<any>} - A promise that resolves to the response data.
     */
    delete(id) {
        return axios.delete(ApiUrl + UserEmployeeService + id).then(res => res.data);
    }
    /**
     * Refuses an invitation using a token.
     * @param {string} token - The invitation token.
     * @returns {boolean} - Indicates if the invitation was successfully refused.
     */
    async refuseInvitation(token) {
        const { data } = await axiosInstance.get(`${InvitationRefuse}?token=${token}`)
        return data.httpCode === 200
    }
    /**
     * Retrieves the profile data.
     * @returns {Promise<any>} - A promise that resolves to the profile data.
     */
    async getProfile() {
        const { data } = await axiosInstance.get(`${UserEmployeeService}profile`)

        return data
    }
    /**
     * Retrieves the profile picture of the current employee.
     * @returns {string} - The URL of the profile picture.
     */
    async getEmployeeProfilePicture() {

        try {
            const { data } = await axiosInstance.get(`${UserEmployeeService}profile/picture`, {
                responseType: 'blob'
            })
            return URL.createObjectURL(data)
        } catch (error) {
            console.log(error)
            return '';
        }
    }
    /**
     * Retrieves the profile picture of an employee by their ID.
     * @param {number} employeeId - The ID of the employee.
     * @returns {string} - The URL of the profile picture.
     */
    async getEmployeeProfilePictureById(employeeId) {

        try {
            const { data } = await axiosInstance.get(`${UserEmployeeService}${employeeId}/profile/picture`, {
                responseType: 'blob'
            })
            return URL.createObjectURL(data)
        } catch (error) {
            console.log(`Get employee profile image error: ${error}`)
            return '';
        }
    }
    /**
     * Retrieves the profile banner image.
     * @returns {string} - The URL of the profile banner image.
     */
    async getEmployeeProfileBanner() {
        const { data } = await axiosInstance.get(`${UserEmployeeService}profile/banner`, {
            responseType: 'blob'
        })
        return URL.createObjectURL(data)
    }
    /**
     * Retrieves the profile banner image of an employee by their ID.
     * @param {number} employeeId - The ID of the employee.
     * @returns {string} - The URL of the profile banner image.
     */
    async getEmployeeProfileBannerById(employeeId) {
        try{
            const { data } = await axiosInstance.get(`${UserEmployeeService}${employeeId}/profile/banner`, {
                responseType: 'blob'
            })
            return URL.createObjectURL(data)
        }catch (error){
            console.log(`Get employee banner image error: ${error}`)
            return '';
        }
    }
    /**
     * Edits the employee's banner image.
     * @param {object} image - The image file to be uploaded.
     * @returns {Promise<any>} - A promise that resolves to the response data.
     */
    async editEmployeeBannerImage(image) {
        const form = new FormData()
        form.append('file', image.file)
        const { data } = await axiosInstance.put(`${UserEmployeeService}profile/banner`, form)

        return data
    }
    /**
     * Edits the employee's logo image.
     * @param {object} image - The image file to be uploaded.
     * @returns {Promise<any>} - A promise that resolves to the response data.
     */
    async editEmployeeLogoImage(image) {
        const form = new FormData()
        form.append('file', image.file)
        const { data } = await axiosInstance.put(`${UserEmployeeService}profile/picture`, form)

        return data
    }
    /**
     * Updates the employee's profile information.
     * @param {object} form - The updated profile form data.
     * @returns {Promise<any>} - A promise that resolves to the response data.
     */
    async updateEmployeeProfile(form) {
        const { data } = await axiosInstance.put(`${UserEmployeeService}profile`, form)

        return data
    }
    /**
     * Validates an invitation using a token.
     * @param {string} token - The invitation token.
     * @returns {object} - An object with the validation status and data.
     */
    async validateInvitation(token) {
        const { data } = await axiosInstance.get(`${UserEmployeeService}invitation/${token}`)
        return { status: data?.httpCode === 202, data: data.data }
    }

    async updatePersonalInformation(form) {
        const { data, status } = await axiosInstance.put(`${UserEmployeeService}personal-information`, form)
        return { data, status }
    }

    // TODO: Submit to Endpoint
    async setWorkSchedule(schedule, temporaryClosed, permanentlyClosed) {
        const stringified = JSON.stringify(schedule)
    }

    async getWorkSchedule(id) {
        let temporaryClosed = false
        let permanentlyClosed = true
        return [JSON.parse('{"lunes":{"desde":"8:30 am","hasta":"10:00 am"},"martes":{"desde":"7:00 am","hasta":"10:00 pm"},"miercoles":{"desde":"7:00 am","hasta":"10:00 pm"},"jueves":{"desde":"7:00 am","hasta":"9:45 pm"},"viernes":{"desde":"7:00 am","hasta":"10:15 am"}}'), temporaryClosed, permanentlyClosed]
    }

    static getEmployeeWorkExperience = async (options = {}) => {
        try {

            const params = new URLSearchParams()

            for (const [key, value] of Object.entries(options)) {
                params.append(key, value)
            }

            const { data, status } = await axiosInstance.get(UserWorkExperienceService + 'get', { params });
            return { data, status };

        } catch (error) {
            return { data: [], status: HTTP.NOT_FOUND }
        }
    }

}
