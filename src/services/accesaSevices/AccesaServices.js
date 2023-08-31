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
  IsPeriodOpenServicePath,
  EmployeeApplicationsServicePath,
  IdDocumentRequired,
  EmployeeApplicationsDocumentsServicePath,
  EmployeeApplicationsDocumentsByIdServicePath,
  AmendmentEmployeeApplicationsServicePath,
  AmendmentMyRequestAccesaAplicationServicePath,
} from "../ApiRest";
import { HTTP } from "../../config/config";
/**
 * Service class for accesa
 */
export class AccesaServices {
  /**
   *Add request accesa
   * @param {Object} form - The form data for the accesa.
   * @returns {Object} - The response data containing the added accesa information.
   */
  async addRequestAccesa(form) {
    try {
      const { data } = await axiosInstance.post(AplicationServicePath, form);
      if (data.httpCode === HTTP.CREATED) {
        return { data: data?.data };
      } else {
        return {};
      }
    } catch (error) {
      console.log("Error in addRequestAccesa:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   *Documents requiered accesa
   * @param {appId} form - The Id aplication Employye.
   * @param {docId} form - The Id Document.
   * @param {document} form - The Document required.
   * @returns {Object} - The response data containing the added accesa information.
   */
  async addDocumentRequiredAplicationEmployeeForMyRequest(
    appId,
    docId,
    document
  ) {
    try {
      const doc = new FormData();
      let file = document?.file;
      let url = document?.url;
      doc.append("file", file, url);
      const { data } = await axiosInstance.post(
        `${AplicationServicePath}/${appId}/document/${docId}/file/upload`,
        doc
      );
      if (data.httpCode === HTTP.CREATED) {
        return { data: data, status: true };
      } else {
        return {};
      }
    } catch (error) {
      console.log(
        "Error in addDocumentRequiredAplicationEmployeeForMyRequest:",
        error
      );
      return { status: false, data: {}, error: error.message };
    }
  }
   /**
   *Documents Amendment accesa
   * @param {appId} form - The Id Amendment.
   * @param {document} form - The Document Amendment.
   * @returns {Object} - The response data containing the added accesa information.
   */
   async addDocumentAmendmentAplicationEmployeeForMyRequest(
    id,
    document
  ) {
    try {
      const doc = new FormData();
      let file = document?.file;
      let url = document?.url;
      doc.append("file", file, url);
      const { data } = await axiosInstance.post(
        `${AmendmentMyRequestAccesaAplicationServicePath}/${id}/file/upload`,
        doc
      );
      if (data.httpCode === HTTP.CREATED) {
        return { data: data, status: true };
      } else {
        return {};
      }
    } catch (error) {
      console.log(
        "Error in addDocumentAmendmentAplicationEmployeeForMyRequest:",
        error
      );
      return { status: false, data: {}, error: error.message };
    }
  }
  
  /**
   *Documents requiered accesa
   * @param {files} form - The form data documents required for the accesa.
   * @returns {Object} - The response data containing the added accesa information.
   */
  async addDocumentRequeridAplicationEmployee(files, id) {
    try {
      if (files !== null && id !== null) {
        const document = new FormData();
        let name = files?.name;
        let file = files?.file;
        document.append("file", file, file.url);
        document.append("appid", id);
        document.append("documentName", name);
        const { data } = await axiosInstance.post(
          EmployeeApplicationsDocumentsServicePath,
          document
        );
        if (data.httpCode === HTTP.CREATED) {
          return { data: data?.data };
        } else {
          return { data: data?.data };
        }
      }
    } catch (error) {
      console.log("Error in addDocumentRequeridAplicationEmployee:", error);
      return { status: false, data: {}, error: error.message };
    }
  }

  /**
   *validate Period accesa
   * @param {date} form - The date for period validate for the accesa.
   * @returns {boolean} - The response boolean.
   */
  async getAccesaRequestIsPeriodOpen(periodoValidate) {
    try {
      const { data } = await axiosInstance.get(
        `${IsPeriodOpenServicePath}?currentDate=${periodoValidate}`
      );
      if (data.httpCode === HTTP.OK) {
        return { status: data?.data };
      } else {
        return { status: data?.data };
      }
    } catch (error) {
      console.log("Error in getAccesaRequestIsPeriodOpen:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   * Get employee request accesa
   * @returns {Object} - The response request for accesa.
   */
  async getAccesaRequestEmployeeAplication(options = {}) {
    try {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(options)) {
        params.append(key, value);
      }
      const { data } = await axiosInstance.get(
        EmployeeApplicationsServicePath,
        { params }
      );
      if (data.httpCode === HTTP.OK) {
        return { data: data, status: HTTP.OK };
      } else {
        return {};
      }
    } catch (error) {
      console.log("Error in getAccesaRequestEmployeeAplication:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   * Get amendment employee request accesa 
   * @returns {Object} - The response request for accesa.
   */
  async getAmendmentAccesaRequestEmployeeAplication(idAmendment) {
    try {
      const { data } = await axiosInstance.get(
        `${AmendmentEmployeeApplicationsServicePath}/${idAmendment}`,

      );
      if (data.httpCode === HTTP.OK) {
        return { data: data, status: HTTP.OK };
      } else {
        return {};
      }
    } catch (error) {
      console.log("Error in getAmendmentAccesaRequestEmployeeAplication:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   * Get employee request accesa
   * @returns {Object} - The response request for accesa.
   */
  async getAccesaRequestEmployeeAplicationDocumentsById(id) {
    try {
      const { data } = await axiosInstance.get(
        `${EmployeeApplicationsDocumentsByIdServicePath}/${id}`
      );
      if (data.httpCode === HTTP.OK) {
        return { data: data?.data, status: true };
      } else {
        return {};
      }
    } catch (error) {
      console.log(
        "Error in getAccesaRequestEmployeeAplicationDocumentsById:",
        error
      );
      return { status: false, data: {}, error: error.message };
    }
  }

  /**
   * Get employee request by id accesa
   *  @param {string} form - The aplicaction employee by id for the accesa.
   * @returns {Object} - The response employee by id for accesa.
   */
  async getAccesaRequestEmployeeAplicationById(id) {
    try {
      const { data } = await axiosInstance.get(
        `${AplicationServicePath}/${id}`
      );
      if (data.httpCode === HTTP.OK) {
        return { data: data.data, status: true };
      } else {
        return {};
      }
    } catch (error) {
      console.log("Error in getAccesaRequestEmployeeAplicationById:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   * Get id document required my request
   * @param {Object} form - The aplicaction employee by id for the accesa.
   * @returns {Object} - The response document requiered by id for accesa.
   */
  async getIdDocumentRequired(body) {
    try {
      const { data } = await axiosInstance.post(IdDocumentRequired, body);
      if (data?.httpCode === HTTP.CREATED) {
        return { data: data.data, status: true };
      } else {
        return {};
      }
    } catch (error) {
      console.log("Error in getIdDocumentRequired:", error);
      return { status: false, data: {}, error: error.message };
    }
  }
  /**
   * Retrieve Document requiered file.
   *
   * @param {string} documentId - The ID of the document.
   * @returns {Promise<{data: any, status: number}>} - The response data and status.
   */
  async getDownloadDocumentFile(documentId) {
    try {
      const { data, status } = await axiosInstance.get(
        `${IdDocumentRequired}/${documentId}/download`,
        { responseType: "blob" }
      );
      return { data, status };
    } catch (error) {
      return { data: null, status: HTTP.INTERNAL_ERROR };
    }
  }
}
