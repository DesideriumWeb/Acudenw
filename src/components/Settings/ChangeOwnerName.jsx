/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useCallback, useState, useMemo, useEffect} from 'react';
import { AcceptanceButton } from '../Buttons';
import FormInput from '../Form/FormInput';
import FormSelect from '../Form/FormSelect';
import EmployeeService from '../../services/userServices/EmployeeService';
import ProviderService from '../../services/userServices/ProviderService';
import {ALERT_TYPES, GENDERS, HTTP, STRINGS} from "../../config/config";
import SmallSpinner from "../General/SmallSpinner";
import BasicAlert from "../General/BasicAlert";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";
import {formatGender, formatGenderForEnum} from "../utils";
/**
 * Renders the ChangeOwnerName component.
 * Allows users to change the owner's name and personal information.
 *
 * @param {Object} props - The component props.
 * @param {string} props.typeOfUser - The type of user.
 * @returns {JSX.Element} The JSX element representing the ChangeOwnerName component.
 */
export default function ChangeOwnerName({ typeOfUser }) {

    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});
    const [alertError, setAlertError] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState(ALERT_TYPES.SUCCESS)
    const [formValid, setFormValid] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(0)
    const [submitCount, setSubmitCount] = useState(0);

    const {birthDate, firstname, lastname, gender:empGender} = useEmployeeProfile(updateProfile)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

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

    const validateForm = () => {

        setFormValid(false)
        const errors = {};

        if (typeOfUser.toLowerCase().includes('provider')) {
            if (!form.ownerFullName || form.ownerFullName === '') {
                errors.ownerFullName = 'Ingrese el nombre y apellidos del dueño(a) de la cuenta.';
            }
        } else if (typeOfUser.toLowerCase().includes('employee')) {
            if (!form.firstname || form.firstname.trim() === '') {
                errors.firstName = 'Ingrese su nombre.';
            }
            if (!form.lastname || form.lastname.trim() === '') {
                errors.lastName = 'Ingrese sus apellidos.';
            }
            if (!form.birthDate || form.birthDate === '') {
                errors.birthDate = 'Ingrese su fecha de nacimiento.';
            }
            if (!form.gender || form.gender === '') {
                errors.gender = 'Seleccione su género.';
            }
        }

        setErrors(errors);
        setFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = async () => {
        try
        {
            validateForm()

            if (formValid) {

                setAlertError('');
                setLoading(true);

                let result;

                if (typeOfUser.toLowerCase().includes('provider')) {
                    result = await new ProviderService().updateOwnerInformation(form);
                } else if (typeOfUser.toLowerCase().includes('employee')) {
                    result = await new EmployeeService().updatePersonalInformation(form);
                }

                //TODO clean fields on success
                if (result?.data?.httpCode === HTTP.OK) {
                    setAlertError(STRINGS.GENERAL_UPDATED_INFO_OK);
                    setForm({})
                    setSubmitCount(prevCount => prevCount + 1);
                    //TODO for provider need update profile process, add else or else if
                    if(typeOfUser.toLowerCase().includes('employee'))
                        setUpdateProfileHandler()
                    setShowAlert(true)
                } else {
                    setAlertError(STRINGS.GENERAL_UPDATED_INFO_FAIL);
                    setAlertType(ALERT_TYPES.WARNING)
                    setShowAlert(true)
                }
            }
        }catch (error){
            console.log(`Update employee personal info: ${error}`)
            setAlertType(ALERT_TYPES.DANGER)
            setAlertError(STRINGS.GENERIC_ERROR)
            setShowAlert(true)
        }finally {
            setLoading(false);
            setTimeout(() => {
                setAlertError('')
                setShowAlert(false)
            }, 5000)
        }
    };

    const showInputGender = gender === 'UNSPECIFIED';

    /**
     * Update the profile handler.
     *
     * This function is used to update the profile by incrementing the current state value of updateProfile.
     */
    const setUpdateProfileHandler = useCallback(() => {
        setUpdateProfile(prevState => prevState + 1);
    }, [setUpdateProfile]);

    useEffect(() => {
        setForm({
            firstname:firstname,
            lastname:lastname,
            gender:empGender
        })
    }, []);


    return (
        <>
            <h2 className="font-semibold text-lg mb-4">Información Personal</h2>
            <hr/>
            {typeOfUser.toLowerCase().includes('provider') && (
                <div className="mb-6">
                    <div className="flex flex-col gap-2">
                        <FormInput
                            key={`ownerFullName_${submitCount}`}
                            type="text"
                            name="ownerFullName"
                            title="Nombre Completo"
                            placeholder="Ingrese el nombre completo"
                            setValue={setForm}
                            onChangeHandler={onChangeHandler}
                            error={errors.ownerFullName}
                            maxLength={100}
                        />
                    </div>
                </div>
            )}
            {typeOfUser.toLowerCase().includes('employee') && (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6">
                        <FormInput
                            key={`firstName_${submitCount}`}
                            type="text"
                            name="firstname"
                            title="Nombre"
                            placeholder="Ingrese el nombre"
                            setValue={setForm}
                            onChangeHandler={onChangeHandler}
                            error={errors.firstName}
                            maxLength={50}
                            defaultValue={firstname}
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                        <FormInput
                            key={`lastName_${submitCount}`}
                            type="text"
                            name="lastname"
                            title="Apellidos"
                            placeholder="Ingrese los apellidos"
                            setValue={setForm}
                            onChangeHandler={onChangeHandler}
                            error={errors.lastName}
                            maxLength={50}
                            defaultValue={lastname}
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6 mt-8">
                        <FormSelect
                            key={`gender_${submitCount}`}
                            title="Género"
                            name="gender"
                            setValue={setForm}
                            onChangeHandler={onChangeHandler}
                            items={GENDERS}
                            error={errors.gender}
                            defaultValue={empGender}
                        />
                        {showInputGender && (
                            <FormInput
                                key={`gender_${submitCount}`}
                                type="text"
                                title="Género"
                                name="gender"
                                setValue={setForm}
                                onChangeHandler={onChangeHandler}
                                placeholder="Ingrese su género"
                                error={errors.gender}
                            />
                        )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 mt-4">
                        <FormInput
                            key={`birthDate_${submitCount}`}
                            title="Fecha de Nacimiento"
                            type="date"
                            name="birthDate"
                            setValue={setForm}
                            onChangeHandler={onChangeHandler}
                            error={errors.birthDate}
                        />
                    </div>
                </div>
            )}
            <hr className="mt-4"/>
            <div className="flex flex-row justify-end items-center">
                { showAlert && <div className="mt-4 mr-2"><BasicAlert color={alertType} errorMsg={alertError}/></div> }
                <AcceptanceButton title="Guardar Cambios" onClickHandler={handleSubmit}/>
                <div className="ml-2">
                    <SmallSpinner loading={loading} />
                </div>
            </div>
        </>
    );
}


