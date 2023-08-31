/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'

/**
 * Renders the SettingsContainer component.
 * Displays a container for settings with a specific layout.
 *
 * @param {Object} children - The child components to render inside the container.
 * @returns {JSX.Element} The JSX element representing the SettingsContainer component.
 */
export default function SettingsContainer({ children }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ boxShadow: "0px 0px 5px #3336" }} className="bg-white p-6 rounded-lg overflow-hidden flex flex-col justify-between">
                    {React.Children.toArray(children)[0]}
                </div>
                <div style={{ boxShadow: "0px 0px 5px #3336" }} className="bg-white p-6 rounded-lg overflow-hidden flex flex-col justify-between">
                    {React.Children.toArray(children)[1]}
                </div>
            </div>
            <div style={{ boxShadow: "0px 0px 5px #3336" }} className="bg-white p-6 rounded-lg overflow-hidden flex flex-col justify-between">
                {React.Children.toArray(children)[2]}
            </div>
        </>
    );
}

