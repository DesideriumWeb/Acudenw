/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import ThematicHeader from "./ThematicHeader";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {BiChevronDown, BiChevronUp} from "react-icons/bi";
import { generateUniqueKey, getValueByKey } from "../../../components/utils";
import {CDF_POPULATION, PORTAL_ROUTES, STRINGS} from "../../../config/config";
import {Toast} from "primereact/toast";
import ThematicQuestions from "./ThematicQuestions";
/**
 * CDF Component that displays the thematic table and related functionality.
 * @version 1.0.0
 * @returns {JSX.Element} The ThematicTable component.
 */
const ThematicTable = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [activeTable, setActiveTable] = useState(0)
    const [severity, setSeverity] = useState("success");
    const [toastMsg, setToastMsg] = useState("");
    const [summary, setSummary] = useState("Mensaje");
    const [visibleToast, setVisibleToast] = useState(false);

    const { data, questionnaire, requestNumber, questionWithAnswers, approved } = location.state.request
    /**
     * Toast ref req.
     */
    let toastRef;
    /**
     * useEffect to display the Toast component when `visibleToast` changes.
     */
    useEffect(() => {
        if (visibleToast) {
            toastRef.show({
                severity: severity,
                detail: toastMsg,
                summary: summary,
            });
        }
    }, [visibleToast]);
    /**
     * Handles the route back event or routing, navigating to a specific route with additional state data.
     * @param route
     * @return {void}
     */
    const routingHandler = (route = PORTAL_ROUTES.CDF_HISTORY_ROUTE) => {
        navigate(
            route,
            {
                state:{
                    request:{
                        data,
                        requestNumber
                    }
                }
            }
        )
    }
    /**
     * Handler function to save the progress of a form or task.
     * Sets the summary and toast message to display a success message.
     * @return {void}
     */
    const saveProgressHandler = () => {
        setSummary(STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST)
        setToastMsg(STRINGS.THEMATIC_SUCCESS_PROGRESS_SAVE_MSG)
        setVisibleToast(true)
    }

    return(
        <div>
            <section className="w-full p-3">

                <ThematicHeader
                    requestId={requestNumber}
                    data={data}
                    title={questionnaire?.name}
                    description={questionnaire?.description}
                    population={getValueByKey(CDF_POPULATION, questionnaire?.population)}
                />

                <div className="my-12 flex flex-row gap-4 items-center justify-center">
                    <button
                        onClick={() => routingHandler()}
                        className="border border-darkblue text-darkblue rounded p-2 px-4 font-medium
                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                    >
                        {STRINGS.THEMATIC_BACK_GENERIC}
                    </button>
                </div>

                {/*Questionnaire Tables*/}
                {questionnaire?.subtables?.map((table, ind) => (
                    <div
                        key={generateUniqueKey(10)}
                        className="w-full mt-12 mb-8 max-w-5xl mx-auto rounded-xl overflow-hidden border-2 border-darkblue"
                    >
                        <div className="p-4 bg-darkblue font-semibold text-white flex flex-row justify-between items-center">
                            <p className="capitalize">{`${table.name || STRINGS.DEFAULT_ON_EMPTY}: ${table.description || STRINGS.DEFAULT_ON_EMPTY}`}</p>

                            {activeTable === ind ? (
                                <BiChevronUp size={30} onClick={() => setActiveTable(null)} />
                            ) : (
                                <BiChevronDown size={30} onClick={() => setActiveTable(ind)} />
                            )}
                        </div>
                        {activeTable === ind && (
                            <ThematicQuestions
                                questionWithAnswers={questionWithAnswers}
                                table={table}
                                data={data}
                                approved={approved}
                            />
                        )}
                    </div>
                ))}
                <div className="my-12 flex flex-row gap-4 items-center justify-center">
                    <button
                        onClick={() => routingHandler()}
                        className="border border-darkblue text-darkblue rounded p-2 px-4 font-medium
                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                    >
                        Volver a mi solicitud
                    </button>
                    {
                        !approved && (
                            <button
                                onClick={() => saveProgressHandler()}
                                className="border border-darkblue bg-darkblue text-white rounded p-2 px-4 font-medium
                                hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                            >
                                Guardar progreso
                            </button>
                        )
                    }
                </div>
            </section>
            <Toast
                ref={(ref) => (toastRef = ref)}
                onHide={() => {
                    toastRef.clear();
                    setVisibleToast(false);
                }}
            />
        </div>
    );
}

export default ProtectedComponent(ThematicTable)