import React, {useEffect, useState } from "react";
import CentralContainer from "../../components/containers/CentralContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper } from "../../components/Stepper";
import UserService from "../../services/userServices/UserService";
import { UpdatedPasswordMessage } from "./PasswordRecovery/UpdatedPasswordMessage";
import { PasswordForm } from "./Register/ProviderRegister/PasswordForm";
import {STRINGS} from "../../config/config";

export default function PasswordRecovery() {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canContinue, setCanContinue] = useState(false)
    const [token, setToken] = useState ("")
    const [errorMsg, setErrorMsg] = useState('')

    const onNext = async () => {
        try{
            if (currentIndex === 0) {
                const { data } = await new UserService().requestPasswordRecovery(token, form)
                if (data?.httpCode !== 200) {
                    return
                }
            }
            setCurrentIndex(currentIndex + 1)
        }catch (error){
            console.log(error.response)
            console.log(`Password recovery error: ${error}`)
            if (error && error.response.data.message){
                setErrorMsg(error.response.data.message)
            }else{
                setErrorMsg(STRINGS.GENERIC_ERROR)
            }
        }finally {
            setTimeout(() => {
                setErrorMsg('')
            }, 5000)
        }
    }

    const onPrevious = () => {
        if (currentIndex - 1 < 0) navigate("/")
        else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const onFinish = () => {
        navigate("/")
    }

    useEffect(() => {
        if(location.search.includes("?ts") && location.search.includes("token")){
            setToken(new URLSearchParams(location.search).get("token"))
        }
    }, [location])


    return (
        <CentralContainer>
            <Stepper onNext={onNext} onPrevious={onPrevious}
                currentIndex={currentIndex} canContinue={canContinue}
                onFinish={onFinish}
                setCanContinue={setCanContinue}
            >
                <PasswordForm form={form} setForm={setForm} context={"change"} errorMsg={errorMsg}/>
                <UpdatedPasswordMessage />
            </Stepper>
        </CentralContainer>
    )
}