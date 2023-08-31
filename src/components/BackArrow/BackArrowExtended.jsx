/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import React from "react";
import {PORTAL_ROUTES} from "../../config/config";
/**
 * System back arrow button for routing.
 *
 * @param extendedHandler
 * @param route - redirect route
 * @param text - Button text
 * @param className - Component css - Use by default tailwindcss: 'flex flex-row justify-start items-center sm:ml-1 lg:ml-4'
 * @return {JSX.Element}
 * @constructor
 */
export default function BackArrowExtended({extendedHandler = null, route = PORTAL_ROUTES.LANDING_ROUTE, text = 'Salir', className = '', }){

    return (
        <>
            {
                extendedHandler === null
                    ?
                    <Link to={route}>
                        <div className={`flex flex-row justify-start items-center sm:ml-1 lg:ml-4 ${className}`}>
                            <ArrowLeftIcon className="acu-blue w-6 mt-1"/>
                            <h4 className="exit-text ml-1 mt-1">| {text}</h4>
                        </div>
                    </Link>
                    :
                    <div
                        onClick={extendedHandler}
                        className={`flex flex-row justify-start items-center sm:ml-1 lg:ml-4 ${className} cursor-pointer`}>
                        <ArrowLeftIcon className="acu-blue w-6 mt-1" />
                        <h4 className="exit-text ml-1 mt-1">| {text}</h4>
                    </div>
            }
        </>
    );
}