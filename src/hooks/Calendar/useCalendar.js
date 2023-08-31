/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {CalendarService} from "../../services/cmsServices/CalendarService";
import {HTTP} from "../../config/config";

/**
 *
 * @param date
 * @param pageNumber
 * @param pageSize
 * @param refresh
 * @return {{isLoading: boolean, spinnerLoading: boolean, inError: boolean, totalPages: number, events: *[], totalElements: number, errorMsg: string}}
 */
export default function useCalendar(date = new Date(), pageNumber = 0, pageSize = 10, refresh = 0) {

    const [events, setCalendarEvents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

        setSpinnerLoading(true);
        setInError(false);
        setErrorMsg('');

        const fetchCalendarEvents = async () => {
            try {

                const { data, status } = await CalendarService.getEvents({ date, pageNumber, pageSize });

                if(status === HTTP.OK)
                {
                    setCalendarEvents(data.data.events ?? []);
                    setTotalPages(data.data.totalPages);
                    setTotalElements(data.data.totalElements);
                    setIsLoading(false);
                    setSpinnerLoading(false);

                    //Just for UX
                    if(data.data.events.length < 1)
                    {
                        setInError(true)
                        setErrorMsg(`No se encontraron eventos registrados para la fecha: ${date}`)
                    }
                }
                else
                {
                    setIsLoading(false);
                    setSpinnerLoading(false);
                    setInError(true)
                    setErrorMsg("Lo sentimos, no se han encontrado eventos en este momento. Por favor, inténtelo de nuevo.")
                }

            }
            catch (error)
            {
                setIsLoading(false);
                setInError(true);
                setErrorMsg('Lo sentimos, se ha producido un error. Trate nuevamente.');
            }
        };

        fetchCalendarEvents();
    }, [pageNumber, pageSize, date, refresh]);

    return { events, totalPages, totalElements, isLoading, spinnerLoading, inError, errorMsg };
}
