/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";


/**
 * Renders the PageTitle component with the specified title.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed.
 * @returns {JSX.Element} The JSX element representing the PagesTitles component.
 */
const PagesTitles = ({title}) => {
    return(
        <h1 className="font-semibold text-3xl py-6 acu-blue my-6">{title}</h1>
    );
}

export default PagesTitles