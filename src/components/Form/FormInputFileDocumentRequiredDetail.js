/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useCallback, useMemo, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import {
  validateFileDocuments,
  validFileTypesDocumentsRequired,
} from '../utils';
import BasicAlert from '../General/BasicAlert';
import {
  DocumentCheckIcon,
  MinusCircleIcon,
} from '@heroicons/react/20/solid';
import stylesAuthentication from '../../css/Authentication/Authentication.module.css';
import stylesCommunityRegister from '../../css/Authentication/CommunityRegister.module.css';
import VectorUpLoad from '../../assets/images/icons/VectorUpload.svg';
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
export function FormInputFileDocumentRequiredDetail(props) {
  const [errorMsg, setErrorMsg] = useState();
  const [documentExit, setDocumentExit] = useState(false);
  const [file, setFileUrl] = useState(null);
  const fileTypes = ['PDF', 'DOC', 'DOCX'];

  const fileNameToDisplay = useMemo(() => {
    return props.documentsArray.length > 0
      ? props.documentsArray[0].name
      : '';
  }, [props]);
  /**
   * useCallback to remove the selected file.
   */
  const removeFile = useCallback(
    (idDelete) => {
      setDocumentExit(false);
      props.setPositionDelete(idDelete);
      setFileUrl(null);
    },
    [props]
  );
  /**
   * Function to handle file upload.
   */
  function doUpload() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = validFileTypesDocumentsRequired;
    inputElement.multiple = false;
 
    inputElement.addEventListener('change', function (ev2) {
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
        setErrorMsg('Tipo de documento inválido');
      }
    });
    inputElement.click();
  }

  const handleChange = (file) => {
    if (file) {
      setFileUrl({
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
        posicion: props.posicion,
      });
      props.setDocumentsArray([
        ...props.documentsArray,
        {
          name: file.name,
          url: URL.createObjectURL(file),
          file: file,
          posicion: props.posicion,
        },
      ]);
      setDocumentExit(true);
    } else {
      setDocumentExit(false);
      setErrorMsg('Tipo de documento inválido');
    }
  };

  return (
    <>
      <div
        className={`${stylesAuthentication.fileUpload} mx-4 my-3 rounded-md`}>
        <div className='grid grid-cols-3'>
          <div className='col-span-1'></div>
          <div className='col-span-10'>
            <div
              className={`${stylesAuthentication.Center} text-center px-4`}>
              {fileNameToDisplay ? (
                <>
                  <p className='text-lg font-bold truncate'>{fileNameToDisplay}</p>
                  <button
                    className={`${stylesCommunityRegister.return} bg-red-500 text-white rounded-md px-4 py-2 mt-2`}
                    onClick={() => removeFile(props.posicion)}>
                    Eliminar
                  </button>
                </>
              ) : (
                <>
                  {errorMsg && <BasicAlert errorMsg={errorMsg} />}
                  <FileUploader
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}>
                    <div className='w-full flex flex-col justify-center '>
                      <img
                        className='mt-6 mx-auto '
                        src={VectorUpLoad}
                        alt='flecha abajo'
                      />
                      <p className='text-lg font-bold '>
                        Adjuntar archivo
                      </p>
                    </div>
                  </FileUploader>

                  <button
                    className={`${stylesCommunityRegister.return} bg-blue-500 text-white rounded-md px-4 py-2 mt-2`}
                    onClick={() => doUpload()}>
                    Buscar documento
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className={`${
            documentExit ? '' : 'hidden'
          } flex flex-row w-full p-4 my-3 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 justify-between items-center`}>
          <div>
            <DocumentCheckIcon className='w-9  text-[#002F56] text-center' />
          </div>
          <div className='truncate'>
            <p className='text-xs font-semibold'>{file?.name || ''}</p>
          </div>
          <div>
            <MinusCircleIcon
              className='w-9  text-[#DB224E] text-center'
              onClick={() => removeFile(props.posicion)}
            />
          </div>
        </div>
        <div className={`${!documentExit ? '' : 'hidden'}`}>
          {errorMsg && <BasicAlert errorMsg={errorMsg} />}
        </div>
      </div>
    </>
  );
}
