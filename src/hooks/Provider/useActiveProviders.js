/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import ProviderService from "../../services/userServices/ProviderService";

/**
 * Custom hook for fetching provider's data.
 * This hook will fetch the data from the ProviderService using given pagination parameters,
 * and return the fetched data.
 *
 * @param {number} currentPaginationIndex - The current pagination index or page number, default is 0.
 * @param {number} displayPerPage - The number of items to be displayed per page, default is 10.
 * @returns {object} The fetched provider's data.
 */
export default function useActiveProviders(currentPaginationIndex = 0, displayPerPage = 10){

    // State variable to hold the news data
    const [providers, setProviders] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [inError, setInError] = useState(false)

    useEffect(() => {
        try {
            const getProviders = async () => {
                // Fetch the provider data with the current pagination parameters
                const data = ProviderService.getAllActiveProviders({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage
                })

                // Update the state variables with the fetched data
                setProviders(data.data)
                setTotalPages(data.totalPages)
                setTotalElements(data.totalElements)

                //Update loading on finish
                setIsLoading(false)
            }

            // Call the function to fetch providers
            getProviders()
        }
        catch (error)
        {
            setInError(true);
            setIsLoading(false)
            console.log(error)
        }

    }, [currentPaginationIndex, displayPerPage])


    return {providers, totalElements, totalPages, isLoading, inError}
}