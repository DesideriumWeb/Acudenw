/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import GovHeader from "../../components/Headers/GovHeader";
import {CONSTANTS, HTTP, PORTAL_ROUTES, STRINGS} from "../../config/config";
import {Link, useLocation} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import logoLoggedIn from "../../assets/images/logo-logged-in.svg";
import {PulseLoader} from "react-spinners";
import React, {useState} from "react";
import UserService from "../../services/userServices/UserService";
import ImgMailChecked from "../../assets/images/Authentication/MailChecked.svg";
import FormFinalMessageV2 from "../../components/Form/FormFinalMessageV2";
import SmallSpinner from "../../components/General/SmallSpinner";
/**
 * Forgot password step 02 component.
 * @version 1.0.0
 * @return {Element}
 * @constructor
 */
const ForgotStep2 = () => {

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [resetLoading, setResetLoading] = useState(false)
    const location = useLocation();
    const { form } = location.state;
    /**
     * Resend link process.
     * @return {Promise<void>}
     */
    const handlerClick = async () => {
        try {

            setResetLoading(true)

            const {data, status} = await new UserService().requestResetPassword(form)

            if (status === HTTP.OK) {

                setSuccessMsg(STRINGS.FORGOT_PASSWORD_LINK_REQUEST)

            } else {
                setErrorMsg(STRINGS.FORGOT_PASSWORD_REQUEST_FAIL)
            }
        } catch (error) {
            console.log(`API Forgot Password resend link error: ${error}`)
            setErrorMsg(STRINGS.GENERIC_ERROR)
        } finally {
            setResetLoading(false)
            setTimeout(() => {
                setErrorMsg('')
                setSuccessMsg('')
            }, 5000)
        }
    }

    return (
        <>
            {!isLoading ? (
                <>
                    <GovHeader 
                        title={STRINGS.GOV_HEADER_TXT}
                        description_left={STRINGS.GOV_HEADER_LEFT_TXT}
                        description_right={STRINGS.GOV_HEADER_RIGHT_TXT} />
                                    <Link to={PORTAL_ROUTES.LANDING_ROUTE}>
                        <div className="flex flex-row justify-start items-center p-4 ml-4">
                            <ArrowLeftIcon className="acu-blue w-6 mt-1"/>
                            <h4 className="exit-text ml-1 mt-1">| Salir</h4>
                        </div>
                    </Link>
                    <div className="flex flex-col h-login-screen w-full items-center justify-center">
                        <div className="flex flex-col items-center w-full max-w-xs gap-3">

                            <img className="mt-20" src={logoLoggedIn} width="100%" alt="acuden-logo"/>

                            <FormFinalMessageV2
                                image={ImgMailChecked}
                                mainTitle={"Verifica tu correo electrónico"}>

                                <p className="my-6 text-sm text-darkblue text-center">
                                    Si existe una cuenta de ACUDEN Academy enlazada a <strong> correo@ejemplo.com </strong>,
                                    recibirás un mensaje con las instrucciones para restablecer tu contraseña. <br /> <br />
                                    <strong> Favor de verificar tu correo electrónico, incluyendo la carpeta de spam. </strong>
                                </p>

                            </FormFinalMessageV2>

                            <p className="text-sm text-center">¿No recibiste ningún correo electrónico?</p>
                            <form className="w-full flex flex-col gap-3 mt-2" onSubmit={(e) => e.preventDefault()}>
                                {errorMsg && <div className="bg-red-500 text-white p-3 rounded text-center text-sm" role="alert">{errorMsg}</div>}
                                {successMsg && <div className="bg-[#70BE44] text-white p-3 rounded text-center ml-2 text-sm" role="alert">{successMsg}</div>}
                                <div className="w-full mt-4 ml-2">
                                    <button className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md" type="submit" onClick={() => {
                                        handlerClick()
                                    }}>Reenviar enlace{" "}<SmallSpinner loading={resetLoading}/>
                                    </button>
                                </div>
                                <div className="w-full flex mt-6 ml-2 justify-between items-center">
                                    <Link to={PORTAL_ROUTES.LOGIN_ROUTE} className="text-acuBaseBlue">
                                        <p className="text-sm font-semibold">Iniciar sesión</p>
                                    </Link>
                                    <p className="text-sm mx-2 text-acuBaseBlue">o</p>
                                    <Link to={PORTAL_ROUTES.REGISTRATION_ROUTE} className="text-acuBaseBlue">
                                        <p className="text-sm font-semibold">Crear cuenta</p>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col h-login-screen w-full items-center justify-center">
                    <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"}/>
                </div>
            )}
        </>
    );
}
export default ForgotStep2