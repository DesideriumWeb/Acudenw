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
import {getAllLibraryItems} from "../../config/acudenLocaDB";

/**
 * Custom hook for retrieving stored library items.
 * @param {number} currentPaginationIndex - Current pagination index.
 * @param {number} displayPerPage - Number of items to display per page.
 * @param {string} status - Status of the library items.
 * @returns {object} - Object with properties related to the library items.
 */
export default function useStoredLibrary(currentPaginationIndex = 0, displayPerPage = 10, status = ENTITY_STATUS.ACTIVE){

    const [storedLibraryItems, setStoredLibraryItems] = useState([]);
    const [storedIsLoading, setStoredIsLoading] = useState(true);
    const [storedTotalElements, setTotalElements] = useState(0);
    const [storedTotalPages, setTotalPages] = useState(0);
    const [storedSpinnerLoading, setStoredSpinnerLoading] = useState(false);
    const [storedInError, setStoredInError] = useState(false);
    const [storedErrorMsg, setStoredErrorMsg] = useState('');

    /**
     * Asynchronous function to retrieve Stored library items and update the state.
     */
    useEffect(() => {

        /**
         * Asynchronous function to get library items.
         */
        const getStoredLibraryItems = async () => {
            try {

                setStoredSpinnerLoading(true)

                if(CONFIG.USE_INDEXED_DB)
                {
                    const { items, totalPages, totalElements } = await getAllLibraryItems(currentPaginationIndex, displayPerPage)

                    let parseItems = items.map((it) => JSON.parse(it.resource));

                    setStoredLibraryItems(parseItems)
                    setTotalElements(totalElements)
                    setTotalPages(totalPages)
                    setStoredSpinnerLoading(false)
                    setStoredIsLoading(false)
                }
                else
                {
                    //API?
                    //TODO esperando por la logica de Inprende o como lo implementara...
                }
            }
            catch (error)
            {
                setStoredIsLoading(false)
                setStoredSpinnerLoading(false);
                setStoredInError(true);
                setStoredErrorMsg('Se ha producido un error. Trate nuevamente.');
            }
        }

        getStoredLibraryItems();

    }, [currentPaginationIndex, displayPerPage]);

    return {storedLibraryItems, storedIsLoading, storedInError, storedErrorMsg, storedSpinnerLoading, storedTotalElements, storedTotalPages, setStoredLibraryItems}
}