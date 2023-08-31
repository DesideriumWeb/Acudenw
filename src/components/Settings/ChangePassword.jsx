/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from 'react'
import {AcceptanceButton} from "../Buttons";
import UserService from "../../services/userServices/UserService";
import {checkIfPasswordIsValid} from "../utils";
import SmallSpinner from "../General/SmallSpinner";
import {HTTP, PORTAL_ROUTES, STRINGS} from "../../config/config";
import {useNavigate} from "react-router-dom";
import {AuthToken} from "../../services/AuthToken";
import {useDispatch} from "react-redux";
import {setIsLoggedIn} from "../../stateManagement/slices/userSlice";
/**
 * Renders the ChangePassword component.
 * Allows users to change their password.
 *
 * @returns {JSX.Element} The JSX element representing the ChangePassword component.
 */
export default function ChangePassword() {

    const [form, setForm] = useState({});
    const [requestComplete, setRequestComplete] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5)
    /**
     * LogOut process, clear session.
     */
    const LogOut = () => {
        AuthToken.clear();
        dispatch(setIsLoggedIn({
            isLoggedIn:false
        }))
        navigate(PORTAL_ROUTES.LANDING_ROUTE);
    }
    /**
     * Handles the password change request.
     * Makes a backend call to update the password.
     * Sets the requestComplete state to true if successful.
     *
     * @type {(function(): Promise<void>)|*}
     */
    const changePasswordHandler = (async () => {

        try{

            let isValid = true;
            setLoading(true)
            setErrors({})

            if(!form.currentPassword || form.currentPassword.trim() === ''){

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    currentPassword: "Ingrese su contraseña actual.",
                }));
                isValid = false
            }

            if(!form.newPassword || form.newPassword.trim() === '' || !checkIfPasswordIsValid(form.newPassword)){

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: "Ingrese una contraseña válida.",
                }));
                isValid = false
            }

            if (isValid){

                const { data, status } = await new UserService().updatePassword(form);

                if (status === HTTP.DELETED){

                    setRequestComplete(true);

                    let count = 5;

                    const timer = setInterval(() => {
                        count--;
                        setCounter(count);

                        if (count === 0) {
                            clearInterval(timer);
                            LogOut();
                        }
                    }, 1000);
                }else{
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: data.message(),
                    }));
                }
            }

        }catch (error){

            console.log(`Change password error: ${error}`)

            if(error.response && error.response.status === HTTP.BAD_REQUEST){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: error.response.data.message,
                }));
            }else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: STRINGS.GENERIC_ERROR,
                }));
            }
        }finally {
            setLoading(false)
        }
    });

    return (
        <>
            <div>
                <h2 className="font-semibold text-lg mb-4">Contraseña</h2>
                {requestComplete ? (
                    <p className="py-0 my-0 mb-6">
                        ¡La contraseña ha sido modificada exitosamente! Deberá iniciar sessión, Gracias! ... {counter}
                    </p>
                ) : (
                    <>
                        <p className="py-0 my-0 mb-6">
                            Cambia tu contraseña. Debe tener mínimo 8 caracteres, 1 número, 1 letra mayúscula y un caracter especial (@#!*_)
                        </p>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Contraseña actual</label>
                            <input
                                onChange={(event) => {
                                    setForm((prevState) => ({
                                        ...prevState,
                                        currentPassword: event.target.value,
                                    }));
                                }}
                                className="border border-gray-400 rounded-md outline-none p-2"
                                placeholder="Contraseña"
                            />
                            {errors.currentPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Contraseña nueva</label>
                            <input
                                onChange={(event) => {
                                    setForm((prevState) => ({
                                        ...prevState,
                                        newPassword: event.target.value,
                                    }));
                                }}
                                className="border border-gray-400 rounded-md outline-none p-2"
                                placeholder="Contraseña nueva"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-row justify-end items-center">
                {!requestComplete && (
                    <AcceptanceButton title="Guardar Cambios" onClickHandler={changePasswordHandler}/>
                )}
                <div className="ml-2">
                    <SmallSpinner loading={loading} />
                </div>
            </div>
        </>
    );
}
