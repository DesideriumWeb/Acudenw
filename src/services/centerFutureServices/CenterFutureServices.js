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
  CDFServicePath,
} from "../ApiRest";
import { ENTITY_STATUS, HTTP, STRINGS } from "../../config/config";
import * as utils from "../../components/utils";
import { buildRequestParams, isObjEmpty } from "../../components/utils";
/**
 * Service class for center future
 */
export class CenterFutureServices {
  /**
   * Creates a new CDF (Centros del Futuro) request with the specified providerId.
   * The providerId should be a numeric value greater than 0.
   *
   * @param {number} providerId - The unique identifier of the provider.
   * @returns {Object} An object containing the response data and status.
   * If successful, it returns an object with data and status properties.
   * If the providerId is invalid or not a number, it returns an error object with status, data, and error properties.
   * If there is an internal server error during the request, it returns an error object with status, data, and error properties.
   */
  async createCDFRequest(providerId = 0) {
    try {
      if (providerId < 1 || typeof providerId !== "number")
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_ERROR,
        };

      const { data, status } = await axiosInstance.post(
        `${CDFServicePath}create`,
        {
          providerId: providerId,
          status: ENTITY_STATUS.ACTIVE,
        }
      );

      return { data, status };
    } catch (error) {
      console.log(`Create CDF request error: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Submits a CDF questionnaire evaluation for a specific request.
   *
   * @param {number} requestId - The ID of the request for which the evaluation is being submitted.
   * @param {object} evaluationData - The evaluation data to be submitted.
   * @returns {Promise} A promise that resolves to an object with `data`, `status`, and `error` properties.
   */
  static async submitCDFQuestionnaireEvaluation(
    requestId = 0,
    evaluationData = {}
  ) {
    try {
      if (!this.isRequestIdValid(requestId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      if (isObjEmpty(evaluationData))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_ERROR,
        };

      const url = `${CDFServicePath}${requestId}/questionnaireAssignment/submit?completedByName=${evaluationData.completedByName}&completedByJob=${evaluationData.completedByJob}`;

      const { data, status } = await axiosInstance.put(url);

      return { data, status };
    } catch (error) {
      console.log(`Error on submitCDFQuestionnaireEvaluation error: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Updates an existing CDF (Centros del Futuro) request with the specified providerId and requestData.
   * The providerId should be a numeric value greater than 0.
   *
   * @param {number} providerId - The unique identifier of the provider.
   * @param {Object} requestData - The data to be updated for the CDF request.
   * @returns {Object} An object containing the response data and status.
   *
   * If successful, it returns an object with data and status properties.
   * If the providerId is invalid or not a number, or requestData is empty, it returns an error object with status, data, and error properties.
   * If there is an internal server error during the request, it returns an error object with status, data, and error properties.
   */
  async updateCDFRequest(requestData = {}, providerId = 0) {
    try {
      if (
        providerId < 1 ||
        typeof providerId !== "number" ||
        utils.isObjEmpty(requestData)
      )
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const { data, status } = await axiosInstance.put(
        `${CDFServicePath}${providerId}/update`,
        requestData
      );

      return { data, status };
    } catch (error) {
      console.log(`Update CDF request error: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   *Add request center future
   * @param {Object} form - The form data for the center future.
   * @returns {Object} - The response data containing the added the center future information.
   */
  async updateCenterFutureRequest(form) {
    try {
    } catch (error) {
      console.log(`Error in updateCenterFutureRequest: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * @name Get provider CDF Request.
   * @version 1.0.1
   * @param providerId - Provider ID for request search.
   * @param options - Http query options for pagination
   * @return {Promise<{data: *, status: *}>}
   */
  static async getCentersFutureRequests(providerId = 0, options = {}) {
    try {
      if (providerId < 1 || typeof providerId !== "number")
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const params = utils.buildRequestParams(options);

      if (!this.isRequestIdValid(providerId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const { data, status } = await axiosInstance(
        `${CDFServicePath}provider/${providerId}`,
        { params }
      );

      return { data, status };
    } catch (error) {
      console.log(`Error in getCentersFutureRequest: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Get centers future request
   * @returns {Object} - The response request for centers future.
   */
  static async getCentersFutureMyRequestById(id) {
    try {
      //TODO - Existe un metodo en utils que ya hace esto: Build params

      const params = utils.buildRequestParams({});

      // const params = new URLSearchParams();
      // for (const [key, value] of Object.entries(options)) {
      //   params.append(key, value);
      // }
      // const { data } = await axiosInstance.get(
      //   EmployeeApplicationsServicePath,
      //   { params }
      // );
      // if (data.httpCode === HTTP.OK) {
      //   return { data: data?.data, status: true };
      // } else {
      //   return {};
      // }
    } catch (error) {
      console.log(`Error in getCentersFutureMyRequestById: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Fetches the request log for a given requestId.
   * @version 1.0.0
   * @param {number} requestId - The ID of the request for which the log is to be retrieved.
   * @returns {Object} An object containing the response data and status.
   *                   - If successful, the object contains 'data' (response data) and 'status' (HTTP status code).
   *                   - If there is an error, the object contains 'data' (null), 'status' (HTTP status code),
   *                     and 'error' (error message).
   * @throws {Error} Will throw an error if there is a network error or other unexpected issues during the API request.
   */
  static async getRequestLog(requestId = 0) {
    try {
      if (!this.isRequestIdValid(requestId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const { data, status } = await axiosInstance(
        `${CDFServicePath}${requestId}/activityLog`
      );

      return { data, status };
    } catch (error) {
      console.log(`Error in getRequestLog ID: ${requestId}, error: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * @name createRequestLog
   * This function is used to create a request log for a specific activity.
   * @version 1.0.2
   * @param {object} log - The log object containing information about the request activity.
   * @return {object} - An object containing the response data and status.
   */
  static async createRequestLog(log = {}) {
    try {
      if (isObjEmpty(log))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const { data, status } = await axiosInstance.post(
        `${CDFServicePath}activityLog/create`,
        log
      );

      return { data, status };
    } catch (error) {
      console.log(`Error on createRequestLog: ${error}`);
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Fetches the questionnaire for a given requestId.
   *
   * @param {number} requestId - The ID of the request for which the questionnaire is to be retrieved.
   * @returns {Object} An object containing the response data and status.
   *                   - If successful, the object contains 'data' (response data) and 'status' (HTTP status code).
   *                   - If there is an error, the object contains 'data' (null), 'status' (HTTP status code),
   *                     and 'error' (error message).
   * @throws {Error} Will throw an error if there is a network error or other unexpected issues during the API request.
   */
  static async getRequestQuestionnaire(requestId = 0) {
    try {
      if (!this.isRequestIdValid(requestId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const { data, status } = await axiosInstance(
        `${CDFServicePath}${requestId}/questionnaireAssignment`
      );

      return { data, status };
    } catch (error) {
      console.log(
        `Error in getRequestQuestionnaire ID: ${requestId}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Create the answer for a specific question in the CDF questionnaire.
   * @version 1.0.0
   * @param requestId - Provider Accreditation request Id.
   * @param {number} questionId - The ID of the question to update the answer for.
   * @param {boolean} answer - The new answer for the question.
   * @returns {Object} An object containing the response data and status.
   *                   If successful, the object will have 'data' and 'status' properties.
   *                   If there's an error, it will have 'status', 'data', and 'error' properties.
   */
  static async createCDFQuestionnaireAnswer(
    requestId = 0,
    questionId = 0,
    answer = false
  ) {
    try {
      if (
        !this.isRequestIdValid(requestId) ||
        !this.isRequestIdValid(questionId)
      )
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_CDF_ANSWER_ERROR,
        };

      const { data, status } = await axiosInstance.post(
        `${CDFServicePath}questionnaireAnswer/create`,
        {
          cdfAccreditationId: requestId,
          questionId: questionId,
          status: ENTITY_STATUS.ACTIVE,
          answer: answer,
        }
      );

      return { data, status };
    } catch (error) {
      console.log(
        `Error in createCDFQuestionnaireAnswer ID: ${questionId}, answer: ${answer}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Updates a CDF questionnaire answer by making a request to the API.
   * @version 1.0.2
   * @param {number} requestId - The ID of the CDF accreditation.
   * @param {number} questionId - The ID of the question to be updated.
   * @param {boolean} answer - The new answer value for the question (true or false).
   * @returns {Object} - Returns an object with the API response data and status.
   * Todo - Change for receive an array of answer, because API replace all answer with this array.
   */
  static async updateCDFQuestionnaireAnswers(
    requestId = 0,
    questionId = 0,
    answer = false
  ) {
    try {
      if (
        !this.isRequestIdValid(requestId) ||
        !this.isRequestIdValid(questionId)
      )
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_CDF_ANSWER_ERROR,
        };

      const { data, status } = await axiosInstance.put(
        `${CDFServicePath}${requestId}/questionnaireAnswer/update`,
        [
          {
            cdfAccreditationId: requestId,
            questionId: questionId,
            status: ENTITY_STATUS.ACTIVE,
            answer: answer,
          },
        ]
      );

      return { data, status };
    } catch (error) {
      console.log(
        `Error in updateCDFQuestionnaireAnswer ID: ${questionId}, answer: ${answer}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * This method updates the CDF questionnaire answers for a specific answer ID.
   *
   * @param {number} answerId - The ID of the answer.
   * @param {boolean} answer - The new answer value.
   * @return {Promise} - A promise that resolves with the updated data and status or an error object.
   */
  static async updateCDFQuestionnaireAnswer(answerId = 0, answer = false) {
    try {
      if (!this.isRequestIdValid(answerId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_PROVIDER_CDF2_ERROR,
        };

      const url = `${CDFServicePath}questionnaireAnswer/${answerId}/update?answer=${answer}`;

      const { data, status } = await axiosInstance.put(url);

      return { data, status };
    } catch (error) {
      console.log(
        `Error on updateCDFQuestionnaireAnswers. AnswerId: ${answerId}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Retrieves the list of questionnaire answers for a specific request.
   * @version 1.0.1
   * @param {number} requestId - The ID of the request to fetch questionnaire answers for.
   * @returns {object} An object containing the response data and status.
   *   - If the request is successful, the object will have the shape { data: responseData, status: responseStatus }.
   *   - If there's an error, the object will have the shape { status: HTTPErrorStatus, data: null, error: errorMessage }.
   * @throws {Error} If there's a network or server-related issue during the API call.
   */
  static async getCDFQuestionnaireAnswers(requestId = 0) {
    try {
      if (!this.isRequestIdValid(requestId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_CDF_ANSWER_ERROR,
        };

      const { data, status } = await axiosInstance(
        `${CDFServicePath}${requestId}/questionnaireAnswer/list`
      );

      return { data, status };
    } catch (error) {
      console.log(
        `Error in getCDFQuestionnaireAnswers requestId: ${requestId}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Retrieves the list of questionnaire result/scores for a specific cdf request.
   * @version 1.0.0
   * @param {number} requestId - The ID of the request to fetch questionnaire answers for.
   * @returns {object} An object containing the response data and status.
   *   - If the request is successful, the object will have the shape { data: responseData, status: responseStatus }.
   *   - If there's an error, the object will have the shape { status: HTTPErrorStatus, data: null, error: errorMessage }.
   * @throws {Error} If there's a network or server-related issue during the API call.
   */
  static async getCDFQuestionnaireResults(requestId = 0) {
    try {
      if (!this.isRequestIdValid(requestId))
        return {
          status: HTTP.BAD_REQUEST,
          data: null,
          error: STRINGS.GENERIC_CDF_ANSWER_ERROR,
        };

      const { data, status } = await axiosInstance(
        `${CDFServicePath}${requestId}/questionnaireAssignment/results`
      );

      return { data, status };
    } catch (error) {
      console.log(
        `Error in getCDFQuestionnaireResults requestId: ${requestId}, error: ${error}`
      );
      return {
        status: HTTP.INTERNAL_ERROR,
        data: null,
        error: STRINGS.GENERIC_ERROR,
      };
    }
  }
  /**
   * Validates whether the given requestId is a valid positive number.
   *
   * @param {number} requestId - The ID of the request to validate.
   * @returns {boolean} Returns true if the requestId is a valid positive number; otherwise, returns false.
   */
  static isRequestIdValid(requestId) {
    return requestId > 0 && typeof requestId === "number";
  }

  /**
   * Retrieve certificate file.
   *
   * @param {Number} certificateId - The ID of the certificate.
   * @returns {Promise<{data: any, status: number}>} - The response data and status.
   */
  async getCertificateScoresFile(certificateId) {
    try {
      const { data, status } = await axiosInstance.get(
        `${CDFServicePath}${certificateId}/questionnaireAssignment/certificate`,
        { responseType: "blob" }
      );
      return { data, status };
    } catch (error) {
      return { data: null, status: HTTP.INTERNAL_ERROR };
    }
  }
}
