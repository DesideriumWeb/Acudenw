/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, CertificatesServicePath, EducationServicePath} from "../ApiRest";
import {GeneralService} from "../generalService/GeneralService";
import {HTTP} from "../../config/config";
import {buildImageMultipart} from "../../components/utils";
/**
 * Service class for handling education-related operations.
 */
export class EducationService {
    /**
     * Adds an education degree record with the provided form data and file.
     *
     * @param {Object} form - The form data object containing the education degree details.
     * @param {File} file - The file associated with the education degree.
     * @returns {Promise} - A promise that resolves to the added education degree data.
     */
    async addEducationDegree(form, file) {
        try {

            const { httpCode } = await GeneralService.uploadFile(file);

            if (httpCode === HTTP.OK) {

                const { data } = await axiosInstance.post(EducationServicePath, form);

                if(data.httpCode === HTTP.CREATED)
                {
                    const { data: processData, status: processStatus } = await this.addEducationDegreeFile(data.data.id, file);

                    return { processData, processStatus };
                }

                return data;

            } else {
                return { processData: null, processStatus: HTTP.CONFLICT };
            }
        } catch (error) {
            console.log("Error in addEducationDegree:", error);
            return {processData: null, processStatus: HTTP.INTERNAL_ERROR};
        }
    }
    /**
     * Uploads an education degree file to a relation.
     *
     * @param {File} file - The education degree file to upload.
     * @param {string} educationDegreeId - The ID of the education degree.
     * @returns {Promise<{data: any, status: number}>} - The response data and status.
     */
    async addEducationDegreeFile(educationDegreeId, file){
        try {

            const form = buildImageMultipart(file);

            const {data, status} = await axiosInstance.put(`${EducationServicePath}/${educationDegreeId}/file`, form);

            return {data, status};

        }catch (error){
            console.log(`Upload education degree file to relation: ${error}`);
            return {data: null, status: HTTP.INTERNAL_ERROR}
        }
    }
    /**
     * Deletes an education degree record with the provided ID.
     *
     * @param {number} educationDegreeId - The ID of the education degree to delete.
     * @returns {Promise<Object>} A promise that resolves to the response data and status of the delete operation.
     */
    static async deleteEducationDegree(educationDegreeId){
        try{

            const {data, status} = await axiosInstance.delete(`${EducationServicePath}/${educationDegreeId}`);

            console.log(status)

            return {data, status};

        }catch (error){
            console.log(`Delete education degree: ${error}`);
            return {data: null, status: HTTP.INTERNAL_ERROR}
        }
    }
    /**
     * Retrieves the file associated with an education degree by its ID.
     * @param {string} educationDegreeId - The ID of the education degree.
     * @returns {Promise<{data: Blob|null, status: number}>} - A promise that resolves to an object containing the file data and status.
     */
    static async getEducationDegreeFile(educationDegreeId){
        try{
            const { data, status } = await axiosInstance.get(`${EducationServicePath}/${educationDegreeId}/file`, { responseType: 'blob' });
            return { data, status };

        }catch (error){
            console.log(`Get education degree file: ${error}`);
            return {data: null, status: HTTP.INTERNAL_ERROR}
        }
    }
}
