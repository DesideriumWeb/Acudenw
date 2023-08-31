/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {PORTAL_ROUTES} from "../../config/config";

/**
 * Simple system back arrow button for routing.
 * @param route - Redirect route
 * @param text - Button text
 * @return {JSX.Element}
 * @constructor
 */
export default function BackArrow({route = PORTAL_ROUTES.LANDING_ROUTE, text = 'Salir'}) {
    return (
        <Link to={route}>
            <div className="flex flex-row justify-start items-center p-4 ml-4">
                <ArrowLeftIcon className="acu-blue w-6 mt-1"/>
                <h4 className="exit-text ml-1 mt-1">| {text}</h4>
            </div>
        </Link>
    );
}