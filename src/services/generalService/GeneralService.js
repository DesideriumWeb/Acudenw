/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, UploadFile} from "../ApiRest";
/**
 * Service class for handling general operations.
 */
export class GeneralService{
    /**
     * Uploads a file using the provided file object.
     *
     * @param {File} file - The file to be uploaded.
     * @returns {Promise} A promise that resolves to the uploaded file data.
     */
    static async uploadFile(file) {
        const formData = new FormData()
        formData.append("file", file)
        const { data } = await axiosInstance.post(UploadFile, formData)
        return data
    }
}