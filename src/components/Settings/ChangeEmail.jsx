/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useCallback, useState} from 'react'
import {AcceptanceButton} from "../Buttons";
import UserService from "../../services/userServices/UserService";
import {HTTP, STRINGS} from "../../config/config";
import BasicAlert from "../General/BasicAlert";
import SmallSpinner from "../General/SmallSpinner";
import {checkIfEmailIsValid, isObjEmpty} from "../utils";

/**
 * Renders the ChangeEmail component.
 * Allows users to change their email address.
 *
 * @returns {JSX.Element} The JSX element representing the ChangeEmail component.
 */
export default function ChangeEmail() {

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const [requestComplete, setRequestComplete] = useState(false);
    const [loading, setLoading] = useState(false)

    /**
     * Handles the email change request.
     * Makes a backend call to update the email address.
     * Sets the requestComplete state to true if successful.
     */
    const changeEmailHandler = (async () => {

        try{

            setLoading(true)
            setErrors({})

            if(!form.email || form.email.trim() === '' || !checkIfEmailIsValid(form.email)){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Ingrese un correo eléctronico válido.",
                }));
            }else{

                const { status } = await new UserService().emailChangeRequest(form);

                if (status === HTTP.DELETED){
                    setRequestComplete(true);
                }else{
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: STRINGS.GENERIC_ERROR,
                    }));
                }
            }
        }catch (error){
            console.log(`Change email error: ${error}`)
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: STRINGS.GENERIC_ERROR,
            }));
        }finally {
            setLoading(false)
        }
    });

    return (
        <>
            <h2 className="font-semibold text-lg">Correo Electrónico</h2>
            {requestComplete ? (
                <p className="my-0 p-0 mb-6">
                    Se ha enviado un mensaje a su nuevo correo electrónico para que culmine el proceso.
                </p>
            ) : (
                <p className="my-0 p-0 mb-6">
                    Cambia tu correo electrónico. Te enviaremos un mensaje de confirmación a tu nuevo correo electrónico.
                </p>
            )}
            {!requestComplete && (
                <div className="flex flex-col gap-1 mb-2">
                    <label>Correo Electrónico</label>
                    <input
                        placeholder="Entre el correo eléctronico"
                        onChange={(event) => {
                            setForm((prevState) => ({
                                ...prevState,
                                email: event.target.value,
                            }));
                        }}
                        className="border border-gray-400 rounded-md outline-none p-2"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

            )}
            <div className="flex flex-row justify-end items-center">
                {!requestComplete && (
                    <AcceptanceButton title="Guardar Cambios" onClickHandler={changeEmailHandler}/>
                )}
                <div className="ml-2">
                    <SmallSpinner loading={loading} />
                </div>
            </div>
        </>
    );
}
