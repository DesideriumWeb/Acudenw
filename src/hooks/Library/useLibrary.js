/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {ENTITY_STATUS, HTTP, LIBRARY_CONTENT_FORMATS, USER_STATUS} from "../../config/config";
import {LibraryService} from "../../services/libraryService/LibraryService";
import {generateRandom, getItemsFromCookie, injectDataToLibraryItems, storeItemsInCookie} from "../../components/utils";
/**
 * Custom hook for retrieving library items & recommended library items.
 * @param {number} currentPaginationIndex - Current pagination index.
 * @param {number} displayPerPage - Number of items to display per page.
 * @param {string} status - Status of the library items.
 * @returns {object} - Object with properties related to the library items.
 */
export default function useLibrary(currentPaginationIndex = 0, displayPerPage = 10, status = ENTITY_STATUS.ACTIVE)
{
    const [libraryItems, setLibraryItems] = useState([]);
    const [recommendedItems, setRecommendedItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    /**
     * Asynchronous function to retrieve library items and update the state.
     */
    useEffect(() => {
        /**
         * Asynchronous function to get library items.
         */
        const getLibraryItems = async () => {

            try {

                setSpinnerLoading(true);

                const { data, status: responseStatus } = await LibraryService.getAllByStatus({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                    status: status,
                });

                if (responseStatus === HTTP.OK) {

                    const updatedItems = injectDataToLibraryItems(data.data.items)

                    setLibraryItems(updatedItems);
                    setTotalPages(data.data.totalPages);
                    setTotalElements(data.data.totalElements);

                    //Build recommended - !!!USE Session Cookie!!!
                    const storedRecommendedItems = getItemsFromCookie();

                    if (storedRecommendedItems.length > 0) {
                        setRecommendedItems(storedRecommendedItems);
                    } else {

                        const randPageNumber = generateRandom(1, data.data.totalPages)

                        const { data: recommendedData, status: recommendedStatus } = await LibraryService.getAllByStatus({
                            pageNumber: randPageNumber,
                            pageSize: 3,
                            status: status,
                        });

                        if (recommendedStatus === HTTP.OK) {

                            const updatedRecommendedItems = injectDataToLibraryItems(recommendedData.data.items);

                            storeItemsInCookie(updatedRecommendedItems);

                            setRecommendedItems(updatedRecommendedItems);
                        }
                    }

                    setSpinnerLoading(false);
                    setIsLoading(false);

                } else {
                    setInError(true);
                    setErrorMsg('Lo sentimos, no se encontró ningún contenido disponible en la biblioteca. Por favor, inténtalo de nuevo.');
                }
            } catch (error) {
                setIsLoading(false);
                setSpinnerLoading(false);
                setInError(true);
                setErrorMsg('Se ha producido un error. Trate nuevamente.');
            }
        };

        getLibraryItems();

    }, [currentPaginationIndex, displayPerPage, status]);

    // Return the properties related to the library items
    return { libraryItems, recommendedItems, isLoading, totalElements, totalPages, spinnerLoading, inError, errorMsg, setLibraryItems };
}

