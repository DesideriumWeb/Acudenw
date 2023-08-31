import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const BaseModal = ({children}) => {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex justify-center items-center">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(true)}
            >
                Abrir modal
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="relative bg-white w-1/2 rounded-lg">
                                <div className="p-4">{children}</div>
                                <button
                                    className="absolute top-0 right-0 mr-4 mt-4 text-gray-500 hover:text-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="sr-only">Cerrar modal</span>
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default BaseModal;
