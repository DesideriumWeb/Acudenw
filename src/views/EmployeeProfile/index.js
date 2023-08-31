/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import BannerWithProfileImage from "../../components/BannerWithProfileImage";
import ProfileContainer from "../../components/containers/ProfileContainer";
import {
    FaGraduationCap,
    FaClipboard,
    FaEnvelope,
    FaUser,
    FaPhone,
    FaCalendar
} from "react-icons/fa";
import { CardTitle } from "../../components/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../components/Profile/TitleHeader";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";
import EmployeeService from "../../services/userServices/EmployeeService";
import FormInput from "../../components/Form/FormInput";
import { Dialog } from "primereact/dialog";
import { AcceptanceButton } from "../../components/Buttons";
import { EducationService } from "../../services/educationServices/EducationService";
import SmallSpinner from "../../components/General/SmallSpinner";
import BasicAlert from "../../components/General/BasicAlert";
import {ALERT_TYPES, CONFIG, CONSTANTS, HTTP, PORTAL_ROUTES, STRINGS} from "../../config/config";
import { TabPanel, TabView } from "primereact/tabview";
import {
    addTimeToDate,
    convertToEducationItemsDAO,
    convertToExperienceItemsDAO,
    removeElementById
} from "../../components/utils";
import useWorkExperience from "../../hooks/Employees/useWorkExperience";
import ProfileCardV2 from "../../components/Profile/ProfileCards/ProfileCardV2";
import CertificationCard from "../../components/Profile/ProfileCards/CertificationCard";
import { FormInputFile } from "../../components/Form/FormInputFile";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { WorkExperienceService } from "../../services/workExperienceServices/WorkExperienceService";
import { CertificateService } from "../../services/certificateServices/CertificateService";
import CompleteAndBadge from "../../components/Profile/ProfileCards/CompleteAndBadge";
import useCompleteBadge from "../../hooks/Employees/useCompleteBadge";
import { Session } from '../../services/Session';
import {PulseLoader} from "react-spinners";
import {useDispatch} from "react-redux";

const profilePhoto =
    "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
/*
 * EmployeeProfile Component
 *
 * This component displays the profile of an employee, including their personal information,
 * education, work experience, courses, and certifications. It allows the user to add education
 * degrees and work experience, as well as manage courses and certifications.
 *
 * Props:
 * - None
 */
function EmployeeProfile() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeIndex2, setActiveIndex2] = useState(0)
    const [file, setFileUrl] = useState()
    const [updateProfile, setUpdateProfile] = useState(0)
    const [updateWorkExperience, setUpdateWorkExperience] = useState(0)

    const {
        description,
        birthDate,
        certification,
        educationDegrees,
        email,
        firstname,
        lastname,
        fullname,
        gender,
        occupation,
        phoneNumberExtension,
        setAddEducation,
        setAddWorkExperience,
        setAddCertificate,
        setCertification,
        bannerImage,
        logoImage,
        loading:profileLoading
    } = useEmployeeProfile(updateProfile)

    const { workExperienceItems, isLoading } = useWorkExperience(0, CONFIG.WORK_EXP_EDUCATION_MAX_PER_PAGE, updateWorkExperience)
    const { completeCourses, badges } = useCompleteBadge();

    const [context, setContext] = useState('')
    const [educationItems, setEducationItems] = useState([])
    const [experienceItems, setExperienceItems] = useState([])
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [addCertificationVisible, setAddCertificationVisible] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({});
    const [alertError, setAlertError] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMes, setToastMsg] = useState('')
    const [summary, setSummary] = useState('Mensaje')
    const [visibleToast, setVisibleToast] = useState(false)
    const [deleteEducationLoading, setDeleteEducationLoading] = useState(false)
    const [deleteWorkExperienceLoading, setDeleteWorkExperienceLoading] = useState(false)
    const [deleteCertificateLoading, setDeleteCertificateLoading] = useState(false)
    const [editingCertification, setEditingCertification] = useState(false)

    /**
     * Toast ref req.
     */
    const toastRef = useRef(null);
    /*
     * useEffect for Education Items
     *
     * This useEffect hook updates the education items when the educationDegrees data changes.
     * It calls the `convertToEducationItemsDAO` function to convert the educationDegrees data
     * into the desired format for the education items.
     *
     * Dependencies:
     * - educationDegrees: The data for education degrees.
     */
    useEffect(() => {
        setEducationItems(convertToEducationItemsDAO(educationDegrees))
    }, [educationDegrees])
    /*
     * useEffect for Experience Items
     *
     * This useEffect hook updates the experience items when the workExperienceItems data changes.
     * It calls the `convertToExperienceItemsDAO` function to convert the workExperienceItems data
     * into the desired format for the experience items.
     *
     * Dependencies:
     * - workExperienceItems: The data for work experience items.
     */
    useEffect(() => {
        setExperienceItems(convertToExperienceItemsDAO(workExperienceItems))
    }, [workExperienceItems])
    /**
     * Submits the form data and performs validation before saving changes.
     * @param {object} form - The form data to be submitted.
     */
    const submitForm = async (form) => {
        try {

            setAlertError(false);
            setLoading(true);

            // Perform validation
            const newErrors = {};

            // Validation for 'academicInstitution' field
            if ((context === 'certificate' || context === 'education') && (!form.academicInstitution || form.academicInstitution.trim() === '')) {
                newErrors.academicInstitution = 'Por favor, ingresa una institución académica válida.';
            }

            // Validation for 'degree' field (only in the context of education)
            if (context === 'education' && (!form.degree || form.degree.trim() === '')) {
                newErrors.degree = 'Por favor, ingresa un grado válido.';
            }

            // Validation for 'title' field
            if (!form.title || form.title.trim() === '') {
                newErrors.title = 'Por favor, ingresa un título válido.';
            }

            // Validation for 'dates' field
            if ((context === 'certificate' || context === 'education') && (!form.dateEarned || form.dateEarned.trim() === '')) {
                newErrors.dateEarned = 'Por favor, ingresa una fecha válida.';
            }

            if (context === 'labor' && (!form.dateFrom || form.dateFrom.trim() === '')) {
                newErrors.dateFrom = 'Por favor, ingresa una fecha válida.';
            }

            if (context === 'labor' && (!form.dateTo || form.dateTo.trim() === '')) {
                newErrors.dateTo = 'Por favor, ingresa una fecha válida.';
            }

            // Validate Company Name
            if (context === 'labor' && (!form.companyName || form.companyName.trim() === '')) {
                newErrors.companyName = 'Por favor, ingresa una compañía válida.';
            }

            // Validate description currentlyWorking
            if (context === 'labor' && (!form.description || form.description.trim() === '')) {
                newErrors.description = 'Por favor, ingresa la descripción de tu puesto de empleo.';
            }

            // Validate currentlyWorking
            if (context === 'labor' && (!form.currentlyWorking)) {
                form['currentlyWorking'] = false
            }

            // Validation for file input - != labor
            if (context !== 'labor') {
                if (!file) {

                    newErrors.file = 'Por favor selecciona un archivo.';

                } else if (!file.name.endsWith('.pdf')) {

                    newErrors.file = 'Por favor selecciona un archivo PDF.';

                }
            }

            // Check if there are validation errors
            if (Object.keys(newErrors).length > 0) {
                setLoading(false);
                setErrors(newErrors);
                return;
            }

            let data = {};

            if (context === 'education') {

                data = await new EducationService().addEducationDegree(form, file.file);

            } else if (context === 'labor') {

                data = await new WorkExperienceService().addWorkExperience(form);

            } else if (context === 'certificate') {

                data = await new CertificateService().addCertificate(form, file.file);

            }

            if (data.processStatus === HTTP.CREATED) {

                setSeverity('success')

                setSummary(
                    context === 'education'
                        ? 'Título Educativo'
                        : context === 'labor'
                            ? 'Experiencia de Trabajo'
                            : 'Certificación'
                )

                setToastMsg('Se ha creado exitosamente.')
                setVisibleToast(true)

                context === 'education' && setUpdateProfileHandler()
                context === 'labor' && setUpdateWorkExperienceHandler()
                context === 'certificate' && setUpdateProfileHandler()

            } else {

                setSeverity('warn')
                setSummary(context === 'education' ? 'Título Educativo' : 'Experiencia de Trabajo')
                setToastMsg('No ha podido ser registrado.')
                setVisibleToast(true)
            }

            setForm({});
            setErrors({});
            setFileUrl(undefined);
            setAlertError(false);
            setVisible(false);
            setAddCertificationVisible(false)

        } catch (error) {

            console.log(`Error in request: ${error}`);
            setLoading(false);
            setAlertError(true);

        } finally {
            setLoading(false);
        }
    };
    /**
     * Handles the deletion of an education degree record.
     *
     * @param {number} educationDegreeId - The ID of the education degree to be deleted.
     */
    const deleteEducationDegreeHandler = async (educationDegreeId) => {
        try {

            setSummary('Eliminar Grado Educativo')
            setDeleteEducationLoading(true)

            const { status } = await EducationService.deleteEducationDegree(educationDegreeId);

            if (status === HTTP.DELETED) {
                setSeverity(ALERT_TYPES.SEVERITY_SUCCESS)
                setToastMsg(STRINGS.EDUCATION_DEGREE_DELETE_OK)
                setEducationItems(removeElementById(educationItems, educationDegreeId))
            } else {
                setSeverity(ALERT_TYPES.SEVERITY_WARNING)
                setToastMsg(STRINGS.EDUCATION_DEGREE_DELETE_CONFLICT)
            }

        } catch (error) {

            console.log(`Delete education degree error: ${error}`);
            setSeverity(ALERT_TYPES.SEVERITY_ERROR)
            setToastMsg(STRINGS.GENERIC_ERROR)

        } finally {
            setVisibleToast(true)
            setDeleteEducationLoading(false)
        }
    }
    /**
     * Handles the deletion of a work experience record.
     *
     * @param {number} workExperienceId - The ID of the work experience to be deleted.
     */
    const deleteWorkExperienceHandler = async (workExperienceId) => {
        try {

            setSummary('Eliminar Experiencia de Trabajo')
            setDeleteWorkExperienceLoading(true)

            const { status } = await WorkExperienceService.deleteWorkExperience(workExperienceId);

            if (status === HTTP.DELETED) {
                setSeverity(ALERT_TYPES.SEVERITY_SUCCESS)
                setToastMsg(STRINGS.WORK_EXPERIENCE_DELETE_OK)
                setExperienceItems(removeElementById(experienceItems, workExperienceId))
            } else {
                setSeverity(ALERT_TYPES.SEVERITY_WARNING)
                setToastMsg(STRINGS.WORK_EXPERIENCE_CONFLICT)
            }

        } catch (error) {

            console.log(`Delete education degree error: ${error}`);
            setSeverity(ALERT_TYPES.SEVERITY_ERROR)
            setToastMsg(STRINGS.GENERIC_ERROR)

        } finally {
            setVisibleToast(true)
            setDeleteWorkExperienceLoading(false)
        }
    }
    /**
     * Handles the deletion of a certificate record.
     *
     * @param {number} certificateId - The ID of the certificate to be deleted.
     */
    const deleteCertificateHandler = async (certificateId) => {
        try {

            setSummary('Eliminar Certificación')
            setDeleteCertificateLoading(true)

            const { status } = await CertificateService.deleteCertificate(certificateId);

            if (status === HTTP.DELETED) {
                setSeverity(ALERT_TYPES.SEVERITY_SUCCESS)
                setToastMsg(STRINGS.CERTIFICATE_DELETE_OK)
                setCertification(removeElementById(certification, certificateId))
                Session.removeEmployeeProfile();
            } else {
                setSeverity(ALERT_TYPES.SEVERITY_WARNING)
                setToastMsg(STRINGS.CERTIFICATE_CONFLICT)
            }

        } catch (error) {

            console.log(`Delete certification error: ${error}`);
            setSeverity(ALERT_TYPES.SEVERITY_ERROR)
            setToastMsg(STRINGS.GENERIC_ERROR)

        } finally {
            setVisibleToast(true)
            setDeleteCertificateLoading(false)
        }
    }
    /**
     * Renders the footer section of the form with buttons and loading spinner.
     */
    const footer = (
        <div className="flex items-center gap-3">
            <AcceptanceButton title={'Guardar'} onClickHandler={() => submitForm(form)} />
            <SmallSpinner loading={loading} />
            {alertError ? <div className="mt-4 text-sm"><BasicAlert color="red" errorMsg="Lo sentimos, se ha producido un error. Trate nuevamente." /></div> : null}
        </div>
    );
    /**
     * Updates the form state when input values change.
     * @param {object} e - The event object from the input element.
     * @param {function} setValue - The setter function for the value being updated.
     */
    const onChangeHandler = (e, setValue) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'dateFrom' || name === 'dateTo') {
            updatedValue = addTimeToDate(value);
        }

        setForm((prevState) => ({
            ...prevState,
            [name]: updatedValue
        }));
    };
    /**
     * Determines if the functionality should be allowed based on the email and dispatchEmail values.
     */
    const [allowFunctionality, setAllowFunctionality] = useState(true);
    /**
     * Fetches the employee profile banner and logo images when the component mounts.
     */
    // useEffect(() => {
    //     const fetchBanner = async () => {
    //         try {
    //             const resultBanner = await new EmployeeService().getEmployeeProfileBanner();
    //             setBannerImage(resultBanner);
    //         } catch (error) {
    //             setLogoImage('');
    //         }
    //     };
    //
    //     const fetchLogo = async () => {
    //         try {
    //             const resultImage = await new EmployeeService().getEmployeeProfilePicture();
    //             setLogoImage(resultImage);
    //         } catch (error) {
    //             setLogoImage('');
    //         }
    //     };
    //
    //     if (id) {
    //         fetchBanner();
    //         fetchLogo();
    //     }
    // }, [id]);
    /**
     * Resets the dialog state to its initial values.
     */
    const resetDialog = () => {
        setForm({});
        setErrors({});
        setFileUrl(undefined)
        setAlertError(false);
        setLoading(false);
    };
    /**
     * Redirect to LMS page.
     */
    const goToResources = () => {
        navigate(PORTAL_ROUTES.LMS_ROUTE)
    }
    /**
     * useEffect to display the Toast component when `visibleToast` changes.
     */
    useEffect(() => {
        if (visibleToast) {
            toastRef.current.show({
                severity: severity,
                detail: toastMes,
                summary: summary
            });
        }
    }, [visibleToast]);
    /**
     * Update the profile handler.
     *
     * This function is used to update the profile by incrementing the current state value of updateProfile.
     */
    const setUpdateProfileHandler = useCallback(() => {
        setUpdateProfile(prevState => prevState + 1);
    }, [setUpdateProfile]);
    /**
     * Update the work experience handler.
     *
     * This function is used to update the work experience by incrementing the current state value of work experience.
     */
    const setUpdateWorkExperienceHandler = useCallback(() => {
        setUpdateWorkExperience(prevState => prevState + 1);
    }, [setUpdateWorkExperience]);
    /**
     * Handles the preview of an education degree file by its ID.
     * @param {string} id - The ID of the education degree.
     */
    const previewHandler = async (id) => {
        try {
            setDeleteEducationLoading(true)

            const {data} = await EducationService.getEducationDegreeFile(id)

            if(data){
                const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
                window.open(url)
            }
            else {
                setSeverity('warn');
                setSummary('Educación');
                setToastMsg('No se ha encontrado el archivo.')
                setVisibleToast(true)
            }
        } catch (error) {
            console.log(`Get education degree file error: ${error}`)
            setSeverity('warn');
            setSummary('Educación');
            setToastMsg(STRINGS.GENERIC_ERROR)
            setVisibleToast(true)
        }finally {
            setDeleteEducationLoading(false)
        }
    }

    return (
        <main className="w-full max-w-6xl mx-auto p-3">
            {
                profileLoading ?
                    <div className="flex flex-col h-login-screen w-full items-center justify-center">
                        <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
                    </div>
                    :
                    <>
                        <Dialog
                            header={
                                <>
                                    <h2>Añadir {context === 'education' ? 'Educación' : 'Experiencia Laboral'}</h2>
                                </>
                            }
                            visible={visible}
                            style={{ width: '60vw' }}
                            footer={footer}
                            onHide={() => {
                                setAlertError(false);
                                setFileUrl(undefined)
                                setVisible(false);
                            }}
                            onShow={() => resetDialog()}
                        >
                            {context === 'education' ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">
                                        <div>
                                            <FormInput
                                                title={'Institución Académica'}
                                                name={'academicInstitution'}
                                                type={'text'}
                                                setValue={setForm}
                                                onChangeHandler={onChangeHandler}
                                                error={errors.academicInstitution}
                                            />
                                        </div>
                                        <div>
                                            <FormInput
                                                title={'Grado Otorgado'}
                                                name={'degree'}
                                                type={'text'}
                                                setValue={setForm}
                                                onChangeHandler={onChangeHandler}
                                                error={errors.degree}
                                            />
                                        </div>
                                        <div>
                                            <FormInput
                                                title={'Título Otorgado'}
                                                name={'title'}
                                                type={'text'}
                                                setValue={setForm}
                                                onChangeHandler={onChangeHandler}
                                                error={errors.title}
                                            />
                                        </div>
                                        <div>
                                            <FormInput
                                                title={'Fecha de Otorgación'}
                                                type={'date'}
                                                onChangeHandler={onChangeHandler}
                                                setValue={setForm}
                                                name={'dateEarned'}
                                                error={errors.dateEarned}
                                            />
                                        </div>
                                    </div>
                                    <hr className="py-2 my-2" />
                                    <div className="w-full flex justify-center">
                                        <div className="w-full">
                                            <FormInputFile file={file} setFileUrl={setFileUrl} title="Adjuntar Título (*pdf)" />
                                        </div>
                                    </div>
                                    {errors.file && (
                                        <div className="w-full flex-row">
                                            <p className="text-red-500 text-sm mt-2 ml-4">{errors.file}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">
                                        <FormInput
                                            title={'Desde'}
                                            type={'date'}
                                            onChangeHandler={onChangeHandler}
                                            setValue={setForm}
                                            name={'dateFrom'}
                                            error={errors.dateFrom}
                                        />
                                        <FormInput
                                            title={'Hasta'}
                                            type={'date'}
                                            onChangeHandler={onChangeHandler}
                                            setValue={setForm}
                                            name={'dateTo'}
                                            error={errors.dateTo}
                                        />
                                    </div>
                                    <div className="w-full flex flex-row justify-start mt-6">
                                        <Checkbox
                                            className="mx-2"
                                            name="currentlyWorking"
                                            checked={form.currentlyWorking}
                                            onChange={(e) => setForm((prevState) => ({ ...prevState, currentlyWorking: e.checked }))}
                                        />
                                        <p className="font-semibold" style={{ whiteSpace: 'nowrap' }}>
                                            Sigue actualmente en este trabajo?
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">
                                        <FormInput
                                            title={'Nombre de la Compañía'}
                                            type={'text'}
                                            onChangeHandler={onChangeHandler}
                                            setValue={setForm}
                                            name={'companyName'}
                                            error={errors.companyName}
                                            maxLength={100}
                                        />
                                        <FormInput
                                            title={'Puesto'}
                                            type={'text'}
                                            onChangeHandler={onChangeHandler}
                                            setValue={setForm}
                                            name={'title'}
                                            error={errors.title}
                                            maxLength={50}
                                        />
                                    </div>
                                    <div className="w-full mt-4 gap-4">
                                        <label className="text-gray-800 block mb-2">
                                            Descripcion:
                                        </label>
                                        <textarea
                                            rows={5}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                                            maxLength={1000}
                                            name="description"
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        ></textarea>

                                    </div>

                                    {errors.description && (
                                        <div className="w-full flex-row">
                                            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
                                        </div>
                                    )}

                                    {/*TODO - Se comenta (WE - file upload) por si en el futuro cambian los requisitos... 06-10-23 lcn*/}

                                    {/*<hr className="py-2 my-2" />*/}

                                    {/*<div className="w-full flex justify-center">*/}
                                    {/*    <div className="w-full">*/}
                                    {/*        <FormInputFile file={file} setFileUrl={setFileUrl} title="Adjuntar Título (*pdf)" />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*{errors.file && (*/}
                                    {/*    <div className="w-full flex-row">*/}
                                    {/*        <p className="text-red-500 text-sm mt-2 ml-4">{errors.file}</p>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </>
                            )}

                            <hr className="mt-6" />

                        </Dialog>
                        <BannerWithProfileImage
                            dispatch={dispatch}
                            profilePhoto={profilePhoto}
                            context={'employee'}
                            bannerImage={bannerImage}
                            logoImage={logoImage}
                            doRetryProvider={setUpdateProfile}
                        />
                        <ProfileContainer>
                            <TitleHeader
                                setUpdateProfileHandler={setUpdateProfileHandler}
                                allowFunctionality={allowFunctionality}
                                firstName={firstname}
                                lastName={lastname}
                                occupation={occupation}
                                description={description}
                                additionalInformation={
                                    <ul>
                                        {email && (
                                            <li className="flex items-center">
                                                <FaEnvelope size={14} className="acu-blue" />
                                                <span className="ml-1"><b>Email:</b> {email}</span>
                                            </li>
                                        )}

                                        {gender && (
                                            <li className="flex items-center">
                                                <FaUser size={14} className="acu-blue" />
                                                <span className="ml-1"><b>Género:</b> {gender.toLowerCase()}</span>
                                            </li>
                                        )}

                                        {phoneNumberExtension && (
                                            <li className="flex items-center">
                                                <FaPhone size={14} className="acu-blue" />
                                                <span className="ml-1"><b>Extensión:</b> {phoneNumberExtension}</span>
                                            </li>
                                        )}

                                        {birthDate && (
                                            <li className="flex items-center">
                                                <FaCalendar size={14} className="acu-blue" />
                                                <span className="ml-1"><b>Fecha Nacimiento:</b> {new Date(birthDate).toDateString()}</span>
                                            </li>
                                        )}

                                    </ul>
                                }
                            />
                            <>
                                <CardTitle icon={<FaGraduationCap size={28} />}
                                           title={`Educacion (${educationItems.length})`} buttonTitle={allowFunctionality ? 'Manejar' : false}
                                           onClickHandler={() => { setContext('education'); setVisible(true); }}
                                />
                                <ProfileCardV2
                                    items={educationItems}
                                    usePaginateButtons={false}
                                    useDelete={true}
                                    usePreview={true}
                                    previewHandler={previewHandler}
                                    deleteLoading={deleteEducationLoading}
                                    deleteHandler={deleteEducationDegreeHandler} />
                            </>
                            <>
                                <CardTitle icon={<FaClipboard size={28} />} title={`Experiencia Laboral (${experienceItems.length})`} buttonTitle={allowFunctionality ? 'Manejar' : false} onClickHandler={() => { setContext('labor'); setVisible(true); }} />
                                <ProfileCardV2
                                    items={experienceItems}
                                    badgeColor="bg-cyan-500"
                                    usePaginateButtons={false}
                                    useDelete={true}
                                    deleteLoading={deleteWorkExperienceLoading}
                                    deleteHandler={deleteWorkExperienceHandler} />
                            </>
                            <>
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="font-semibold text-xl text-cyan-900">Cursos</h3>
                                    <Link
                                        to={(Session.getLMSResponseSession() && Session.getLMSResponseSession().url) || STRINGS.DEFAULT_ON_EMPTY}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold"
                                    >
                                        Ir a Cursos
                                    </Link>
                                </div>
                                <TabView
                                    activeIndex={activeIndex}
                                    onTabChange={(e) => setActiveIndex(e.index)}
                                >
                                    <TabPanel header={`Cursos (${completeCourses.length})`}>
                                        <CompleteAndBadge items={completeCourses} />
                                    </TabPanel>
                                    <TabPanel header={`Insignias (${badges.length})`}>
                                        <CompleteAndBadge items={badges} isBadge={true} />
                                    </TabPanel>
                                </TabView>
                            </>
                            <>
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="font-semibold text-xl text-cyan-900">Certificaciones</h3>
                                    <button
                                        onClick={() => {
                                            setContext('certificate')
                                            setAddCertificationVisible(true)
                                        }
                                        }
                                        className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold"
                                    >
                                        Manejar
                                    </button>
                                </div>
                                <TabView
                                    activeIndex={activeIndex2}
                                    onTabChange={(e) => setActiveIndex2(e.index)}
                                    className='relative'
                                >
                                    <TabPanel
                                        header={
                                            <>
                                                Certificaciones ({certification.length})
                                                <span className="text-sm ml-2">
                                        <SmallSpinner loading={deleteCertificateLoading} />
                                    </span>
                                            </>
                                        }
                                    >
                                        <CertificationCard certifications={certification}
                                                           deleteHandler={deleteCertificateHandler}
                                                           loading={true}
                                                           updateProfile={setUpdateProfileHandler}
                                                           setSummary={setSummary}
                                                           setSeverity={setSeverity}
                                                           setToastMsg={setToastMsg}
                                                           setVisibleToast={setVisibleToast}
                                        />
                                    </TabPanel>
                                </TabView>
                            </>
                        </ProfileContainer>
                        <Toast ref={toastRef} onHide={() => { toastRef.current.clear(); setVisibleToast(false) }} />
                        <Dialog
                            visible={addCertificationVisible}
                            header={
                                <>
                                    <h2>Añadir Certificación</h2>
                                </>
                            }
                            onHide={() => {
                                setAddCertificationVisible(false)
                            }}
                            onShow={() => resetDialog()}
                            style={{ width: '60vw' }}
                            footer={footer}
                        >

                            <div className="w-full flex flex-row">
                                <FormInput
                                    title={'Título'}
                                    type={'text'}
                                    onChangeHandler={onChangeHandler}
                                    setValue={setForm}
                                    name={'title'}
                                    error={errors.title}
                                    maxLength={50}
                                />
                            </div>
                            <div className="w-full flex flex-row">
                                <FormInput
                                    title={'Institución Académica'}
                                    type={'text'}
                                    onChangeHandler={onChangeHandler}
                                    setValue={setForm}
                                    name={'academicInstitution'}
                                    error={errors.academicInstitution}
                                    maxLength={50}
                                />
                            </div>
                            <div className="w-full flex flex-row">
                                <FormInput
                                    title={'Fecha de Otorgación'}
                                    type={'date'}
                                    onChangeHandler={onChangeHandler}
                                    setValue={setForm}
                                    name={'dateEarned'}
                                    error={errors.dateEarned}
                                    maxLength={50}
                                />
                            </div>
                            <hr className="py-2 my-2" />
                            <div className="w-full flex justify-center">
                                <div className="w-full">
                                    <FormInputFile file={file} setFileUrl={setFileUrl} title="Adjuntar Título (*pdf)" />
                                </div>
                            </div>
                            {errors.file && (
                                <div className="w-full flex-row">
                                    <p className="text-red-500 text-sm mt-2 ml-4">{errors.file}</p>
                                </div>
                            )}
                            <hr className="mt-6" />
                        </Dialog>
                    </>
            }
        </main>

    )
}

export default ProtectedComponent(EmployeeProfile)
