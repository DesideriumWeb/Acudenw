/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useState} from 'react'
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import useNews from "../../hooks/News/useNews";
import useEmployees from "../../hooks/Employees/useEmployees";
import useProvider from "../../hooks/Provider/useProvider";
import {useNavigate} from "react-router-dom";
import {PulseLoader} from "react-spinners";
import GreetingsSection from "../../components/GreetingsSection";
import DashboardGrid from "../../components/containers/DashboardGrid";
import {CardBodyWithImage, CardTitle} from "../../components/Card";
import ListWithImageToNavigate from "../../components/List/ListWithImageToNavigate";
import ListWithImageDisplay from "../../components/List/ListWithImageDisplay";
import ProviderService from "../../services/userServices/ProviderService";
import {
    CONSTANTS,
    PORTAL_ROUTES,
    PROVIDERS_TUTORIAL_STEPS
} from "../../config/config";
import SmallSpinner from "../../components/General/SmallSpinner";
import LibraryItem from "../Library/LibraryItem";
import useLibrary from "../../hooks/Library/useLibrary";
import Joyride, {STATUS} from "react-joyride";
import ProviderInvitations from "../../components/Invitations/ProviderInvitations";

function DashboardProvider(props) {

    const navigate = useNavigate()
    const {news, isLoading:newsLoading} = useNews(0, 3)
    const [employees, retry, loading] = useEmployees()
    const {id, name, ownerFullName, categories, overallRanking} = useProvider()
    const [logoImage, setLogoImage] = useState(undefined)
    const [retrySearch, setRetrySearch] = useState(0)

    const [manageEmployeeModalVisible, setManageEmployeeModalVisible] = useState(false)
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const [runTutorial, setRunTutorial] = useState(false);

    const {recommendedItems, spinnerLoading: recommendedSpinner} = useLibrary()

    useEffect(() => {
        const fetchLogoImage = async (id) => {
            try {
                const data = await new ProviderService().getLogoImage(id);
                setLogoImage(URL.createObjectURL(data));
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log('Logo not found', error);
                    // Aquí puedes establecer una imagen predeterminada u otra lógica de manejo de errores.
                } else {
                    // Propagar el error si es cualquier otra cosa.
                    console.log(error);
                }
            }
        }

        if (id) {
            fetchLogoImage(id);
        }
    }, [id]);

    const removeEmployee = async (id) => {
        try{
            const data = await new ProviderService().removeEmployee(id)
            setRetrySearch((prevState) => prevState + 1)
            data && retry((prevState) => prevState + 1)
        }catch (error){
            console.log(`Remove employee error: ${error}`)

        }
    }

    if (
        id?.length < 1 || newsLoading || loading
    ) {
        return (
            <div className="flex flex-col h-login-screen w-full items-center justify-center">
                <PulseLoader
                    color={CONSTANTS.LOADING_SPINNER_COLOR}
                    size={CONSTANTS.DEFAULT_PULSAR_SIZE}
                    className="m-5 p-5"
                />
            </div>
        )
    }
    /**
     * Handles the completion of the tutorial.
     * This method is called when the tutorial is finished or skipped.
     *
     * @param {object} data - The tutorial completion data.
     * @param {string} data.status - The status of the tutorial (e.g., "FINISHED", "SKIPPED").
     * @param {string} data.type - The type of the tutorial.
     */
    const handleTutorialFinish = (data) => {

        const { status, type } = data;

        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRunTutorial(false);
        }
    };
    /**
     * Tutorial start controller.
     */
    const handleStartTutorial = () => {
        setRunTutorial(true);
    };

    return (
        <main className="w-full max-w-6xl mx-auto p-3 my-4">
            <ProviderInvitations setManageEmployeeModalVisible={setManageEmployeeModalVisible} manageEmployeeModalVisible={manageEmployeeModalVisible}/>
            <Joyride
                steps={PROVIDERS_TUTORIAL_STEPS}
                run={runTutorial}
                continuous={true}
                disableScrolling={true}
                showProgress={true}
                showSkipButton={true}
                callback={handleTutorialFinish}
                styles={{
                    options: {
                        primaryColor: '#092C4C',
                        backgroundColor: '#092C4C',
                        arrowColor: '#092C4C',
                        textColor: '#FFFFFF',
                        overlayColor: 'rgba(240, 240, 240, 0.4)',
                    },
                    buttonClose: {
                        display: 'none'
                    },
    
                }}
                
            />
            <div className="mt-4 acu-pro-step-1" onClick={handleStartTutorial}>
                <GreetingsSection title={`Hola, ${ownerFullName}`} iconTitle={'Tutorial'} className="acu-pro-step-6"/>
            </div>
            <div className="my-8">
                <DashboardGrid>
                    <>
                        <CardTitle title={'Mi perfil'}/>
                        <CardBodyWithImage title={name}
                                           image={logoImage}
                                           subTitle={categories[0]?.description}
                                           score={overallRanking}
                                           buttonTitle={"Visitar perfil"}
                                           onClickHandler={() => navigate(`${PORTAL_ROUTES.PROVIDER_PROFILE_ROUTE}${id}`)}/>
                    </>
                    <>
                        <CardTitle title={`Noticias recientes(${news ? news.length : 0})`} buttonTitle={'Ir a noticias'}
                                   onClickHandler={() => navigate(PORTAL_ROUTES.NEWS_ROUTE)}/>
                        <ListWithImageToNavigate items={news}/>
                    </>
                    <>
                        <CardTitle
                            useSpinner={true}
                            loading={loading}
                            title={`Mis empleados (${employees?.length})`}
                            buttonTitle={'Manejar'}
                            onClickHandler={() => setManageEmployeeModalVisible(true)}
                        />
                        <ListWithImageDisplay items={employees} firstAction={removeEmployee}/>
                    </>
                    <>
                        <CardTitle title={`Recursos recomendados (${recommendedItems.length})`}
                                   buttonTitle={'Ir a biblioteca'} onClickHandler={() => {
                            navigate(PORTAL_ROUTES.LIBRARY_ROUTE)
                        }}
                        />
                        {
                            spinnerLoading
                                ?
                                (
                                    <div className="flex justify-center items-center md:items-start">
                                        <SmallSpinner loading={recommendedSpinner} />
                                    </div>
                                )
                                : (<LibraryItem items={recommendedItems}/>)
                        }
                    </>
                </DashboardGrid>
            </div>
        </main>

    )

}

export default ProtectedComponent(DashboardProvider)
