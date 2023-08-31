/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import { CONFIG } from "../config/config";
import { AuthToken } from "./AuthToken";

/**
 * Class for handling storage and retrieval of session-related information and preventing redundant API calls.
 */
export class Session {
    /**
     * Stores the towns in the local storage of the browser.
     * @param {Array} data - Data object of the towns to store.
     */
    static storeTowns(data = []) {

        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.TOWNS, JSON.stringify(data));
    }

    /**
     * Retrieves the stored towns from the local storage of the browser.
     * @returns {Array} - Array of the stored towns.
     */
    static getTowns() {
        return JSON.parse(localStorage.getItem(CONFIG.TOWNS));
    }

    /**
     * Stores the provider categories in the local storage of the browser.
     * @param {Array} data - Data object of the towns to store.
     */
    static storeProviderCategories(data = []) {

        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.PROVIDER_CATEGORIES, JSON.stringify(data));
    }

    /**
     * Retrieves the stored provider categories from the local storage of the browser.
     * @returns {Array} - Array of the stored categories.
     */
    static getProviderCategories() {
        return JSON.parse(localStorage.getItem(CONFIG.PROVIDER_CATEGORIES));
    }

    /**
     * Stores the employee profile in the local storage of the browser.
     * @param {Object} data - Data object of the employee profile to store.
     */
    static storeEmployeeProfile(data) {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.EMPLOYEE_PROFILE, JSON.stringify(data));
    }

    /**
     * Stores the provider profile in the local storage of the browser.
     * @param {Object} data - Data object of the provider profile to store.
     */
    static storeProviderProfile(data) {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.PROVIDER_PROFILE, JSON.stringify(data));
    }

    /**
     * Removes employee profile in the local storage of the browser.
     * 
     */
    static removeEmployeeProfile() {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(CONFIG.EMPLOYEE_PROFILE);
    }

    /**
     * Removes provider profile in the local storage of the browser.
     *
     */
    static removeProviderProfile() {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(CONFIG.PROVIDER_PROFILE);
    }

    /**
     * Retrieves the stored employee profile from the local storage of the browser.
     * @returns {Object} - Array of the stored employee.
     */
    static getEmployeeProfile() {
        return JSON.parse(localStorage.getItem(CONFIG.EMPLOYEE_PROFILE));
    }

    /**
     * Retrieves the stored provider profile from the local storage of the browser.
     * @returns {Object} - Array of the stored provider.
     */
    static getProviderProfile() {
        return JSON.parse(localStorage.getItem(CONFIG.PROVIDER_PROFILE));
    }

    /**
     * Gets the towns in a Data Transfer Object (DTO) format.
     * @returns {Array} - Array of DTO objects of the towns.
     */
    static getTownDropDTO() {

        const townList = this.getTowns();

        return townList.map(t => ({
            label: t.name,
            value: t.id,
            id: t.id
        }));
    }

    /**
     * Gets the provider categories in a Data Transfer Object (DTO) format.
     * @returns {Array} - Array of DTO objects of the provider categories.
     */
    static getProviderCategoriesDropDTO() {

        const categoriesList = this.getProviderCategories();

        return categoriesList.map(c => ({
            label: c.description,
            value: c.id,
            id: c.id
        }));
    }

    /**
     * This function sets an expiration time for the user session.
     *
     * @param {number} time - The session's expiration time in milliseconds.
     * By default, it is set to the SESSION_TIME value from the CONFIG object.
     *
     * If no parameter is passed, CONFIG.SESSION_TIME will be used.
     */
    static setExpiry(time = CONFIG.SESSION_TIME) {

        const now = new Date();

        localStorage.setItem(
            CONFIG.SESSION_EXPIRE,
            JSON.stringify(now.getTime() + time)
        );
    }
    /**
     * This function checks if the current session has expired.
     *
     * If the session is expired (current time is greater than expiration time),
     * it clears the AuthToken.
     *
     * @return {void}
     */
    static checkSession() {

        const now = new Date();
        const expiry = JSON.parse(localStorage.getItem(CONFIG.SESSION_EXPIRE));

        if (now.getTime() > expiry) {
            AuthToken.clear();
        }
    }
    /**
     * Store User (Provider/Employee) profile image
     * @param image
     */
    static storeLogoImage(image){

        if (typeof window === 'undefined') {
            return;
        }

        //remove just in case
        localStorage.removeItem(CONFIG.LOGO_IMAGE)

        localStorage.setItem(
            CONFIG.LOGO_IMAGE,
            JSON.stringify(image)
        )
    }
    /**
     * Return User (Provider/Employee) profile image.
     * @return {any}
     */
    static getLogoImage(){
        return JSON.parse(localStorage.getItem(CONFIG.LOGO_IMAGE))
    }
    /**
     * Store user LMS session data.
     * @version 1.0.0
     * @param data - LMS session data.
     * @return {void}
     */
    static setLMSResponseSession(data){
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(CONFIG.LMS_SESSION, JSON.stringify(data))
    }
    /**
     * Return user LMS session data object.
     * @version 1.0.0
     * @return {any}
     */
    static getLMSResponseSession(){
        if (typeof window === 'undefined') {
            return;
        }

        return JSON.parse(localStorage.getItem(CONFIG.LMS_SESSION))
    }
}

