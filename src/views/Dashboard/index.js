/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import DashboardProvider from "./DashboardProvider";
import useTowns from "../../hooks/Towns/useTowns";
import useProviderCategories from "../../hooks/Provider/useProviderCategories";
import DashboardEmployee from "./DashboardEmployee";

export default function Dashboard() {

    const {typeOfUser} = useSelector(state => state.user)

    useTowns();
    useProviderCategories();

    function DashboardRedirect () {
        if(typeOfUser?.toLowerCase().includes('provider')) {
            return <DashboardProvider/>
        }
        else if (typeOfUser?.toLowerCase().includes('employee')) {
            return <DashboardEmployee/>
        } else {
            return <Navigate replace to={'/'} />
        }
        
    }

    return DashboardRedirect()
}
