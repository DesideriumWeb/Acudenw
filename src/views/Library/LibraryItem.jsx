/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import LibraryActionMenu from "./LibraryActionMenu";
import {HiBookOpen, HiDocumentText} from "react-icons/hi";
import {BsPlayFill} from "react-icons/bs";
import {ImMap} from "react-icons/im";
import {formatDateToSpanishWordsForDateTime} from "../../components/utils";

/**
 * Library Item component that displays individual library items.
 * @param {Object[]} items - The list of library items to display.
 * @param {function} removeItem - The function to remove an item from the library.
 * @param {boolean} [isStored=false] - Indicates if the item is stored in the library.
 * @param {function} [setPaginator=null] - Function to set the paginator.
 * @param {function} [pushHandler=null] - Function to handle pushing an item.
 * @returns {JSX.Element} Library Item component.
 */
const LibraryItem = ({ items, removeItem = null, isStored = false, setPaginator = null, pushHandler = null }) => {

    return (
        <div className="flex flex-col rounded-xl overflow-auto gap-2 w-full">
            {items.map((item, index) => {

                const { color, title, Icon, createdOn } = item;

                return (
                    <div key={index} className="flex flex-row rounded-xl shadow-sm w-full">
                        <div
                            style={{ backgroundColor: color }}
                            className="w-12 h-16 flex justify-center items-center"
                        >
                            {
                                typeof Icon === 'string' ? (
                                    Icon === 'HiBookOpen' ? (
                                        <HiBookOpen color="white" size={32} />
                                    ) : Icon === 'ImMap' ? (
                                        <ImMap color="white" size={32} />
                                    ) : Icon === 'HiDocumentText' ? (
                                        <HiDocumentText color="white" size={32} />
                                    ) : Icon === 'BsPlayFill' ? (
                                        <BsPlayFill color="white" size={32} />
                                    ) : (
                                        <HiBookOpen color="white" size={32} />
                                    )
                                ) : <HiBookOpen color="white" size={32} />
                            }
                        </div>
                        <div className="px-4 flex flex-row items-center justify-between flex-1">
                            <div className="flex flex-col flex-grow">
                                <p className="font-bold">{title}</p>
                                <p className="text-sm">Publicado el {formatDateToSpanishWordsForDateTime(createdOn)}</p>
                            </div>
                            <LibraryActionMenu
                                disableRemove={false}
                                isStored={isStored}
                                item={item}
                                removeHandler={() => removeItem(item)}
                                pushOnAdd={pushHandler && (() => pushHandler(item))}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LibraryItem