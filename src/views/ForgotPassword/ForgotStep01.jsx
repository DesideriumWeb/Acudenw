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
import {useNavigate} from "react-router-dom";
import logoLoggedIn from "../../assets/images/logo-logged-in.svg";
import React, {useState} from "react";
import {PulseLoader} from "react-spinners";
import FormInput from "../../components/Form/FormInput";
import UserService from "../../services/userServices/UserService";
import SmallSpinner from "../../components/General/SmallSpinner";
import BackArrowExtended from "../../components/BackArrow/BackArrowExtended";

/**
 * Forgot password Step 01 component, get email from user.
 * @version 1.0.2
 * @return {Element}
 * @constructor
 */
const ForgotStep01 = () => {

    const [errorMsg, setErrorMsg] = useState('')
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [resetLoading, setResetLoading] = useState(false)
    const [form, setForm] = useState({})
    const navigate = useNavigate();
    /**
     * Updates the form state when input values change.
     * @param {object} e - The event object from the input element.
     * @param {function} setValue - The setter function for the value being updated.
     */
    const onChangeHandler = (e, setValue) => {

        const { name, value } = e.target;
        let updatedValue = value;

        setForm((prevState) => ({
            ...prevState,
            [name]: updatedValue
        }));
    };
    const handlerClick = async () => {
        if (!form.email || !form.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
            setErrors({email: STRINGS.INVALID_EMAIL});
        } else {
            try{

                setResetLoading(true)
                setErrors({})

                const {data, status} = await new UserService().requestResetPassword(form)

                if(status === HTTP.OK){

                    navigate(PORTAL_ROUTES.FORGOT_PASSWORD_CONFIRMATION_ROUTE, {state:{form}})

                }else{
                    setErrorMsg(STRINGS.FORGOT_PASSWORD_REQUEST_FAIL)
                }
            }catch (error){
                console.log(`API Forgot Password error: ${error}`)
                setErrorMsg(STRINGS.GENERIC_ERROR)
            }finally {
                setResetLoading(false)
                setTimeout(() => {
                    setErrorMsg('')
                },5000)
            }
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

                    <BackArrowExtended className={`p-4`}/>

                    <div className="flex flex-col h-login-screen w-full items-center justify-center">
                        <div className="flex flex-col items-center w-full max-w-xs gap-3">
                            <img src={logoLoggedIn} width="100%" alt="acuden-logo"/>
                            <h3 className="font-semibold my-6 text-xl text-darkblue">
                                ¿Olvidaste tu contraseña?
                            </h3>
                            <p className="text-sm text-center">Entra tu correo electrónico.</p>
                            <form className="w-full flex flex-col gap-3 mt-6" onSubmit={(e) => e.preventDefault()}>
                                {errorMsg && <div className="bg-red-500 text-white p-3 rounded text-center" role="alert">{errorMsg}</div>}
                                <div className="flex flex-col w-full">
                                    <FormInput
                                        title={'Correo electrónico'}
                                        type={'text'}
                                        onChangeHandler={onChangeHandler}
                                        setValue={setForm}
                                        name={'email'}
                                        error={errors.email}
                                        maxLength={50}
                                        placeholder="Correo electrónico"
                                        required={false}
                                    />
                                </div>
                                <div className="w-full flex gap-4">
                                    <button className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md hover:border-[#A7D02A]" type="submit" onClick={() => navigate(PORTAL_ROUTES.LOGIN_ROUTE)}>
                                        Volver                                    
                                    </button>

                                    <button className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md hover:border-[#A7D02A]" type="submit" onClick={() => {
                                        handlerClick()
                                    }}>Continuar{" "}<SmallSpinner loading={resetLoading}/>
                                    </button>

                                    
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

export default ForgotStep01