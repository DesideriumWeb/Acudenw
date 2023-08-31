/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useEffect, useState } from "react";
import ProviderService from "../../services/userServices/ProviderService";
import userSolid from "../../assets/images/icons/user-solid.svg";
import imageLandscape from "../../assets/images/defaultBannerAcudenFam2.png";
import { Session } from "../../services/Session";
/**
 * Custom hook for fetching provider data.
 * This hook will fetch the data from the ProviderService, the retry param is used to refetch the data on demand
 *
 * @param {number} retry - The current retry count, this is used to refetch data on demand, default is 0.
 * @returns {object} The fetched provider data.
 */
export default function useProvider(retry = 0) {

    //State variable to hold provider data
    const [id, setid] = useState('')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [providerCategoryList, setproviderCategoryList] = useState('')
    const [foundedDate, setfoundedDate] = useState('')
    const [employeeQuantity, setemployeeQuantity] = useState('')
    const [serviceDescription, setserviceDescription] = useState('')
    const [aboutUs, setaboutUs] = useState('')
    const [urlLicence, seturlLicence] = useState('')
    const [agencyRanking, setagencyRanking] = useState('')
    const [lmsRanking, setlmsRanking] = useState('')
    const [overallRanking, setoverallRanking] = useState('')
    const [ownerFullName, setownerFullName] = useState('')
    const [phoneNumber1, setphoneNumber1] = useState('')
    const [phoneNumber2, setphoneNumber2] = useState('')
    const [websiteUrl, setwebsiteUrl] = useState('')
    const [addressLine1, setaddressLine1] = useState('')
    const [addressLine2, setaddressLine2] = useState('')
    const [townId, settownId] = useState('')
    const [zipcode, setzipcode] = useState('')
    const [country, setcountry] = useState('')
    const [images, setimages] = useState([])
    const [gallery, setgallery] = useState([])
    const [categories, setcategories] = useState([])
    const [serviceCategories, setserviceCategories] = useState([])
    const [employees, setemployees] = useState([])
    const [bannerImage, setBannerImage] = useState('')
    const [logoImage, setLogoImage] = useState('')
    const [profileLoading, setProfileLoading] = useState(true)
    const [isCenterClosed, setIsCenterClosed] = useState(false)
    const [isTemporarilyClosed, setIsTemporarilyClosed] = useState(false)
    const [schedule, setSchedule] = useState(null)


    useEffect(() => {

        //function to fetch provider from the ProviderService
        const fetchProvider = async () => {

            if (!Session.getProviderProfile() || retry > 0) {
                try {

                    const { data } = await new ProviderService().getProviderByEmail()

                    setid(data.id)
                    setname(data.name)
                    setemail(data.email)
                    setproviderCategoryList(data.providerCategoryList)
                    setfoundedDate(data.foundedDate)
                    setemployeeQuantity(data.employeeQuantity)
                    setserviceDescription(data.serviceDescription)
                    setaboutUs(data.aboutUs)
                    seturlLicence(data.urlLicence)
                    setagencyRanking(data.agencyRanking)
                    setlmsRanking(data.lmsRanking)
                    setoverallRanking(data.overallRanking)
                    setownerFullName(data.ownerFullName)
                    setphoneNumber1(data.phoneNumber1)
                    setphoneNumber2(data.phoneNumber2)
                    setwebsiteUrl(data.websiteUrl)
                    setaddressLine1(data.addressLine1)
                    setaddressLine2(data.addressLine2)
                    settownId(data.town?.id)
                    setzipcode(data.zipcode)
                    setcountry(data.country)
                    setimages(data.images)
                    setgallery(data.gallery)
                    setcategories(data.categories)
                    setserviceCategories(data.serviceCategories)
                    setemployees(data.employees)
                    setIsCenterClosed(data.centerClose)
                    setIsTemporarilyClosed(data.temporarilyClosed)

                    if (data.schedule)
                        setSchedule(JSON.parse(data.schedule))

                    //store provider data if not exists
                    const providerData = {
                        id: data?.id || '',
                        name: data?.name || '',
                        providerCategoryList: data?.providerCategoryList || '',
                        foundedDate: data?.foundedDate || '',
                        employeeQuantity: data?.employeeQuantity || '',
                        serviceDescription: data?.serviceDescription || '',
                        aboutUs: data?.aboutUs || '',
                        urlLicence: data?.urlLicence || '',
                        agencyRanking: data?.agencyRanking || '',
                        lmsRanking: data?.lmsRanking || '',
                        overallRanking: data?.overallRanking || '',
                        ownerFullName: data?.ownerFullName || '',
                        phoneNumber1: data?.phoneNumber1 || '',
                        phoneNumber2: data?.phoneNumber2 || '',
                        websiteUrl: data?.websiteUrl || '',
                        addressLine1: data?.addressLine1 || '',
                        addressLine2: data?.addressLine2 || '',
                        townId: data.town?.id || '',
                        townName: data.town?.name || '',
                        email: data?.email || '',
                        zipcode: data?.zipcode || '',
                        country: data?.country || '',
                        images: data?.images || [],
                        gallery: data?.gallery || '',
                        categories: data?.categories || [],
                        serviceCategories: data?.serviceCategories || [],
                        employees: data?.employees || [],
                        isCenterClosed: data?.centerClose || false,
                        isTemporarilyClosed: data?.isTemporarilyClosed || false,
                        schedule: data?.schedule || ''
                    }

                    Session.storeProviderProfile(providerData);

                    //calls to get the banner and logo images from the ProviderService
                    const bannerResult = await new ProviderService().getBannerImage(data.id)
                    const logoResult = await new ProviderService().getLogoImage(data.id)

                    if (bannerResult) {
                        setBannerImage(URL.createObjectURL(bannerResult));
                    } else {
                        // Manejo en caso de que bannerResult sea null
                        setBannerImage(imageLandscape)
                    }

                    if (logoResult) {
                        setLogoImage(URL.createObjectURL(logoResult));
                    } else {
                        // Manejo en caso de que logoResult sea null
                        setLogoImage(userSolid)
                    }

                } catch (error) {
                    console.log(error);
                } finally {
                    setProfileLoading(false)
                }
            } else {
                try {
                    const data = Session.getProviderProfile();

                    setid(data.id)
                    setname(data.name)
                    setemail(data.email)
                    setproviderCategoryList(data.providerCategoryList)
                    setfoundedDate(data.foundedDate)
                    setemployeeQuantity(data.employeeQuantity)
                    setserviceDescription(data.serviceDescription)
                    setaboutUs(data.aboutUs)
                    seturlLicence(data.urlLicence)
                    setagencyRanking(data.agencyRanking)
                    setlmsRanking(data.lmsRanking)
                    setoverallRanking(data.overallRanking)
                    setownerFullName(data.ownerFullName)
                    setphoneNumber1(data.phoneNumber1)
                    setphoneNumber2(data.phoneNumber2)
                    setwebsiteUrl(data.websiteUrl)
                    setaddressLine1(data.addressLine1)
                    setaddressLine2(data.addressLine2)
                    settownId(data.town?.id)
                    setzipcode(data.zipcode)
                    setcountry(data.country)
                    setimages(data.images)
                    setgallery(data.gallery)
                    setcategories(data.categories)
                    setserviceCategories(data.serviceCategories)
                    setemployees(data.employees)
                    setIsCenterClosed(data.isCenterClosed)
                    setIsTemporarilyClosed(data.isTemporarilyClosed)

                    if (data.schedule)
                        setSchedule(JSON.parse(data.schedule))

                    //calls to get the banner and logo images from the ProviderService
                    const bannerResult = await new ProviderService().getBannerImage(data.id)
                    const logoResult = await new ProviderService().getLogoImage(data.id)

                    if (bannerResult) {
                        setBannerImage(URL.createObjectURL(bannerResult));
                    } else {
                        // Manejo en caso de que bannerResult sea null
                        setBannerImage(imageLandscape)
                    }

                    if (logoResult) {
                        setLogoImage(URL.createObjectURL(logoResult));
                    } else {
                        // Manejo en caso de que logoResult sea null
                        setLogoImage(userSolid)
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setProfileLoading(false)
                }
            }
        }
        //Call the function to fetch provider
        fetchProvider()

        //Re-run the effect when email or retry changes
    }, [email, retry])

    //Return the fetched provider data
    return {
        id,
        name,
        email,
        providerCategoryList,
        foundedDate,
        employeeQuantity,
        serviceDescription,
        aboutUs,
        urlLicence,
        agencyRanking,
        lmsRanking,
        overallRanking,
        ownerFullName,
        phoneNumber1,
        phoneNumber2,
        websiteUrl,
        addressLine1,
        addressLine2,
        townId,
        zipcode,
        country,
        images,
        gallery,
        categories,
        serviceCategories,
        employees,
        bannerImage,
        logoImage,
        profileLoading,
        isCenterClosed,
        isTemporarilyClosed,
        schedule
    }
}
