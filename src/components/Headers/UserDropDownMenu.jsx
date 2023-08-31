/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import {Fragment, useEffect, useState} from 'react'
import { IoPersonCircle } from "react-icons/io5";
import { AuthToken } from "../../services/AuthToken";
import { PORTAL_ROUTES } from "../../config/config";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../stateManagement/slices/userSlice";
import useProvider from "../../hooks/Provider/useProvider";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";

export default function UserDropdownMenu({ userType = null, profilePic }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id:providerId} = useProvider()
    const {id:employeeId} = useEmployeeProfile()
    /**
     * Logout - destruct session
     * @return void
     */
    const LogOut = () => {
        AuthToken.clear();
        dispatch(setIsLoggedIn({
            isLoggedIn: false
        }))
        navigate(PORTAL_ROUTES.LANDING_ROUTE);
    }

    return (
        <div className="top-16 text-right">
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className="inline-flex items-center justify-center rounded-md py-1 text-sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {!profilePic && <IoPersonCircle size={50} color="#092C4C"/>}
                        {profilePic && <div className="h-12 w-12 md:h-16 md:w-16 rounded-full  border-white border-[4px] overflow-hidden bg-white bg-cover">
                            <img src={profilePic} alt="profilePhoto" className="h-full w-full object-fill" />
                        </div>}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink to={PORTAL_ROUTES.SETTINGS_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Ajustes
                                    </NavLink>
                                )}
                            </Menu.Item>
                            {
                                userType && userType.includes('PROVIDER')
                                    ?
                                    <Menu.Item>
                                        {({active}) => (
                                            <NavLink to={`${PORTAL_ROUTES.PROVIDER_PROFILE_ROUTE}${providerId}`} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                Ver Perfil
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    :
                                    <Menu.Item>
                                        {({active}) => (
                                            <NavLink to={`${PORTAL_ROUTES.EMPLOYEE_PROFILE_ROUTE}${employeeId}`} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                Ver Perfil
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                            }
                            {/*<Menu.Item>*/}
                            {/*    {({ active }) => (*/}
                            {/*        <NavLink to={PORTAL_ROUTES.CALENDAR_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>*/}
                            {/*            Calendario*/}
                            {/*        </NavLink>*/}
                            {/*    )}*/}
                            {/*</Menu.Item>*/}
                            {
                                userType &&
                                (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink to={PORTAL_ROUTES.PROVIDER_DIRECTORY_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                Directorio de Centros
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                )
                            }
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink to={PORTAL_ROUTES.PRIVACY_POLICY_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Política de Privacidad
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink to={PORTAL_ROUTES.USE_TERMS_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Términos de Uso
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div onClick={LogOut}
                                        className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-red-500'}`}>
                                        Cerrar sesión
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
