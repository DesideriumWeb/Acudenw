/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useMemo, useState } from "react";
import FormTitle from "../../../../components/Form/FormTitle";
import FormInput from "../../../../components/Form/FormInput";
import FormSelect from "../../../../components/Form/FormSelect";
import { useFormValidator } from "../../../../hooks/useFormValidator";
import { isObjEmpty } from "../../../../components/utils";

export function PersonalInformation(props) {

    const [items, setItems] = useState([
        {
            id: "MALE",
            name: "Masculino",
        },
        {
            id: "FEMALE",
            name: "Femenino",
        },
        {
            id: "UNSPECIFIED",
            name: "Otro",
        },
        {
            id: "NOT_ANSWER",
            name: "Prefiero no contestar"
        }
    ])

    // This must always be a value
    const [errorMsg, setErrorMsg] = useState(true)
    const invalidValues = useFormValidator(props.form, [
        "name",
        "lastname",
        "birthDate",
        "genderSelected",
        "gender"
    ])

    const [errorMsgByName, setErrorMsgByName] = useState({
        name: '',
        lastname: '',
        birthDate: '',
        genderSelected: '',
        gender: ''
    })

    const manejadorChange = (e, setState) => {
        if (e.target.name === "genderSelected") {
            if (e.target.value === "UNSPECIFIED") {
                props.setForm((prevState) => ({
                    ...prevState,
                    ['gender']: undefined
                }))
            } else {
                props.setForm((prevState) => ({
                    ...prevState,
                    ['gender']: e.target.value
                }))
            }

        }
        props.setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const showInputGender = useMemo(() => {
        return props.form?.genderSelected === "UNSPECIFIED"
    }, [props.form])

    useEffect(() => {
        if (invalidValues?.length > 0) {
            setErrorMsgByName((prevState) => ({
                [invalidValues]: `${document.getElementsByName(invalidValues)[0]?.title} es inválido.`,
            }))
        } else {
            setErrorMsgByName({})
        }
    }, [invalidValues])

    useEffect(() => {
        props.setCanContinue(isObjEmpty(errorMsgByName))
    }, [errorMsgByName])

    return (
        <>
            <FormTitle mainTitle={"Empleado(a)"}
                secondTitle={"Información Personal"}
                style={'bg-[#88C7F1] font-sm mb-2 font-sans rounded-lg'}
            >
            </FormTitle >
            < div >
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormInput type={"text"} title={"Nombre"} setValue={props.setForm} name={"name"} defaultValue={props.form.name}
                        onChangeHandler={manejadorChange} placeholder={"Nombre"} error={errorMsgByName.name}
                    />
                    <FormInput type={"text"} title={"Apellido"} setValue={props.setForm} name={"lastname"} defaultValue={props.form.lastname}
                        onChangeHandler={manejadorChange} placeholder={"Apellido"} error={errorMsgByName.lastname}
                    />

                    <FormInput title={"Fecha de Nacimiento"} setValue={props.setForm} type={"date"} name={"birthDate"} defaultValue={props.form.birthDate}
                        onChangeHandler={manejadorChange} placeholder={""} error={errorMsgByName.birthDate} />
                    <div className="w-full my-4 mx-2">
                        <FormSelect title={"Género"} name={"genderSelected"} setValue={props.setForm}
                            value={props?.form["genderSelected"]} defaultValue={props.form.gender}
                            items={items} onChangeHandler={manejadorChange} error={errorMsgByName.genderSelected}
                        />
                    </div>

                    {showInputGender &&
                        <FormInput type={"text"} title={"Género"} name={"gender"} setValue={props.setForm} defaultValue={props.form.gender}
                            onChangeHandler={manejadorChange} placeholder={"Ingrese su género"} error={errorMsgByName.gender} />}
                </form>
            </div >
        </>
    )
}
