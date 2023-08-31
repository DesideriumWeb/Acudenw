/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import EmployeeService from "../../services/userServices/EmployeeService";
import {HTTP} from "../../config/config";

/**
 * Custom hook to fetch and manage work experience items with pagination.
 * @param {number} currentPaginationIndex - The current page index for pagination.
 * @param {number} displayPerPage - The number of work experience items to display per page.
 * @param updateWorkExperience - Parameter for reload work experience data.
 * @returns {object} - An object containing the work experience items and loading status.
 */
export default function useWorkExperience(currentPaginationIndex = 0, displayPerPage = 10, updateWorkExperience = 0) {

    const [workExperienceItems, setWorkExperienceItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getEmployeeExperienceItems = async () => {
            try {

                const { data, status } = await EmployeeService.getEmployeeWorkExperience({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                });

                if (status === HTTP.OK) {
                    setWorkExperienceItems(data.data);
                } else {
                    setWorkExperienceItems([])
                }
            } catch (error) {
                console.log(`Error get employee work experience: ${error}`)
                setWorkExperienceItems([])
            } finally {
                setIsLoading(false);
            }
        };

        getEmployeeExperienceItems();

    }, [currentPaginationIndex, displayPerPage, updateWorkExperience]);

    return { workExperienceItems, isLoading };
}
