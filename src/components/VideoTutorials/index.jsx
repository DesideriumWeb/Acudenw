/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import { STRINGS } from "../../config/config";
import useVideoTutorials from "../../hooks/HelpCenterAQS/useVideoTutorials";
import VideoCard from "../../components/HelpCenterAQS/VideoCard";
/**
 * Componente que representa las cards de los video tutoriales
 * @returns
 */
export const VideoTutorials = () => {
  const [datVideoTutorials, setDatVideoTutorials] = useState([]);
  const [generalLoading, setGeneralLoading] = useState(false);
  const { dataVideoTutorials } = useVideoTutorials();
  /**
   * useEffect que supervisa la data que viene del endpoint de videos o de el hard code
   */
  useEffect(() => {
    if (dataVideoTutorials) {
      setDatVideoTutorials(dataVideoTutorials);
    }
  }, [dataVideoTutorials]);
  return (
    <>
      <section
        id={STRINGS.MENU_BUTTON_VIDEO_TUTORIALS}
        className="p-3 py-10 bg-[#EEF2F6]"
      >
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <h1 className="my-3 text-2xl font-semibold">
            {STRINGS.HELP_CENTER_VIDEO_TUTORIALS}
          </h1>
          <VideoCard
            items={datVideoTutorials}
            usePaginateButtons={false}
            deleteLoading={generalLoading}
            useGeneral={true}
            usePreview={true}
          />
        </div>
      </section>
    </>
  );
};
