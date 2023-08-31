/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useGallery from "../../hooks/Gallery/useGallery";
import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { AcceptanceButton } from "../Buttons";
import GalleryService from "../../services/galleryService/GalleryService";
import { Dialog } from "primereact/dialog";
import { FormInputFile } from "../Form/FormInputFile";
import SmallSpinner from "../General/SmallSpinner";
import { CONFIG, STRINGS } from "../../config/config";
import SimplePaginator from "../General/SimplePaginator";
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { RiDeleteBin6Line } from 'react-icons/ri';
/**
 * Provider/Employee image gallery component.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Gallery(props) {

    const [retryGallery, setRetryGallery] = useState(0);
    const { images, hasGallery, galleryId, galleryLoading } = useGallery(props.id, retryGallery)

    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [file, setFileUrl] = useState()
    const [fetchedImages, setFetchedImages] = useState([])
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [imagesLoading, setImagesLoading] = useState(false)
    //Pagination controllers
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = CONFIG.IMAGE_GALLERY_IMAGES_PER_PAGE;
    const totalPages = Math.ceil(fetchedImages.length / imagesPerPage);
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = fetchedImages.slice(indexOfFirstImage, indexOfLastImage);

    const [selectedImageId, setSelectedImageId] = useState(null);
    /**
     * Toast ref req. used to display toast notification
     */
    const toastRef = useRef(null);

    const showToastSuccess = (message) => {
        toastRef.current.show({ severity: 'success', summary: 'Galeria', detail: message })
    }

    const showToastError = (message) => {
        toastRef.current.show({ severity: 'error', summary: 'Galeria', detail: message })
    }

    /**
     * Change Simple Paginator page.
     *
     * @param pageNumber
     */
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    /**
     * Reset fetched images.
     */
    const resetFetchedImages = () => {
        setFetchedImages([]);
    };
    /**
     * Creates a new gallery.
     */
    const createGallery = async () => {
        const result = await new GalleryService().addGallery()
        setRetryGallery((prevState) => prevState + 1)
    }
    /**
     * Uploads an image to the gallery.
     */
    const uploadImageToGallery = useCallback(async () => {
        setLoading(true)
        setErrorMsg('')
        try {
            const data = await new GalleryService().uploadImageToGallery(galleryId, file)
            setRetryGallery((prev) => prev + 1)
            setFileUrl()
            setVisible(false)
        } catch (error) {
            setErrorMsg(STRINGS.GENERIC_ERROR)
        } finally {
            setLoading(false)
        }
    }, [galleryId, file])

    const footer = (
        <div className="flex justify-center items-center">
            <AcceptanceButton title={'Subir Imagen'} onClickHandler={uploadImageToGallery} />
            <SmallSpinner loading={loading} />
        </div>
    )
    /**
     * Fetch Images from gallery.
     */
    useEffect(() => {
        try {
            setImagesLoading(true)
            const fetchImages = async (images, galleryId) => {
                images.forEach(async (value) => {
                    try {
                        const data = await new GalleryService().getImage(galleryId, value.id)

                        setFetchedImages((prevState) => [...prevState, {
                            url: URL.createObjectURL(data),
                            id: value.id,
                        }])
                    } catch (error) {
                        console.log(`Get gallery Image ${value.id} error: ${error}`)
                    }
                })
                resetFetchedImages();
            }

            if (images.length > 0) {
                fetchImages(images, galleryId)
            }

            return () => {
                setFetchedImages([])
            }
        } catch (error) {
            console.log(`Fetch gallery images error: ${error}`)
        } finally {
            setImagesLoading(false)
        }

    }, [images, galleryId])
    /**
     * Handles the deletion of an image from the gallery.
     */
    const handleDeleteImage = async (imageId) => {
        try {
            setImagesLoading(true)
            const result = await new GalleryService().deleteGalleryImage(galleryId, selectedImage.id);
            setRetryGallery((prev) => prev + 1)
            result && setDeleteVisible(false);

        } catch (error) {
            showToastError('No se pudo remover la imagen. Favor intentar nuevamente.')
            setErrorMsg('No se pudo remover la imagen. Favor intentar nuevamente.')
        } finally {
            setImagesLoading(false)
            showToastSuccess('Se logró remover la imagen exitosamente.')
            setDeleteVisible(false)
        }
    }
    /**
     * Show Full image on Dialog.
     *
     * @param image
     */
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setDialogVisible(true);
    };

    const onDeleteClick = (image) => {
        setSelectedImage(image)
        setDeleteVisible(true)
    }


    return (
        <section className="flex flex-col p-3 bg-white shadow-small gap-3 rounded-lg mb-10 mt-6">
            <div className="flex flex-row justify-between items-center">
                <Dialog onShow={() => setErrorMsg('')} style={{ width: '50vw' }} visible={visible} onHide={() => setVisible(false)} footer={footer}>
                    <FormInputFile file={file} setFileUrl={setFileUrl} />
                    {typeof errorMsg === 'string' && errorMsg && (
                        <div className="bg-red-500 text-white p-3 rounded text-center mt-3" role="alert">
                            {errorMsg}
                        </div>
                    )}
                </Dialog>

                <ConfirmDialog
                    header={
                        <div className="flex items-center justify-center">
                            <h2 className="text-center text-md">Confirmación Para Remover</h2>
                        </div>
                    }
                    message={STRINGS.GENERAL_REMOVE_IMG_MSG}
                    visible={deleteVisible}
                    onHide={() => setDeleteVisible(false)}
                    footer={
                        <>
                            <Button label="Cancelar" className="bg-acuBaseBlue"
                                 onClick={() => setDeleteVisible(false)}
                            />
                            <Button label="Eliminar" className="p-button-danger" onClick={handleDeleteImage} />
                        </>
                    }
                >
                    <div className="flex flex-row items-center justify-center">
                        <RiDeleteBin6Line size={40} color="red" />
                        <div className="ml-4">'Esta seguro que desea remove la imagen?'</div>
                    </div>
                </ConfirmDialog>
                <h1 className="text-cyan-900 font-semibold text-lg items-center">Galería ({images.length ?? 0})<SmallSpinner loading={galleryLoading} /></h1>
                {
                    !props.isGuest
                        ?
                        (
                            <button
                                onClick={() => (hasGallery ? setVisible(true) : createGallery())}
                                className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900 hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                            >
                                {hasGallery ? 'Añadir' : 'Crear Galeria'}
                            </button>
                        )

                        : null

                }
            </div>
            {hasGallery ? (
                <div className="container mx-auto px-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                        {currentImages.map((image, index) => (
                            <div key={index} className="max-w-xs relative">
                                <img
                                    src={image.url}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg shadow-lg border-[#092c4c] border-[4px] cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <a href={image.url} download={`GalleryImage-${index + 1}.jpg`}>
                                        <AiOutlineDownload
                                            size={25}
                                            className="text-white bg-blue-500 rounded-full p-1 cursor-pointer shadow-lg"
                                        />
                                    </a>
                                    {
                                        !props.isGuest &&
                                        <AiOutlineDelete
                                            size={25}
                                            className="text-white bg-red-500 rounded-full p-1 cursor-pointer shadow-lg"
                                            // onClick={() => handleDeleteImage(image.id)}
                                            onClick={() => onDeleteClick(image)}
                                        />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <Toast ref={toastRef} />
                    <Dialog
                        header={<h1>Vista Completa</h1>}
                        style={{ width: '50vw' }}
                        visible={dialogVisible}
                        onHide={() => setDialogVisible(false)}>
                        {selectedImage && (
                            <img src={selectedImage.url} alt="Selected Image" className="w-full rounded-lg shadow-lg" />
                        )}
                    </Dialog>
                    <div className="w-full flex justify-center items-center mt-8">
                        <div className="flex flex-col items-center">
                            <SimplePaginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                            <div className="mt-2 flex justify-center ml-2">
                                <SmallSpinner loading={imagesLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h1>No hay imágenes en la Galeria.</h1>
                </>
            )}
        </section>
    )
}
