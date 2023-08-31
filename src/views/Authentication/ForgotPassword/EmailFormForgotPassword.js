import React, {useEffect, useState} from 'react';
import {checkIfEmailIsValid} from "../../../components/utils";
import FormTitle from "../../../components/Form/FormTitle";
import FormInput from "../../../components/Form/FormInput";
import stylesAuthentication from "../../../css/Authentication/Authentication.module.css";

export function EmailFormForgotPassword(props) {

    const [errorMsg, setErrorMsg] = useState(true)

    const manejadorChange = (e, updateEmail) => {

        if (checkIfEmailIsValid(e.target.value)) {
            updateEmail((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
            setErrorMsg(null)
        } else {
            setErrorMsg("Correo Inválido ")
        }
    }

    return (
        <>
            <FormTitle
            style={stylesAuthentication.differentiatorProvider}
            secondTitle={"¿Olvidaste tu contraseña?"}
            subTitle={"Entra tu correo electrónico."}
            />

            {/* {errorMsg && <div class={"alert alert-danger"} role="alert">
                {errorMsg}
            </div>} */}
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormInput type={"text"} title={"Correo electrónico"} setValue={props.setForm} name={"email"}
                               onChangeHandler={manejadorChange} placeholder={"ejemplo@email.com"} error={errorMsg}/>
                </form>
            </div>
        </>
    );
}
