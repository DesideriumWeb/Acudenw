/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "video-react/dist/video-react.css";
import Gallery from "./views/Gallery";
import Resources from "./views/Resources/Resources";
import { Outlet, Route, Routes, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { clearData, setData } from "./stateManagement/slices/userSlice";
import ForgotPassword from "./views/Authentication/ForgotPassword"
import PasswordRecovery from "./views/Authentication/PasswordRecovery"
import React, { useEffect, useMemo } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import RegisterSuccess from "./views/RegisterSuccess";
import Calendar from "./views/Calendar/Calendar";
import News from "./views/News/News";
import NewsDetail from "./views/News/NewsDetail";
import HelpCenter from "./views/HelpCenter";
import Settings from "./views/Settings";
import UserBlocked from "./views/UserBlocked";
import Library from "./views/Library/Library";
import ProviderDirectory from "./views/ProviderDirectory/ProviderDirectory";
import LMS from "./views/LMS";
import PersonalProfile from "./views/PersonalProfile";
import Profile from "./views/Profile";
import Error from "./views/Error";
import Landing from "./views/Landing";
import PortalLayout from "./components/Layout/PortalLayout";
import { useDispatch } from "react-redux";
import {HTTP, PORTAL_ROUTES} from "./config/config";
import UserService from "./services/userServices/UserService";
import { Session } from "./services/Session";
import { AuthToken } from "./services/AuthToken";
import { SelectRegisterType } from "./views/Authentication/SelectRegisterType";
import ProviderRegister from "./views/Authentication/ProviderRegister";
import Dashboard from "./views/Dashboard";
import PrivateRoute from "./components/Security/PrivateRoute";
import ProviderProfile from "./views/Provider/ProviderProfile";
import EmployeeProfile from "./views/EmployeeProfile";
import Contact from "./views/Portal/Contact";
import { AboutUs } from "./views/Portal/AboutUs";
import ProviderProfileGuest from "./views/Provider/ProviderProfileGuest";
import EmployeeInvitedRegister from "./views/Authentication/EmployeeInvitedRegister";
import DashboardEmployee from "./views/Dashboard/DashboardEmployee";
import StartRequest from './views/Accesa/StartRequest';
import FormEmployeeRequest from './views/Accesa/FormEmployeeRequest'
import PrivacyPolicy from "./views/UseTerms/PrivacyPolicy";
import UseTerms from "./views/UseTerms/UseTerms";
import FormSupplierRequest from  "./views/Accesa/FormSupplierRequest";
import DocumentRequired from './views/Accesa/DocumentRequired';
import FormAcademicData from './views/Accesa/FormAcademicData';
import Benefits from './views/Accesa/Benefits';
import TermsConditions from './views/Accesa/TermsConditions';
import SuccessfullRequest from './views/Accesa/SuccessfullRequest';
import LandingEmployee from './views/Accesa/LandingEmployee';
import DetailtsRequest from './views/Accesa/DetailtsRequest';
import MyRequests from './views/Accesa/MyRequests';
import LandingCentersFuture from './views/CentersFuture/LandingCentersFuture';
import FormGeneralInformationCenter from './views/CentersFuture/FormGeneralInformationCenter';
import BasicInformationFutureCenters from './views/CentersFuture/BasicInformationFutureCenters';
import ForgotStep01 from "./views/ForgotPassword/ForgotStep01";
import ForgotStep2 from "./views/ForgotPassword/ForgotStep2";
import SuccessfullRequestCentersFuture from './views/CentersFuture/SuccessfullRequestCentersFuture';
import MyRequestCentersFuture from './views/CentersFuture/MyRequestCentersFuture';
import DetailtsRequestCentersFuture from './views/CentersFuture/DetailtsRequestCentersFuture';

import EmployeeProfileGuest from "./views/EmployeeProfile/EmployeeProfileGuest";
import WorkFlowHistory from "./views/CentersFuture/RequestWorkFlow/WorkFlowHistory";
import ThematicTable from "./views/CentersFuture/ThematicTables/ThematicTable";
import ScoreResults from "./views/CentersFuture/ThematicScore/ScoreResults";
import DetailtsRequestCDF from './views/CentersFuture/DetailtsRequestCDF';
/**
 * The main application component.
 */
function App() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const completeOTPProces = async (tokenValue) => {

      const { data } = await UserService.logInOTP(`?token=${tokenValue}`)

      if (data?.httpCode === HTTP.OK) navigate(PORTAL_ROUTES.LOGIN_ROUTE)

      if (data?.httpCode === HTTP.NOT_FOUND)
      {
        navigate(PORTAL_ROUTES.CONTACT_ROUTE)
      }
    }

    if (location.search.includes("?ts") && location.search.includes("token")) {
      navigate(`/PasswordRecovery${location.search}`)
    }

    if (!location.search.includes("?ts") && location.search.includes("?token")) {
      const tokenValue = new URLSearchParams(location.search).get("token")
      completeOTPProces(tokenValue)
    }

    if (location.search.includes("?stamp") && location.search.includes("tid") && location.search.includes('token')
    ) {
      navigate(`/EmployeeInvitedRegister${location.search}`)
    }
  }, [navigate])

  useEffect(() => {

    Session.checkSession();

    if (!!AuthToken.get()) {
      dispatch(setData({
        email: AuthToken.getUserEmail(),
        typeOfUser: AuthToken.getUserRole(),
        isLoggedIn: !!AuthToken.get()
      }))
    } else {
      dispatch(clearData({}))
    }
  }, [])

  const routing = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/success", element: <RegisterSuccess /> },
    { path: "/forgotPassword", element: <ForgotStep01 /> },
    { path: "/forgotPassword/confirmation", element: <ForgotStep2 /> },
    { path: "/passwordRecovery", element: <PasswordRecovery /> },
    { path: "/select-register", element: <SelectRegisterType /> },
    { path: "/provider-register", element: <ProviderRegister /> },
    { path: "/EmployeeInvitedRegister", element: <EmployeeInvitedRegister /> },

    {
      path: "/",
      element: <Portal />,
      children: [
        { path: "", element: <Landing /> },
        {
          children: [
            { path: "/privacy-policy", element: <PrivacyPolicy /> },
            { path: "/use-terms", element: <UseTerms /> },
            { path: "/contact-us", element: <Contact /> },
            { path: "/about-us", element: <AboutUs /> },
            { path: "/help-center", element: <HelpCenter /> },
            { path: "/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute> },
            { path: "/landing-accesa", element: <PrivateRoute><LandingEmployee/></PrivateRoute> },
            { path: "/start-request", element: <PrivateRoute><StartRequest/></PrivateRoute> },
            { path: "/form-employee-request", element: <PrivateRoute><FormEmployeeRequest/></PrivateRoute> },
            { path: '/form-supplier-request',element:<PrivateRoute> <FormSupplierRequest /></PrivateRoute> },
            { path: '/academy-data',element:<PrivateRoute> <FormAcademicData /></PrivateRoute> },
            { path: '/document-required',element:<PrivateRoute> <DocumentRequired /></PrivateRoute> },
            { path: '/benefits',element:<PrivateRoute> <Benefits /></PrivateRoute> },
            { path: '/terms-conditions',element:<PrivateRoute> <TermsConditions /></PrivateRoute> },
            { path: '/successfull-request',element:<PrivateRoute> <SuccessfullRequest /></PrivateRoute> },
            { path: '/detailts-request/:id',element:<PrivateRoute> <DetailtsRequest /></PrivateRoute> },
            { path: '/my-request',element:<PrivateRoute> <MyRequests/></PrivateRoute> },
            { path: "/landing-center-future", element: <PrivateRoute><LandingCentersFuture/></PrivateRoute> },
            { path: "/form-general-information-center", element: <PrivateRoute><FormGeneralInformationCenter/></PrivateRoute> },  
            { path: "/form-basic-information-centers-future", element: <PrivateRoute><BasicInformationFutureCenters/></PrivateRoute> },
            { path: "/request-sent-centers-future", element: <PrivateRoute><SuccessfullRequestCentersFuture/></PrivateRoute> }, 
            { path: "/my-request-centers-future", element: <PrivateRoute><MyRequestCentersFuture/></PrivateRoute> }, 
            { path: "/details-request-centers-future/:id", element: <PrivateRoute><DetailtsRequestCDF/></PrivateRoute> },     
            { path: "/cdf/history", element: <PrivateRoute><WorkFlowHistory/></PrivateRoute> },
            { path: "/cdf/questionnaire", element: <PrivateRoute><ThematicTable/></PrivateRoute> },
            { path: "/cdf/results", element: <PrivateRoute><ScoreResults/></PrivateRoute> },
            { path: "/resources", element: <PrivateRoute><Resources /></PrivateRoute> },
            { path: "/calendar", element: <PrivateRoute><Calendar /></PrivateRoute> },
            { path: "/news", element: <PrivateRoute><News /></PrivateRoute> },
            { path: "/news-details/:id", element: <PrivateRoute><NewsDetail /></PrivateRoute> },
            { path: "/help", element: <PrivateRoute><HelpCenter /></PrivateRoute> },
            { path: "/settings", element: <PrivateRoute><Settings /></PrivateRoute> },
            { path: "/user-blocked", element: <PrivateRoute><UserBlocked /></PrivateRoute> },
            { path: "/library", element: <PrivateRoute><Library /></PrivateRoute> },
            { path: "/provider-directory", element: <PrivateRoute><ProviderDirectory /></PrivateRoute> },
            { path: "/lms", element: <PrivateRoute><LMS /></PrivateRoute> },
            { path: "/personal-profile", element: <PrivateRoute><PersonalProfile /></PrivateRoute> },
            { path: "/service-profile/:id", element: <PrivateRoute><ProviderProfile /></PrivateRoute> },
            { path: "/service-profile/guest", element: <PrivateRoute><ProviderProfileGuest /></PrivateRoute> },
            { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
            { path: "/employee-profile/:id", element: <PrivateRoute><EmployeeProfile /></PrivateRoute> },
            { path: "/provider-employee/:id", element: <PrivateRoute><EmployeeProfileGuest /></PrivateRoute> },
            { path: "/gallery", element: <PrivateRoute><Gallery /></PrivateRoute> },
            { path: "/404", element: <PrivateRoute><Error /></PrivateRoute> },        
          ]
        },
      ]
    },
  ]);

  return (
    <div className="w-full bg-white">
      {routing}
    </div>
  );
}
/**
 * The Portal component that wraps the portal layout.
 */
const Portal = () => {
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
export default App;