/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import { ApplicationStoragePath } from "../../services/ApiRest";
import { AiOutlineWarning } from "react-icons/ai";
import { CONSTANTS, STRINGS } from "../../config/config";
/**
 * Renders a document viewer component that displays different types of documents and images.
 * If the resource is not available or the file path is missing, it displays a warning message.
 * If the document is an image, it renders the image. Otherwise, it renders an object tag for other document types.
 *
 * @param {Object} resource - The resource object containing information about the document.
 * @param {string} resource.filePath - The file path of the document.
 * @param {string} resource.title - The title of the document.
 * @param {string} resource.extension - The extension of the document.
 * @param {string} resource.mimeType - The Mime type of the document.
 * @returns {JSX.Element} - The rendered document viewer component.
 */
const AcudenDocViewer = ({ resource }) => {
    /**
     * Extracts the file extension from a given file name.
     *
     * @param {string} fileName - The name of the file.
     * @returns {string} - The file extension.
     */
    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    };
    /**
     * Validate resource from library menu.
     * @return string - error message and warning.
     */
    if (!resource || !resource.filePath) {
        return (
            <div className="flex justify-center items-center h-[400px]">
                <div className="flex flex-col items-center">
                    <AiOutlineWarning className="text-yellow-500 text-4xl mb-4" />
                    <p className="text-center">{STRINGS.ACUDEN_DOCUMENTS_VIEWER_ERROR}</p>
                </div>
            </div>
        );
    }

    const documentExtension = resource.extension ?? getFileExtension(resource.filePath);

    const isImage = CONSTANTS.AVAILABLE_DOCUMENT_VIEWER_IMG_FORMATS.includes(documentExtension);

    return (
        <div className="flex justify-center h-auto">
            {isImage ? (
                <img
                    src={`${resource.filePath}`}
                    alt={resource.title}
                    className="max-w-full max-h-full"
                />
            ) : (
                <object
                    data={`${resource.filePath}`}
                    type={resource.mimeType}
                    width="100%"
                    height="700px"
                >
                    <p className="text-center">
                        {STRINGS.ACUDEN_DOCUMENTS_VIEWER_ONCLICK}
                        <b>
                            <a target="_blank" href={`${resource.filePath}`}>aquí</a>
                        </b>
                        .
                    </p>
                </object>
            )}
        </div>
    );
};

export default AcudenDocViewer;
