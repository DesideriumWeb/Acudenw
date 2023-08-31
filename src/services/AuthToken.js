/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import {CONFIG} from "../config/config"

/**
 * AuthToken is a utility class for managing authentication tokens and related user information in the local storage.
 */
export class AuthToken {

    /**
     * Retrieves the user token from local storage.
     * Returns null if running in a non-browser environment or if no token is found.
     *
     * @returns {string|null} The stored token or null.
     */
    static get() {
        if (typeof window === 'undefined') {
            return null;
        }

        return localStorage.getItem(CONFIG.USER_TOKEN) || null;
    }

    /**
     * Stores the user token in local storage.
     * Does nothing if running in a non-browser environment.
     *
     * @param {string} token - The token to store.
     */
    static set(token) {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.USER_TOKEN, token || '');
    }

    /**
     * Clears the user token and other user-related information from local storage.
     * Does nothing if running in a non-browser environment.
     */
    static clear() {
        if (typeof window === 'undefined') {
            return;
        }

        const keysToRemove = [
            CONFIG.USER_TOKEN,
            CONFIG.USER_EMAIL,
            CONFIG.USER_ROLE,
            CONFIG.TOWNS,
            CONFIG.SESSION_EXPIRE,
            CONFIG.REFRESH_TOKEN,
            CONFIG.PROVIDER_CATEGORIES,
            CONFIG.EMPLOYEE_PROFILE,
            CONFIG.PROVIDER_PROFILE,
            CONFIG.LOGO_IMAGE,
            CONFIG.LMS_SESSION
        ];

        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Stores the user's session data (email and role) in local storage.
     * Does nothing if running in a non-browser environment.
     *
     * @param {Object} data - The session data to store, containing 'username' and 'role' properties.
     */
    static setSession(data){
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.USER_EMAIL, data.username || '');
        localStorage.setItem(CONFIG.USER_ROLE, data.role || '');
    }
    /**
     * Retrieves the user's email from local storage.
     * Returns null if running in a non-browser environment or if no email is found.
     *
     * @returns {string|null} The stored email or null.
     */
    static getUserEmail(){
        if (typeof window === 'undefined') {
            return null;
        }

        return localStorage.getItem(CONFIG.USER_EMAIL);
    }
    /**
     * Retrieves the user's role from local storage.
     * Returns null if running in a non-browser environment or if no role is found.
     *
     * @returns {string|null} The stored role or null.
     */
    static getUserRole(){
        if (typeof window === 'undefined') {
            return null;
        }

        return localStorage.getItem(CONFIG.USER_ROLE);
    }
}

