/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useState } from 'react'
import ProviderService from "../../services/userServices/ProviderService";
import { Dialog } from "primereact/dialog";
import { FormInputFile } from "../Form/FormInputFile";
import EmployeeService from "../../services/userServices/EmployeeService";
import SmallSpinner from "../General/SmallSpinner";
import BasicAlert from "../General/BasicAlert";
import { PORTAL_ROUTES } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { incrementRefresh } from "../../stateManagement/slices/userSlice";

export default function BannerWithProfileImage({ id, profilePhoto, context, logoImage, bannerImage, isGuest = false, doRetryProvider, dispatch = null, isProviderGuest = false, providerId = null}) {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [file, setFileUrl] = useState()
    const [loading, setLoading] = useState(false)
    const [fileError, setFileError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    /**
     * Checks the file extension against the allowed extensions.
     * @param {File} file - The file to check the extension of.
     * @returns {boolean} - Returns true if the file extension is allowed, false otherwise.
     */
    const checkFileExtension = (file) => {

        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        const fileExtension = file.name.split('.').pop().toLowerCase();

        return allowedExtensions.includes(fileExtension);
    };
    /**
     * Edits the banner image.
     * Uploads the selected image file as the banner image for the specified context (provider or employee).
     * Validates the file and displays an error message if it doesn't meet the requirements.
     * Updates the file URL, hides the dialog, sets loading to false, and triggers a retry for the provider.
     * @param {string} id - The ID of the user (provider or employee).
     */
    const editBannerImage = async (id) => {
        try {
            setLoading(true);
            if (!file) {
                setFileError(true);
                setErrorMsg('Por favor seleccionar y cargar la imagen.');
                setLoading(false);
                return;
            }

            if (!checkFileExtension(file)) {
                setFileError(true);
                setErrorMsg('El formato de archivo no está permitido. Por favor seleccionar una imagen en formato JPG, JPEG o PNG.');
                setLoading(false);
                return;
            }

            let data = false;
            if (context === 'provider') {
                data = await new ProviderService().editProviderBannerImage(id, file);
            } else if (context === 'employee') {
                data = await new EmployeeService().editEmployeeBannerImage(file);
            }
            if (data) {
                setFileUrl('');
            }
            setVisible(false);
            setLoading(false);
            doRetryProvider((prevState) => prevState + 1)
        } catch (error) {
            setLoading(false);
            setErrorMsg('Error al editar la imagen del banner');
            setFileUrl(undefined)
            console.log('Error al editar la imagen del banner:', error);
        }
    };
    /**
     * Edits the logo image.
     * Uploads the selected image file as the logo image for the specified context (provider or employee).
     * Validates the file and displays an error message if it doesn't meet the requirements.
     * Updates the file URL, hides the dialog, sets loading to false, triggers a retry for the provider, and increments the refresh value.
     * @param {string} id - The ID of the user (provider or employee).
     */
    const editLogoImage = async (id) => {
        try {
            setLoading(true);

            if (!file) {
                setFileError(true);
                setErrorMsg('Por favor seleccionar y cargar la imagen.');
                setLoading(false);
                return;
            }

            if (!checkFileExtension(file)) {
                setFileError(true);
                setErrorMsg('El formato de archivo no está permitido. Por favor seleccionar una imagen en formato JPG, JPEG o PNG.');
                setLoading(false);
                return;
            }

            let data = false;
            if (context === 'provider') {
                data = await new ProviderService().editProviderLogoImage(id, file);
            } else if (context === 'employee') {
                data = await new EmployeeService().editEmployeeLogoImage(file);
            }
            if (data) {
                setFileUrl('');
            }
            setVisible(false);
            setLoading(false);

            doRetryProvider((prevState) => prevState + 1)

            dispatch && dispatch(incrementRefresh())
        } catch (error) {
            setLoading(false);
            setErrorMsg('Error al editar la imagen de perfil');
            setFileUrl(undefined)
            console.log('Error al editar la imagen de perfil:', error);
        }
    };

    const footer = (
        <div className="flex justify-end items-center">
            {fileError && <div className="mt-4 text-sm mr-2"><BasicAlert color="red" errorMsg={errorMsg} /></div>}
            <button disabled={loading} className="bg-[#092C4C] rounded-md text-white p-2 ml-2 hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all" onClick={() => editLogoImage(id)}>
                Guardar Como Perfil
            </button>
            <button disabled={loading} className="bg-[#092C4C] rounded-md text-white p-2 ml-2 hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all" onClick={() => editBannerImage(id)}>
                Guardar Como Banner
            </button>
            <SmallSpinner loading={loading} />
        </div>
    );

    return (
        <section>
            <Dialog
                visible={visible && !isGuest}
                style={{ width: '75vw' }}
                onHide={() => setVisible(false)} footer={footer}
                onShow={() => {
                    setErrorMsg('')
                    setFileError(false)
                    setFileUrl(undefined)
                }}
            >
                <FormInputFile file={file} setFileUrl={setFileUrl} />
            </Dialog>
            {
                !isGuest ? (
                    <div className="grid grid-rows-1 justify-end">
                        <div className="row-span-1">
                            <button
                                onClick={() => setVisible(true)}
                                className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                            >
                                Editar Imágenes
                            </button>
                        </div>
                    </div>
                ) : (
                    !isProviderGuest ? (
                        <div className="grid grid-rows-1 justify-end">
                            <button
                                onClick={() => navigate(PORTAL_ROUTES.PROVIDER_DIRECTORY_ROUTE)}
                                className="text-cyan-900 px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold flex items-center hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                            >
                                <ArrowLeftIcon className="acu-blue w-6 mt-1" />
                                <span className="ml-1">Directorio de Proveedores</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-rows-1 justify-end">
                            <button
                                onClick={
                                    !providerId ? () => navigate(PORTAL_ROUTES.DASHBOARD_ROUTE) : () => navigate(`${PORTAL_ROUTES.PROVIDER_PROFILE_ROUTE}${providerId}`)
                                }
                                className="text-cyan-900 px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold flex items-center hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                            >
                                <ArrowLeftIcon className="acu-blue w-6" />
                                <span className="ml-1">Mi perfil</span>
                            </button>

                        </div>
                    )
                )
            }
            <div
                onClick={() => {
                    setVisible(true);
                }}
                className="h-60 w-full rounded-lg relative bg-[#EEF5F6] bg-center hover:cursor-pointer mt-4"
            >
                <img src={bannerImage} alt="bannerPhoto" className="h-full w-full object-fill" />
                <div className="h-32 w-32 rounded-full absolute bottom-0 left-1/2 translate-x-1/2 md:left-20 md:translate-x-0 translate-y-10 border-white border-[4px] overflow-hidden bg-white bg-cover">
                    <img src={logoImage || profilePhoto} alt="profilePhoto" className="h-full w-full object-fill" />
                </div>
            </div>
        </section>

    )
}
