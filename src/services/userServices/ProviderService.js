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
    axiosInstance, InvitationsPath,
    ProviderEmployeeService,
    ProviderProfilePath, ProviderRemoveEmployeeService,
    UploadFile, UserProviderByStatus, UserProviderList,
    UserProviderService
} from '../ApiRest';
import { HTTP } from "../../config/config";
import { buildRequestParams } from "../../components/utils";
/**
 * ProviderService is a class that provides methods to interact with the server API.
 */
export default class ProviderService {


    /**
     * getAll - Retrieves all providers.
     *
     * @return {Promise} Promise that resolves to the data from the server.
     */
    getAll() {
        return axios.get(ApiUrl + UserProviderService).then(res => res.data);
    }

    /**
     * Retrieves a list of all active providers from the API.
     * @param {object} options - Additional options for filtering the providers (optional).
     * @returns {array} An array of active providers.
     */
    static async getAllActiveProviders(options = {}) {
        try {

            const params = buildRequestParams(options)

            const { data, status } = await axiosInstance.get(UserProviderList);

            if (status === HTTP.OK) {
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Retrieves a list of all active providers from the API.
     * @param {object} options - Additional options for filtering the providers (optional).
     * @returns {promise} An promise of active providers.
     */
    static async getProvidersByStatus(options = {}) {
        try {

            const params = buildRequestParams(options)

            return await axiosInstance.get(UserProviderByStatus, { params });

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * getProviderByEmail - Retrieves a provider by email.
     *
     * @return {Promise} Promise that resolves to the provider data.
     */
    async getProviderByEmail() {
        try {
            const { data } = await axiosInstance.get(ProviderProfilePath)
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    /**
     * getBannerImage - Retrieves the banner image for a provider.
     *
     * @param {string} id The id of the provider.
     * @return {Promise} Promise that resolves to the image data.
     */
    async getBannerImage(id) {
        try {
            const { data } = await axiosInstance.get(`cms/provider/${id}/banner-image`, {
                responseType: 'blob'
            })
            return data
        } catch (error) {
            console.log(error)
            return '';
        }
    }

    /**
     * getLogoImage - Retrieves the logo image for a provider.
     *
     * @param {string} id The id of the provider.
     * @return {Promise} Promise that resolves to the image data.
     */
    async getLogoImage(id) {
        try {
            const { data } = await axiosInstance.get(`cms/provider/${id}/logo-image`, {
                responseType: 'blob'
            })

            return data;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    /**
     * save - Saves a new provider to the server.
     *
     * @param {object} providedUser The data of the provider to save.
     * @return {Promise} Promise that resolves to the server response.
     */
    async save(providedUser) {
        try {
            const urlLicence = await this.uploadFile(providedUser.urlLicence)
            providedUser.urlLicence = urlLicence.message
            const { data } = await axiosInstance.post(UserProviderService,
                providedUser
            )
            return { status: data?.httpCode === 200 || data?.httpCode === 202, data }
        } catch (error) {
            return { status: false, data: {}, error: error.response.data.message }
        }
    }

    /**
     * uploadFile - Uploads a file to the server.
     *
     * @param {File} file The file to upload.
     * @return {Promise} Promise that resolves to the server response.
     */
    async uploadFile(file) {
        const formData = new FormData()
        formData.append("file", file)

        const { data } = await axiosInstance.post(UploadFile, formData)
        return data
    }

    /**
     * removeEmployee - Removes an employee from a provider.
     *
     * @param {string} id The id of the employee to remove.
     * @return {Promise} Promise that resolves to the server response.
     */
    async removeEmployee(id) {
        const { data } = await axiosInstance.delete(`${ProviderRemoveEmployeeService}/${id}`)
        return data
    }

    /**
     * removeEmployeeInvitation - Removes an invitation to an employee.
     *
     * @param {string} id The id of the invitation to remove.
     * @return {Promise} Promise that resolves to the server response.
     */
    async removeEmployeeInvitation(id) {
        const { data } = await axiosInstance.delete(`${InvitationsPath}${id}`)
        return data
    }

    /**
     * createInvitation - Creates a new invitation for an employee.
     *
     * @param {string} email The email of the employee.
     * @param {string} name The name of the employee.
     * @return {Promise} Promise that resolves to the server response.
     */
    async createInvitation(email, name) {
        const { data } = await axiosInstance.post(`${InvitationsPath}create`, {
            email,
            name
        })
        return data
    }

    /**
     * getProviderInvitations - Retrieves all invitations for a provider.
     *
     * @return {Promise} Promise that resolves to the invitation data.
     */
    async getProviderInvitations() {
        try {
            const { data } = await axiosInstance.get(`${InvitationsPath}list`)
            return data.data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    /**
     * updateProviderAboutUsDescription - Updates the About Us description for a provider.
     *
     * @param {string} id The id of the provider.
     * @param {string} aboutUs The new About Us description.
     * @return {Promise} Promise that resolves to the server response.
     */
    async updateProviderAboutUsDescription(id, aboutUs) {
        const { data } = await axiosInstance.put(`cms/provider/${id}/about-us`, {
            aboutUs
        })
        return data
    }

    /**
     * updateProviderServiceDescription - Updates the service description for a provider.
     *
     * @param {string} id The id of the provider.
     * @param {string} serviceDescription The new service description.
     * @return {Promise} Promise that resolves to the server response.
     */
    async updateProviderServiceDescription(id, serviceDescription) {
        try {
            const { data } = await axiosInstance.put(`cms/provider/${id}/service`, {
                serviceDescription
            })
            return data
        } catch (error) {
            console.log(error)
            return { status: false, data: {} }
        }
    }

    /**
     * Updates the contact details of a provider.
     *
     * @param {string} id - The ID of the provider.
     * @param {object} body - The updated contact details.
     * @returns {Promise<object>} A promise that resolves to the updated provider data.
     * @throws {Error} If an error occurs while updating the contact details.
     */
    async updateProviderContactDetails(id, body) {
        try {
            const { data } = await axiosInstance.put(`cms/provider/${id}/contact`, body);
            return data;
        } catch (error) {
            console.log(error);
            return { status: false, data: {} };
        }
    }

    /**
     * Updates the banner image of a provider.
     *
     * @param {string} id - The ID of the provider.
     * @param {object} image - The new banner image.
     * @returns {Promise<object>} A promise that resolves to the updated provider data.
     */
    async editProviderBannerImage(id, image) {
        const form = new FormData();
        form.append('image', image.file);
        const { data } = await axiosInstance.put(`cms/provider/${id}/banner-image`, form);
        return data;
    }

    /**
     * Updates the logo image of a provider.
     *
     * @param {string} id - The ID of the provider.
     * @param {object} image - The new logo image.
     * @returns {Promise<object>} A promise that resolves to the updated provider data.
     */
    async editProviderLogoImage(id, image) {
        const form = new FormData();
        form.append('image', image.file);
        const { data } = await axiosInstance.put(`cms/provider/${id}/logo-image`, form);
        return data;
    }


    // TODO: Inprende. Submit to Endpoint.
    async setWorkSchedule(schedule, temporaryClosed, permanentlyClosed) {
        const stringifiedSchedule = JSON.stringify(schedule)
        const request = {
            schedule: stringifiedSchedule,
            isTemporarilyClosed: temporaryClosed,
            isCenterClosed: permanentlyClosed
        }
        const { data } = await axiosInstance.put(`cms/provider/work-schedule`, request)
        return data;
    }
    // TODO: Inprende. Obtain from endpoint.
    async getWorkSchedule(id) {
        let temporaryClosed = false
        let permanentlyClosed = true
        return [JSON.parse('{"Lunes":{"desde":"8:30 am","hasta":"10:00 am"},"Martes":{"desde":"7:00 am","hasta":"10:00 pm"},"Miércoles":{"desde":"7:00 am","hasta":"10:00 pm"},"Jueves":{"desde":"7:00 am","hasta":"9:45 pm"},"Viernes":{"desde":"7:00 am","hasta":"10:15 am"}}'), temporaryClosed, permanentlyClosed]
    }

    async getTopProviders() {
        try {
            return await axiosInstance.get('dashboard/provider/gettop')
        } catch (error) {
            console.error(error)
            return []
        }
    }

    delete(id) {
        return axios.delete(ApiUrl + UserProviderService + id).then(res => res.data);
    }

    async updateOwnerInformation(form) {
        const { data } = await axiosInstance.put(`cms/provider/owner-information`, form)
        return data
    }
}
