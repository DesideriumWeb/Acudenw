/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useMemo, useState} from 'react'
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import SmallSpinner from "../General/SmallSpinner";
import {CONFIG} from "../../config/config";

/**
 * Renders the Paginator component with pagination controls.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentPaginationIndex - The index of the current pagination page.
 * @param {number} props.displayPerPage - The number of items to display per page.
 * @param {number} props.total - The total number of items.
 * @param {Function} props.setCurrentPaginationIndex - The function to set the current pagination index.
 * @returns {JSX.Element} The JSX element representing the Paginator component.
 */
export default function Paginator({
                                      currentPaginationIndex,
                                      displayPerPage,
                                      total,
                                      setCurrentPaginationIndex,
                                      loading = false}) {


    /**
     * Calculates the total number of pages based on the total number of items and items per page.
     *
     * @returns {number} The total number of pages.
     */
    const totalPages = useMemo(() => Math.ceil(total / displayPerPage), [
        total,
        displayPerPage,
    ]);

    /**
     * Generates an array of page numbers to be displayed in the paginator component.
     *
     * @returns {Array} An array of page numbers.
     */
    const getPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = CONFIG.PAGINATOR_MAX_VISIBLE_PAGES; // Maximum number of visible pages

        if (totalPages <= visiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPaginationIndex <= 2) {
            for (let i = 0; i < visiblePages - 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages - 1);
        } else if (currentPaginationIndex >= totalPages - 3) {
            pageNumbers.push(0);
            pageNumbers.push('...');
            for (let i = totalPages - visiblePages + 1; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(0);
            pageNumbers.push('...');
            for (let i = currentPaginationIndex - 1; i <= currentPaginationIndex + 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages - 1);
        }
        return pageNumbers;
    };

    /**
     * Navigates to the previous pagination page.
     *
     * @returns {void}
     */
    const goToPrev = () => {
        setCurrentPaginationIndex(currentPaginationIndex - 1)
    }
    /**
     * Navigates to the next pagination page.
     *
     * @returns {void}
     */
    const goToNext = () => {
        setCurrentPaginationIndex(currentPaginationIndex + 1)
    }
    /**
     * Navigates to the specified pagination page.
     *
     * @param {number} step - The index of the pagination page.
     * @returns {void}
     */
    const goToStep = (step) => {
        setCurrentPaginationIndex(step)
    }

    return (
        <>
            <div className="flex flex-row gap-2 items-center justify-center">
                <div
                    onClick={() => currentPaginationIndex > 0 && goToPrev()}
                    className="text-cyan-900 flex flex-row gap-1 items-center px-3 font-semibold cursor-pointer"
                >
                    <BsChevronLeft size={24} /> Página Anterior
                </div>
                {getPageNumbers().map((page, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (page !== '...') {
                                goToStep(page);
                            }
                        }}
                        className={`${
                            currentPaginationIndex === page ? 'bg-cyan-900' : 'bg-gray-500'
                        } hover:bg-${currentPaginationIndex === page ? 'cyan' : 'gray'}-700 text-white px-2 rounded-md cursor-pointer`}
                    >
                        {page === '...' ? '...' : page + 1}
                    </div>
                ))}
                <div
                    onClick={() => currentPaginationIndex < totalPages - 1 && goToNext()}
                    className="text-cyan-900 flex flex-row gap-1 items-center px-3 font-semibold cursor-pointer"
                >
                    Próxima Página <BsChevronRight size={24} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center mt-2">
                <SmallSpinner loading={loading} />
            </div>
        </>
    );
}