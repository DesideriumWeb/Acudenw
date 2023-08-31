/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { axiosInstance, LibraryServicePath } from "../ApiRest";
import { HTTP } from "../../config/config";

export class LibraryService {

    static async getAll(options = {}) {
        try {

            const params = new URLSearchParams()
            for (const [key, value] of Object.entries(options)) {
                params.append(key, value)
            }

            return await axiosInstance.get(LibraryServicePath, { params })

        } catch (error) {
            console.log(`Library Service get all error: ${error}`)
            return { status: HTTP.NOT_FOUND, data: {} };
        }
    }

    static async getAllByStatus(options = {}) {
        try {

            const params = new URLSearchParams()
            for (const [key, value] of Object.entries(options)) {
                params.append(key, value)
            }

            return await axiosInstance.get(LibraryServicePath + "/status", { params })

        } catch (error) {
            console.log(`Library Service get by status error: ${error}`)
            return { status: HTTP.NOT_FOUND, data: {} };
        }
    }

    static async getLibraryItemFile(libraryItemId) {
        try {
            const response = await axiosInstance.get(`${LibraryServicePath}/${libraryItemId}/file`, { responseType: 'blob' })

            const contentDisposition = response.headers['content-disposition'];

            let fileName = '';

            // extract fileName if Content Disposition header is exposed
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }

            const { data, status } = response;

            return { data, status, fileName: fileName }

        } catch (error) {
            return { data: null, status: HTTP.INTERNAL_ERROR }
        }
    }
}