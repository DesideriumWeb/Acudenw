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
import { ALERT_TYPES, CONFIG, CONSTANTS, LIBRARY_CONTENT_FORMATS, MIME_TYPES, STRINGS } from "../../config/config";
import { BsBookmark, BsCloudDownload, BsEye, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { insertLibraryItem } from "../../config/acudenLocaDB";
import { ConfirmDialog } from "primereact/confirmdialog";
import { RiCheckboxCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton
} from 'video-react';
import BasicAlert from "../../components/General/BasicAlert";
import { ApplicationStoragePath } from "../../services/ApiRest";
import AcudenDocViewer from "../../components/General/AcudenDocViewer";
import { LibraryService } from "../../services/libraryService/LibraryService";

/**
 * Library Action Menu component that displays action menu for a library item.
 * @param {Object} item - The library item.
 * @param {function} removeHandler - The function to handle removing the item.
 * @param {boolean} [isStored=false] - Indicates if the item is stored in the library.
 * @param disableRemove - Turn off remove library item functionality.
 * @param {function} [pushOnAdd=null] - Function to handle pushing an item to the library.
 * @returns {JSX.Element} Library Action Menu component.
 */
const LibraryActionMenu = ({ item, removeHandler, isStored = false, disableRemove = false, pushOnAdd = null, downloadHandler }) => {

    const [resource, setResource] = useState(item);
    const [message, setMessage] = useState("");
    const [dialogRemoveVisible, setDialogRemoveVisible] = useState(false);
    const [dialogConfirmVisible, setDialogConfirmVisible] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMes, setToastMsg] = useState('')
    const [summary, setSummary] = useState('Mensaje')
    const [visibleToast, setVisibleToast] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [showDocs, setShowDocs] = useState(false)
    const [numPages, setNumPages] = useState(null);
    const [videoAddress, setVideoAddress] = useState(CONSTANTS.DEFAULT_INPRENDE_VIDEO[
        Math.floor(Math.random() * CONSTANTS.DEFAULT_INPRENDE_VIDEO.length)
    ]);
    /**
     * Retrieves the file extension from a given file name.
     * @param {string} fileName - The name of the file.
     * @returns {string} The file extension.
     */
    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    }

    /**
     * Set document preview page numbers
     * @param numPages - PDF pages number (qty)
     * @return {void}
     */
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const [docExt, setDocExt] = useState(getFileExtension(resource.filePath))
    const [onError, setOnError] = useState(false)

    /**
     * Displays a confirmation message for storing an item.
     * Sets the message and shows the confirmation dialog.
     * @return {void}
     */
    const storeItemConfirm = () => {
        setMessage("Este curso se agregará a tu sección de 'Guardados'. ¿Deseas continuar?");
        setDialogConfirmVisible(true);
    };

    /**
     * Displays a confirmation message for removing an item.
     * Sets the message and shows the confirmation dialog.
     * @return {void}
     */
    const removeItemConfirm = () => {
        setMessage("Este curso se eliminará de tu sección de 'Guardados'. ¿Deseas continuar?");
        setDialogRemoveVisible(true);
    };

    /**
     * Toast ref req.
     */
    let toastRef;

    /**
     * Handles the storing of an item in the library.
     * If IndexedDB is used, it saves the item to the database.
     * Shows a success or error message based on the result.
     */
    const storeItemHandler = async () => {
        if (CONFIG.USE_INDEXED_DB) {
            try {
                const record = {
                    resource: JSON.stringify(resource),
                    resourceType: resource.libraryContentFormat.trim().toUpperCase(),
                    resourceId: resource.id
                };

                const dbResponse = await insertLibraryItem(record);

                if (dbResponse.severity.includes('success'))
                    pushOnAdd && pushOnAdd(record);

                setSeverity(dbResponse.severity);
                setToastMsg(dbResponse.detail);
                setSummary(dbResponse.summary);
                setVisibleToast(true);

            } catch (error) {
                setSeverity("warn");
                setToastMsg(error.message);
                setVisibleToast(true);
                console.log("Error al almacenar el elemento en la biblioteca:", error);
            }
        } else {
            // TODO: Handle the case when IndexedDB is not used
        }
    };

    /**
     * Hides the confirmation dialogs.
     * @return {void}
     */
    const onHide = () => {
        setDialogConfirmVisible(false);
        setDialogRemoveVisible(false);
    };

    /**
     * Confirms the storing of the item.
     * Hides the confirmation dialog and calls the `storeItemHandler` function.
     * @return {void}
     */
    const onConfirmStore = () => {
        setDialogConfirmVisible(false);
        storeItemHandler();
    };

    /**
     * Confirms the removal of the item.
     * Hides the confirmation dialog, calls the `removeHandler` function to remove the resource,
     * and shows a warning message indicating that the resource has been removed.
     * @return {void}
     */
    const onConfirmRemove = () => {
        setDialogRemoveVisible(false);
        removeHandler(resource);
        setToastMsg("El recurso ha sido eliminado.");
        setSeverity("warn");
        setSummary("Remover Recurso");
        setVisibleToast(true);
    };

    /**
     * Confirms the removal of the item.
     * Hides the confirmation dialog, calls the `removeHandler` (library storage) function to remove the resource,
     * and shows a warning message indicating that the resource has been removed from library storage.
     * @return {void}
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
    /**
     * Handles the close event for the video player dialog.
     * Sets the state of `showVideo` to false, hiding the video player dialog.
     * @returns {void}
     */
    const onCloseVideo = () => {
        setShowVideo(false)
    }
    /**
     * Handles the close event for the document viewer dialog.
     * Sets the state of `showDocs` to false, hiding the document viewer dialog.
     * @returns {void}
     */
    const onCloseDocs = () => {
        setShowDocs(false)
    }
    /**
     * Shows the preview of the resource.
     * If the resource is a video file (based on its libraryContentFormat or file extension),
     * sets the state of `showVideo` to true, showing the video player dialog.
     * Otherwise, sets the state of `showDocs` to true, showing the document viewer dialog.
     * @returns {void}
     */
    const showPreview = async () => {
        const { data, fileName } = await LibraryService.getLibraryItemFile(item.id);
        let url = "";
        if (data) {
            url = URL.createObjectURL(new Blob([data], { type: MIME_TYPES[fileName.substring(fileName.lastIndexOf("."))] }));
        } else {
            setSeverity('warn');
            setSummary('Archivo');
            setToastMsg('No se ha encontrado el archivo.')
            setVisibleToast(true)
            return;
        }
        const resourceFromServer = {
            libraryContentFormat: fileName.endsWith('.mp4') || fileName.endsWith('.mkv') ? 'videos' : 'docs',
            filePath: url,
            extension: fileName.substring(fileName.lastIndexOf(".") + 1),
            mimeType: MIME_TYPES[fileName.substring(fileName.lastIndexOf("."))]
        }

        setResource(resourceFromServer)

        if (resourceFromServer.libraryContentFormat === LIBRARY_CONTENT_FORMATS.VIDEOS.type ||
            resourceFromServer.filePath.endsWith('.mp4') ||
            resourceFromServer.filePath.endsWith('.mkv')) {
            setShowVideo(true)
        } else {
            setShowDocs(true)
        }
    }

    const handleDownload = async (item) => {
        const { data, fileName } = await LibraryService.getLibraryItemFile(item.id);
        if (data) {
            const url = URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a')
            link.href = url;
            link.download = fileName ?? new Date().valueOf()
            document.body.appendChild(link)
            link.click();
            link.parentNode?.removeChild(link)
            URL.revokeObjectURL(url);
        } else {
            setToastMsg("No se encontro el archivo.");
            setSeverity("warn");
            setSummary("Descargar archivo");
            setVisibleToast(true);
        }
    }

    return (
        <div className="top-16 text-right" key={resource.id ?? 0}>
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
                        <Button label="Cancelar" className="bg-[#092c4c] hover:bg-[#A7D02A] hover:text-white hover:shadow-md" onClick={onHide} />
                        <Button label="Confirmar" className="bg-[#092c4c] hover:bg-[#A7D02A] hover:text-white hover:shadow-md" onClick={onConfirmStore} />
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
                        <Button label="Cancelar" className="bg-[#092c4c] hover:bg-[#A7D02A] hover:text-white hover:shadow-md" onClick={onHide} />
                        <Button label="Confirmar" className="bg-[#092c4c] hover:bg-[#A7D02A] hover:text-white hover:shadow-md" onClick={() => {
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

            <Dialog
                style={{ width: '65vw' }}
                header={<p className="text-lg font-semibold">{resource.title}</p>}
                visible={showVideo}
                onHide={onCloseVideo}
            >
                <Player src={resource.filePath && resource.filePath} playsInline>
                    <ControlBar>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    </ControlBar>
                </Player>
            </Dialog>

            <Dialog
                onShow={() => setOnError(false)}
                style={{ width: '70vw', height: '80vw', overflow: 'hidden' }}
                visible={showDocs}
                onHide={onCloseDocs}>
                <p className="text-lg font-semibold mb-4">{resource.title}</p>
                {
                    onError && <BasicAlert errorMsg={STRINGS.GENERIC_ERROR} color={ALERT_TYPES.DANGER} />
                }
                <AcudenDocViewer resource={resource} />
            </Dialog>


            <Toast ref={ref => (toastRef = ref)} onHide={() => { toastRef.clear(); setVisibleToast(false) }} />

            <Menu as="div" className="absolute inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <div className="w-full items-center">
                            <BsThreeDotsVertical size={25} />
                        </div>
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={showPreview}
                                        className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#164E63]"}`}
                                    >
                                        <BsEye className="inline-block mr-2" />
                                        Vista Previa
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#FB923C]"}`}
                                        onClick={() => handleDownload(item)}
                                    >
                                        <BsCloudDownload className="inline-block mr-2" />
                                        Descargar
                                    </div>
                                )}
                            </Menu.Item>
                            {
                                !isStored ?
                                    (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    onClick={storeItemConfirm}
                                                    className={`block px-4 py-2 text-sm ${active ? "bg-blue-500 text-white" : "text-[#1FCD6F]"}`}
                                                >
                                                    <BsBookmark className="inline-block mr-2" />
                                                    Guardar
                                                </div>
                                            )}
                                        </Menu.Item>
                                    )
                                    : null
                            }
                            {
                                !disableRemove && isStored
                                    ?
                                    (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    onClick={removeItemConfirm}
                                                    className={`block px-4 py-2 text-sm ${active ? "bg-red-500 text-white" : "text-[#E969A1]"}`}
                                                >
                                                    <BsTrash className="inline-block mr-2" />
                                                    Remover
                                                </div>
                                            )}
                                        </Menu.Item>
                                    )
                                    : null
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default LibraryActionMenu;


