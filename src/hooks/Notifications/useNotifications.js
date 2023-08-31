/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {NotificationService} from "../../services/notificationServices/NotificationService";
import {HTTP} from "../../config/config";
import {getUnreadNotifications} from "../../components/utils";
/**
 * Custom hook for fetching notifications.
 *
 * @param {string} audience - The target audience of the notifications.
 * @param {number} retry - Number of times to retry fetching notifications.
 * @returns {object} - Object containing the notifications, loading state, and error.
 */
export default function useNotifications(audience, retry = 0) {

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNew , setHasNew] = useState(false)
    const [newQty, setNewQty] = useState(0)

    useEffect(() => {
        const getNotifications = async () => {

            try {

                const { data, status } = await NotificationService.getNotViewNotifications();

                if (status === HTTP.OK) {

                    const { unreadCount, hasUnreadNotifications } = getUnreadNotifications(data.data)

                    setNotifications(data.data);
                    setNewQty(unreadCount)
                    setHasNew(hasUnreadNotifications)
                }

            } catch (error) {
                setError("Lo sentimos, se ha producido un error en las notificaciones. Trate nuevamente.");
            }
            finally {
                setIsLoading(false);
            }
        };

        if (!!audience) {
            getNotifications();
        }
    }, [audience, retry]);

    return { notifications, isLoading, error, hasNew, newQty, setHasNew, setNewQty};
}
