/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {ENTITY_STATUS, HTTP, STRINGS} from "../../config/config";
import {CenterFutureServices} from "../../services/centerFutureServices/CenterFutureServices";
import { useDispatch } from "react-redux";
import { setDataCenterFutureMyRequest } from "../../stateManagement/slices/centersFutureMyRequest";
/**
 * Custom hook to retrieve items from my requests of centers future .
 * @param {number} currentPaginationIndex - Current pagination index.
 * @param {number} displayPerPage - Number of items to display per page.
 * @param {string} status - Status of my request of centers future  items.
 * @param providerId - ACUDEN ProviderId
 * @returns {object} - Object with properties related to my request of centers future  items.
 */
export default function useMyRequestCentersFuture(currentPaginationIndex = 0, displayPerPage = 10, status = ENTITY_STATUS.ACTIVE, providerId = 0)
{
    const [myRequestItems, setMyRequestItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();

    /**
     * Asynchronous function to retrieve my request items and update the state.
     */
    useEffect(() => {
        /**
         * Asynchronous function to get my request items.
         */
        const getMyRequestItems = async () => {

            try {

                setIsLoading(true);

                const { data, status: responseStatus } = await CenterFutureServices.getCentersFutureRequests(providerId, {
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                    status: status,
                });

                if (responseStatus === HTTP.OK) {

                    setMyRequestItems(data.data);
                    setTotalPages(1);
                    setTotalElements(1);

                } else {
                    setInError(true);
                    setErrorMsg('Lo sentimos, no se encontraron solicitudes disponible. Por favor, inténtelo de nuevo.');
                }
            } catch (error) {
                console.log(`Get CDF Provider requests: ${error}`)
                setInError(true);
                setErrorMsg(STRINGS.GENERIC_ERROR);
            }finally {
                setSpinnerLoading(false);
                setIsLoading(false);
            }
        };

        getMyRequestItems();

    }, [currentPaginationIndex, displayPerPage, status]);

    // Return the properties related to my request items
    return { myRequestItems, isLoading, totalElements, totalPages, spinnerLoading, inError, errorMsg, setMyRequestItems };
}

