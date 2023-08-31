/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { formatDateToSpanishForCertificates } from "../../utils";
import { GiAchievement } from 'react-icons/gi';
import React, { useState } from "react";
import { STRINGS } from "../../../config/config";
import CertificationActionMenu from "../../../views/EmployeeProfile/CertificationActionMenu";
import { CertificateService } from "../../../services/certificateServices/CertificateService";

import CertificationForm from "./CertificationForm";
import { Session } from "../../../services/Session";

/**
 * Component for displaying certification cards.
 * @param {Array} certifications - The array of certification data.
 * @param deleteHandler - Delete certificates handler.
 * @param updateProfile - to trigger reload on parent component.
 * @param setSummary - set summary for toast notification.
 * @param setSeverity - set severity for toast notification.
 * @param setToastMsg - set message for toast notification.
 * @param setVisibleToast - set visibility for toast notification.
 * @returns {JSX.Element} The CertificationCard component.
 *
 * Props:
 * - certification: Employee active certifications.
 */
const CertificationCard = ({ certifications = [], deleteHandler = null, updateProfile = null, setSummary = null, setSeverity = null, setToastMsg = null, setVisibleToast = null }) => {


    const [file, setFileUrl] = useState("")
    const [errors, setErrors] = useState({})
    const [dialogVisible, setDialogVisible] = useState(false)
    const [alertError, setAlertError] = useState()
    const [form, setForm] = useState({})
    const [certificate, setCertificate] = useState(null)
    const [loading, setLoading] = useState(false)

    const previewHandler = async (certificate) => {
        const { data } = await new CertificateService().getCertificateFile(certificate.id)
        if (data) {
            const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            window.open(url)
        } else {
            setSeverity('warn');
            setSummary('Certificación');
            setToastMsg('No se ha encontrado el archivo.')
            setVisibleToast(true)
        }
    }


    const downloadHandler = async (certificate) => {
        const { data } = await new CertificateService().getCertificateFile(certificate.id)
        if (data) {
            const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            const link = document.createElement('a')
            link.href = url;
            link.download = new Date().valueOf() + '.pdf'
            document.body.appendChild(link)
            link.click();
            link.parentNode?.removeChild(link)
        } else {
            setSeverity('warn');
            setSummary('Certificación');
            setToastMsg('No se ha encontrado el archivo.')
            setVisibleToast(true)
        }

    }

    const editCertificateHandler = async (certificate) => {
        setCertificate(certificate)
        setErrors({});
        setAlertError(false);
        setDialogVisible(true)

    }

    const handleSubmit = async () => {
        try {
            setAlertError(false);
            setErrors({})
            setLoading(true);

            // Perform validation
            const newErrors = {};

            // Validation for 'academicInstitution' field
            if ((!form.academicInstitution || form.academicInstitution.trim() === '')) {
                newErrors.academicInstitution = 'Por favor, ingresa una institución académica válida.';
            }

            // Validation for 'title' field
            if (!form.title || form.title.trim() === '') {
                newErrors.title = 'Por favor, ingresa un título válido.';
            }

            // Validation for 'dates' field
            if ((!form.dateEarned || form.dateEarned.trim() === '')) {
                newErrors.dateEarned = 'Por favor, ingresa una fecha válida.';
            }

            // Check if there are validation errors
            if (Object.keys(newErrors).length > 0) {
                setLoading(false);
                setErrors(newErrors);
                return;
            }

            if (file) {
                const fileData = await new CertificateService().addCertificateFile(certificate.id, file);
            }

            const data = await new CertificateService().editCertificate(form, certificate.id)

            Session.removeEmployeeProfile();
            updateProfile();
            setSeverity('success');
            setSummary('Certificación');
            setToastMsg('Se ha editado exitosamente.')

        } catch (error) {
            setAlertError(true)

        } finally {
            setLoading(false)
            setDialogVisible(false)
            setVisibleToast(true)
        }
    }


    return (
        <section className="w-full grid py-2">
            {certifications && certifications.length > 0 ? (
                certifications.map((certification, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-1 shadow-md rounded-lg overflow-hidden my-2"
                    >
                        <div className="col-span-1 flex items-center justify-center bg-[#092c4c]">
                            <GiAchievement size={70} className="text-white" />
                        </div>
                        <div className="col-span-2 flex flex-col justify-center py-4 px-2">
                            <div className="w-full flex flex-row justify-between">
                                <h2 className="font-bold my-auto text-[15px] truncate w-3/4">{certification.title ?? STRINGS.DEFAULT_ON_EMPTY}</h2>
                                <CertificationActionMenu item={certification} removeHandler={deleteHandler} previewHandler={previewHandler} downloadHandler={downloadHandler} editHandler={editCertificateHandler} />
                            </div>

                            <p className="text-sm line-clamp-3 mt-1">{certification.academicInstitution ?? STRINGS.DEFAULT_ON_EMPTY}</p>
                            <p className="font-semibold text-sm mt-2">Fecha de otorgación:</p>
                            <p className="text-[11px]">
                                {formatDateToSpanishForCertificates(certification.dateEarned ?? STRINGS.DEFAULT_ON_EMPTY)}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay certificaciones disponibles.</p>
            )}
            {
                dialogVisible &&
                <CertificationForm initialValues={certificate}
                    form={form}
                    setForm={setForm}
                    setDialogVisible={setDialogVisible}
                    dialogVisible={dialogVisible}
                    file={file} setFileUrl={setFileUrl} onSubmitHandler={handleSubmit} alertError={alertError} loading={loading} errors={errors} />
            }
        </section>
    );
}

export default CertificationCard