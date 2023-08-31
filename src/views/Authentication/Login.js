/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import React, {useCallback, useState} from 'react';
// import ImgAcudenAcademy from "assets/images/Portal/AboutUs/ImgAcudenAcademy.svg"
import AQSLogo from "../../../assets/images/LogoAQSC.svg"
import stylesLogIn from "css/Authentication/Login.module.css"
import stylesAuthentication from "css/Authentication/Authentication.module.css"
import {Link, useNavigate} from 'react-router-dom';
import {AuthToken} from "../../services/AuthToken";
import {useDispatch} from "react-redux";
import {setData} from "../../stateManagement/slices/userSlice";
import UserService from "../../services/userServices/UserService";
import CentralContainer from "../../components/containers/CentralContainer";
import {PulseLoader} from "react-spinners";
import {RefreshToken} from "../../services/RefreshToken";
import {Session} from "../../services/Session";
import {HTTP} from "../../config/config";

export function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errorMsg, setErrorMsg] = useState()
    const [isLoading, setIsLoading] = useState(false)



    const manejadorChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const manejadorBoton = useCallback(async () => {

        const {status, data} = await UserService.logIn(form)

        if (status === HTTP.OK) {

            AuthToken.set(data.accessToken)
            AuthToken.setSession(data);

            RefreshToken.set(data.refreshToken)

            dispatch(setData({
                email: data.userName,
                typeOfUser: data.role,
                isLoggedIn: !!AuthToken.get()
            }))

            Session.setExpiry();

            return navigate('/Dashboard')

        } else {
            setErrorMsg("Error iniciando sesion")
        }
        setIsLoading(false)
    },[form])

    return (
        <CentralContainer>
            {!isLoading ? (<>
                <div className={stylesAuthentication.Center}>
                    <img className={stylesAuthentication.ImgAcudenAcademy} src={AQSLogo}
                         alt="Logo de ACUDEN Quality System"/>
                    <h1 className={stylesAuthentication.Title}>Iniciar sesión</h1>
                </div>
                {errorMsg && <div className={"alert alert-danger"} role="alert">
                    {errorMsg}
                </div>}
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <p className={stylesLogIn.LoginP}>Correo electrónico</p>
                        <input type="text" name="email" className="form-control" required
                               onChange={manejadorChange} placeholder="Correo electrónico"/>

                        <p className={stylesLogIn.LoginP}>Contraseña</p>
                        <input type="password" name="password" className="form-control" required
                               onChange={manejadorChange} placeholder="Contraseña"/>
                        <Link to="/ForgotPassword" className={stylesLogIn.LoginP}>¿Olvidaste tu
                            contraseña?</Link>
                        <div id="para centrar">
                            <button className={stylesLogIn.singIn} onClick={() => {
                                setIsLoading(true)
                                manejadorBoton()
                            }}> Iniciar
                                sesión
                            </button>
                            <p className="text-center">
                                ¿No tienes una cuenta? &nbsp; &nbsp;
                                <Link to="/SelectRegisterType" className={stylesAuthentication.Link}>
                                    Regístrate
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </>) : (<PulseLoader color={"#092C4C"} size={200} className={"m-5 p-5"}/>)}
        </CentralContainer>
    );
}
