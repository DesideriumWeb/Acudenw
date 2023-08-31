/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from "react";
import {EmailFormForgotPassword} from "./ForgotPassword/EmailFormForgotPassword";
import CentralContainer from "../../components/containers/CentralContainer";
import {useNavigate} from "react-router-dom";
import { EmailVerifyMessage } from "./ForgotPassword/EmailVerifyMessage";
import { Stepper } from "../../components/Stepper";
import UserService from "../../services/userServices/UserService";
import {DotLoader, PulseLoader} from "react-spinners";
import {CONSTANTS, PORTAL_ROUTES} from "../../config/config";
export default function ForgotPassword() {

    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canContinue, setCanContinue] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onNext = async () => {
        /* si estamos en el primer indice solicita el cambio de passw
        despues navega al proximo indice */
        console.log(currentIndex)
        if (currentIndex === 0 ){
            setIsLoading(true)
            const {data} = await new UserService().requestResetPassword(form)
            if(data?.httpCode !== 200){
                return
            }
        }
        setCurrentIndex(currentIndex + 1)
        setIsLoading(false)
    }

    const onPrevious = () => {
        if (currentIndex - 1 < 0) navigate("/")
        else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    // This method must return a boolean in every instance it is used
    const onFinish = () => {
       navigate (PORTAL_ROUTES.LANDING_ROUTE)
    }


    return (
        <CentralContainer context={CONSTANTS.FORGOT_CONTEXT}>
            {!isLoading
                ? (<Stepper onNext={onNext} onPrevious={onPrevious}
                                    currentIndex={currentIndex} canContinue={canContinue}
                                    onFinish={onFinish}
                                    setCanContinue={setCanContinue}
            >
                <EmailFormForgotPassword form={form} setForm={setForm}/>
                <EmailVerifyMessage form={form}/>
            </Stepper>)
                : (<PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"}/>)}

        </CentralContainer>
    )
}