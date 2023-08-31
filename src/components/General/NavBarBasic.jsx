/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {Link} from "react-router-dom";
import {PORTAL_ROUTES} from "../../config/config";
import DropdownMenu from "../Headers/DropDownMenu";
import React from "react";
import { type } from "@testing-library/user-event/dist/type";
/**
 * NavBarBasic component displays the basic navigation bar with links and a dropdown menu.
 *
 * @param {string} typeOfUser - The type of the user.
 * @param {boolean} isLoggedIn - A flag indicating whether the user is logged in.
 * @returns {JSX.Element} The NavBarBasic component.
 */
const NavBarBasic = ({typeOfUser, isLoggedIn}) => {
    return(
        <>
            <Link to="/" className="text-gray-600">
                Inicio
            </Link>

            <Link to={PORTAL_ROUTES.ABOUT_ROUTE} className="text-gray-600">
                ACUDEN
            </Link>

            {isLoggedIn
                ?  
                <DropdownMenu userType={typeOfUser.includes('PROVIDER') ? typeOfUser : null}/>
                 : null
             }
            

            <Link to={PORTAL_ROUTES.CONTACT_ROUTE} className="text-gray-600">
                Contacto                
            </Link>

            {isLoggedIn
                ?<Link to={PORTAL_ROUTES.HELP_ROUTE}  className="text-gray-600 flex md:hidden">
                Centro de ayuda
                </Link>
                :   null
            }

            {isLoggedIn
                ?<Link to={PORTAL_ROUTES.DASHBOARD_ROUTE}  className="text-gray-600 flex md:hidden">
                Dashboard          
                </Link>
                :   null
            }

            {!isLoggedIn 
                ?<Link to={PORTAL_ROUTES.LOGIN_ROUTE}  className="text-gray-600 flex md:hidden">
                Inicia sesión        
                </Link> 
                : null
            }

            
            

            {/*Remove - Recommendations - Excel V3L | 07-11-23 lcn*/}
            {/*{isLoggedIn && typeof typeOfUser === "string" && typeOfUser.includes('EMPLOYEE') && (*/}
            {/*    <Link to={PORTAL_ROUTES.RESOURCES_ROUTE} className="text-gray-600 mr-5">*/}
            {/*        Cursos*/}
            {/*    </Link>*/}
            {/*)}*/}
        </>
    );
}

export default NavBarBasic