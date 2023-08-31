/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react';

/*
 * SimplePaginator Component
 *
 * Renders a simple pagination component with page indicators.
 *
 * Props:
 * - currentPage: Current active page number.
 * - totalPages: Total number of pages.
 * - onPageChange: Function to handle page change event.
 *
 * Usage:
 * <SimplePaginator
 *    currentPage={currentPage}
 *    totalPages={totalPages}
 *    onPageChange={handlePageChange}
 * />
 */
const SimplePaginator = ({ currentPage, totalPages, onPageChange }) => {

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex items-center justify-center mt-8">
            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={`h-2 w-6 mx-1 bg-[#092c4c] ${
                        pageNumber === currentPage ? 'opacity-100' : 'opacity-50'
                    }`}
                    onClick={() => onPageChange(pageNumber)}
                ></div>
            ))}
        </div>
    );
};

export default SimplePaginator;
