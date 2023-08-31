/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {Menu, Transition} from "@headlessui/react";
import {NavLink} from "react-router-dom";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useRef, useState } from 'react'
import {PORTAL_ROUTES, STRINGS} from "../../config/config";
import {Session} from "../../services/Session";


/**
 * DropdownMenu component displays a menu with different options based on the user type.
 *
 * @param {string|null} userType - The type of the user.
 * @returns {JSX.Element} The DropdownMenu component.
 */

const LMSUrlHandler = () => {
    window.open(Session.getLMSResponseSession().url || STRINGS.DEFAULT_ON_EMPTY, '_blank');
}
export default function DropdownMenu({userType = null}) {
    return (
        <div className="top-16 text-right">
            <Menu as="div" className="relative inline-block text-left py-2">
                <div>
                    <Menu.Button className="text-gray-600 inline-flex w-full justify-center rounded-md text-sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <p className="mt-[6px]">Herramientas</p>
                        <ChevronDownIcon
                            className="h-8 w-8 text-[#092C4C]"
                            aria-hidden="true"
                        />
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <NavLink to={PORTAL_ROUTES.CALENDAR_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Calendario
                                    </NavLink>
                                )}
                            </Menu.Item>
                            
                            {
                                userType &&
                                (
                                    <>
                                        <Menu.Item>
                                            {({active}) => (
                                                <NavLink to={PORTAL_ROUTES.PROVIDER_DIRECTORY_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                    Directorio de Centros
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <NavLink to={PORTAL_ROUTES.LANDING_CENTERS_FUTURE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                    Centros del Futuro
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </>
                                )
                            }
                            <Menu.Item>
                                {({active}) => (
                                    <NavLink to={PORTAL_ROUTES.LIBRARY_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Biblioteca
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <NavLink to={PORTAL_ROUTES.NEWS_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                        Noticias
                                    </NavLink>
                                )}
                            </Menu.Item>
                            {
                                !userType && (
                                    <><Menu.Item>
                                        {({ active }) => (
                                            <NavLink to={PORTAL_ROUTES.ACCESA_ROUTE} className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                                ACCESA
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    target="_blank"
                                                    to={(Session.getLMSResponseSession() && Session.getLMSResponseSession().url) || STRINGS.DEFAULT_ON_EMPTY}
                                                    className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                                    rel="noopener noreferrer"
                                                >
                                                    ACUDEN Academy
                                                </NavLink>
                                            )}
                                        </Menu.Item></>                                    
                                )
                            }
                        </div>
                        {/*<div className="px-1 py-1"></div>*/}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
