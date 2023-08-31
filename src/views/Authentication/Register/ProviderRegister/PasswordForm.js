/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useCallback, useEffect, useState } from 'react';
import FormTitle from "../../../../components/Form/FormTitle";
import FormInput from "../../../../components/Form/FormInput";
import {checkIfPasswordIsValid, checkIfPasswordIsValidV2} from '../../../../components/utils';
import eyeIcon from '../../../../assets/images/icons/eye icon.svg'
import eyeSlashIcon from '../../../../assets/images/icons/eye slash solid.svg'

export function PasswordForm(props) {
    const [errorMsg, setErrorMsg] = useState()
    const [password2, setPassword2] = useState("")
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [errorMsg2, setErrorMsg2] = useState('')

    const clearErrorMessages = () => {
        setErrorMsg('')
        setErrorMsg2('')
    }

    const manejadorChange = (e, updatePassword) => {

        clearErrorMessages();

        if (!checkIfPasswordIsValidV2(e.target.value)) {
            if (e.target.name === "password")
                setErrorMsg("Contraseña inválida");
            else
                setErrorMsg2("Contraseña inválida");
            return;
        }

        updatePassword((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }));

        if (e.target.name === "password" && props.form.password2) {
            if (props.form.password2 !== e.target.value) {
                setErrorMsg('Las contraseñas no coinciden.');
                setErrorMsg2('Las contraseñas no coinciden.');
            }
        } else if (e.target.name === "password2" && props.form.password) {
            if (props.form.password !== e.target.value) {
                setErrorMsg('Las contraseñas no coinciden.');
                setErrorMsg2("Las contraseñas no coinciden.");
            }
        }
    };


    useEffect(() => {

        if (!errorMsg && !errorMsg2 && props.form.password && props.form.password === props.form.password2)
            props.setCanContinue(true)
        else
            props.setCanContinue(false)

    }, [errorMsg, errorMsg2, props])


    return (<>
        <FormTitle mainTitle={props?.context !== "change" ? props.mainTitle : undefined}
            style={`${props.mainTitle === 'Empleado(a)' ? 'bg-[#88C7F1]' : 'bg-[#B8E5E3]'} font-sm mb-2 font-sans rounded-lg`}
            secondTitle={props?.context !== "change" ? "Crea tu contraseña" : "Restablece tu contraseña"}
            subTitle={"Tu contraseña debe tener un mínimo de 8 caracteres, 1 número, 1 letra mayúscula, 1 letra minúscula y un carácter especial (@#!*_)."}>
        </FormTitle>

        <div>
            <form className={"form-group"} onSubmit={(e) => e.preventDefault()}>
                {props.errorMsg && <div className="bg-red-500 text-white p-3 rounded text-center text-sm mt-4" role="alert">{props.errorMsg}</div>}
                <div className='flex items-center'>
                    <div className='flex-grow flex-shrink'>
                        <FormInput
                            title={"Contraseña"}
                            type={showPassword1 ? "text" : "password"}
                            setValue={props.setForm}
                            placeholder={"Contraseña"}
                            name={"password"}
                            onChangeHandler={manejadorChange}
                            error={errorMsg}
                            defaultValue={props.form.password}
                        />
                    </div>
                    <div className='ml-2 cursor-pointer mt-7' onClick={() => setShowPassword1(!showPassword1)}>
                        <img width={`70%`} src={showPassword1 ? eyeSlashIcon : eyeIcon} alt={`eye-icon`} />
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='flex-grow flex-shrink'>
                        <FormInput
                            title={"Confirmar contraseña"}
                            type={showPassword2 ? "text" : "password"}
                            setValue={props.setForm}
                            placeholder={"Confirmar contraseña"}
                            name={"password2"}
                            onChangeHandler={manejadorChange}
                            error={errorMsg2}
                            defaultValue={props.form.password2}
                        />
                    </div>

                    <button
                         type="button"
                         className="absolute right-2 top-2"
                         onClick={() => setShowPassword2(!showPassword2)}>  </button>
                        <div className='ml-2 cursor-pointer mt-7' onClick={() => setShowPassword2(!showPassword2)}>
                        <img width={`70%`} src={showPassword2 ? eyeSlashIcon : eyeIcon} alt={`eye-icon`}/>
                    </div>
                </div>
            </form>
        </div>
    </>);
}
