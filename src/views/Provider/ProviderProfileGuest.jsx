/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from 'react'
import BannerWithProfileImage from "../../components/BannerWithProfileImage";
import ProviderProfileContainer from "../../components/containers/ProviderProfileContainer";
import ProviderTitleHeader from "../../components/Profile/ProviderTitleHeader";
import {TabPanel, TabView} from "primereact";
import {CardTitle} from "../../components/Card";
import ListWithImageDisplay from "../../components/List/ListWithImageDisplay";
import Gallery from "../../components/Gallery";
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import {useLocation} from "react-router-dom";
import useProviderImages from "../../hooks/Provider/useProviderImages";
import {DotLoader} from "react-spinners";
import {CONSTANTS, STRINGS} from "../../config/config";

const profilePhoto =
    "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

function ProviderProfileGuest() {

    const location = useLocation();
    const provider = location.state && location.state.provider;
    const [tabIndex, setTabIndex] = useState(0)
    const [retryProvider, doRetryProvider] = useState(0)
    const [allowFunctionality, setAllowFunctionality] = useState(false)

    const {bannerImage, logoImage, isLoading, inError, errorMsg} = useProviderImages(provider.id)

    return (
        <main className="w-full max-w-6xl mx-auto p-3">
            {
                isLoading
                ?
                    (
                        <div className="flex flex-col h-login-screen w-full items-center justify-center">
                            <DotLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_SPINNER_SIZE} className={"m-5 p-5"} />
                        </div>
                    )
                    :
                    (
                        <>
                            <BannerWithProfileImage
                                isGuest={true}
                                id={provider.id}
                                profilePhoto={profilePhoto}
                                context={'provider'}
                                logoImage={logoImage}
                                bannerImage={bannerImage} />
                            <ProviderProfileContainer>
                                <ProviderTitleHeader id={provider.id} allowFunctionality={allowFunctionality} name={provider.name} categories={provider.categories}
                                                     overallRanking={provider.overallRanking}
                                                     phoneNumber1={provider.phoneNumber1} phoneNumber2={provider.phoneNumber2} email={provider.email}
                                                     websiteUrl={provider.websiteUrl}
                                                     addressLine1={provider.addressLine1}
                                                     addressLine2={provider.addressLine2}
                                                     country={provider.country}
                                                     zipcode={provider.zipcode}
                                                     townId={provider.townId}
                                                     providerCategory={provider.serviceCategories}
                                />
                                <>
                                    <TabView activeIndex={tabIndex}
                                             onTabChange={(e) => setTabIndex(e.index)}
                                    >
                                        <TabPanel header={'Servicios'}>
                                            <div className={'py-3 flex flex-col gap-2 text-sm'}>
                                <span className={'my-0 py-0'}>
                                    {provider.serviceDescription || STRINGS.DEFAULT_ON_EMPTY}
                                </span>
                                            </div>
                                        </TabPanel>
                                        <TabPanel header={'Sobre Nosotros'}>
                                            <div className={'py-3 flex flex-col gap-2 text-sm'}>
                                <span className={'my-0 py-0'}>
                                    {provider.aboutUs || STRINGS.DEFAULT_ON_EMPTY}
                                </span>
                                            </div>
                                        </TabPanel>
                                    </TabView>
                                </>
                                <>
                                    <CardTitle title={`Empleados (${provider.employees.length})`}/>
                                    <ListWithImageDisplay items={provider.employees}/>
                                </>
                                <Gallery id={provider.id} isGuest={true}/>
                            </ProviderProfileContainer>
                        </>
                    )
            }
        </main>
    )
}

export default ProtectedComponent(ProviderProfileGuest)
