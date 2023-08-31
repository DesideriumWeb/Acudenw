/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {BsCalendar} from "react-icons/bs";
import {formatDateToSpanishWordsForDateTime, formatTimeRange} from "../../components/utils";
import {IoPersonCircle, IoPersonCircleSharp} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import BasicAlert from "../../components/General/BasicAlert";
import {ALERT_TYPES, HTTP, STRINGS} from "../../config/config";
import {Dialog} from "primereact/dialog";
import { format } from 'date-fns';
import SmallSpinner from "../../components/General/SmallSpinner";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {CalendarService} from "../../services/cmsServices/CalendarService";
import defaultImage from "../../assets/images/calendar_d2.jpg"

/**
 * Displays a list of calendar items.
 *
 * @component
 * @param {Object[]} events - The list of calendar events to display.
 * @param {boolean} inError - Indicates if there's an error in retrieving the events.
 * @param {string} errorMsg - The error message to display.
 * @param {boolean} enableRegistration - Indicates if event registration is enabled.
 * @param setRefresh
 * @param typeOfUser - User Role.
 * @param email - Session user email.
 * @returns {JSX.Element} The rendered component.
 */
const CalendarItems = ({events, inError, errorMsg, enableRegistration = true, setRefresh = null, typeOfUser = "EMPLOYEE", email = ''}) => {

    const [dialogVisible,setDialogVisible] = useState(false)
    const [registrationLoading, setRegistrationLoading] = useState(false)
    const [registrationComplete, setRegistrationComplete] = useState(false)
    const [instantRegistrationComplete, setInstantRegistrationComplete] = useState(false)
    const [errorMsgRegistration, setErrorMsgRegistration] = useState('')
    const [employeeRegistered, setEmployeeRegistered] = useState(false)
    const [currentEventId, setCurrentEventId] = useState(null);
    const [loadingStates, setLoadingStates] = useState({});

    /**
     * This effect runs whenever the "events" variable changes.
     * It updates the "employeeRegistered" state based on the information from the events and registered employees.
     */
    useEffect(() => {

        setEmployeeRegistered(false)

        if (events.length > 0) {
            events.forEach(event => {
                event.registeredEmployees.forEach(emp => {
                    if (emp.email.includes(email)) {
                        setEmployeeRegistered(true);
                    }
                });
            });
        }

    }, [events]);

    /**
     * Handles the event registration.
     *
     * @param {string} eventId - The ID of the event to register for.
     * @param instantRegistration - Flag for UI instant registration
     */
    const onRegisterEvent = async (eventId, instantRegistration = true ) => {
        try {

            setLoadingStates((prevState) => ({
                ...prevState,
                [eventId]: true,
            }));

            setErrorMsgRegistration('');

            const { status } = await CalendarService.registerForEvent(eventId);

            if (status === HTTP.OK) {

                if(instantRegistration){

                    setInstantRegistrationComplete(true)

                }else{
                    setRegistrationComplete(true);
                }

                setLoadingStates((prevState) => ({
                    ...prevState,
                    [eventId]: false,
                }));

                setRefresh && setRefresh(prevState => prevState + 1);

            } else {
                setErrorMsgRegistration(STRINGS.GENERIC_ERROR);
            }
        } catch (error) {
            setLoadingStates((prevState) => ({
                ...prevState,
                [eventId]: false,
            }));
            setErrorMsgRegistration(STRINGS.GENERIC_ERROR);
        }
    };
    /**
     * Closes the registration completion dialog.
     */
    const registrationCompleteClose = () => {
        setErrorMsgRegistration('')
        setRegistrationComplete(false)
        setRegistrationLoading(false)
        setDialogVisible(false)
    }

    /**
     * Abre el diálogo para mostrar la información detallada del evento seleccionado.
     *
     * @param {string} eventId - El ID del evento a mostrar en el diálogo.
     */
    const openDialog = (eventId) => {
        setCurrentEventId(eventId);
        setDialogVisible(true);
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {
                inError ?
                    (
                        <div className="flex items-center">
                            <BasicAlert errorMsg={errorMsg} color={ALERT_TYPES.WARNING}/>
                        </div>
                    )
                    : null
            }


            {events && events.map((e, index) => (
                <div
                    key={index}
                    className="flex flex-row justify-start items-center gap-3 shadow-md rounded-lg overflow-hidden"
                >
                    <div className="flex-1 bg-black h-full">
                        <img
                            src="https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                            alt="img"
                            className="object-cover h-full"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center flex-[2] py-8 gap-3">
                        <div className="flex items-center">
                            <BsCalendar className="mr-2" color={'#092C4C'} size={15} />
                            <p className="text-sky-600">
                                {e.eventDate ? formatDateToSpanishWordsForDateTime(e.eventDate) : ''}
                            </p>
                        </div>
                        <h2 className="font-semibold text-xl">
                            {e.name}
                        </h2>
                        <p className="text-sm">{formatTimeRange(e.startTime, e.endTime)}</p>
                        <div className="flex flex-row gap-1 items-center">
                            <IoPersonCircleSharp size={35} color="#43f" />
                            {e.registeredEmployees.length ?? 0} personas registradas
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                            <button id={e.id} onClick={() => openDialog(e.id)} className="border-blue-700 text-blue-700 border-2 p-3
                            rounded-md px-5 acu-cal-step-3 hover:bg-[#A7D02A] hover:text-[#092C4C]">
                                Más Informacion
                            </button>
                            {
                                !instantRegistrationComplete &&
                                enableRegistration &&
                                !employeeRegistered &&
                                typeof typeOfUser === 'string' &&
                                typeOfUser.includes('EMPLOYEE') ? (
                                    <button
                                        id={e.id}
                                        onClick={() => onRegisterEvent(e.id)}
                                        className="bg-blue-700 p-3 text-white rounded-md px-5"
                                    >
                                        Registrarme{"  "}
                                        {loadingStates[e.id] && <SmallSpinner loading={true} />}
                                    </button>
                                ) : (
                                    e.registeredEmployees.every((r) => !r.email.includes(email)) && typeof typeOfUser === 'string' && typeOfUser.includes('EMPLOYEE') ? (
                                        <div className="flex flex-row justify-center">
                                            <button
                                                id={e.id}
                                                onClick={() => onRegisterEvent(e.id)}
                                                className="bg-blue-700 p-3 text-white rounded-md px-8 hover:bg-[#A7D02A] hover:text-[#092C4C]"
                                            >
                                                Registrarme{"  "}
                                                {loadingStates[e.id] && <SmallSpinner loading={true} />}
                                            </button>
                                        </div>
                                    ) : (
                                        typeOfUser.includes('EMPLOYEE') ? (
                                            <div className="flex flex-row justify-center">
                                                <button
                                                    disabled={true}
                                                    className="flex items-center bg-white text-base font-semibold py-2 px-4 rounded-lg border-2 border-green-500"
                                                >
                                                    <AiOutlineCheckCircle className="text-green-500 mr-2" size={28} />
                                                    Registrado(a)
                                                </button>
                                            </div>
                                        ) : null
                                    )
                                )
                            }
                        </div>
                        {/*Registration Dialog*/}
                        <Dialog
                            header={
                                <div className="flex justify-center w-full mx-2 h-45 max-h-45 rounded-lg mt-10 ml-3">
                                    {
                                        defaultImage &&//e.imageFilePath &&
                                        (
                                            <img src={defaultImage} alt="event-image" className="w-full h-40 rounded-lg shadow-lg" />
                                        )
                                    }
                                    {
                                        !defaultImage && <IoPersonCircle size={35} className="acu-blue mr-2" />//!e.imageFilePath
                                    }
                                </div>

                            }
                            className="bg-cyan-900 bg-opacity-10"
                            style={{ width: '40vw', background: 'gray' }}
                            onHide={() => {
                                setCurrentEventId(null)
                                setDialogVisible(false)
                                setRegistrationComplete(false)
                                setRegistrationLoading(false)
                                setErrorMsgRegistration('')
                            }}
                            visible={dialogVisible}
                        >
                            {
                                currentEventId && (
                                    <div>
                                        {
                                            events.map((event) => {
                                                if(event.id === currentEventId){
                                                    return(
                                                        <div className="w-full">
                                                            <div className="flex flex-row justify-center">
                                                                <p className="font-bold text-lg">{event.name || STRINGS.DEFAULT_ON_EMPTY}</p>
                                                            </div>
                                                            <div className="flex flex-row justify-start mt-2 p-2">
                                                                <p className="text-sm">{event.description || STRINGS.DEFAULT_ON_EMPTY}</p>
                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 justify-items-center">

                                                                <div className="w-full flex flex-col items-center">
                                                                    <p className="font-bold text-base text-center">Día:</p>
                                                                    <p className="text-center text-sm mt-2 font-semibold">{event.eventDate ? format(new Date(e.eventDate), 'dd/MM/yyyy') : STRINGS.DEFAULT_ON_EMPTY}</p>
                                                                </div>

                                                                <div className="w-full flex flex-col items-center">
                                                                    <p className="font-bold text-base text-center">Horario:</p>
                                                                    <p className="text-center text-sm mt-2 font-semibold">{formatTimeRange(event.startTime ?? 0, event.endTime ?? 0)}</p>
                                                                </div>

                                                                <div className="w-full flex flex-col items-center">
                                                                    <p className="font-bold text-base text-center">Modalidad:</p>
                                                                    <p className="text-center text-sm mt-2 font-semibold">{event.eventType ? event.eventType.includes('PRESENT') ? 'Presencial' : 'Virtual' : STRINGS.DEFAULT_ON_EMPTY}</p>
                                                                </div>

                                                            </div>
                                                            {
                                                                event.eventType.includes("PRESENT") ?
                                                                    (
                                                                        <>
                                                                            <div className="flex flex-row justify-center mt-10">
                                                                                <p className="font-bold text-base">Localización:</p>
                                                                            </div>
                                                                            <div className="w-full flex flex-row justify-center mt-4">
                                                                                <input
                                                                                    value={`${event.location || ''} ${event.addressLine1 || ''} ${event.town?.name || ''} ${event.country || ''} ${event.zipcode || ''}`}
                                                                                    disabled={true}
                                                                                    className="form-input block w-full px-3 py-2 text-base
                                                                                    text-black bg-gray-200 border border-gray-300 rounded-md focus:outline-none
                                                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    ) : null
                                                            }
                                                            {
                                                                event.eventType.includes("VIRTUAL") ?
                                                                    (
                                                                        <>
                                                                            <div className="flex flex-row justify-center mt-10">
                                                                                <p className="font-bold text-base">Enlace:</p>
                                                                            </div>
                                                                            <div className="w-full flex flex-row justify-center mt-4">
                                                                                <input
                                                                                    value={event.location || STRINGS.DEFAULT_ON_EMPTY}
                                                                                    disabled={true}
                                                                                    className="form-input block w-full px-3 py-2 text-base
                                                                                    text-black bg-gray-200 border border-gray-300 rounded-md focus:outline-none
                                                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    ) : null
                                                            }
                                                            {
                                                                registrationComplete || event.registeredEmployees.find((r) => r.email.includes(email)) && typeof typeOfUser === 'string'
                                                                && typeOfUser.includes('EMPLOYEE') ? (
                                                                    <>
                                                                        <hr className="my-4"/>
                                                                        <div className="flex flex-row justify-center mt-8">
                                                                            <button
                                                                                onClick={registrationCompleteClose}
                                                                                className="flex items-center bg-white text-base font-semibold py-2
                                                                                px-4 rounded-lg border-2 border-green-500"
                                                                            >
                                                                                <AiOutlineCheckCircle className="text-green-500 mr-2" size={28} />
                                                                                Registrado(a) - Regresar al Calendario
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                ) :  typeOfUser.includes('EMPLOYEE') ? (
                                                                    <>
                                                                        <hr className="my-4"/>
                                                                        <div className="flex flex-row justify-center mt-8">
                                                                            <button
                                                                                onClick={() => onRegisterEvent(event.id, false)}
                                                                                className="bg-blue-900 hover:bg-[#A7D02A] hover:text-[#092C4C] text-white py-2 px-4 rounded focus:outline-none"
                                                                            >
                                                                                Registrarme <SmallSpinner loading={registrationLoading} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                ) : null
                                                            }
                                                            {errorMsgRegistration && (
                                                                <div className="mt-6 text-sm">
                                                                    <BasicAlert color="red" errorMsg={errorMsgRegistration} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }
                        </Dialog>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CalendarItems