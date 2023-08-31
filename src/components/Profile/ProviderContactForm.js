/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Dialog } from "primereact/dialog"
import FormInput from "../Form/FormInput"
import FormSelect from "../Form/FormSelect"
import { useEffect, useMemo, useState } from "react"
import { AcceptanceButton } from "../Buttons"
import { checkIfEmailIsValid, getKeyByValueAsArray, isObjEmpty } from "../utils"
import { useFormValidator } from "../../hooks/useFormValidator"
import UserService from "../../services/userServices/UserService"
import SmallSpinner from "../General/SmallSpinner";
/**
 * Provider General information component.
 *
 * @param {object} initialValues - The initial values for the form fields.
 * @param {object} form - The current form values.
 * @param {Map} providerCategories - The provider categories map.
 * @param {function} handleSubmit - Function to handle the form submission.
 * @param {function} setForm - Function to set the form values.
 * @param {string} name - The name of the provider.
 * @param {array} town - The town options for the select field.
 * @param {function} manejadorChangeCheckbox - Function to handle checkbox changes.
 * @param {function} setProviderCategories - Function to set the provider categories.
 * @param {boolean} visible - Flag indicating whether the form is visible.
 * @param {function} setVisible - Function to set the visibility of the form.
 * @param {string} submitError - Error message for form submission.
 * @param {boolean} loading - Flag indicating whether the form is loading.
 * @returns {JSX.Element} - The Provider General information component.
 */
export const ProviderContactForm = ({ initialValues, form, providerCategories, handleSubmit, setForm, name, town, manejadorChangeCheckbox, setProviderCategories, visible, setVisible, submitError, loading = false }) => {

    const invalidValues = useFormValidator(form, [
        'phoneNumber1',
        'email',
        'addressLine1',
        'zipcode',
        'townId',
        'country'
    ])

    const [errorMsgByName, setErrorMsgByName] = useState({
        phoneNumber1: '',
        email: '',
        addressLine1: '',
        zipcode: '',
        townId: '',
        country: ''
    })

    useEffect(() => {
        setForm(initialValues)
    }, [])

    useEffect(() => {
        if (invalidValues?.length > 0) {
            setErrorMsgByName((prevState) => ({
                [invalidValues]: `${document.getElementsByName(invalidValues)[0]?.title} es inválido.`,
            }))
        } else if (getKeyByValueAsArray(providerCategories, true).length === 0) {
            setErrorMsgByName(() => ({
                ['providerCategories']: 'Categoría es requerida.'
            }))
        } else {
            setErrorMsgByName({})
        }
    }, [invalidValues, providerCategories])

    const footer = useMemo(() => {
        return (
            <>
                <hr className="my-4"/>
                <div className="flex justify-end items-center">
                    <AcceptanceButton title={'Guardar Cambios'} disabled={!isObjEmpty(errorMsgByName)}
                                      onClickHandler={() => handleSubmit(errorMsgByName)}
                    />
                    <SmallSpinner loading={loading}/>
                </div>
            </>

        )
    }, [initialValues, errorMsgByName])

    const [timer, setTimer] = useState(null)
    const onChangeHandler = async (e, setValue) => {
        if (e.target.name === 'email') {
            if (!e.target.value) {
                setErrorMsgByName(() => ({
                    [e.target.name]: 'Correo es requerido.'
                }))
                setForm((prevState) => ({
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
                            setForm((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value
                            }))

                            return;

                        } else
                            setErrorMsgByName(() => ({
                                [e.target.name]: 'Correo no es valido.'
                            }))
                    }
                    catch (error) {
                        setErrorMsgByName(() => ({
                            [e.target.name]: 'Correo no es valido.'
                        }))
                    }
                }, 500)

                setTimer(newTimer);
            }
        } else {
            setForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    }

    return (<Dialog style={{ width: '60vw' }} visible={visible} onHide={() => setVisible(false)} footer={footer} resizable={false}>
        <div className="w-full flex justify-start items-center mx-auto">
            <p className="font-semibold text-lg">Editar Información General</p>
        </div>
        <hr className="my-2" />

        {typeof submitError === 'string' && submitError && (
            <div className="bg-red-500 text-white p-3 rounded text-center mt-3" role="alert">
                {submitError}
            </div>
        )}
        <div className="mx-auto w-5/6">
            <FormInput
                name="phoneNumber1"
                setValue={setForm}
                title="Número de Teléfono 1"
                type="tel"
                defaultValue={initialValues.phoneNumber1}
                onChangeHandler={onChangeHandler}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={14}
                error={errorMsgByName.phoneNumber1}
            />
            <FormInput
                name="phoneNumber2"
                setValue={setForm}
                title="Número de Teléfono 2"
                type="tel"
                defaultValue={initialValues.phoneNumber2}
                onChangeHandler={onChangeHandler}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={14}
            />
            <FormInput
                type="text"
                title="Correo electrónico"
                setValue={setForm}
                name="email"
                defaultValue={initialValues.email}
                onChangeHandler={onChangeHandler}
                error={errorMsgByName.email}
            />
            <FormInput
                type="text"
                title="Página web"
                setValue={setForm}
                name="websiteUrl"
                defaultValue={initialValues.websiteUrl}
                onChangeHandler={onChangeHandler}
            />
            <FormInput
                type="text"
                title="Dirección"
                setValue={setForm}
                defaultValue={initialValues.addressLine1}
                name="addressLine1"
                onChangeHandler={onChangeHandler}
                error={errorMsgByName.addressLine1}
            />
            <FormInput
                type="text"
                title="Dirección linea 2"
                setValue={setForm}
                defaultValue={initialValues.addressLine2}
                name="addressLine2"
                onChangeHandler={onChangeHandler}
            />
            <FormInput
                title="Código postal"
                type="text"
                name="zipcode"
                setValue={setForm}
                defaultValue={initialValues.zipcode}
                maxLength={5}
                onChangeHandler={onChangeHandler}
                error={errorMsgByName.zipcode}
            />
            <div className="w-full ml-2">
                <FormSelect
                    title="Pueblo"
                    name="townId"
                    items={town}
                    defaultValue={initialValues.townId}
                    onChangeHandler={onChangeHandler}
                    error={errorMsgByName.townId}
                />
            </div>
            <FormInput
                title="País"
                type="text"
                name="country"
                setValue={setForm}
                defaultValue={initialValues.country}
                onChangeHandler={onChangeHandler}
                error={errorMsgByName.country}
            />
            <hr className="my-8" />
            <p className="mt-4 text-blue-900 font-bold text-1xl mb-4">Categoría del proveedor: </p>
            {errorMsgByName && errorMsgByName.providerCategories && (
                <p className="text-red-500 text-sm mt-1">{errorMsgByName.providerCategories}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4 mt-2">

                {Array.from(providerCategories.keys()).map((item, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="checkbox"
                            id={item.description}
                            name={item.description}
                            checked={providerCategories.get(item)}
                            onChange={(e) => manejadorChangeCheckbox(e, setProviderCategories, providerCategories)}
                            className="form-checkbox mr-2"
                        />
                        <label htmlFor={item.description} className="text-gray-700">
                            {item.description}
                        </label>
                    </div>
                ))}
            </div>
        </div>

    </Dialog>)
}