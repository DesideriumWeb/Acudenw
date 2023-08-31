/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import GovHeader from "../Headers/GovHeader";
import { PORTAL_ROUTES, STRINGS } from "../../config/config";
import Logos from "../Headers/Logos";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserDropdownMenu from "../Headers/UserDropDownMenu";
import { Transition } from "@headlessui/react";
import NavBarBasic from "./NavBarBasic";
import NotificationCard from "./NotificationCard";
import useNotifications from "../../hooks/Notifications/useNotifications";
import EmployeeService from "../../services/userServices/EmployeeService";
import ProviderService from "../../services/userServices/ProviderService";
import useProvider from "../../hooks/Provider/useProvider";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";
import {Session} from "../../services/Session";
import {ReactComponent as MobilMenuIcon} from "../../assets/images/icons/bar-solid.svg";
import {ReactComponent as QuestionMarkIcon} from "../../assets/images/icons/circle-question-solid 2.svg"
import {ReactComponent as BellIcon} from "../../assets/images/icons/bell-off-icon.svg"
import {ReactComponent as BellActiveIcon} from "../../assets/images/icons/bell-on-solid.svg"

/**
 * Navbar component.
 * This component represents the navigation bar of the application. It includes various navigation links, user authentication options, notifications, and a dropdown menu for user settings.
 *
 * @returns {JSX.Element} Navbar component.
 */
const Navbar = () => {

  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = React.useState(false);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, typeOfUser, refresh } = useSelector(state => state.user)
  const [retry, setRetry] = useState(0)
  const { notifications, isLoading, newQty, hasNew, setHasNew, setNewQty } = useNotifications(typeOfUser, retry)
  const [profilePic, setProfilePic] = useState(null)
  const { id, logoImage } = useProvider();
  const { logoImage:employeeProfilePic } = useEmployeeProfile();

  React.useEffect(() => {
    if (window && ref.current) {
      window.addEventListener("click", (e) => {
        if (ref.current?.contains(e.target)) {
        } else {
          setShowNotifications(false);
          markNotificationsAsRead();
        }
      });
      return window.removeEventListener("click", () => { });
    }
  }, []);
  /**
   * Marks notifications as read.
   * Sets hasNew to false and newQty to 0.
   * @return void
   */
  const markNotificationsAsRead = () => {
    setHasNew(false)
    setNewQty(0)
  }
  /**
   * Loads profile images based on the user type.
   * Fetches and sets the profile picture based on the user's type (provider or employee).
   * If the image is already available in the state and refresh is less than 0, it sets the profile picture from the state.
   * Otherwise, it fetches the image from the respective service and sets the profile picture.
   */
  useEffect(() => {
    const loadProfileImages = async () => {
      if (isLoggedIn && typeOfUser.includes("PROVIDER") && id) {
        if (logoImage && refresh < 0) {
          setProfilePic(logoImage);
          Session.storeLogoImage(logoImage)
        } else {
          const fetchProviderLogo = async () => new ProviderService().getLogoImage(id);

          const response = await fetchProviderLogo();
          if (response) {
            const imageUrl = URL.createObjectURL(response);
            setProfilePic(imageUrl);
            Session.storeLogoImage(imageUrl)
          }
        }
      } else if (isLoggedIn && typeOfUser.includes("EMPLOYEE")) {
        if (employeeProfilePic && refresh < 0) {
          setProfilePic(employeeProfilePic);
          Session.storeLogoImage(employeeProfilePic)
        } else {
          const fetchImage = async () => new EmployeeService().getEmployeeProfilePicture();
          const response = await fetchImage();
          setProfilePic(response);
          Session.storeLogoImage(response)
        }
      }
    };

    loadProfileImages();

  }, [typeOfUser, id, logoImage, employeeProfilePic, refresh]);

  return (
    <nav ref={ref} className="w-full shadow-lg p-0 relative z-50 acu-emp-step-2">
      
      <GovHeader 
        title={STRINGS.GOV_HEADER_TXT}
        description_left={STRINGS.GOV_HEADER_LEFT_TXT}
        description_right={STRINGS.GOV_HEADER_RIGHT_TXT}
      />

      {showNotifications && (
        <NotificationCard
          isLoading={isLoading}
          notifications={notifications}
          setShowNotifications={setShowNotifications}
          markNotificationsAsRead={markNotificationsAsRead}
        />
      )}

      <div className="w-full mx-auto max-w-6xl flex flex-row px-2 py-2 justify-between">

        <div className="md:flex ">
          <Logos />
        </div>

        <div className="flex flex-row items-center gap-2 md:gap-4">
          <div className="hidden flex-row gap-4 md:flex text-sm items-center flex-start">

            <NavBarBasic typeOfUser={typeOfUser} isLoggedIn={isLoggedIn} />

          </div>

          {!isLoggedIn ? (
              // hover:bg-[#A7D02A] hover:text-white hover:shadow-md - remove from login btn lcn - fix excel V2L branch
            <a
              className="hidden md:flex cursor-pointer font-bold rounded-md transition-colors duration-250"
              onClick={() => navigate(PORTAL_ROUTES.LOGIN_ROUTE)}
            >
              Inicia sesión
            </a>
          ) : (
            <Link to={PORTAL_ROUTES.DASHBOARD_ROUTE}>
              <button className="hidden md:flex bg-[#092C4C] text-white hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md py-2 px-4 rounded-md transition-colors duration-300">
                Dashboard
              </button>
            </Link>
          )}

          {isLoggedIn && (
            <div className="relative">
              {hasNew && <BellActiveIcon className={"flex text-[#092C4C] cursor-pointer h-8 w-8"} onClick={() => {
                  if (!showNotifications) {
                    setRetry(prevRetry => prevRetry + 1);
                  } else {
                    markNotificationsAsRead();
                  }
                  setShowNotifications(!showNotifications);
                }}/> }
              {!hasNew && <BellIcon
                className={`flex text-[#092C4C] cursor-pointer h-7 w-7 ${hasNew ? 'text-red-500' : ''
                  }`}
                onClick={() => {
                  if (!showNotifications) {
                    setRetry(prevRetry => prevRetry + 1);
                  } else {
                    markNotificationsAsRead();
                  }
                  setShowNotifications(!showNotifications);
                }}
              /> }

              {hasNew && (
                <span className="absolute -top-1 -right-1 bg-white text-xs text-red-500 font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {newQty}
                </span>
              )}
            </div>
          )}

          {isLoggedIn && (
              <Link to={PORTAL_ROUTES.HELP_ROUTE}>
                <QuestionMarkIcon className="hidden md:flex text-[#092C4C]"/>
              </Link>
          )}

          {isLoggedIn && (
            <div>
              <UserDropdownMenu userType={typeOfUser.includes('PROVIDER') ? typeOfUser : null} profilePic={profilePic} />
            </div>
          )}

          <button className="md:hidden hover:text-[#A7D02A]" 
            onClick={() => setIsOpen(!isOpen)}>
            <MobilMenuIcon width={"25px"}/>           
          </button>

        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden">
          <div className="flex flex-col gap-4 text-sm items-center flex-start">

            <NavBarBasic typeOfUser={typeOfUser} isLoggedIn={isLoggedIn} />

          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;