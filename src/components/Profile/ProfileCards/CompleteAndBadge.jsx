/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {PORTAL_ROUTES, STRINGS} from "../../../config/config";
import {FaAward, FaTrashAlt} from "react-icons/fa";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getBadgeIconByType} from "../../utils";
import BadgeModal from "../BadgeModal";
/**
 * Renders a profile complete courses or badge cards.
 *
 * @version 1.0.1
 * @param items - Array of courses or badges.
 * @param deleteHandler - Optional delete functionality.
 * @param isBadge - Badge type flag.
 * @returns {JSX.Element}
 * @constructor
 */
const CompleteAndBadge = ({items = [], deleteHandler = null, isBadge = false}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    /**
     * Opens the modal and sets the selected item for display.
     *
     * @version 1.0.0
     * @param {Object} item - The object to be shown in the modal.
     * @return {void}
     */
    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };
    /**
     * Closes the modal and resets the selected item.
     *
     * @version 1.0.0
     * @return {void}
     */
    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    return(
        <section className="w-full grid py-2">
            {items && items.length > 0 ? (
                items.map((item, index) => (
                    <div
                        onClick={() => openModal(item)}
                        key={index}
                        className="grid grid-cols-3 gap-1 shadow-md rounded-lg overflow-hidden my-2 cursor-pointer"
                    >
                        <div className={`col-span-1 flex items-center justify-center ${!isBadge ? 'bg-[#092c4c]' : ''} `}>
                            {
                                isBadge
                                    ? <img className="p-1" alt="badge icon" src={getBadgeIconByType(item.type)}/>
                                    : <FaAward size={60} className="text-white"/>
                            }
                        </div>
                        <div className="col-span-2 flex flex-col justify-center py-4 px-2">
                            <div className="w-full flex flex-row justify-between">
                                {
                                    isBadge ?
                                        (
                                            <h2 className="font-bold text-[15px] truncate w-3/4">{item.name ?? STRINGS.DEFAULT_ON_EMPTY}</h2>
                                        )
                                        :
                                        (
                                            <h2 className="font-bold text-[15px] truncate w-3/4">{item.title ?? STRINGS.DEFAULT_ON_EMPTY}</h2>
                                        )
                                }
                                {
                                    deleteHandler && <FaTrashAlt size={14} className="text-red-700 w-1/4 ml-4 mr-0" onClick={() => deleteHandler && deleteHandler(item.id)} />
                                }
                            </div>
                            {
                                isBadge
                                ?
                                    (
                                        <p className="text-[11px] mt-1">{item.description ?? STRINGS.DEFAULT_ON_EMPTY}</p>
                                    )
                                    :
                                    (
                                        <p className="text-sm line-clamp-3 mt-1">
                                            {/*TODO - este redirect debe ser para ver los certificados de los cursos completado NO AL DASHBOARD*/}
                                            <Link to={PORTAL_ROUTES.DASHBOARD_ROUTE}>
                                                <div className="w-full flex flex-row justify-start items-center mt-2">
                                                    <FaAward size={18} className="text-green-400"/>
                                                    <p className="text-[12px] font-semibold ml-1">Ver Certificado</p>
                                                </div>
                                            </Link>
                                        </p>
                                    )
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay {isBadge ? 'insignias' : 'cursos completados o en progreso'} disponibles.</p>
            )}
            {selectedItem && (
                <BadgeModal item={selectedItem} showModal={showModal} closeModal={closeModal} />
            )}
        </section>
    );
}
export default CompleteAndBadge