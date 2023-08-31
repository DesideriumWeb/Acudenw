/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    email: '',
    password: '',
    typeOfUser: "",
    isLoggedIn: false,
    refresh: 0
}
/**
 * Redux slice for managing user state.
 */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Set user data in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload containing user data.
         */
        setData: (state, {payload}) => {
            state.email = payload.email
            state.typeOfUser = payload.typeOfUser
            state.isLoggedIn = payload.isLoggedIn
            state.refresh = payload.refresh
        },
        /**
         * Set the user email in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload containing the email.
         */
        setEmail: (state, {payload}) => {
            state.email = payload.email
        },
        /**
         * Set the user password in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload containing the password.
         */
        setPassword: (state, {payload}) => {
            state.password = payload.password
        },
        /**
         * Clear user data from the state.
         * @param {Object} state - The current state.
         */
        clearData: (state) => {
            state = {...initialState}
        },
        /**
         * Set the type of user in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload containing the type of user.
         */
        setTypeOfUser: (state, {payload}) => {
            state.typeOfUser = payload.typeOfUser
        },
        /**
         * Set the user's login status in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload containing the login status.
         */
        setIsLoggedIn: (state, {payload}) => {
            state.isLoggedIn = payload.isLoggedIn
        },
        /**
         * Increment the refresh value in the state.
         * @param {Object} state - The current state.
         * @param {Object} payload - The payload (not used in this case).
         */
        incrementRefresh: (state, {payload}) => {
            if(state.refresh === undefined)
                state.refresh = 0
            else
                state.refresh += 1
        }
    }
})

export const {
    setData,
    clearData,
    setEmail,
    setPassword,
    setTypeOfUser,
    setIsLoggedIn,
    incrementRefresh
} = userSlice.actions

export default userSlice.reducer
