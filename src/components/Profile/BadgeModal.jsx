/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import {STRINGS} from "../../config/config";
import {getBadgeIconByType} from "../utils";
/**
 * Renders a modal to display badge information.
 *
 * @version 1.0.0
 * @param {object} item - The badge item to display information about.
 * @param {boolean} showModal - Flag to control whether the modal is shown.
 * @param {function} closeModal - Function to close the modal.
 * @returns {JSX.Element|null} - The JSX element representing the modal.
 */
const BadgeModal = ({ item = {}, showModal, closeModal }) => {

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-center"
                    >
                        <div className="my-2">
                            <div className="max-w-[460px]">
                                <div className="border-0 rounded-lg shadow-lg flex flex-col px-6 py-3 bg-white outline-none focus:outline-none">
                                    <div className="flex justify-end py-4">
                                        <button
                                            className="border-0 text-[#092C4C] text-3xl"
                                            onClick={closeModal}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M29.1165 24.8816C30.2883 26.0534 30.2883 27.9517 29.1165 29.1235C28.5353 29.7094 27.7666 30 26.9979 30C26.2292 30 25.4624 29.7071 24.8774 29.1212L14.9988 19.2477L5.12116 29.1188C4.53527 29.7094 3.76752 30 2.99977 30C2.23201 30 1.4652 29.7094 0.878838 29.1188C-0.292946 27.947 -0.292946 26.0487 0.878838 24.877L10.7593 14.9965L0.878838 5.12069C-0.292946 3.94891 -0.292946 2.05062 0.878838 0.878838C2.05062 -0.292946 3.94891 -0.292946 5.12069 0.878838L14.9988 10.764L24.8793 0.883525C26.0511 -0.288258 27.9494 -0.288258 29.1212 0.883525C30.2929 2.05531 30.2929 3.9536 29.1212 5.12538L19.2407 15.0059L29.1165 24.8816Z"
                                                    fill="#092C4C"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center font-semibold mx-4 py-4">

                                        <p className="text-4xl text-black font-semibold my-3">{STRINGS.GENERAL_CONGRATS}</p>
                                        <img className="w-40 h-40 my-6" src={getBadgeIconByType(item.type)} alt="badge icon"/>
                                        <p className="text-acuBaseBlue text-[16px] font-bold mt-4">{STRINGS.CDF_NEW_BADGE}</p>
                                        <p className="text-black text-3xl mt-4">{item.name || STRINGS.DEFAULT_ON_EMPTY}</p>
                                        <p className="text-black text-sm my-2 mt-8">{item.description || STRINGS.DEFAULT_ON_EMPTY}</p>

                                        <button
                                            onClick={closeModal}
                                            className="my-4 mt-10 bg-[#092C4C] text-white hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md py-2
                                            px-4 rounded-md transition-colors duration-300 w-full">
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default BadgeModal;


