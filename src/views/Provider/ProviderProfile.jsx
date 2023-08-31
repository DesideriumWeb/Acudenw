/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useMemo, useState} from 'react'
import BannerWithProfileImage from "../../components/BannerWithProfileImage";
import ProviderProfileContainer from "../../components/containers/ProviderProfileContainer";
import ProviderTitleHeader from "../../components/Profile/ProviderTitleHeader";
import { TabPanel, TabView } from "primereact";
import { CardTitle } from "../../components/Card";
import ListWithImageDisplay from "../../components/List/ListWithImageDisplay";
import useProvider from "../../hooks/Provider/useProvider";
import { AiFillEdit } from "react-icons/ai";
import Gallery from "../../components/Gallery";
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import ProviderService from "../../services/userServices/ProviderService";
import { useSelector } from "react-redux";
import { ProviderServiceAndAboutForm } from '../../components/Profile/ProviderServiceAndAboutForm';
import { CONSTANTS, STRINGS } from "../../config/config";
import { PulseLoader } from "react-spinners";
import ProviderInvitations from "../../components/Invitations/ProviderInvitations";
import { useDispatch } from "react-redux";

const profilePhoto =
    "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

/**
 * Show all provider data and info.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function ProviderProfile() {

    const dispatch = useDispatch()
    const [manageEmployeeModalVisible, setManageEmployeeModalVisible] = useState(false)
    const { email } = useSelector((state) => state.user)
    const [tabIndex, setTabIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [updateAboutUs, setAboutUs] = useState('')
    const [updateServiceDescription, setServiceDescription] = useState('')
    const [retryProvider, doRetryProvider] = useState(0)
    const [loading, setLoading] = useState(false)
    const {
        id,
        overallRanking,
        categories,
        name,
        ownerFullName,
        email: providerEmail,
        aboutUs,
        addressLine1,
        addressLine2,
        agencyRanking,
        country,
        employeeQuantity,
        employees,
        foundedDate,
        gallery,
        images,
        lmsRanking,
        phoneNumber1,
        phoneNumber2,
        providerCategoryList,
        serviceCategories,
        serviceDescription,
        townId,
        urlLicence,
        websiteUrl,
        zipcode,
        logoImage,
        bannerImage,
        profileLoading,
        isCenterClosed,
        isTemporarilyClosed,
        schedule
    } = useProvider(retryProvider)

    const [formError, setFormError] = useState('')
    /**
     * Handles the click event when updating the service description or about us description.
     * @param {number} tabIndex - The index of the active tab (0 for service description, 1 for about us description).
     * @param {string} id - The ID of the provider.
     */
    const onClickHandler = async (tabIndex, id) => {

        setLoading(true)
        setFormError('')

        try {
            if (tabIndex === 0) {

                if (!updateServiceDescription || updateServiceDescription === '') {
                    setFormError(STRINGS.PROVIDER_SERVICE_DESCRIPTION_ERROR)
                } else {

                    const { data } = await new ProviderService().updateProviderServiceDescription(id, updateServiceDescription)

                    if (!data) {
                        setFormError(STRINGS.PROVIDER_GENERIC_DESCRIPTION_FAIL);
                        return;
                    }

                    data && setVisible(false)
                    doRetryProvider((prevState) => prevState + 1)
                }
            } else if (tabIndex === 1) {

                if (!updateAboutUs || updateAboutUs === '') {
                    setFormError(STRINGS.PROVIDER_ABOUT_US_DESCRIPTION_ERROR)
                } else {

                    const { data } = await new ProviderService().updateProviderAboutUsDescription(id, updateAboutUs)

                    if (!data) {
                        setFormError(STRINGS.PROVIDER_GENERIC_DESCRIPTION_FAIL);
                        return;
                    }

                    data && setVisible(false)
                    doRetryProvider((prevState) => prevState + 1)
                }
            }
        } catch (error) {
            console.log(`Update provider Service or Contact error: ${error}`)
            setFormError(STRINGS.GENERIC_ERROR);
        } finally {
            setLoading(false)
        }
    }
    /**
     * Determines whether the provider functionality is allowed.
     * @returns {boolean} - True if the provider functionality is allowed, false otherwise.
     */
    const allowFunctionality = useMemo(() => {
        // return email === providerEmail
        return true
    }, [email, providerEmail])
    /**
     * Shows the form for updating the service description or about us description.
     */
    const showForm = () => {
        setFormError({})
        setVisible(true)
    }
    /**
     * Manages the visibility of the "Manage Employee" modal.
     * Sets the visibility of the modal to true.
     * @return void
     */
    const manageInvitationModal = () => {
        setManageEmployeeModalVisible(true)
    }

    return (
        <main className="w-full max-w-6xl mx-auto p-3">
            {
                profileLoading ?
                    (
                        <div className="flex flex-col h-login-screen w-full items-center justify-center">
                            <PulseLoader
                                color={CONSTANTS.LOADING_SPINNER_COLOR}
                                size={CONSTANTS.DEFAULT_PULSAR_SIZE}
                                className="m-5 p-5"
                            />
                        </div>
                    )
                    :
                    (
                        <>
                            {visible &&
                                <ProviderServiceAndAboutForm
                                    id={id}
                                    loading={loading}
                                    tabIndex={tabIndex}
                                    visible={visible}
                                    setVisible={setVisible}
                                    aboutUs={aboutUs}
                                    doRetryProvider={doRetryProvider}
                                    updateServiceDescription={updateServiceDescription}
                                    setServiceDescription={setServiceDescription}
                                    services={serviceDescription}
                                    updateAboutUs={updateAboutUs}
                                    setAboutUs={setAboutUs}
                                    handleSubmit={onClickHandler}
                                    submitError={formError} />}

                            <BannerWithProfileImage
                                dispatch={dispatch}
                                id={id}
                                profilePhoto={profilePhoto}
                                context={'provider'}
                                logoImage={logoImage}
                                bannerImage={bannerImage}
                                doRetryProvider={doRetryProvider}
                            />

                            <ProviderProfileContainer>
                                <ProviderTitleHeader id={id} allowFunctionality={allowFunctionality} name={name} categories={categories}
                                    overallRanking={overallRanking}
                                    phoneNumber1={phoneNumber1}
                                    phoneNumber2={phoneNumber2}
                                    email={providerEmail}
                                    websiteUrl={websiteUrl}
                                    addressLine1={addressLine1}
                                    addressLine2={addressLine2}
                                    country={country}
                                    zipcode={zipcode}
                                    townId={townId}
                                    providerCategory={categories}
                                    doRetryProvider={doRetryProvider}
                                    isCenterClosed={isCenterClosed}
                                    isTemporarilyClosed={isTemporarilyClosed}
                                    schedule={schedule}
                                />
                                <>
                                    <TabView activeIndex={tabIndex}
                                        onTabChange={(e) => setTabIndex(e.index)}
                                    >
                                        <TabPanel header={'Servicios'}>
                                            {allowFunctionality &&
                                                <div className={'flex justify-end hover:cursor-pointer'} onClick={() => {
                                                    showForm()
                                                }}><AiFillEdit size={20} /></div>}
                                            <div className={'py-3 flex flex-col gap-2 text-sm'}>
                                                <span className={'my-0 py-0 text-justify whitespace-normal break-words'}>
                                                    {serviceDescription || STRINGS.DEFAULT_ON_EMPTY}
                                                </span>
                                            </div>
                                        </TabPanel>
                                        <TabPanel header={'Sobre nosotros'}>
                                            {allowFunctionality &&
                                                <div className={'flex justify-end hover:cursor-pointer'} onClick={() => {
                                                    showForm()
                                                }}><AiFillEdit size={20} /></div>}
                                            <div className={'py-3 flex flex-col gap-2 text-sm'}>
                                                <span className={'my-0 py-0 text-justify whitespace-normal break-words'}>
                                                    {aboutUs || STRINGS.DEFAULT_ON_EMPTY}
                                                </span>
                                            </div>
                                        </TabPanel>
                                    </TabView>
                                </>
                                <>
                                    <CardTitle title={`Mis empleados (${employees.length})`} buttonTitle={'Manejar'}
                                        onClickHandler={manageInvitationModal} />
                                    <ListWithImageDisplay items={employees} />
                                </>
                                <Gallery id={id} isGuest={false} />
                            </ProviderProfileContainer>
                            <ProviderInvitations manageEmployeeModalVisible={manageEmployeeModalVisible} setManageEmployeeModalVisible={setManageEmployeeModalVisible} />
                        </>
                    )
            }
        </main>
    )
}

export default ProtectedComponent(ProviderProfile)
