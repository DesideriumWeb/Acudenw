/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, NotificationServices} from "../ApiRest";
import {HTTP} from "../../config/config";

/**
 * Class for handling notification-related services.
 */
export class NotificationService {
    /**
     * Retrieves notifications based on the specified audience.
     *
     * @param {string} audience - The audience for which to retrieve notifications.
     * @returns {Object} An object containing the retrieved notification data and status.
     */
    static async getNotificationByAudience(audience) {
        try
        {
            audience = audience.slice(audience.indexOf('_') + 1);

            const params = new URLSearchParams();
            params.append("audience", audience);

            const { data, status } = await axiosInstance.get(`${NotificationServices}audience/${audience}`);
            return { data, status };
        }
        catch (error)
        {
            console.log(error);
            return { data: null, status: HTTP.INTERNAL_ERROR };
        }
    }

    /**
     * Retrieves non-viewed notifications for the current user.
     *
     * @returns {Object} An object containing the retrieved notification data and status.
     */
    static async getNotViewNotifications() {
        try {
            const { data, status } = await axiosInstance.get(`${NotificationServices}getnoviewbyuser`);
            return { data, status };
        } catch (error) {
            console.log(error);
            return { data: null, status: HTTP.INTERNAL_ERROR };
        }
    }
}

