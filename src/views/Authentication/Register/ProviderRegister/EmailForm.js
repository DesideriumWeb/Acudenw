/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from 'react';
import { checkIfEmailIsValid } from "../../../../components/utils";
import FormTitle from "../../../../components/Form/FormTitle";
import FormInput from "../../../../components/Form/FormInput";

import UserService from "../../../../services/userServices/UserService";

import stylesAuthentication from "../../../../css/Authentication/Authentication.module.css";

export function EmailForm(props) {
    const [errorMsg, setErrorMsg] = useState('')
    const [timer, setTimer] = useState(null)

    const manejadorChange = async (e, updateEmail) => {
        if (!e.target.value) {
            setErrorMsg('Correo es requerido');
            updateEmail((prevState) => ({
                ...prevState,
                [e.target.name]: undefined
            }))
            return;
        } else {

            clearTimeout(timer)
            const newTimer = setTimeout(async () => {
                try {
                    const { data } = await UserService.post(e.target.value)
                    if (checkIfEmailIsValid(e.target.value) && data.httpCode === 200) {
                        updateEmail((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value
                        }))
                        setErrorMsg('')
                        return;

                    } else
                        setErrorMsg("Correo inválido.")
                }
                catch (error) {
                    setErrorMsg("Correo inválido.")
                }
            }, 500)

            setTimer(newTimer);
        }

    }

    useEffect(() => {
        if (!errorMsg && props.form.email)
            props.setCanContinue(true)
        else
            props.setCanContinue(false)
    }, [errorMsg, props])

    return (
        <>
            <FormTitle
                mainTitle={props.mainTitle}
                style={`${props.mainTitle === 'Empleado(a)' ? 'bg-[#88C7F1]' : 'bg-[#B8E5E3]'} font-sm mb-2 font-sans rounded-lg`}
                secondTitle={props.secondTitle} subTitle={props.subTitle}
            />
            <div className="text-center text-sm my-4">
                <p>*Ingresa un correo que la organización utilice oficialmente.</p>
            </div>
            <div>
                <form onSubmit={(e) => e.preventDefault()} className="items-center">
                    <FormInput defaultValue={props.form.email} type={"text"} title={"Correo electrónico"} setValue={props.setForm} name={"email"} minLength={0}
                        onChangeHandler={manejadorChange} placeholder={'Correo electrónico'} error={errorMsg} />
                </form>
            </div>
        </>
    );
}
