/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useState} from 'react';
import ProtectedComponent from "../../components/HighOrderComponents/ProtectedComponent";
import DashboardGrid from "../../components/containers/DashboardGrid";
import Joyride, {STATUS} from 'react-joyride';
import GreetingsSection from "../../components/GreetingsSection";
import {CardBodyWithImage, CardTitle} from "../../components/Card";
import ListWithImageToNavigate from "../../components/List/ListWithImageToNavigate";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";
import {useNavigate} from "react-router-dom";
import useNews from "../../hooks/News/useNews";
import EmployeeService from "../../services/userServices/EmployeeService";
import LibraryItem from "../Library/LibraryItem";
import useLibrary from "../../hooks/Library/useLibrary";
import SmallSpinner from "../../components/General/SmallSpinner";
import {PulseLoader} from "react-spinners";
import {CONSTANTS, EMPLOYEE_TUTORIAL_STEPS, PORTAL_ROUTES, STRINGS} from "../../config/config";
import AcudenAcademyCard from "../../components/Dashboards/AcudenAcademyCard";
import useCourses from "../../hooks/LMS/useCourses";
import useLMSLogin from "../../hooks/LMS/useLMSLogin";
import {Session} from "../../services/Session";
function DashboardEmployee(props) {

    const navigate = useNavigate()
    const {courses, setCourses, spinnerLoading:coursesLoading, inError, errorMsg} = useCourses()

    const {
        id,
        birthDate,
        certification,
        educationDegrees,
        email,
        firstname,
        lastname,
        fullname,
        gender,
        occupation,
        phoneNumberExtension
    } = useEmployeeProfile()

    const {news, isLoading} = useNews(0, 3)

    const {recommendedItems, spinnerLoading} = useLibrary()

    const [logoImage, setLogoImage] = useState(undefined)

    const [runTutorial, setRunTutorial] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const resultImage = await new EmployeeService().getEmployeeProfilePicture()
                setLogoImage(resultImage)
            } catch (error) {
                //Use empty string & use default user icon
                setLogoImage('');
            }
        }
        fetchImage()
    }, [])
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

    const LMSUrlHandler = () => {
        window.open(Session.getLMSResponseSession().url || STRINGS.DEFAULT_ON_EMPTY, '_blank');
    }

    return (
        <main className="w-full max-w-6xl mx-auto p-3 my-4">
            {
                isLoading ?
                    (
                        <div className="flex flex-col h-login-screen w-full items-center justify-center">
                            <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
                        </div>
                    )
                    :
                    (
                        <>
                            <Joyride
                                steps={EMPLOYEE_TUTORIAL_STEPS}
                                run={runTutorial}
                                continuous={true}
                                disableScrolling={true}
                                showProgress={true}
                                showSkipButton={true}
                                callback={handleTutorialFinish}
                                styles={{
                                    options: {
                                        primaryColor: '#FFFFF',
                                        backgroundColor: '#092C4C',
                                        arrowColor: '#092C4C',
                                        textColor: '#FFFFFF',
                                    },
                                    buttonClose: {
                                        display: 'none'
                                    }
                                }}
                            />
                            <div className="mt-4 acu-emp-step-1" onClick={() => handleStartTutorial()}>
                                <GreetingsSection title={`Hola, ${fullname}`} iconTitle={'Tutorial'} className="acu-emp-step-5"/>
                            </div>
                            <div className="my-8">
                                <DashboardGrid>
                                    <>
                                        <CardTitle title={'Mi perfil'}/>
                                        <CardBodyWithImage title={fullname}
                                                           image={logoImage}
                                                           subTitle={occupation}
                                                           score={false}
                                                           buttonTitle={"Visitar perfil"}
                                                           onClickHandler={() => navigate(`${PORTAL_ROUTES.EMPLOYEE_PROFILE_ROUTE}${id}`)}/>
                                    </>
                                    <>
                                        <CardTitle title={`Noticias recientes(${news ? news.length : 0})`} buttonTitle={'Ir a noticias'}
                                                   onClickHandler={() => navigate(PORTAL_ROUTES.NEWS_ROUTE)}/>
                                        {/*<ListWithImageToNavigate items={news} icon={<IoNewspaperOutline size={50} color="#092C4C" />}/>*/}
                                        <ListWithImageToNavigate items={news}/>
                                    </>
                                    <>
                                        <CardTitle title={`ACUDEN Academy (${courses.length})`} buttonTitle={'Ir a cursos'} className="acu-emp-step-4"
                                                   onClickHandler={() => LMSUrlHandler()}
                                        />
                                        {/*TODO esto debe completarse cuando este listo el LSM - 06-13-2023 | LCN*/}
                                        {
                                            coursesLoading
                                                ?
                                                (
                                                    <div className="flex justify-center items-center md:items-start">
                                                        <SmallSpinner loading={coursesLoading} />
                                                    </div>
                                                )
                                                : <AcudenAcademyCard items={courses}/>
                                        }
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
                                                        <SmallSpinner loading={spinnerLoading} />
                                                    </div>
                                                )
                                                : (<LibraryItem items={recommendedItems}/>)
                                        }
                                    </>
                                </DashboardGrid>
                            </div>
                        </>
                    )
            }
        </main>

    )
}

export default ProtectedComponent(DashboardEmployee)
