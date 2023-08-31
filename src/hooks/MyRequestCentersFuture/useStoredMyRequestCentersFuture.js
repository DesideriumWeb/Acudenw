/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {CONFIG, ENTITY_STATUS} from "../../config/config";
import {useEffect, useState} from "react";

/**
 * Custom hook for retrieving stored my request of centers future items.
 * @param {number} currentPaginationIndex - Current pagination index.
 * @param {number} displayPerPage - Number of items to display per page.
 * @param {string} status - Status of my request of centers future items.
 * @returns {object} - Object with properties related to my request of centers future items.
 */
export default function useStoredMyRequestCentersFuture(currentPaginationIndex = 0, displayPerPage = 10, status = ENTITY_STATUS.ACTIVE){

    const [storedMyRequestItems, setStoredMyRequestItems] = useState([]);
    const [storedIsLoading, setStoredIsLoading] = useState(true);
    const [storedTotalElements, setTotalElements] = useState(0);
    const [storedTotalPages, setTotalPages] = useState(0);
    const [storedSpinnerLoading, setStoredSpinnerLoading] = useState(false);
    const [storedInError, setStoredInError] = useState(false);
    const [storedErrorMsg, setStoredErrorMsg] = useState('');

    /**
     * Asynchronous function to retrieve Stored my request  items and update the state.
     */
    useEffect(() => {

        /**
         * Asynchronous function to get my request  items.
         */
        const getStoredMyRequestItems = async () => {
            try {

               

                    // setStoredMyRequestItems(parseItems)
                    // setTotalElements(totalElements)
                    // setTotalPages(totalPages)
                    setStoredSpinnerLoading(false)
                    setStoredIsLoading(false)
                              
            }
            catch (error)
            {
                setStoredIsLoading(false)
                setStoredSpinnerLoading(false);
                setStoredInError(true);
                setStoredErrorMsg('Se ha producido un error. Trate nuevamente.');
            }
        }

        getStoredMyRequestItems();

    }, [currentPaginationIndex, displayPerPage]);

    return {storedMyRequestItems, storedIsLoading, storedInError, storedErrorMsg, storedSpinnerLoading, storedTotalElements, storedTotalPages, setStoredMyRequestItems}
}