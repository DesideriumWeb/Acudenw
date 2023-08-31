/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logoLoggedIn from "../assets/images/logo-logged-in.svg";
import {useDispatch} from "react-redux";
import {PulseLoader} from "react-spinners";
import UserService from "../services/userServices/UserService";
import {CONSTANTS, HTTP, PORTAL_ROUTES, STRINGS} from "../config/config";
import {AuthToken} from "../services/AuthToken";
import {RefreshToken} from "../services/RefreshToken";
import {setData} from "../stateManagement/slices/userSlice";
import {Session} from "../services/Session";
import GovHeader from "../components/Headers/GovHeader";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import BackArrowExtended from "../components/BackArrow/BackArrowExtended";
import {LMSService} from "../services/lmsService/LMSService";
/**
 * Login Component
 * @version 1.0.2
 * @return {Element}
 * @constructor
 */
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  /**
   * Form changes manager.
   *
   * @param {object} e - El evento de cambio del elemento de entrada.
   */
  const handlerChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  /**
   * Change password visibility status.
   */
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  /**
   * Login Process.
   * @version 1.0.4
   * @type {(function(): Promise<void|undefined>)|*}
   */
  const handlerClick = useCallback(async () => {
    try{

      setIsLoading(true);

      const { status, data } = await UserService.logIn(form);

      if(data.role.includes("ADMIN")){
        setIsLoading(false)
        setErrorMsg(STRINGS.LOGIN_ADMIN_FAIL)
        return;
      }

      if (status === HTTP.OK) {

        if(data && data.role.includes("EMPLOYEE")){

          const {data: lmsData, status: lmsStatus} = await LMSService.login(data.accessToken)

          if(lmsStatus === HTTP.OK)
            Session.setLMSResponseSession(lmsData?.data)
        }

        AuthToken.set(data.accessToken);
        AuthToken.setSession(data);
        RefreshToken.set(data.refreshToken);

        dispatch(
            setData({
              email: data.userName,
              typeOfUser: data.role,
              isLoggedIn: !!AuthToken.get()
            })
        );

        Session.setExpiry();

        return navigate(PORTAL_ROUTES.DASHBOARD_ROUTE);
      } else {
        setErrorMsg(STRINGS.INVALID_LOGIN);
      }

    }catch (error){
      console.log(`Login error: ${error}`)
      setErrorMsg(STRINGS.GENERIC_ERROR)
    }finally {
      setIsLoading(false);
      setTimeout(() => {setErrorMsg('')}, 5000)
    }
  }, [form]);


  return (
      <>
        {!isLoading ? (
            <>
              <GovHeader 
                  title={STRINGS.GOV_HEADER_TXT}
                  description_left={STRINGS.GOV_HEADER_LEFT_TXT}
                  description_right={STRINGS.GOV_HEADER_RIGHT_TXT} />

              <BackArrowExtended className={'p-4'}/>

              <div className="flex flex-col h-login-screen w-full items-center justify-center sm:mt-6 md:mt-6">
                <div className="flex flex-col items-center w-full max-w-xs gap-3">
                  <img src={logoLoggedIn} width="100%" height="24px" alt="acuden-logo"/>
                  <h3 className="font-semibold my-4 text-xl text-[#092C4C]">
                    Iniciar sesión
                  </h3>
                  <form className="w-full flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    {errorMsg && <div className="bg-red-500 text-white p-3 rounded text-center" role="alert">{errorMsg}</div>}
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Correo electrónico</label>
                      <input
                          onChange={handlerChange}
                          required
                          className="form-input"
                          name="email"
                          placeholder="Correo electrónico"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Contraseña</label>
                      <div className="relative">
                        <input
                            onChange={handlerChange}
                            required
                            className="form-input pr-10"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2"
                            onClick={handleTogglePassword}
                        >
                          {
                            showPassword
                                ?
                                <AiFillEyeInvisible size={18} className="mt-[2px] opacity-90" color={CONSTANTS.LOADING_SPINNER_COLOR} />
                                :
                                <AiFillEye size={18} className="mt-[2px] opacity-90" color={CONSTANTS.LOADING_SPINNER_COLOR}/>
                          }
                        </button>
                      </div>
                    </div>
                    <Link className="text-darkblue text-sm font-semibold mt-2" to={PORTAL_ROUTES.FORGOT_PASSWORD_ROUTE}>
                      ¿Olvidaste tu contraseña?
                    </Link>
                    <div>
                      <button
                          className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A]
                          hover:shadow-md transition-all" type="submit" onClick={() => {
                        handlerClick()
                      }}>Iniciar sesión
                      </button>
                    </div>

                    <div>
                      <p className="text-center text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/select-register"
                            className="text-darkblue text-sm font-semibold"
                        >
                          Regístrate
                        </Link>
                      </p>
                    </div>
                    <div className="text-darkblue text-sm font-semibold text-center">
                      Visitar <a href="https://childcare.familia.pr.gov/acuden-academy/" target="_blank">{STRINGS.ACUDEN_DOMAIN}</a>
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
};

export default Login;
