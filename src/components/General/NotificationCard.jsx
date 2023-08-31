/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from "react";
import notiAcuIcon from "../../assets/images/icons/noti-acu-icon.png"
import { parseISO } from 'date-fns';
import SmallSpinner from "./SmallSpinner";
import {formatDateToSpanishWordsForDateTime, formatTimeTo12Hour} from "../utils";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import {ALERT_TYPES, HTTP, STRINGS} from "../../config/config";
import {useSelector} from "react-redux";
import UserService from "../../services/userServices/UserService";
import BasicAlert from "./BasicAlert";
/**
 * NotificationCard component.
 * This component displays a list of notifications in a card format.
 *
 * @param {Object} props - Component props.
 * @param {function} props.setShowNotifications - Function to control the visibility of the notification card.
 * @param {Array} props.notifications - Array of notifications to display.
 * @param {boolean} props.isLoading - Boolean indicating whether the notifications are currently loading.
 * @returns {JSX.Element} NotificationCard component.
 */
const NotificationCard = ({ setShowNotifications, notifications = [], isLoading, markNotificationsAsRead }) => {

    const { typeOfUser } = useSelector(state => state.user);
    const [alertMsg, setAlertMsg] = useState({});
    const [showAlert, setShowAlert] = useState({});

    const removeNotification = async (notification) => {
        try {
            const { data, status } = await UserService.updateNotification(notification);

            if (data.httpCode !== HTTP.CREATED) {
                setAlertMsg(prevState => ({ ...prevState, [notification.id]: 'La notificación no ha sido marcada como leída.' }));
            } else {
                setAlertMsg(prevState => ({ ...prevState, [notification.id]: 'La notificación ha sido marcada como leída.' }));
            }
        } catch (error) {
            console.log(`Update Notification error: ${error}`);
            setAlertMsg(prevState => ({ ...prevState, [notification.id]: 'La notificación no ha sido marcada como leída.' }));
        } finally {
            setShowAlert(prevState => ({ ...prevState, [notification.id]: true }));
            setTimeout(() => {
                setShowAlert(prevState => ({ ...prevState, [notification.id]: false }));
            }, 5000);
        }
    };

    return (
        <div className="absolute bg-white shadow-md h-[80vh] w-[90vw] max-w-[400px] right-0 -bottom-1 translate-y-[100%] flex flex-col overflow-hidden mt-5">
            <div className="relative flex flex-col overflow-y-auto">
                <div className="p-6 flex flex-row w-full justify-between items-center">
                    <h1 className="text-[#092C4C] font-semibold text-xl ">
            <span>
              Notificaciones{" "}
                {notifications && notifications.length > 0 ? `(${notifications.length})` : "(0)"}{" "}
                <SmallSpinner loading={isLoading} />
            </span>
                    </h1>
                    <button
                        onClick={() => { setShowNotifications(false); markNotificationsAsRead(); }}
                        className="font-semibold text-[#092C4C] border-none outline-none bg-transparent">
                        Cerrar
                    </button>
                </div>
                {!isLoading && (
                    <div className="flex flex-1 flex-col flex-grow custom-scroll overflow-y-auto p-4 gap-4">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row bg-white shadow-small p-3 gap-2 rounded-lg"
                                >
                                    <img
                                        src={notiAcuIcon}
                                        alt="noti acu icon"
                                        className="rounded-full object-cover h-10 w-10"
                                    />
                                    <div className="w-full flex flex-col">
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="text-sm font-semibold">
                                                {notification.title ?? STRINGS.DEFAULT_ON_EMPTY}
                                            </div>
                                            <div className="flex flex-row">
                                                {notification.status === false && (
                                                    <div className="flex flex-row justify-end gap-3 text-[10px]">
                                                        <div className="py-1 px-2 rounded-md text-white bg-[#092C4C]">
                                                            Nueva
                                                        </div>
                                                    </div>
                                                )}
                                                <div
                                                    onClick={() => removeNotification({
                                                        id: notification.id,
                                                        title: notification.title,
                                                        description: notification.description,
                                                        role: { name: typeOfUser },
                                                        status: true,
                                                        generateOn: parseISO(notification.generateOn)
                                                    })}
                                                    className="text-sm font-bold ml-2 px-2 text-red-700"
                                                >
                                                    X
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 pt-2">
                                            {notification.description ?? STRINGS.DEFAULT_ON_EMPTY}
                                        </div>
                                        <hr className="mt-2" />
                                        <div className="flex flex-row justify-between gap-3 text-xs mt-2">
                                            <div className="flex items-center text-gray-600">
                                                <FaCalendarAlt size={12} className="mr-1 text-[#092C4C]" />
                                                {formatDateToSpanishWordsForDateTime(notification.generateOn ?? '')}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FaClock size={12} className="mr-1 text-[#092C4C]" />
                                                {formatTimeTo12Hour(notification.generateOn ?? '')}
                                            </div>
                                        </div>
                                        {showAlert[notification.id] && (
                                            <div className="flex flex-row text-sm mt-3">
                                                <BasicAlert color={ALERT_TYPES.WARNING} errorMsg={alertMsg[notification.id]} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay notificaciones disponibles.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationCard