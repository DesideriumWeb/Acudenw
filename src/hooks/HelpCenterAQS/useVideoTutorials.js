/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useEffect, useState } from "react";
import { HTTP, STRINGS, VIDEO_TUTORIALS } from "../../config/config";
import { HelpCenterServices } from "../../services/helpCenterAQSServices/HelpCenterServices";
/**
 * Custom hook to video tutorials
 */
export default function useVideoTutorials() {
  const [dataVideoTutorials, setDataVideoTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [inError, setInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  /**
   * Asynchronous function to retrieve video tutorials items and update the state.
   */
  useEffect(() => {
    /**
     * Asynchronous function to get video tutorials items.
     */
    const getVideoTutorialsItems = async () => {
      try {
        setSpinnerLoading(true);
        const { data, status } =
          new HelpCenterServices().getVideoTutorialsItems();
        if (status === HTTP.OK) {
          setDataVideoTutorials(data);
        } else {
          setDataVideoTutorials(VIDEO_TUTORIALS);
        }
      } catch (error) {
        setDataVideoTutorials(VIDEO_TUTORIALS);
        setIsLoading(false);
        setSpinnerLoading(false);
        setInError(true);
        setErrorMsg(`${STRINGS.GENERIC_ERROR}`);
      } finally {
        setIsLoading(false);
        setSpinnerLoading(false);
      }
    };

    getVideoTutorialsItems();
  }, []);

  // Return the properties related to the video tutorials items
  return { dataVideoTutorials, spinnerLoading, isLoading };
}
