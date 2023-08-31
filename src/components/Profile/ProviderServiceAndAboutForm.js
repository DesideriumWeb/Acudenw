/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Dialog } from "primereact/dialog";
import { AcceptanceButton } from "../Buttons"
import FormTextArea from "../Form/FormTextArea"
import SmallSpinner from "../General/SmallSpinner";
/**
 * Provider Service & About information - Update & Show.
 *
 * @param {string} id - The ID of the provider.
 * @param {number} tabIndex - The index of the active tab.
 * @param {boolean} visible - Flag indicating whether the form is visible.
 * @param {function} setVisible - Function to set the visibility of the form.
 * @param {string} aboutUs - The about us description.
 * @param {function} setAboutUs - Function to set the about us description.
 * @param {function} setServiceDescription - Function to set the service description.
 * @param {function} handleSubmit - Function to handle the form submission.
 * @param {string} submitError - Error message for form submission.
 * @param {boolean} loading - Flag indicating whether the form is loading.
 * @returns {JSX.Element} - The Provider Service & About information component.
 */
export const ProviderServiceAndAboutForm = ({ id, tabIndex, visible, setVisible, aboutUs, services, setAboutUs, setServiceDescription, handleSubmit, submitError, loading = false}) => {

    const footer = () => {
        return (
            <div className="flex justify-end items-center">
                <AcceptanceButton title={'Guardar Cambios'} onClickHandler={() => handleSubmit(tabIndex, id)} />
                <SmallSpinner loading={loading}/>
            </div>
        )
    }

    return (
        <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}
            footer={footer}
            resizable={false}
            draggable={false}
        >
            <FormTextArea title={tabIndex === 0 ? 'Servicios' : 'Sobre Nosotros'} defaultValue={tabIndex === 0 ? services : aboutUs}
                name={tabIndex === 0 ? 'services' : 'aboutUs'}
                placeholder={tabIndex === 0 ? 'Agrege su servicio' : 'Agregue su información'}
                setValue={(e) => tabIndex === 0 ? setServiceDescription(e.target.value) : setAboutUs(e.target.value)}
                onChangeHandler={(e) => tabIndex === 0 ? setServiceDescription(e.target.value) : setAboutUs(e.target.value)}
            />
            {typeof submitError === 'string' && submitError && (
                <div className="bg-red-500 text-white p-3 rounded text-center mt-3" role="alert">
                    {submitError}
                </div>
            )}
        </Dialog>)
}