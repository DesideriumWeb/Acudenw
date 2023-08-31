/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CONFIG, PORTAL_ROUTES, STRINGS } from "../../config/config";
import { BsCloudDownload, BsEye, BsPencil, BsThreeDots, BsTrash } from "react-icons/bs";
import { insertLibraryItem } from "../../config/acudenLocaDB";
import { ConfirmDialog } from "primereact/confirmdialog";
import { RiCheckboxCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {useSelector} from "react-redux";

/**
 * Library Action Menu component that displays action menu for a library item.
 * @param {Object} item - The library item.
 * @param {function} removeHandler - The function to handle removing the item.
 * @param {boolean} [isStored=false] - Indicates if the item is stored in the library.
 * @param disableRemove - Turn off remove library item functionality.
 * @param {function} [pushOnAdd=null] - Function to handle pushing an item to the library.
 * @param {function} previewHandler - Function to handle the preview action.
 * @param {function} downloadHandler - Function to handle the download action.
 * @param {function} editHandler - Function to handle the edit action.
 * @returns {JSX.Element} Library Action Menu component.
 */
const CertificationActionMenu = ({ item, removeHandler, isStored = false, disableRemove = false, pushOnAdd = null, previewHandler, downloadHandler, editHandler }) => {

    const [resource, setResource] = useState(item);
    const [message, setMessage] = useState("");
    const [dialogRemoveVisible, setDialogRemoveVisible] = useState(false);
    const [dialogConfirmVisible, setDialogConfirmVisible] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMes, setToastMsg] = useState('')
    const [summary, setSummary] = useState('Mensaje')
    const [visibleToast, setVisibleToast] = useState(false)

    const { typeOfUser } = useSelector(state => state.user)

    /**
     * Toast ref req.
     */
    let toastRef;

    /**
    * Displays a confirmation message for removing an item.
    * Sets the message and shows the confirmation dialog.
    */
    const removeItemConfirm = () => {
        setMessage("¿Está seguro(a) que desea eliminarla?");
        setDialogRemoveVisible(true);
    };



    /**
     * Hides the confirmation dialogs.
     */
    const onHide = () => {
        setDialogConfirmVisible(false);
        setDialogRemoveVisible(false);
    };

    /**
     * Confirms the storing of the item.
     * Hides the confirmation dialog and calls the `storeItemHandler` function.
     */
    const onConfirmStore = () => {
        setDialogConfirmVisible(false);
    };

    /**
     * Confirms the removal of the item.
     * Hides the confirmation dialog, calls the `removeHandler` function to remove the resource,
     * and shows a warning message indicating that the resource has been removed.
     */
    const onConfirmRemove = () => {
        setDialogRemoveVisible(false);
        removeHandler(item.id);
        setToastMsg("El recurso ha sido eliminado.");
        setSeverity("warn");
        setSummary("Remover Recurso");
        setVisibleToast(true);
    };

    /**
     * Confirms the removal of the item.
     * Hides the confirmation dialog, calls the `removeHandler` (library storage) function to remove the resource,
     * and shows a warning message indicating that the resource has been removed from library storage.
     */
    const onConfirmStoredRemove = () => {
        setDialogRemoveVisible(false);
        removeHandler(resource)
        setToastMsg("El recurso ha sido eliminado de su Librería.");
        setSeverity("warn");
        setSummary("Remover Recurso");
        setVisibleToast(true);
    }

    /**
     * useEffect to display the Toast component when `visibleToast` changes.
     */
    useEffect(() => {
        if (visibleToast) {
            toastRef.show({
                severity: severity,
                detail: toastMes,
                summary: summary
            });
        }
    }, [visibleToast]);


    return (
        <div className="top-16 text-right">
            <ConfirmDialog
                header={
                    <div className="flex items-center justify-center">
                        <h2 className="text-center text-md">Confirmación Para Guardar</h2>
                    </div>}
                message={message}
                visible={dialogConfirmVisible}
                onHide={onHide}
                footer={
                    <>
                        <Button label="Cancelar" className="p-button-text" onClick={onHide} />
                        <Button label="Confirmar" className="p-button-primary" onClick={onConfirmStore} />
                    </>
                }
            >
                <div className="flex flex-col items-center justify-center md:flex-row md:items-center">
                    <RiCheckboxCircleFill size={40} color="#008000" className="text-green-500 text-2xl md:text-3xl" />
                    <div className="mt-2 md:ml-4">{message}</div>
                </div>
            </ConfirmDialog>

            <ConfirmDialog
                header={
                    <div className="flex items-center justify-center">
                        <h2 className="text-center text-md">Confirmación Para Remover</h2>
                    </div>
                }
                message={message}
                visible={dialogRemoveVisible}
                onHide={onHide}
                footer={
                    <>
                        <Button label="Cancelar" className="p-button-text" onClick={onHide} />
                        <Button label="Eliminar" className="p-button-danger" onClick={() => {
                            if (isStored)
                                onConfirmStoredRemove()
                            else
                                onConfirmRemove()
                        }} />
                    </>
                }
            >
                <div className="flex flex-row items-center justify-center">
                    <RiDeleteBin6Line size={40} color="red" />
                    <div className="ml-4">{message}</div>
                </div>
            </ConfirmDialog>

            <Toast ref={ref => (toastRef = ref)} onHide={() => { toastRef.clear(); setVisibleToast(false) }} />

            <Menu as="div" className=" text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-end rounded-md px-4 py-2 text-sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <BsThreeDots size={24} />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -translate-x-1/2  w-36 origin-top-right divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-1 py-1">
                            <Menu.Item className="z-50">
                                {({ active }) => (
                                    <div className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#164E63]"}`} onClick={() => previewHandler(item)}>
                                        <BsEye className="inline-block mr-2" />
                                        Abrir
                                    </div>

                                )}
                            </Menu.Item>
                            {
                                typeOfUser && typeOfUser.includes("EMPLOYEE") &&

                                <Menu.Item className="z-50">
                                    {({ active }) => (
                                        <div
                                            className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#164E63]"}`} onClick={() => editHandler(item)}
                                        >
                                            <BsPencil className="inline-block mr-2" />
                                            Editar
                                        </div>
                                    )}
                                </Menu.Item>

                            }
                            <Menu.Item className="z-50">
                                {({ active }) => (
                                    <div
                                        className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#FB923C]"}`} onClick={() => downloadHandler(item)}
                                    >
                                        <BsCloudDownload className="inline-block mr-2" />
                                        Descargar
                                    </div>
                                )}
                            </Menu.Item>
                            {
                                !disableRemove && typeOfUser &&  typeOfUser.includes("EMPLOYEE") &&
                                <Menu.Item className="z-50">
                                    {({ active }) => (
                                        <div
                                            className={`block px-4 py-2 text-sm ${active ? "bg-red-500 text-white" : "text-[#E969A1]"}`} onClick={removeItemConfirm}
                                        >
                                            <BsTrash className="inline-block mr-2" />
                                            Remover
                                        </div>
                                    )}
                                </Menu.Item>
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu >
        </div >
    );
};

export default CertificationActionMenu;


