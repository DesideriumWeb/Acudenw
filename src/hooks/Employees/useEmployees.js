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
/**
 * Custom hook to fetch and manage employees data with pagination.
 * @param {number} currentPaginationIndex - The current page index for pagination.
 * @param {number} displayPerPage - The number of employees to display per page.
 * @returns {Array} - An array containing the employees data and a setter function to trigger a retry.
 */
export default function useEmployees(currentPaginationIndex = 0, displayPerPage = 10) {

    const [employees, setEmployees] = useState([])
    const [retry,setRetry] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getEmployees = async () => {

            try{

                const {data} = await EmployeeService.getAll({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage,
                })

                setEmployees(data.employees)

            }catch (error){
                console.log(`Get all employees error: ${error}`)
            }finally {
                setLoading(false)
            }

        }

        getEmployees()
    }, [currentPaginationIndex, displayPerPage, retry])

    return [employees, setRetry, loading]
}
