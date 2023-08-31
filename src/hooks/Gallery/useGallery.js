/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import GalleryService from "../../services/galleryService/GalleryService";
/**
 * Custom hook for fetching Gallery data.
 * This hook will fetch the data from the GalleryService,using the id and retry as parameters 
 * and return the fetched data.
 *
 * @param {number} id - The id of the provider.
 * @param {number} retryGallery - retry count of the hook, it is used to refetch data manually, default is 0.
 * @returns {object} The fetched news data.
 */
export default function useGallery(id, retryGallery = 0) {
    // State variable to hold the news data
    const [images, setImages] = useState([])
    const [hasGallery, setHasGallery] = useState(false)
    const [galleryId, setGalleryId] = useState(0)
    const [galleryLoading, setGalleyLoading] = useState(true)

    useEffect(() => {
        // Function to fetch Gallery from the GalleryService
        const fetchImages = async (id) => {
            try {
                //Reset Just in Case
                setImages([])
                //Fetch the gallery data with the given provider id
                const { data } = await new GalleryService().getProviderGallery(id)
                setImages(data.images)
                setHasGallery(data?.provider?.id === id)
                setGalleryId(data.id)
            } catch (error) {
                console.log(error)
                setImages([])
                setHasGallery(false)
                setGalleryId(0)
            }finally {
                setGalleyLoading(false)
            }
        }

        //Call the function to fetch gallery if an id is provided as param
        if (id) {
            fetchImages(id)
        }
        //Re-run the effect when the parameters change
    }, [id, retryGallery])

    //Return the fetched data
    return { images, hasGallery, galleryId, galleryLoading }
}