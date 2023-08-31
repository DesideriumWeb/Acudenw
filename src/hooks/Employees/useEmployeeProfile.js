/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useState} from "react";
import EmployeeService from "../../services/userServices/EmployeeService";
import {Session} from "../../services/Session";
import imageLandscape from "../../assets/images/defaultBannerAcudenFam2.png";
import userSolid from "../../assets/images/icons/user-solid.svg";

/**
 * Custom hook for managing the employee profile.
 * This hook retrieves the employee profile from the service or local storage (if available).
 * It also stores the employee profile in local storage to avoid unnecessary service calls.
 * @returns {Object} Object with the employee profile properties.
 */
export default function useEmployeeProfile(updateProfile = 0) {

    const [id, setId] = useState('');
    const [birthDate, setBirthDate] = useState(new Date().toISOString());
    const [certification, setCertification] = useState([]);
    const [educationDegrees, setEducationDegrees] = useState([]);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [phoneNumberExtension, setPhoneNumberExtension] = useState('');
    const [description, setDescription] = useState('');
    const [addEducation, setAddEducation] = useState(false)
    const [addWorkExperience, setAddWorkExperience] = useState(false)
    const [addCertificate, setAddCertificate] = useState(false)
    const [bannerImage, setBannerImage] = useState('')
    const [logoImage, setLogoImage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        /**
         * Fetches the employee profile from the service or local storage (if available).
         */
        const fetchEmployeeProfile = async () => {
            if (!Session.getEmployeeProfile() || addEducation || addWorkExperience || updateProfile > 0 || addCertificate) {
                try {
                    const { data } = await new EmployeeService().getProfile();

                    setId(data?.id || '');
                    setBirthDate(data?.birthDate || '');
                    setCertification(data?.certification || []);
                    setEducationDegrees(data?.educationDegrees || []);
                    setEmail(data?.email || '');
                    setFirstname(data?.firstname || '');
                    setLastname(data?.lastname || '');
                    setFullname(data?.fullname || '');
                    setGender(data?.gender || '');
                    setOccupation(data?.occupation || '');
                    setPhoneNumberExtension(data?.phoneNumberExtension || '');
                    setDescription(data?.description || '');

                    const employeeData = {
                        id: data?.id || '',
                        description: data?.description || '',
                        birthDate: data?.birthDate || '',
                        certification: data?.certification || [],
                        educationDegrees: data?.educationDegrees || [],
                        email: data?.email || '',
                        firstname: data?.firstname || '',
                        lastname: data?.lastname || '',
                        fullname: data?.fullname || '',
                        gender: data?.gender || '',
                        occupation: data?.occupation || '',
                        phoneNumberExtension: data?.phoneNumberExtension || '',
                    };

                    Session.storeEmployeeProfile(employeeData);

                    const logoResult = await new EmployeeService().getEmployeeProfilePicture(data.id)
                    const bannerResult = await new EmployeeService().getEmployeeProfileBanner(data.id)

                    if (bannerResult) {
                        setBannerImage(bannerResult);
                    } else {
                        setBannerImage(imageLandscape)
                    }

                    if (logoResult) {
                        setLogoImage(logoResult);
                    } else {
                        setLogoImage(userSolid)
                    }

                } catch (error) {
                    // TODO: Handle error appropriately
                    console.log(error);
                    setLogoImage(userSolid)
                    setBannerImage(imageLandscape)
                }
                finally {
                    setLoading(false)
                }
            } else {
                const data = Session.getEmployeeProfile();

                setId(data?.id || '');
                setBirthDate(data?.birthDate || '');
                setCertification(data?.certification || []);
                setEducationDegrees(data?.educationDegrees || []);
                setEmail(data?.email || '');
                setFirstname(data?.firstname || '');
                setLastname(data?.lastname || '');
                setFullname(data?.fullname || '');
                setGender(data?.gender || '');
                setOccupation(data?.occupation || '');
                setPhoneNumberExtension(data?.phoneNumberExtension || '');
                setDescription(data?.description || '');

                try{

                    const logoResult = await new EmployeeService().getEmployeeProfilePicture(data.id)
                    const bannerResult = await new EmployeeService().getEmployeeProfileBanner(data.id)

                    if (bannerResult) {
                        setBannerImage(bannerResult);
                    } else {
                        setBannerImage(imageLandscape)
                    }

                    if (logoResult) {
                        setLogoImage(logoResult);
                    } else {
                        setLogoImage(userSolid)
                    }

                }catch (error){
                    console.log(`Error on get images: ${error}`)
                    setLogoImage(userSolid)
                    setBannerImage(imageLandscape)
                }finally {
                    setLoading(false)
                }
            }
        };

        fetchEmployeeProfile();

    }, [addEducation, addWorkExperience, updateProfile, addCertificate]);

    return {
        id,
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
        loading
    };
}
