/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { Dialog } from 'primereact/dialog';
import { AcceptanceButton } from '../../Buttons';
import FormInput from '../../Form/FormInput';
import FormTextArea from '../../Form/FormTextArea';
import EmployeeService from '../../../services/userServices/EmployeeService';
import {IoPersonCircle} from "react-icons/io5";
import {ALERT_TYPES, HTTP, STRINGS} from "../../../config/config";
import BasicAlert from "../../General/BasicAlert";
import SmallSpinner from "../../General/SmallSpinner";
/**
 * TitleHeader component.
 * This component displays the title header with user information and allows editing of user details.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.allowFunctionality - Boolean indicating whether the editing functionality is allowed.
 * @param {string} props.firstName - The first name of the user.
 * @param {string} props.lastName - The last name of the user.
 * @param {string} props.occupation - The occupation of the user.
 * @param {string} props.description - The description of the user.
 * @param {JSX.Element} props.additionalInformation - Additional information to display below the user details.
 * @returns {JSX.Element} TitleHeader component.
 */
export default function TitleHeader({
                                        allowFunctionality,
                                        firstName,
                                        lastName,
                                        occupation,
                                        description,
                                        additionalInformation,
                                        setUpdateProfileHandler = null
                                    }) {

    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [inError, setInError] = useState(false)

    /**
     * Submits the updated employee details.
     * @param {object} form - The form data to submit.
     */
    const submitEmployeeDetails = async (form) => {
        try{
            setIsLoading(true)

            const errors = validateForm(form);

            if (Object.keys(errors).length === 0) {

                const data = await new EmployeeService().updateEmployeeProfile(form);

                if(data && data.httpCode === HTTP.OK){

                    setUpdateProfileHandler();
                    setVisible(false);

                }else{
                    setInError(true);
                }

            } else {
                setFormErrors(errors);
            }

        }catch (error){
            console.log(`Update employee profile error: ${error}`);
            setInError(true);
        }finally {
            setIsLoading(false)
            setTimeout(() =>{
                setInError(false);
            }, 5000);
        }
    };

    const footer = (
        <div className="w-full flex flex-row justify-start text-sm">
            <AcceptanceButton title={'Guardar Cambios'} onClickHandler={() => submitEmployeeDetails(form)} />
            <div className="mt-4">
                <SmallSpinner loading={isLoading}/>
            </div>
            {
                inError && (
                    <div className="mt-1">
                        <BasicAlert color={ALERT_TYPES.DANGER} errorMsg={STRINGS.GENERIC_ERROR}/>
                    </div>
                )
            }
        </div>

    );

    /**
     * Validates the form data.
     * @param {object} formData - The form data to validate.
     * @returns {object} - The errors object with validation messages.
     */
    const validateForm = (formData) => {

        const errors = {};

        if (!formData.firstname || formData.firstname.trim() === '') {
            errors.firstName = 'Entre un nombre válido.';
        }
        if (!formData.lastname || formData.lastname.trim() === '') {
            errors.lastName = 'Entre un apellido válido.';
        }
        if (!formData.occupation || formData.occupation.trim() === '') {
            errors.occupation = 'Entre una ocupación válida.';
        }
        if (!formData.description || formData.description.trim() === '') {
            errors.description = 'Entre una descripción válida.';
        }
        return errors;
    };

    useEffect(() => {
        setForm({
            firstname: form.firstname,
            lastname: form.lastname,
            occupation: form.occupation,
            description: form.description
        });
    }, [allowFunctionality, firstName, lastName, occupation, description, additionalInformation]);

    useEffect(() => {
        setForm({
            firstname: firstName,
            lastname: lastName,
            occupation: occupation,
            description: description
        });
    }, []);

    /**
     * Updates the form state when input values change.
     * @param {object} e - The event object from the input element.
     * @param {function} setValue - The setter function for the value being updated.
     */
    const onChangeHandler = (e, setValue) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="p-3">
            <Dialog style={{ width: '50vw' }} visible={visible} onHide={() => setVisible(false)} footer={footer} onShow={() => setFormErrors({})}>
                <div className="w-full flex flex-row justify-center py-0">
                    <IoPersonCircle size={40} className="acu-blue mr-2" />
                    <p className="text-3xl acu-blue">Información Personal</p>
                </div>
                <hr className="mt-2"/>
                <div className="flex flex-col">
                    <FormInput
                        title={'Nombre'}
                        name={'firstname'}
                        placeholder={'Entre su nombre'}
                        type={'text'}
                        maxLength={50}
                        setValue={setForm}
                        defaultValue={firstName}
                        error={formErrors.firstName}
                        onChangeHandler={onChangeHandler}
                    />
                    <FormInput
                        title={'Apellidos'}
                        name={'lastname'}
                        placeholder={'Entre sus apellidos'}
                        type={'text'}
                        maxLength={50}
                        setValue={setForm}
                        defaultValue={lastName}
                        error={formErrors.lastName}
                        onChangeHandler={onChangeHandler}
                    />
                    <FormInput
                        title={'Ocupación'}
                        name={'occupation'}
                        placeholder={'Entre su ocupación'}
                        type={'text'}
                        maxLength={50}
                        setValue={setForm}
                        defaultValue={occupation}
                        error={formErrors.occupation}
                        onChangeHandler={onChangeHandler}
                    />
                    <div className="mt-4">
                        <FormTextArea
                            title={'Descripción'}
                            name={'description'}
                            placeholder={'Entre la descripción'}
                            type={'text'}
                            maxLength={250}
                            setValue={setForm}
                            defaultValue={description}
                            error={formErrors.description}
                            onChangeHandler={onChangeHandler}
                        />
                    </div>
                    <hr className="my-4" />
                </div>
            </Dialog>
            {allowFunctionality && (
                <div className="flex justify-end hover:cursor-pointer" onClick={() => setVisible(true)}>
                    <AiFillEdit size={20} className="acu-blue" />
                </div>
            )}
            <h5 className="text-3xl font-semibold text-cyan-900">
                {firstName} {lastName}
            </h5>
            <p className="text-lg font-semibold text-cyan-900 mb-2 py-0 my-4">{occupation}</p>
            <p className="py-0 my-4">{description}</p>
            {additionalInformation}
        </div>
    );
}


