/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {
  axiosInstance,
  AplicationServicePath,
  HelpCenterFrequentQuestionsServicePath,
} from "../ApiRest";
import { HTTP, STRINGS } from "../../config/config";
/**
 * Service class for HelpCenterServices
 */
export class HelpCenterServices {
   /**
   * Get video tutorials
   * @returns {boolean} - The response boolean.
   */
  async getVideoTutorialsItems() {
    try {
      //TODO esperando la logica de imprende
    } catch (error) {
      console.log("Error in getVideoTutorialsItems:", error);
      return { status: HTTP.INTERNAL_ERROR, data: null, error: STRINGS.GENERIC_ERROR, };
    }
  }
  /**
   * Get frequent questions
   * @returns {boolean} - The response boolean.
   */
  async getFrequentsQuestionsItems() {
    try {
      const { data } = await axiosInstance.get(
        HelpCenterFrequentQuestionsServicePath
      );
      if (data.httpCode === HTTP.OK) {
        return { data: data?.data, status: data?.httpCode };
      } else {
        return { data: data?.data, status: data?.httpCode };
      }
    } catch (error) {
      console.log("Error in getFrequentsQuestionsItems:", error);
      return { status: HTTP.INTERNAL_ERROR, data: null, error: STRINGS.GENERIC_ERROR, };
    }
  }
}
