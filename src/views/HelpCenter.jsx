/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import MenuHelpCenterAQS from "../components/HelpCenterAQS/MenuHelpCenterAQS";
import { VideoTutorials } from "../components/VideoTutorials";
import { FrequentQuestionHelpCenterAQS } from "../components/HelpCenterAQS/FrequentQuestionHelpCenterAQS";
import { ContactHelpCenterAQS } from "../components/HelpCenterAQS/ContactHelpCenterAQS";
import ProtectedComponent from "../components/HighOrderComponents/ProtectedComponent";
/**
 * View que representa los centros de ayuda
 * @returns 
 */
const HelpCenter = () => {

  return (
    <div className="w-full bg-white">
      <main className="w-full pl-0">
        <MenuHelpCenterAQS />
        <VideoTutorials />
        <FrequentQuestionHelpCenterAQS />
       <ContactHelpCenterAQS/>
      </main>
    </div>
  );
};

export default ProtectedComponent(HelpCenter);
