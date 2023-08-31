/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { CONSTANTS, STRINGS } from "../../../config/config";
import {
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
} from "video-react";
import { Dialog } from "primereact/dialog";
import ImgBannerHelpCenterAQS from '../../../assets/images/imgHelcenterAQSBnner.jpg'
/**
 * Componente que permite visualizar el el Banner de AQS
 */
export const BannerHelpCenterAQS = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoAddress, setVideoAddress] = useState(
    CONSTANTS.DEFAULT_INPRENDE_VIDEO[
      Math.floor(Math.random() * CONSTANTS.DEFAULT_INPRENDE_VIDEO.length)
    ]
  );
  /**
   * Handles the open event for the video player dialog.
   * Sets the state of `showVideo` to true, hiding the video player dialog.
   * @returns {void}
   */
  const handlePlayVideo = () => {
    setShowVideo(true);
  };
  /**
   * Handles the close event for the video player dialog.
   * Sets the state of `showVideo` to false, hiding the video player dialog.
   * @returns {void}
   */
  const onCloseVideo = () => {
    setShowVideo(false);
  };
  return (
    <>
      <div className="my-8 w-full bg-center overflow-hidden bg-cover relative h-[450px]"   style={{
        backgroundImage: `url(${ImgBannerHelpCenterAQS})`,
      }}>
        <div className="bg-zinc-800 bg-opacity-10 px-10 py-28 gap-4 flex flex-col text-white h-[100%]">
          <h1 className="font-semibold text-lg">
            {STRINGS.HELP_CENTER_INTRODUCTORY_VIDEO}
          </h1>
          <p className="max-w-lg">{STRINGS.HELP_CENTER_INTRODUCTORY_VIDEO_P}</p>
          <div
            className="flex flex-row gap-3 items-center cursor-pointer"
            onClick={handlePlayVideo}
          >
            <FaPlay color="white" />
            {STRINGS.HELP_CENTER_INTRODUCTORY_VIDEO_TITLE_BTN}
          </div>
        </div>
      </div>
      <Dialog
        style={{ width: "70vw" }}
        header={<p className="text-lg font-semibold">{"Centros de ayuda:"}</p>}
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
};
