/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useEffect, useState } from "react";
import {
  FREQUENTSQUESTIONS,
  HTTP,
  STRINGS,
  VIDEO_TUTORIALS,
} from "../../config/config";
import { HelpCenterServices } from "../../services/helpCenterAQSServices/HelpCenterServices";
/**
 * Custom hook to useFrequentQuestions
 */
export default function useFrequentQuestions() {
  const [dataFrequentQuestions, setFrequentQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [inError, setInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  /**
   * Asynchronous function to retrieve FrequentQuestions items and update the state.
   */
  useEffect(() => {
    /**
     * Asynchronous function to get FrequentQuestions items.
     */
    const getFrequentQuestionsItems = async () => {
      try {
        setSpinnerLoading(true);
        const { data, status } =
          new HelpCenterServices().getFrequentsQuestionsItems();
        if (status === HTTP.OK) {
          setFrequentQuestions(data);
        } else {
          setFrequentQuestions(FREQUENTSQUESTIONS);
        }
      } catch (error) {
        setFrequentQuestions(FREQUENTSQUESTIONS);
        setIsLoading(false);
        setSpinnerLoading(false);
        setInError(true);
        setErrorMsg(`${STRINGS.GENERIC_ERROR}`);
      } finally {
        setIsLoading(false);
        setSpinnerLoading(false);
      }
    };

    getFrequentQuestionsItems();
  }, []);

  // Return the properties related to the get FrequentQuestions items
  return { dataFrequentQuestions, spinnerLoading, isLoading };
}
