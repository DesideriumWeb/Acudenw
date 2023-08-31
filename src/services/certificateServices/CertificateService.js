/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { axiosInstance, CertificatesServicePath } from "../ApiRest";
import { GeneralService } from "../generalService/GeneralService";
import { HTTP } from "../../config/config";
import { buildImageMultipart } from "../../components/utils";
/**
 * Service class for managing certificates.
 */
export class CertificateService {
    /**
     * Add a certificate with the provided form data and file.
     * 
     * @param {Object} form - The form data for the certificate.
     * @param {File} file - The file to be uploaded.
     * @returns {Object} - The response data containing the added certificate information.
     */
    async addCertificate(form, file) {
        try {
            const { httpCode, message } = await GeneralService.uploadFile(file);

            if (httpCode === HTTP.OK) {

                const { data } = await axiosInstance.post(CertificatesServicePath, form);

                if (data.httpCode === HTTP.CREATED) {
                    const { data: processData, status: processStatus } = await this.addCertificateFile(data.data.id, file);

                    return { processData, processStatus };
                }

                return data;
            } else {
                return { processData: null, processStatus: HTTP.CONFLICT };
            }
        } catch (error) {
            console.log("Error in addCertificate:", error);
            return { processData: null, processStatus: HTTP.INTERNAL_ERROR };
        }
    }


    /**
     * Edit a certificate.
     * 
     * @param {Object} form - The form data for the certificate.
     * @returns {Object} - The response data containing the added certificate information.
     */
    async editCertificate(form, certificateId) {
        try {


            const { data } = await axiosInstance.put(`${CertificatesServicePath}/${certificateId}`, form);

            return data;

        } catch (error) {
            console.log("Error editing certificate:", error);
            return { processData: null, processStatus: HTTP.INTERNAL_ERROR };
        }
    }

    /**
     * Uploads a certificate file to a relation.
     *
     * @param {File} file - The certificate file to upload.
     * @param {string} certificateId - The ID of the certificate.
     * @returns {Promise<{data: any, status: number}>} - The response data and status.
     */
    async addCertificateFile(certificateId, file) {
        try {

            const form = buildImageMultipart(file);

            const { data, status } = await axiosInstance.put(`${CertificatesServicePath}/${certificateId}/files`, form);

            return { data, status };

        } catch (error) {
            console.log(`Upload employee certificate file to relation: ${error}`);
            return { data: null, status: HTTP.INTERNAL_ERROR }
        }
    }

    /**
    * Retrieve certificate file.
    *
    * @param {string} certificateId - The ID of the certificate.
    * @returns {Promise<{data: any, status: number}>} - The response data and status.
    */
    async getCertificateFile(certificateId) {
        try {

            // const form = buildImageMultipart(file);

            const { data, status } = await axiosInstance.get(`${CertificatesServicePath}/${certificateId}/files`, { responseType: 'blob' });
            return { data, status };

        } catch (error) {

            return { data: null, status: HTTP.INTERNAL_ERROR }
        }
    }
    /**
     * Deletes a certificate record with the specified certificateId.
     *
     * @param {number} certificateId - The ID of the certificate to be deleted.
     * @returns {Promise} A promise that resolves to the result of the delete operation.
     */
    static async deleteCertificate(certificateId) {
        try {

            const { data, status } = await axiosInstance.delete(`${CertificatesServicePath}/${certificateId}`);

            return { data, status };

        } catch (error) {
            console.log(`Delete employee certificate: ${error}`);
            return { data: null, status: HTTP.INTERNAL_ERROR }
        }
    }
}

