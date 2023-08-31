/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { BiCheckCircle } from 'react-icons/bi';
import { BiPlayCircle } from 'react-icons/bi';
import { IoChevronForward } from 'react-icons/io5';
import {STRINGS} from "../../config/config";
import React from "react";
import {Link} from "react-router-dom";
import {formatDateToSpanishWords, formatDateToSpanishWordsForDateTime} from "../utils";
import {CalendarIcon} from "@heroicons/react/20/solid";
/**
 * Component for displaying acuden academy courses cards.
 * @param {Array} items - The array of certification data.
 * @param handler - Acuden academy courses optional handler.
 * @returns {JSX.Element} The AcudenAcademyCard component.
 *
 * Props:
 * - items: Employee active courses.
 * - handler: Optional handler
 */
const AcudenAcademyCard = ({items = [], handler = null}) => {
    return(
        <div className="overflow-y-auto h-auto">
            <section className="w-full grid py-2">
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-1 shadow-md rounded-lg overflow-hidden my-2"
                        >
                            <div className="col-span-1 flex items-center justify-center bg-acuBaseBlue">
                                <BiPlayCircle  size={70} className="text-white"/>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center py-4 px-2 bg-white">
                                <div className="w-full flex flex-row justify-between">
                                    <h2 className="font-bold text-[14px] w-3/4">{item.title || STRINGS.DEFAULT_ON_EMPTY}</h2>
                                </div>
                                {
                                    item.shortDescription &&
                                    (
                                        <p
                                            className="text-[12px] line-clamp-3 mt-2 text-acuBaseBlue
                                            py-1 flex items-center font-semibold italic">
                                            {item.shortDescription || STRINGS.DEFAULT_ON_EMPTY}
                                        </p>
                                    )
                                }
                                {
                                    item.createdOn &&
                                    (
                                        <div className="flex flex-row mt-2 items-center">
                                            <CalendarIcon className="mr-1 h-4 w-4 shadow-sm"/>
                                            <p className="text-acuBaseBlue text-[12px] font-semibold">{`Creado: ${formatDateToSpanishWordsForDateTime(item.createdOn)}`}</p>
                                        </div>
                                    )
                                }
                                <div className="w-full flex flex-row justify-end mt-4">
                                    <Link
                                        target="_blank"
                                        to={item.url}
                                        className="text-acuBaseBlue font-semibold text-[12px] flex items-center hover:text-acuGreen hover:font-semibold">
                                        Ver | Completar
                                        <IoChevronForward className="ml-1 text-acuBaseBlue" size={17} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay cursos disponibles</p>
                )}
            </section>
        </div>
    );
}

export default AcudenAcademyCard