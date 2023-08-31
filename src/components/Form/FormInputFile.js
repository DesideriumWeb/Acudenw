/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import stylesCommunityRegister from "../../css/Authentication/CommunityRegister.module.css";
import React, {useCallback, useMemo, useState} from "react";
import stylesAuthentication from "../../css/Authentication/Authentication.module.css";
import VectorUpLoad from "../../assets/images/icons/VectorUpload.svg"
import {validateFile, validFileTypes} from '../utils';
import BasicAlert from "../General/BasicAlert";
import {CONSTANTS, STRINGS} from "../../config/config";
/**
 * FormInputFile Component
 *
 * This component represents a file input field for forms. It allows users to upload files
 * and displays the selected file name or provides options to upload a file.
 *
 * Props:
 * - file: The selected file object.
 * - setFileUrl: A function to set the file URL.
 * - title (optional): The title of the file input field.
 */
export function FormInputFile(props) {

    const [errorMsg, setErrorMsg] = useState()
    /**
     * useMemo to display the file name.
     */
    const fileNameToDisplay = useMemo(() => {
            return props.file?.name || ""
        },
        [
            props
        ]
    )
    /**
     * useCallback to remove the selected file.
     */
    const removeFile = useCallback(() => {
            props.setFileUrl(undefined)
        },
        [props]
    )
    /**
     * Function to handle file upload.
     */
    function doUpload() {

        const inputElement = document.createElement("input")

        inputElement.type = "file"
        inputElement.accept = validFileTypes
        inputElement.multiple = false

        inputElement.addEventListener("change", function (ev2) {

            const file = inputElement.files[0];
            const fileSizeInBytes = file.size;
            const maxSizeInBytes = CONSTANTS.FILE_MAX_SIZE;

            if (fileSizeInBytes > maxSizeInBytes) {
                setErrorMsg(STRINGS.GENERAL_MAX_FILE_SIZE_FAIL);
                return;
            }

            if (inputElement.files.length && validateFile(inputElement.files[0].name)) {
                props.setFileUrl({
                    name: inputElement.files[0].name,
                    url: URL.createObjectURL(inputElement.files[0]),
                    file: inputElement.files[0]
                })
            } else {
                setErrorMsg("Tipo de documento inválido ")
            }
        })

        inputElement.click()
    }

    return (
        <div className={`${stylesAuthentication.fileUpload} mx-4`}>
            <div className="grid grid-cols-3">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    <div className={`${stylesAuthentication.Center} text-center px-4`}>
                        {fileNameToDisplay ? (
                            <>
                                <p className="text-lg font-bold">{fileNameToDisplay}</p>
                                <button
                                    className={`${stylesCommunityRegister.return} bg-red-500 text-white rounded-md px-4 py-2 mt-2`}
                                    onClick={() => removeFile()}
                                >
                                    Eliminar
                                </button>
                            </>
                        ) : (
                            <>
                                {errorMsg && (
                                    <BasicAlert errorMsg={errorMsg}/>
                                )}
                                <img
                                    className="mt-6 mx-auto"
                                    src={VectorUpLoad}
                                    alt="flecha abajo"
                                />
                                <p className="text-lg font-bold mt-1">{props.title || 'Adjuntar archivo'}</p>
                                <p className="text-lg">o</p>
                                <button
                                    className={`${stylesCommunityRegister.return} bg-blue-500 text-white rounded-md px-4 py-2 mt-2`}
                                    onClick={() => doUpload()}
                                >
                                    Buscar documento
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    )
}