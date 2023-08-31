/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, GalleryServicePath} from "../ApiRest";
/**
 * Service class for managing galleries.
 */
export default class GalleryService {
    /**
     * Retrieves the gallery for a specific provider.
     *
     * @param {string} id - Provider ID.
     * @returns {Promise} - Resolves to the gallery data.
     */
    async getProviderGallery(id) {
        try{
            const { data, status } = await axiosInstance.get(`${GalleryServicePath}provider/${id}`)
            return data
        }catch (error){
            console.log(`Get gallery ${id} error: ${error}`)
            return {data: null}
        }
    }
    /**
     * Creates a new gallery.
     *
     * @returns {Promise} - Resolves to the newly created gallery data.
     */
    async addGallery() {
        const { data } = await axiosInstance.post(GalleryServicePath,
            {
                status: "ACTIVE"
            })
        return data
    }
    /**
     * Uploads an image to a gallery.
     *
     * @param {string} id - Gallery ID.
     * @param {object} image - Image data.
     * @returns {Promise} - Resolves to the uploaded image data.
     */
    async uploadImageToGallery(id, image) {
        const form = new FormData()
        form.append("image", image.file)
        const { data } = await axiosInstance.put(`${GalleryServicePath}${id}/image`, form)

        return data
    }
    /**
     * Retrieves an image from a gallery.
     *
     * @param {string} galleryId - Gallery ID.
     * @param {string} imageId - Image ID.
     * @returns {Promise} - Resolves to the image data.
     */
    async getImage(galleryId, imageId) {
        const { data } = await axiosInstance.get(`${GalleryServicePath}${galleryId}/image/${imageId}`, {
            responseType: 'blob'
        })
        return data
    }
    /**
     * Deletes an image from a gallery.
     *
     * @param {string} galleryId - Gallery ID.
     * @param {string} imageId - Image ID.
     * @returns {Promise} - Resolves if the deletion is successful.
     */
    async deleteGalleryImage(galleryId, imageId) {
        return await axiosInstance.delete(`${GalleryServicePath}${galleryId}/image/${imageId}`)
    }
}