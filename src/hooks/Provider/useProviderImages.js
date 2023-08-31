/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ProviderService from "../../services/userServices/ProviderService";
import {useEffect, useState} from "react";
import userSolid from "../../assets/images/icons/user-solid.svg";
import imageLandscape from "../../assets/images/defaultBannerAcudenFam2.png";

export default function useProviderImages(id){

    const [bannerImage, setBannerImage] = useState('')
    const [logoImage, setLogoImage] = useState('')
    const [isLoading, setIsLoading] =useState(true)
    const [inError, setInError] =useState(false)
    const [errorMsg, setErrorMsg] =useState('')

    useEffect(() => {
        const fetchProviderImages = async () => {

            try {

                const bannerResult = await new ProviderService().getBannerImage(id)
                const logoResult = await new ProviderService().getLogoImage(id)

                if(bannerResult) {
                    setBannerImage(URL.createObjectURL(bannerResult));
                } else {
                    setBannerImage(imageLandscape)
                }

                if(logoResult) {
                    setLogoImage(URL.createObjectURL(logoResult));
                } else {
                    setLogoImage(userSolid)
                }

                setBannerImage(URL.createObjectURL(bannerResult))
                setLogoImage(URL.createObjectURL(logoResult))

                setIsLoading(false)

            }
            catch (error)
            {
                setInError(true)
                setErrorMsg('Lo sentimos, se ha producido un error. Trate nuevamente.')
                setIsLoading(false)
                console.log(error)
            }
        }

        fetchProviderImages()

    }, []);

    return {bannerImage, logoImage, isLoading, inError, errorMsg}

}