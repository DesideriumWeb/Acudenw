/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useCallback, useState } from "react";
import { EmailForm } from "./Register/ProviderRegister/EmailForm";
import { PasswordForm } from "./Register/ProviderRegister/PasswordForm";
import CentralContainer from "../../components/containers/CentralContainer";
import ProviderService from "../../services/userServices/ProviderService";
import { useNavigate } from "react-router-dom";
import { ProviderGeneralInformation } from "./Register/ProviderRegister/ProviderGeneralInformation";
import { Stepper } from "../../components/Stepper";
import SuccessMessage from "./Register/ProviderRegister/SuccessMessage";
import {PulseLoader} from "react-spinners";
import { CONSTANTS } from "../../config/config";

export default function ProviderRegister() {
    const navigate = useNavigate()
    //TODO: add these values to registration form if needed. Didn't found them on figma mocks.
    const [form, setForm] = useState({
        websiteUrl: '',
        country: 'PR'
    })
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canContinue, setCanContinue] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const onNext = async () => {
        try{
            if (currentIndex === 2) {
                setIsLoading(true)
                setErrorMsg('')
                const { status, error } = await new ProviderService().save(form)

                if(error){
                    setIsLoading(false)
                    setErrorMsg(error)
                    return;
                }

                if (!status) {
                    setIsLoading(false)
                    setErrorMsg('No se pudo completar el registro en este momento.')
                    return
                }
            }
            setCurrentIndex(currentIndex + 1)
        }catch (error){
            console.log(`Registartion error: ${error}`)
        }finally {
            setIsLoading(false)
            setTimeout(() => {
                setErrorMsg('')
            }, 5000)
        }
    }
    const onPrevious = () => {
        if (currentIndex - 1 < 0) navigate("/login")
        else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const onFinish = useCallback(async () => {
        setIsLoading(false)
        navigate("/")
    }, [form])

    const requiresLargerContainer = () => currentIndex === 2 || currentIndex === 3;

    return (
        <>
            <CentralContainer>
                {!isLoading ? (<Stepper onNext={onNext} onPrevious={onPrevious}
                    currentIndex={currentIndex} canContinue={canContinue}
                    onFinish={onFinish}
                    setCanContinue={setCanContinue}
                >
                    <EmailForm form={form} setForm={setForm} mainTitle={'Registro Único De Centros'} secondTitle={'Entra tu correo electrónico'} subtitle={'Ingresa un correo que la organización utilice oficialmente.'} />
                    <PasswordForm form={form} setForm={setForm} mainTitle={"Registro Único De Centros"} />
                    <ProviderGeneralInformation form={form} setForm={setForm} errorMsg={errorMsg} />
                    <SuccessMessage />
                </Stepper>) : <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
                }
            </CentralContainer>
        </>
    )
}
