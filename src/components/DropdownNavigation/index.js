import React, {Fragment} from "react";
import {Popover, Transition} from "@headlessui/react";
import {BsChevronDown} from "react-icons/bs";
import {AuthToken} from "../../services/AuthToken";
import stylesTop from "css/Top.module.css"
import {Link, useNavigate} from 'react-router-dom'


export default function DropdownNavigation() {

    const navigate = useNavigate()

    const links = [
        {href: '/Dashboard', name: 'Dashboard'},
        {href: '/Settings', name: 'Ajustes'},
        {href: '/PrivacyPolicy', name: 'Politica de Privacidad'},
        {href: '/UseTerm', name: 'Terminos de Uso'},
    ]

    return (
        <Popover className={'tw-relative'}>
            <Popover.Button
                className={stylesTop.register}             >
                <span>Menu</span>
                <BsChevronDown className={'tw-h-5 tw-w-5'} aria-hidden={'true'}/>
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="tw-transition tw-ease-out tw-duration-200"
                enterFrom="tw-opacity-0 tw-translate-y-1"
                enterTo="tw-opacity-100 tw-translate-y-0"
                leave="tw-transition tw-ease-in tw-duration-150"
                leaveFrom="tw-opacity-100 tw-translate-y-0"
                leaveTo="tw-opacity-0 tw-translate-y-1"
            >
                <Popover.Panel
                    className="tw-absolute tw-z-10 -tw-mt-6 -tw-left-12 tw-flex tw-w-screen tw-max-w-min tw-px-4">
                    <div
                        className="tw-w-56 tw-shrink tw-bg-[#092C4C] tw-rounded-xl tw-p-4 tw-text-sm tw-font-semibold tw-leading-60 tw-shadow-lg tw-ring-1 tw-ring-gray-900/5">
                        {links.map((item) => (
                            <Link key={item.name} to={item.href} className="tw-block tw-p-2 tw-text-white hover:tw-text-blue-600 visited:tw-text-white">
                                {item.name}
                            </Link>
                        ))}
                        <a href={'/'} onClick={() => {
                            AuthToken.clear()
                        }} className="hover:tw-cursor-pointer tw-block tw-p-2 tw-text-white">Cerrar Sesion
                        </a>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
