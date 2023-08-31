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
import {CONFIG, CONSTANTS, HTTP, USER_STATUS} from "../../config/config";
import {injectTowns} from "../../components/utils";

/**
 * Custom hook for fetching provider's data by status.
 * This hook will fetch the data from the ProviderService using given pagination parameters,
 * and return the fetched data.
 *
 * @param {number} currentPaginationIndex - The current pagination index or page number, default is 0.
 * @param {number} displayPerPage - The number of items to be displayed per page, default is 10.
 * @param providerStatus - API Entity status.
 * @param sortDir - API Query sort dir.
 * @returns {object} The fetched provider's data.
 */
export default function useProviderByStatus(currentPaginationIndex = 0, displayPerPage = 10,
                                            providerStatus = USER_STATUS.ACTIVE,
                                            sortDir = CONSTANTS.ASC_SORT){

    // State variable to hold the news data
    const [providers, setProviders] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [inError, setInError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        try {

            setSpinnerLoading(true)
            const getProviders = async () => {
                // Fetch the provider data with the current pagination parameters
                const {data, status} = await ProviderService.getProvidersByStatus({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                    sortDir
                })

                if(status === HTTP.OK)
                {
                    if(CONFIG.USE_DEV_DATA_INJECTION){

                        let dataInjected = injectTowns(data)

                        setProviders(dataInjected.data.providers)
                        setTotalPages(dataInjected.data.totalPages)
                        setTotalElements(dataInjected.data.totalElements)
                    }
                    else{
                        // Update the state variables with the fetched data
                        setProviders(data.data.providers)
                        setTotalPages(data.data.totalPages)
                        setTotalElements(data.data.totalElements)
                    }
                }
                else
                {
                    setInError(true)
                    setErrorMsg("Lo sentimos, no se han encontrado proveedores en este momento. Por favor, inténtelo nuevamente.")
                }

                //Update loading on finish
                setIsLoading(false)
                setSpinnerLoading(false)
            }

            // Call the function to fetch providers
            getProviders()
        }
        catch (error)
        {
            setErrorMsg("Se ha producido un error, trate nuevamente.")
            setInError(true)
            setIsLoading(false)
            setSpinnerLoading(false)
        }

    }, [currentPaginationIndex, displayPerPage])

    return {providers, totalElements, totalPages, isLoading, spinnerLoading, inError, errorMsg}
}