/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ImgBanner from "../../assets/images/ImgBanner.svg"
import {useNavigate} from "react-router-dom";
import {CONSTANTS, PORTAL_ROUTES, STRINGS} from "../../config/config";
import {AuthToken} from "../../services/AuthToken";
import {
    ControlBar,
    CurrentTimeDisplay,
    ForwardControl,
    PlaybackRateMenuButton,
    Player,
    ReplayControl,
    TimeDivider
} from "video-react";
import {Dialog} from "primereact/dialog";
import React, {useState} from "react";

const Banner = () => {

    const navigate = useNavigate()
    const [showVideo, setShowVideo] = useState(false)
    const [videoAddress, setVideoAddress] = useState(CONSTANTS.DEFAULT_INPRENDE_VIDEO[
        Math.floor(Math.random() * CONSTANTS.DEFAULT_INPRENDE_VIDEO.length)
        ]);

    /**
     * Go to correct route form landing. Check session status.
     * @return void
     */
    const gotoLogin = () => {
        if(!AuthToken.get())
            navigate(PORTAL_ROUTES.LOGIN_ROUTE)
        else
            navigate(PORTAL_ROUTES.DASHBOARD_ROUTE)
    }

    /**
     * Handles the close event for the video player dialog.
     * Sets the state of `showVideo` to false, hiding the video player dialog.
     * @returns {void}
     */
    const onCloseVideo = () => {
        setShowVideo(false)
    }

    return(
        <>
            <div className="my-10 pl-4 pr-4 w-full">
                <div className="container mx-auto flex flex-wrap">
                    <div className="w-full my-10 md:w-1/2 mx-auto">
                        <h1 className="font-bold text-5xl md:text-5xl leading-normal md:leading-relaxed mt-10 text-[#092C4C]">{STRINGS.LANDING_TITLE_01}</h1>
                        <p className="text-[20px] mt-3 text-[#092C4C]">{STRINGS.LANDING_TITLE_02}</p>
                        <div className="flex mt-10 mb-10">
                            <button
                                onClick={gotoLogin}
                                className="text-lg flex-none w-36 h-16 rounded-2xl bg-[#092C4C]
                                text-white mx-3 hover:bg-[#A7D02A] hover:text-[#092C4C]">
                                Comenzar
                            </button>
                            <button
                                onClick={() => setShowVideo(true)}
                                className="text-lg flex-none w-36 h-16 border-[#092C4C] rounded-[20px]
                                bg-white mx-3 hover:bg-gray-200">
                                Ver demo
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 justify-center">
                        <div className="flex items-center justify-center">
                            <img src={ImgBanner} alt="Imagen representativa de un centro educativo infantil"/>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                style={{ width: '70vw' }}
                header={<p className="text-lg font-semibold">{'ACUDEN Demo:'}</p>}
                visible={showVideo}
                onHide={onCloseVideo}
            >
                <Player src={videoAddress} playsInline>
                    <ControlBar>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    </ControlBar>
                </Player>
            </Dialog>
        </>
    );
}

export default Banner