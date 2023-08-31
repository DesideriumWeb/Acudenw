/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import { HTTP, STRINGS } from "../../config/config";
import { AccesaServices } from "../../services/accesaSevices/AccesaServices";
import { useDispatch } from "react-redux";
import { setDataEmployeeMyRequest } from "../../stateManagement/slices/employeeMyRequest";
/**
 * Custom hook to retrieve items from my requests.
 * @param {number} currentPaginationIndex - Current pagination index.
 * @param {number} displayPerPage - Number of items to display per page.
 * @param {string} status - Status of the my request items.
 * @returns {object} - Object with properties related to the my request items.
 */
export default function useMyRequest(currentPaginationIndex, displayPerPage = 10)
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
                setSpinnerLoading(true);
                const { data , status } = await new  AccesaServices().getAccesaRequestEmployeeAplication({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                });
                if (status === HTTP.OK) {
                    dispatch(setDataEmployeeMyRequest(data));
                    setMyRequestItems(data.data);
                    setTotalPages(data.data?.totalPages);
                    setTotalElements(data.data?.totalElements);                
                    setSpinnerLoading(false);
                    setIsLoading(false);
                } else {
                    setInError(true);
                    setErrorMsg(`${STRINGS.ERROR_MY_REQUEST}`);
                }
            } catch (error) {
                setIsLoading(false);
                setSpinnerLoading(false);
                setInError(true);
                setErrorMsg(`${STRINGS.GENERIC_ERROR}`);
            }
        };

        getMyRequestItems();
    }, [currentPaginationIndex, displayPerPage]);

    // Return the properties related to the my request items
    return { myRequestItems, isLoading, totalElements, totalPages, spinnerLoading, inError, errorMsg, setMyRequestItems };
}

