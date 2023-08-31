/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useState} from 'react';
import SimplePaginator from "../../General/SimplePaginator";
import {FaEye, FaTrashAlt} from 'react-icons/fa';
import SmallSpinner from "../../General/SmallSpinner";
import {ApplicationStoragePath} from "../../../services/ApiRest";
import {CONSTANTS} from "../../../config/config";
/*
 * ProfileCardV2 Component
 *
 * Renders a profile card with pagination functionality.
 *
 * Props:
 * - items: Array of items to be displayed in the profile card.
 * - usePreview: Optional boolean indicating whether to display a preview option.
 * - useDelete: Optional boolean indicating whether to display a delete option.
 * - actionHandler: Function to handle the action triggered in the profile card.
 * - badgeColor: Optional string representing the color of the badge in the profile card.
 * - deleteHandler: Function to handle the delete action triggered in the profile card.
 * - deleteLoading: Boolean indicating whether the delete action is in progress.
 * - usePaginateButtons: Optional boolean indicating whether to display pagination buttons.
 *
 * Usage:
 * <ProfileCardV2
 *    items={items}
 *    actionHandler={handleAction}
 *    badgeColor="#64d6c7"
 *    usePaginateButtons={true}
 *    useDelete = false
 *    usePreview = false
 *    deleteHandler = null
 *    deleteLoading = false
 * />
 */
const ProfileCardV2 = ({ items = [], badgeColor = null, usePaginateButtons = true, usePreview = false,
                           useDelete = false, deleteHandler = null, previewHandler = null, downloadHandler = null,
                           deleteLoading = false, useGeneral = false}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = CONSTANTS.DEFAULT_CARDS_ITEMS_PER_PAGE;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    /**
     * handlePageChange function
     * Updates the current page in the pagination.
     * @param {number} page - The page number to set as the current page.
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    /**
     * paginatedItems variable
     * Contains a slice of items based on the current page and items per page.
     */
    let paginatedItems = items && items.length > 0
        ? items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];
    /**
     * useEffect
     * Resets the current page to 1 when the items prop changes.
     */
    useEffect(() => {
        setCurrentPage(1)
    },[items])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-6">
                {paginatedItems.map(({ id, date, title, subTitle, description, icon, action, filePath }, index) => (
                    <div key={index} className="flex flex-col gap-2 rounded-md shadow-small p-5">
                        <div className="w-full flex flex-row justify-between">
                            <p className="my-0 py-0">{date}</p>
                            <div className="w-1/3 flex flex-row justify-end">
                                { useDelete && <FaTrashAlt size={16} className="text-red-700 cursor-pointer" onClick={() => deleteHandler && deleteHandler(id)} /> }
                                {/*{ usePreview && (<a href={`${ApplicationStoragePath}${filePath}`} target="_blank"><FaEye size={18} className="text-[#092C4C] ml-2"/></a>) }*/}
                                { usePreview && (<FaEye onClick={() => previewHandler && previewHandler(id)} size={18} className="text-[#092C4C] ml-2 cursor-pointer"/>) }
                            </div>
                        </div>

                        <div
                            className={`px-2 ${badgeColor ? `${badgeColor}` : 'bg-yellow-500'} bg-opacity-40 w-fit text-sm rounded-sm py-1 font-semibold`}
                        >
                            {title}
                        </div>
                        <h2 className="font-semibold text-xl truncate">{subTitle}</h2>
                        <p className="my-0 py-0 text-sm truncate">{description}</p>
                        <div className="flex flex-row gap-2 items-center mt-2">
                            {icon && (
                                <>
                                    {icon}
                                    <a onClick={() => previewHandler && previewHandler(id)} target="_blank" className="my-0 py-0 text-sm cursor-pointer">{action}</a>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <SimplePaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {
                usePaginateButtons ?
                    (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-blue-500 text-white px-4 py-2 rounded-l"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r"
                            >
                                Next
                            </button>
                        </div>
                    ) : null
            }
            {
                (useDelete || useGeneral) && (
                    <div className="w-full flex flex-row justify-center mt-3">
                        <SmallSpinner loading={deleteLoading}/>
                    </div>
                )
            }
        </div>
    );
};

export default ProfileCardV2;