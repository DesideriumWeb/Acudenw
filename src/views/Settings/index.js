/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'
import SettingsContainer from "../../components/containers/SettingsContainer/SettingsContainer";
import ChangeEmail from "../../components/Settings/ChangeEmail";
import ChangePassword from "../../components/Settings/ChangePassword";
import ChangeOwnerName from "../../components/Settings/ChangeOwnerName";
import {useSelector} from "react-redux";
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
/**
 * Renders the Settings component.
 * Displays general settings options.
 *
 * @returns {JSX.Element} The JSX element representing the Settings component.
 */
export const Settings = () => {

    const {typeOfUser} = useSelector(state => state.user)

    return (
        <main className="flex flex-col w-full max-w-4xl gap-6 mx-auto pb-4 px-4">
            <h1 className="text-2xl text-cyan-900 font-semibold mb-4 mt-6">General</h1>
            <SettingsContainer>
                <ChangeEmail/>
                <ChangePassword/>
                <ChangeOwnerName typeOfUser={typeOfUser}/>
            </SettingsContainer>
        </main>
    )
}

export default ProtectedComponent(Settings)
