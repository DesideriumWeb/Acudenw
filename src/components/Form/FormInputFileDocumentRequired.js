/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useCallback, useMemo, useState } from "react";
import {
  validateFileDocuments,
  validFileTypesDocumentsRequired,
} from "../utils";
import BasicAlert from "../General/BasicAlert";
import { DocumentCheckIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
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
export function FormInputFileDocumentRequired(props) {
  const [errorMsg, setErrorMsg] = useState();
  const [documentExit, setDocumentExit] = useState(false);
  const [file, setFileUrl] = useState(null);

 
  /**
   * useCallback to remove the selected file.
   */
  const removeFile = useCallback((idDelete) => {
    setDocumentExit(false);
    props.setPositionDelete(idDelete);
    setFileUrl(null);
  }, [props]);
  /**
   * Function to handle file upload.
   */
  function doUpload() {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = validFileTypesDocumentsRequired;
    inputElement.multiple = false;

    inputElement.addEventListener("change", function (ev2) {
      if (
        inputElement.files.length &&
        validateFileDocuments(inputElement.files[0].name)
      ) {
        setFileUrl({
          name: inputElement.files[0].name,
          url: URL.createObjectURL(inputElement.files[0]),
          file: inputElement.files[0],
          posicion: props.posicion,
        });
        props.setDocumentsArray([
          ...props.documentsArray,
          {
            name: inputElement.files[0].name,
            url: URL.createObjectURL(inputElement.files[0]),
            file: inputElement.files[0],
            posicion: props.posicion,
          },
        ]);
        setDocumentExit(true);
      } else {
        setDocumentExit(false);
        setErrorMsg("Tipo de documento inválido");
      }
    });
    inputElement.click();
  }

  return (
    <div>
      <div
        className="text-xs mb-1 text-[#002F56] cursor-pointer ml-3"
        onClick={() => doUpload()}
      >
        {documentExit ? "Reeplazar documento" : "Buscar archivo"}
      </div>
      <div
        className={`${
          documentExit ? "" : "hidden"
        } flex flex-row max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 justify-between items-center`}
      >
        <div>
          <DocumentCheckIcon className="w-9  text-[#002F56] text-center" />
        </div>
        <div className="truncate">
          <p className="text-xs font-semibold">{file?.name || ""}</p>
        </div>
        <div>
          <MinusCircleIcon
            className="w-9  text-[#DB224E] text-center"
            onClick={() => removeFile(props.posicion)}
          />
        </div>
      </div>
      <div className={`${!documentExit ? "" : "hidden"}`}>
        {errorMsg && <BasicAlert errorMsg={errorMsg} />}
      </div>
    </div>
  );
}
