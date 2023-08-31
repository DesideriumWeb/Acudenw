/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import CentralContainer from "../../components/containers/CentralContainer";
import { EmailForm } from "./Register/ProviderRegister/EmailForm";
import { PasswordForm } from "./Register/ProviderRegister/PasswordForm";
import { AcceptInvitation } from "./Register/EmployeeInvitedRegister/AcceptInvitation";
import { PersonalInformation } from "./Register/EmployeeInvitedRegister/PersonalInformation";
import { ProfessionalInformation } from "./Register/EmployeeInvitedRegister/ProfessionalInformation";
import { Stepper } from "../../components/Stepper";
import EmployeeService from "../../services/userServices/EmployeeService";
import RedirectButton from "../../components/RedirectButtons";
import MessageDialog from "../../components/General/MessageDialog";
import {CONSTANTS} from "../../config/config";
import {PulseLoader} from "react-spinners";

export default function EmployeeInvitedRegister() {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canContinue, setCanContinue] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [companyName, setCompanyName] = useState("")
    const [companyEmployeeNumber, setCompanyEmployeeNumber] = useState("")
    const [token, setToken] = useState("")
    const [errorMsg, setErrorMsg] = useState('')
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const onNext = () => {
        setErrorMsg('')
        setCurrentIndex(currentIndex + 1)
    }
    const onPrevious = async () => {
        if (currentIndex - 1 < 0) {
            await new EmployeeService().refuseInvitation(token) && navigate("/Dashboard")
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const onFinish = useCallback(async () => {
        setIsLoading(true)

        const { status } = await new EmployeeService().save(form, token)

        if (status) {
            setIsLoading(false)
            navigate("/Dashboard")
        }
        else {
            setIsLoading(false)
            setErrorMsg('No se pudo completar el registro en este momento.')
        }



    }, [form, token])

    // TODO: Verify TOken from URL and call the OTP process endpoint.

    useEffect(() => {
        if (location.search.includes('token')) {
            setToken(new URLSearchParams(location.search).get('token'))
        }
    }, [location])

    useEffect(() => {

        const fetchValitedateInvitation = async (token) => {
            try {
                const { status, data } = await new EmployeeService().validateInvitation(token)
                if (status) {
                    setCompanyName(data.provider.name)
                    setCompanyEmployeeNumber(data.provider.employeeQuantity)
                    setForm({
                        email: data.email
                    })
                } else {
                    setErrorMsg('Token de Invitacion no es valido.')
                    setShowErrorDialog(true)
                }
            } catch (error) {
                setErrorMsg('Token de Invitacion no es valido.')
                setShowErrorDialog(true)
            }

        }

        if (token) {
            fetchValitedateInvitation(token)
        }
    }, [token])

    const handleConfirmAction = () => {
        setShowErrorDialog(false);
        navigate("/");
    }

    const handleOnHide = () => {
        setShowErrorDialog(false);
        navigate("/");
    }

    return (
        <>

            <CentralContainer>
                {
                    showErrorDialog && errorMsg &&
                    <MessageDialog message={errorMsg} title={'Invitacion invalida'} confirmAction={handleConfirmAction} onHide={handleOnHide} />
                }
                {!isLoading ? (
                    <>
                        <Stepper onNext={onNext} onPrevious={onPrevious}
                            currentIndex={currentIndex} canContinue={canContinue}
                            onFinish={onFinish}
                            setCanContinue={setCanContinue}>
                            <AcceptInvitation form={form} setForm={setForm} companyName={companyName}
                                companyEmployeeNumber={companyEmployeeNumber} />
                            <EmailForm form={form} setForm={setForm} mainTitle={'Empleado(a)'} secondTitle={'Confirma tu correo electrónico'} subtitle={'De no ser este su correo electrónico, puede cambiarlo en este momento.'} />
                            <PasswordForm form={form} setForm={setForm} mainTitle={"Empleado(a)"} />
                            <PersonalInformation form={form} setForm={setForm} />
                            <ProfessionalInformation form={form} setForm={setForm} errorMsg={errorMsg} />
                        </Stepper>
                        <div className="row">
                            <RedirectButton
                                title={"¿Ya tienes una cuenta?"}
                                route={"/Login"}
                                secondtitle={"Iniciar sesión"}
                            />
                        </div>
                    </>
                ) : (<PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />)}
            </CentralContainer>
        </>

    )
}
