/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import BannerWithProfileImage from "../../components/BannerWithProfileImage";
import ProfileContainer from "../../components/containers/ProfileContainer";
import TitleHeader from "../../components/Profile/TitleHeader";
import {FaCalendar, FaClipboard, FaEnvelope, FaGraduationCap, FaPhone, FaUser} from "react-icons/fa";
import {CardTitle} from "../../components/Card";
import ProfileCardV2 from "../../components/Profile/ProfileCards/ProfileCardV2";
import {Link, useParams} from "react-router-dom";
import {CONSTANTS, PORTAL_ROUTES, STRINGS} from "../../config/config";
import {TabPanel, TabView} from "primereact/tabview";
import CompleteAndBadge from "../../components/Profile/ProfileCards/CompleteAndBadge";
import SmallSpinner from "../../components/General/SmallSpinner";
import CertificationCard from "../../components/Profile/ProfileCards/CertificationCard";
import React, {useEffect, useRef, useState} from "react";
import useCompleteBadge from "../../hooks/Employees/useCompleteBadge";
import useEmployeesDetail from "../../hooks/Employees/useEmployeeDetail";
import {convertToEducationItemsDAO, convertToExperienceItemsDAO} from "../../components/utils";
import {PulseLoader} from "react-spinners";
import {Toast} from "primereact/toast";
import {EducationService} from "../../services/educationServices/EducationService";
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import {Session} from "../../services/Session";
import {useSelector} from "react-redux";

const EmployeeProfileGuest = () => {

    const { id } = useParams()

    const providerProfile = Session.getProviderProfile();
    const { typeOfUser } = useSelector(state => state.user)

    const [updateProfile, setUpdateProfile] = useState(0)
    const [context, setContext] = useState('')
    const [educationItems, setEducationItems] = useState([])
    const [experienceItems, setExperienceItems] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeIndex2, setActiveIndex2] = useState(0)
    const { completeCourses, badges } = useCompleteBadge();
    const [allowFunctionality, setAllowFunctionality] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMes, setToastMsg] = useState('')
    const [summary, setSummary] = useState('Mensaje')
    const [visibleToast, setVisibleToast] = useState(false)
    const [generalLoading, setGeneralLoading] = useState(false)

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
        workExperiences,
        phoneNumberExtension,
        bannerImage,
        logoImage,
        loading
    } = useEmployeesDetail(parseInt(id))

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
     * This useEffect hook updates the experience items when the workExperiences data changes.
     * It calls the `convertToExperienceItemsDAO` function to convert the workExperiences data
     * into the desired format for the experience items.
     *
     * Dependencies:
     * - workExperiences: The data for work experience items.
     */
    useEffect(() => {
        setExperienceItems(convertToExperienceItemsDAO(workExperiences))
    }, [workExperiences])
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
     * Handles the preview of an education degree file by its ID.
     * @param {string} id - The ID of the education degree.
     */
    const previewHandler = async (id) => {
        try {
            setGeneralLoading(true)

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
            setGeneralLoading(false)
        }
    }

    return(
        <main className="w-full max-w-6xl mx-auto p-3">
            {
                loading ?
                    <div className="flex flex-col h-login-screen w-full items-center justify-center">
                        <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
                    </div>
                    :
                    <>
                        <BannerWithProfileImage
                            profilePhoto={logoImage}
                            context={'employee'}
                            bannerImage={bannerImage}
                            logoImage={logoImage}
                            doRetryProvider={setUpdateProfile}
                            providerId={providerProfile.id}
                            isGuest={true}
                            isProviderGuest={true}/>
                        <ProfileContainer>
                            <TitleHeader
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
                                />
                                <ProfileCardV2
                                    items={educationItems}
                                    usePaginateButtons={false}
                                    previewHandler={previewHandler}
                                    deleteLoading={generalLoading}
                                    useGeneral={true}
                                    usePreview={true} />
                            </>
                            <>
                                <CardTitle icon={<FaClipboard size={28} />} title={`Experiencia Laboral (${experienceItems.length})`} buttonTitle={allowFunctionality ? 'Manejar' : false} />
                                <ProfileCardV2
                                    items={experienceItems}
                                    badgeColor="bg-cyan-500"
                                    usePaginateButtons={false}
                                />
                            </>
                            <>
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="font-semibold text-xl text-cyan-900">Cursos</h3>
                                    {
                                        typeOfUser.includes("EMPLOYEE") &&
                                        <Link
                                            to={PORTAL_ROUTES.LMS_ROUTE}
                                            className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold"
                                        >
                                            Ir a Cursos
                                        </Link>
                                    }
                                </div>
                                <TabView
                                    activeIndex={activeIndex}
                                    onTabChange={(e) => setActiveIndex(e.index)}
                                >
                                    {/* TODO esto debe conectar con LMS... esperando por la implementacion. Remover constantes del codigo... lcn */}
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
                                                    <SmallSpinner loading={false} />
                                                </span>
                                            </>
                                        }
                                    >
                                        <CertificationCard
                                            setSummary={setSummary}
                                            setSeverity={setSeverity}
                                            setToastMsg={setToastMsg}
                                            setVisibleToast={setVisibleToast}
                                            certifications={certification}
                                            loading={true}
                                        />
                                    </TabPanel>
                                </TabView>
                            </>
                        </ProfileContainer>
                        <Toast ref={toastRef} onHide={() => { toastRef.current.clear(); setVisibleToast(false) }} />
                    </>
            }
        </main>
    );
}
export default ProtectedComponent(EmployeeProfileGuest)