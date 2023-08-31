/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import {
  CDF_LOG_TYPE,
  CDF_POPULATION,
  CDF_SCORE_CARDS_CONFIG,
  CDF_SCORES_DEFINITIONS,
  CDF_THEME_COLORS,
  CDF_THEMES,
  CONSTANTS,
  ENTITY_STATUS,
  LIBRARY_CONTENT_FORMATS,
  LMS_BADGE_TYPES,
  STRINGS,
  TOWNS,
} from "../../config/config";
import { format, getYear } from "date-fns";
import { es } from "date-fns/locale";
import { Session } from "../../services/Session";
import { FaAward } from "react-icons/fa";
import React from "react";
import NEONATO from "../../assets/images/NEONATO.png";

/**
 * Checks if an email address is valid.
 * @param {string} email - The email address to check.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
export const checkIfEmailIsValid = (email) => {
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailRegExp = new RegExp(validEmailRegex);
  return emailRegExp.test(email);
};

/**
 * Checks if an text is valid.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is valid, otherwise false.
 */
export const checkITextIsValid = (text) => {
  const validTextRegex = /^[A-Za-z\s]+$/;
  const textRegExp = new RegExp(validTextRegex);
  return textRegExp.test(text);
};
/**
 * Checks if an text and an accentuation is valid.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is valid, otherwise false.
 */
export const checkITextIsValidAccentuation = (text) => {
  const validTextRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const textRegExp = new RegExp(validTextRegex);
  return textRegExp.test(text);
};


/**
 * Checks if an YearMonthis valid.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is valid, otherwise false.
 */
export const checkIYearMonth = (text) => {
  const validTextRegex =
    /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)-([0-9]{4})$/;
  const textRegExp = new RegExp(validTextRegex);
  return textRegExp.test(text);
};

/**
 * Checks if a phone number is valid.
 * @version 1.0.3
 * @param {string} phoneNumber - The phone number to check.
 * @returns {boolean} - True if the phone number is valid, otherwise false.
 */
export const checkIfPhoneNumberIsValid = (phoneNumber) => {
  const validTelRegex =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  const telRegExp = new RegExp(validTelRegex);
  return telRegExp.test(phoneNumber);
};
/**
 * Checks if a phone seguroSocialNumber is valid.
 * @param {string} seguroSocialNumber - The phone seguroSocialNumber to check.
 * @returns {boolean} - True if the phone seguroSocialNumber is valid, otherwise false.
 */
export const checkIfSeguritySocialIsValid = (seguroSocialNumber) => {
  const validTelRegex = /^\d{3}-\d{2}-\d{4}$/;
  const telRegExp = new RegExp(validTelRegex);
  return telRegExp.test(seguroSocialNumber);
};
/**
 * Checks if a postal Address is valid.
 * @param {string} postalAddress - The postal Addressto check.
 * @returns {boolean} - True if the postal Address is valid, otherwise false.
 */
export const checkIfPostalAddressIsValid = (postalAddress) => {
  const validTelRegex = /^\d{5}$/;
  const telRegExp = new RegExp(validTelRegex);
  return telRegExp.test(postalAddress);
};
/**
 * Checks if a  number is valid.
 * @param {string} number - The  number to check.
 * @returns {boolean} - True if the  number is valid, otherwise false.
 */
export const checkIfNumberIsValid = (number) => {
  const validTelRegex = /^[0-9]+(\.[0-9]+)?$/;
  const telRegExp = new RegExp(validTelRegex);
  return telRegExp.test(number);
};

/**
 * Formats a phone number to a specific format.
 * @param {string} phoneNumber - The phone number to format.
 * @returns {string} - The formatted phone number.
 */
export const formatPhoneNumber = (phoneNumber) => {
  const match = phoneNumber
    .replace(/\D+/g, "")
    .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
  const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
  const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
  return `${part1}${part2}${part3}`;
};

/**
 * Checks if a password meets the complexity requirements.
 * @ver 1.0.3
 * @param {string} password - The password to check.
 * @returns {boolean} - True if the password is valid, otherwise false.
 */
export const checkIfPasswordIsValid = (password) => {
  const validPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwRegExp = new RegExp(validPasswordRegex);
  return passwRegExp.test(password);
};
/**
 * Check if a password is valid based on specific criteria.
 * @version 2.0.0
 * @param {string} password - The password to be validated.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
export const checkIfPasswordIsValidV2 = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};
/**
 * Delays the execution of the code for the specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise} - A Promise that resolves after the specified delay.
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Converts a Map into an Array based on the value/searchValue needed.
 * @param {Map} map - The Map to convert.
 * @param {*} searchValue - The value to search for.
 * @returns {Array} - An Array of keys from the Map that have the specified value.
 */
export const getKeyByValueAsArray = (map, searchValue) => {
  const result = [];
  for (let [key, value] of map.entries()) {
    if (value === searchValue) result.push(key);
  }
  return result;
};

/**
 * Specifies the allowed file types for file validation.
 * @type {string}
 */
export const validFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
/**
 * Specifies the allowed file types for file validation Documents Required.
 * @type {string}
 */
export const validFileTypesDocumentsRequired = ".pdf,.doc,.docx";

/**
 * Validates the file based on the allowed file types.
 * @param {string} fileName - The name of the file to validate.
 * @returns {boolean} - True if the file is valid, otherwise false.
 */
export const validateFile = (fileName) => {
  const validFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
  const validTypes = validFileTypes.split(",");
  return !!validTypes.find((element) => fileName.includes(element));
};
/**
 * Validates the file based on the allowed file types.
 * @param {string} fileName - The name of the file to validate.
 * @returns {boolean} - True if the file is valid, otherwise false.
 */
export const validateFileDocuments = (fileName) => {
  const validFileTypes = ".pdf,.doc,.docx";
  const validTypes = validFileTypes.split(",");
  return !!validTypes.find((element) => fileName.includes(element));
};

/**
 * Checks if an number is valid
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the number is valid, otherwise false.
 */

export const checkINumberIsValid = (text) => {
  const validTextRegex = /^[0-9]+(\.[0-9]+)?$/;
  const textRegExp = new RegExp(validTextRegex);
  return textRegExp.test(text);
};

/**
 * Checks if an Costo matricula is valid
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the number is valid, otherwise false.
 */

export const checkINumberCostPeriodAdademicIsValid = (text) => {
  const validTextRegex = /^\d+(\.\d{1,2})?$/;
  const textRegExp = new RegExp(validTextRegex);
  return textRegExp.test(text);
};

/**
 * Checks if a number is between a specified range.
 * @param {number} x - The number to check.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {boolean} - True if the number is between the range (inclusive), otherwise false.
 */
export const isNumberBetween = (x, min, max) => x >= min && x <= max;

/**
 * Formats a date string to a Spanish word format.
 * @param {string} dateString - The date string to format (in the format "dd-mm-yyyy hh:mm:ss").
 * @returns {string} - The formatted date string in Spanish words format.
 */
export const formatDateToSpanishWords = (dateString) => {
  if (!dateString || dateString.trim() === "") {
    return "Fecha no disponible";
  }

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const [date, time] = dateString.split(" ");
  const [day, month, year] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");

  const formattedDate = `${parseInt(day, 10)} de ${
    months[parseInt(month, 10) - 1]
  } de ${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate}`;
};
/**
 * Formats the time string to 12-hour format.
 * @param {string} timeString - The time string in the format "HH:mm:ss".
 * @returns {string} - The formatted time in 12-hour format (e.g., "2:02 PM").
 */
export const formatTimeTo12Hour = (timeString) => {
  if (!timeString || timeString.trim() === "") {
    return "Hora no disponible.";
  }

  const date = new Date(timeString);
  let hour = date.getHours();
  const minute = date.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hour = hour % 12 || 12;

  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
};

/**
 * Formats a date string in Spanish words for the date and time.
 * @param {string} dateString - The date string to format (e.g., "2023-03-26T22:50:01.38").
 * @returns {string} The formatted date in Spanish words (e.g., "26 de marzo de 2023").
 */
export const formatDateToSpanishWordsForDateTime = (dateString) => {
  if (!dateString || dateString.trim() === "") {
    return "Fecha no disponible";
  }

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const dateParts = dateString.split("T")[0].split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  return `${day} de ${months[month]} de ${year}`;
};
/**
 * Converts a date from "dd-mm-yyyy hh:mm:ss" format to "dd of month of yyyy".
 * @param {string} date - The date string to be converted.
 * @returns {string} The converted date string in the format "dd of month of yyyy".
 */
export const formatDateToSpanishForCertificates = (date) => {
  if (!date || date.trim() === "") {
    return "Fecha no disponible";
  }

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const parts = date.split(" ");
  const dateParts = parts[0].split("-");
  const day = dateParts[0];
  const month = months[parseInt(dateParts[1]) - 1];
  const year = dateParts[2];

  return `${day} de ${month} de ${year}`;
};

/**
 * Formats the start and end time values into a time range string.
 * @param {number} startTime - The start time value (e.g., 8).
 * @param {number} endTime - The end time value (e.g., 10).
 * @returns {string} The formatted time range string (e.g., "8:00 am - 10:00 am").
 */
export const formatTimeRange = (startTime = 0, endTime = 0) => {
  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60)
      .toString()
      .padStart(2, "0");
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return `${formattedStartTime} - ${formattedEndTime}`;
};
/**
 * Adds a time of "00:00:00" to a date string in "YYYY-MM-DD" format.
 * @param {string} dateString - The date string in "YYYY-MM-DD" format.
 * @returns {string} The resulting date with the added time.
 */
export const addTimeToDate = (dateString) => {
  const time = "T00:00:00";
  const dateTimeString = `${dateString}${time}`;
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, -5);
};
/**
 * Checks if the given email address is valid.
 *
 * @param {string} emailAddress - The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
export const isValidEmailAddress = (emailAddress) => {
  return /\S+@\S+\.\S+/.test(emailAddress);
};

/**
 * Encodes the given data object to Base64 string.
 *
 * @param {object} data - The data object to encode.
 * @returns {string} The encoded Base64 string.
 */
export const encodeB64Obj = (data) => {
  return btoa(JSON.stringify(data));
};

/**
 * Decodes the given Base64 string to a data object.
 *
 * @param {string} data - The Base64 string to decode.
 * @returns {object} The decoded data object.
 */
export const decodeB64Obj = (data) => {
  return JSON.parse(atob(data));
};

/**
 * Checks if the given object is empty.
 *
 * @param {object} obj - The object to check.
 * @returns {boolean} True if the object is empty, false otherwise.
 */
export const isObjEmpty = (obj) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return Object.keys(obj).length < 1;
};

/**
 * Handles the catch response from an API request error.
 * Returns the appropriate status and data object based on the error.
 *
 * @param {object} error - The error object from the API request.
 * @returns {object} The status and data object for the error response.
 */
export const apiCatchResponse = (error) => {
  if (error.code === CONSTANTS.NETWORK_ERROR) {
    return { status: CONSTANTS.HTTP_LOCAL_ERROR, data: {} };
  } else {
    return { status: error.response.status, data: {} };
  }
};

/**
 * Generates a random number within the given range.
 *
 * @param {number} min - The minimum value for the random number (default: CONSTANTS.MIN_RAND).
 * @param {number} max - The maximum value for the random number (default: CONSTANTS.MAX_RAND).
 * @returns {number} The generated random number.
 */
export const generateRandom = (
  min = CONSTANTS.MIN_RAND,
  max = CONSTANTS.MAX_RAND
) => {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
};

/**
 * Capitalizes the first letter of the given name.
 *
 * @param {string} name - The name to capitalize.
 * @returns {string} The capitalized name.
 */
export const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase();
};

/**
 * Builds the request parameters from the given options object.
 *
 * @param {object} options - The options object to build the request parameters.
 * @returns {URLSearchParams} The built request parameters.
 */
export const buildRequestParams = (options = {}) => {
  const params = new URLSearchParams();

  for (const [k, v] of Object.entries(options)) {
    params.append(k, v);
  }

  return params;
};

/**
 * Gets the list of months and years.
 *
 * @returns {array} The list of month and year objects.
 */
export const getMonthYear = () => {
  const monthsYeah = [];
  const year = getYear(new Date());

  for (let i = 0; i < 12; i++) {
    const mes = format(new Date(year, i), "MMM", { locale: es });

    const monthYeah = {
      id: i + 1,
      year: year,
      month: mes,
    };

    monthsYeah.push(monthYeah);
  }

  return monthsYeah;
};

/**
 * Get an array of month options for the current and past two years.
 * Each option includes a label, value, and id.
 * @returns {Array} Array of month options
 */
export const getMonthOptions = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const options = [];
  let id = 1;

  // Iterate over the current year and the past two years
  for (let yearOffset = 0; yearOffset >= -2; yearOffset--) {
    const year = currentYear + yearOffset;

    // Iterate over each month
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month);

      // Stop adding options if the date is in the future
      if (date > currentDate) {
        break;
      }

      // Create the label and value using the month and year
      const label = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      const value = date.toISOString().split("T")[0];

      // Add the option to the array with the generated ID
      options.push({ id: id++, label, value });
    }
  }

  return options;
};
/**
 * Formats a date string to the "dd/mm/yyyy" format.
 * @param {string} inputDate - The input date string in the format "yyyy-mm-ddThh:mm:ss".
 * @returns {string} The formatted date string in the "dd/mm/yyyy" format.
 */
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Injects town IDs to provider data. USE ONLY IN DEV MODE
 * @param {object} data - The data object containing provider information.
 * @returns {object} The updated data object with injected town IDs.
 */
export const injectTowns = (data = null) => {
  if (data && data.data && data.data.providers.length > 0) {
    data.data.providers.forEach((p) => {
      p.townId = generateRandom(1, 50);
    });
  }

  return data;
};

/**
 * Parses the town name based on the town ID.
 *
 * @param {string} townId - The ID of the town.
 * @returns {string} The name of the town.
 */
export const parseTown = (townId) => {
  let townList = Session.getTowns();

  if (!townList || townList.length === 0) {
    townList = TOWNS.TOWNS_JSON;
  }

  let townName = "";

  if (townId) {
    const town = townList.find((t) => t.id === townId);

    if (town) {
      townName = town.name ?? "No Disponible";
    }
  }

  return townName;
};

/**
 * Injects additional data to library items based on their format.
 *
 * @param {Array} items - The library items to inject data into.
 * @returns {Array} The updated library items with injected data.
 */
export const injectDataToLibraryItems = (items = []) => {
  return items
    .filter((li) => li.status === ENTITY_STATUS.ACTIVE)
    .map((li) => {
      let updatedLi = { ...li };
      if (
        li.libraryContentFormat.toLowerCase() ===
        LIBRARY_CONTENT_FORMATS.BROCHURES.type
      ) {
        updatedLi.color = LIBRARY_CONTENT_FORMATS.BROCHURES.color;
        updatedLi.name = LIBRARY_CONTENT_FORMATS.BROCHURES.name;
        updatedLi.Icon = LIBRARY_CONTENT_FORMATS.BROCHURES.icon;
      } else if (
        li.libraryContentFormat.toLowerCase() ===
        LIBRARY_CONTENT_FORMATS.MANUALS.type
      ) {
        updatedLi.color = LIBRARY_CONTENT_FORMATS.MANUALS.color;
        updatedLi.name = LIBRARY_CONTENT_FORMATS.MANUALS.name;
        updatedLi.Icon = LIBRARY_CONTENT_FORMATS.MANUALS.icon;
      } else if (
        li.libraryContentFormat.toLowerCase() ===
        LIBRARY_CONTENT_FORMATS.VIDEOS.type
      ) {
        updatedLi.color = LIBRARY_CONTENT_FORMATS.VIDEOS.color;
        updatedLi.name = LIBRARY_CONTENT_FORMATS.VIDEOS.name;
        updatedLi.Icon = LIBRARY_CONTENT_FORMATS.VIDEOS.icon;
      } else if (
        li.libraryContentFormat.toLowerCase() ===
        LIBRARY_CONTENT_FORMATS.DOCUMENTS.type
      ) {
        updatedLi.color = LIBRARY_CONTENT_FORMATS.DOCUMENTS.color;
        updatedLi.name = LIBRARY_CONTENT_FORMATS.DOCUMENTS.name;
        updatedLi.Icon = LIBRARY_CONTENT_FORMATS.DOCUMENTS.icon;
      }
      return updatedLi;
    });
};
/**
 * Stores items in a cookie with the specified name.
 * @param {Array} items - The items to be stored in the cookie.
 * @param {string} name - The name of the cookie. Default value is 'recommendedItems'.
 * @returns {void}
 */
export const storeItemsInCookie = (items, name = "recommendedItems") => {
  const cookieName = name;
  const cookieValue = JSON.stringify(items);
  document.cookie = `${cookieName}=${cookieValue}; path=/;`;
};
/**
 * Retrieves items from a cookie with the specified name.
 * @param {string} name - The name of the cookie. Default value is 'recommendedItems'.
 * @returns {Array} The items retrieved from the cookie.
 */
export const getItemsFromCookie = (name = "recommendedItems") => {
  const cookieName = name;
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.trim().startsWith(cookieName));
  if (cookie) {
    const cookieValue = cookie.split("=")[1];
    return JSON.parse(cookieValue);
  }

  return [];
};
/**
 * Converts an array of education degrees to education items in the DAO format.
 * @param {Array} educationDegree - The array of education degrees.
 * @returns {Array} - The converted education items in the DAO format.
 */
export const convertToEducationItemsDAO = (educationDegree = []) => {
  return educationDegree.length < 1
    ? educationDegree
    : educationDegree.map((ed) => ({
        id: ed.id,
        date: new Date(ed.dateEarned).getFullYear(),
        title: ed.degree,
        subTitle: ed.title,
        description: ed.academicInstitution,
        icon: <FaAward className="text-green-500" size={18} />,
        action: "Ver Diploma",
        filePath: ed.filePath,
      }));
};
/**
 * Converts an array of experience items to DAO format.
 * @param {Array} experienceItems - The array of experience items.
 * @returns {Array} - The converted experience items in DAO format.
 */
export const convertToExperienceItemsDAO = (experienceItems = []) => {
  return experienceItems.length < 1
    ? experienceItems
    : experienceItems.map((ed) => {
        let experienceDateTo = new Date(ed.dateTo).getFullYear();

        return {
          id: ed.id,
          date: `${new Date(ed.dateFrom).getFullYear()} - ${
            !ed.currentlyWorking ? experienceDateTo : "Present"
          }`,
          title: ed.companyName,
          subTitle: ed.title,
          description: ed.description,
        };
      });
};
/**
 * Get the count of unread notifications and check if there are any unread notifications.
 *
 * @param {Array} notifications - The array of notifications.
 * @returns {Object} An object containing the count of unread notifications and a boolean indicating if there are any unread notifications.
 * @throws {Error} If the 'notifications' parameter is not an array.
 */
export const getUnreadNotifications = (notifications) => {
  if (!Array.isArray(notifications)) {
    return {
      unreadCount: 0,
      hasUnreadNotifications: false,
    };
  }

  const unreadNotifications = notifications.filter((notification) => {
    return (
      notification &&
      typeof notification.status === "boolean" &&
      !notification.status
    );
  });

  const unreadCount = unreadNotifications.length;
  const hasUnreadNotifications = unreadCount > 0;

  return {
    unreadCount,
    hasUnreadNotifications,
  };
};
/**
 * Builds a multipart/form-data object for an image file.
 *
 * @param {File} file - The image file to include in the multipart/form-data. IMPORTANT Binary
 * @returns {FormData} - The multipart/form-data object.
 */
export const buildImageMultipart = (file) => {
  const form = new FormData();
  form.append("file", file);
  return form;
};
/**
 * Removes an element from the array based on the provided ID.
 *
 * @param {Array} array - The array from which to remove the element.
 * @param {string|number} id - The ID of the element to be removed.
 * @returns {Array} A new array with the specified element removed.
 */
/**
 * Removes an element from the array based on the provided ID.
 *
 * @param {Array} array - The array from which to remove the element.
 * @param {string|number} id - The ID of the element to be removed.
 * @returns {Array|null} A new array with the specified element removed, or null if the array or ID is invalid.
 */
export const removeElementById = (array, id) => {
  if (!Array.isArray(array)) {
    console.log("Invalid array:", array);
    return array;
  }

  if (typeof id !== "string" && typeof id !== "number") {
    console.log("Invalid ID:", id);
    return array;
  }

  const index = array.findIndex((element) => element.id === id);

  if (index === -1) {
    console.log("Element not found with ID:", id);
    return array;
  }

  // Create a new array without the element
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
/**
 *
 * @param {string} time1
 * @param {string} time2
 * @returns integer
 *  1 = time1 is greater than time2
 * -1 = time1 is less than time2
 *  0 = // time1 is equal to time2
 */
export const compareTimes = (time1, time2) => {
  // Convert times to 24-hour format
  const convertedTime1 = convertTo24HourFormat(time1);
  const convertedTime2 = convertTo24HourFormat(time2);

  // Compare the times
  if (convertedTime1 > convertedTime2) {
    return 1; // time1 is greater than time2
  } else if (convertedTime1 < convertedTime2) {
    return -1; // time1 is less than time2
  } else {
    return 0; // time1 is equal to time2
  }
};
/**
 *
 * @param {string} time
 * @returns -hours converted to 24 format
 */
const convertTo24HourFormat = (time) => {
  const [formattedTime, period] = time.split(" ");
  let [hours, minutes] = formattedTime.split(":");

  hours = parseInt(hours, 10);

  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  }

  if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};
/**
 * Converts a number to a Roman numeral.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The Roman numeral representation of the number.
 */
export const convertToRoman = (num) => {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = "";

  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      result += key;
      num -= romanNumerals[key];
    }
  }

  return result;
};
/**
 * Format gender value for API ENUM.
 *
 * @param {{name}} gender - The gender value.
 * @returns {object} - The formatted gender object.
 */
export const formatGenderForEnum = (gender = "UNSPECIFIED") => {
  return {
    value: gender || "UNSPECIFIED",
  };
};
/**
 * Justify Request ID's
 *
 * @param id - Request Id
 * @param zeros - left zeros qty '0'
 * @return {string}
 */
export const justifyRequestId = (id = 0, zeros = 10) => {
  return String(id).padStart(zeros, "0");
};
/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {string} The random string.
 */
export const generateRandomString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
};
/**
 * Generates a unique key combining the current timestamp and a random string.
 *
 * @param {number} length - The length of the random string to be appended to the timestamp. Default is 8.
 * @returns {string} The unique key.
 */
export const generateUniqueKey = (length = 8) => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const randomString = generateRandomString(length);
  return `${timestamp}-${randomString}`;
};
/**
 * Retrieves the value corresponding to the given key from the provided object.
 * If the key does not exist in the object, it returns null.
 *
 * @param {Object} object - The object to search for the value.
 * @param {string} key - The key for which to retrieve the value.
 * @returns {any|null} The value associated with the key, or null if the key does not exist.
 */
export const getValueByKey = (object, key) => {
  return object[key] || STRINGS.DEFAULT_ON_EMPTY;
};
/**
 * Builds a Data Transfer Object (DTO) for CDF question answers based on the provided questionnaire list and answers list.
 * @param {Array} questionnaireList - The list of questionnaires to build the DTO from.
 * @param {Array} answersList - The list of answers to associate with the questions.
 * @returns {Array} - Returns the built DTO with nested subtables, sections, questions, and associated answers.
 */
export const buildCDFQuestionAnswersDTO = (questionnaireList, answersList) => {
  return questionnaireList.map((questionnaire) => {
    const subtables = questionnaire.subtables.map((subtable) => {
      const sections = subtable.sections.map((section) => {
        const questions = section.questions.map((question) => {
          const answers = getAnswersForQuestion(question.id, answersList);

          return { ...question, answers };
        });

        return { ...section, questions };
      });

      return { ...subtable, sections };
    });

    return { ...questionnaire, subtables };
  });
};
/**
 * 
 * @param {Array} aplicactionList  lista de aplicaciones
 * @param {Array} amendmentList lista de enmiendas
 * @returns lista de aplicaciones con enmiedas
 */
export const myRequestItemsAndAmendmentDTO = (aplicactionList, amendmentList) => {
  return aplicactionList.map((item1) => {
    const matchingItem2 = amendmentList.find((item2) => {
      return item2.some((item3) => item3.accesaApplication.id === item1.id);
    });

    if (matchingItem2) {
      return { ...item1, amendmentData: matchingItem2 };
    }

    return { ...item1, amendmentData: []};
  });
};

/**
 * Filters and retrieves the answers from the answers list that correspond to the given question ID.
 * @param {number} questionId - The ID of the question to find answers for.
 * @param {Array} answersList - The list of answers to search within.
 * @returns {Array} - Returns an array of answers for the given question ID.
 */
const getAnswersForQuestion = (questionId, answersList) => {
  return answersList.filter((answer) => answer.questionId === questionId);
};
/**
 * Calculates the difference between the total and the sum of scores in the provided questionnaire list,
 * and returns the difference and the percentage needed to reach the total.
 *
 * @param {Array} questionnaireListDTO - An array containing objects representing questionnaires with 'scores' property.
 * @returns {Object} An object containing the difference and the percentage needed.
 * @throws {TypeError} If questionnaireListDTO is not an array or contains invalid data.
 */
export const calculateScoreDifferenceAndPercentage = (questionnaireListDTO) => {
  console.log(questionnaireListDTO);

  if (
    !Array.isArray(questionnaireListDTO) ||
    questionnaireListDTO === null ||
    questionnaireListDTO.length === 0
  ) {
    return {
      isValid: false,
      difference: 0,
      percentageNeeded: 0,
      total: 0,
      sumOfScores: 0,
      progress: 0,
    };
  }

  const total = questionnaireListDTO.length * 100;
  let sumOfScores = 0;
  let progress = 0;

  questionnaireListDTO.forEach((questionnaire) => {
    if (questionnaire.hasOwnProperty("score")) {
      sumOfScores += questionnaire.score;
      progress += questionnaire.progress;
    }
  });

  const scoreDifference = total - progress;
  const percentageNeeded = (scoreDifference / total) * 100;

  return {
    isValid: progress === total,
    difference: scoreDifference,
    percentageNeeded: percentageNeeded.toFixed(2),
    total,
    sumOfScores,
    progress,
  };
};
/**
 * Format question with question marks, alphabet letters, and capitalize the first letter.
 *
 * @param {number} index - The index of the question, starting from 0.
 * @param {string} question - The text of the question.
 * @return {string} - The formatted question with question marks, alphabet letters, and the first letter capitalized.
 */
export const formatQuestion = (index, question) => {
  const formattedQuestion =
    question.charAt(0).toUpperCase() + question.slice(1);

  let finalQuestion = formattedQuestion.trim();

  if (!finalQuestion.startsWith("¿")) {
    finalQuestion = `¿${finalQuestion}`;
  }

  if (!finalQuestion.endsWith("?")) {
    finalQuestion += "?";
  }
  // Add the alphabet letter based on the provided index.
  const alphabetLetter = String.fromCharCode(97 + index);
  finalQuestion = `${alphabetLetter}. ${finalQuestion}`;

  return finalQuestion;
};
/**
 * Extracts an array of questionIds from the answerList.
 * @param {Array} answerList - An array of objects containing the field 'questionId'.
 * @return {Array} - An array of questionIds extracted from the answerList.
 */
export const extractQuestionIds = (answerList) => {
  if (!Array.isArray(answerList) || answerList.length === 0) {
    return [];
  }

  return answerList.map((answer) => answer.questionId);
};
/**
 * Check if a questionId exists in the questionsWithAnswers array.
 * @param {number} questionId - The id of the question to check.
 * @param {Array} questionsWithAnswers - An array of questionIds.
 * @return {boolean} - True if the questionId exists in questionsWithAnswers, false otherwise.
 */
export const isQuestionIdInArray = (questionId, questionsWithAnswers) => {
  if (!Array.isArray(questionsWithAnswers)) {
    return false;
  }

  return questionsWithAnswers.includes(questionId);
};
/**
 * @name formatCDFPopulationTitle
 * Formats the population title for display.
 * @version 1.0.0
 * @param {string|null} population - The population value to be formatted.
 * @return {string} - The formatted population title.
 */
export const formatCDFPopulationTitle = (population = null) => {
  if (population) return `(${getValueByKey(CDF_POPULATION, population)})`;
  else return "";
};
/**
 * @name getCDFThemeColor
 * Gets the theme color based on the given theme code.
 * If no theme is provided or the provided theme code is not recognized,
 * it returns the default purple color.
 * @version 1.0.0
 * @param {string|null} theme - The theme code to get the color for.
 * @return {string} - The corresponding theme color class.
 */
export const getCDFThemeColor = (theme = null) => {
  if (theme) {
    switch (theme) {
      case CDF_THEMES.RELATIONS.code:
        return CDF_THEMES.RELATIONS.color;
      case CDF_THEMES.ASPECTS.code:
        return CDF_THEMES.ASPECTS.color;
      case CDF_THEMES.SUPERVISORS.code:
        return CDF_THEMES.SUPERVISORS.color;
      default:
        return "bg-purple-600";
    }
  } else {
    return "bg-purple-600";
  }
};
/**
 * doesActionTypeExist - function
 * Checks if an action type exists in the array of log action types.
 * @version 1.0.0
 * @param {string} actionType - The action type to check.
 * @param {string[]} logActionTypes - The array of log action types received from the API.
 * @return {boolean} - Returns true if the action type exists in the array, otherwise returns false.
 */
export const doesActionTypeExist = (actionType, logActionTypes) => {
  if (!logActionTypes || logActionTypes.length === 0) {
    return false;
  }
  return logActionTypes.includes(actionType);
};
/**
 * Removes objects with status "DELETED" or "INACTIVE" from the provided array.
 *
 * @param {Array} dataArray - The array of objects to be filtered.
 * @returns {Array} - A new array containing objects with status other than "DELETED" or "INACTIVE".
 */
export const removeInactiveAndDeleted = (dataArray) => {
  if (!dataArray || dataArray.length === 0) {
    return [];
  }
  return dataArray.filter(
    (obj) =>
      obj.status !== ENTITY_STATUS.DELETED &&
      obj.status !== ENTITY_STATUS.INACTIVE
  );
};
/**
 * Checks if an array of log objects contains a specific activity log type.
 * @version 1.0.0
 * @param {Array} logsTypes - The array of log objects to search through.
 * @param {string} type - The activity log type to search for. Default is CDF_LOG_TYPE.APPROVED.
 * @returns {boolean} - True if the specified activity log type is found in the array, otherwise false.
 */
export const hasTypeInLogArray = (
  logsTypes = [],
  type = CDF_LOG_TYPE.APPROVED
) => {
  if (!logsTypes || logsTypes.length === 0) {
    return false;
  }
  return logsTypes.some((obj) => obj.cdfActivityLogType === type);
};
/**
 * Adds score configuration data to a list of questionnaire scores.
 *
 * @version 1.0.0
 * @param {Array} questionnaireScoreList - The array of questionnaire score objects.
 * @returns {Array} - A new array of questionnaire score objects with added configuration data.
 */
export const addScoreConfigToQuestionnaire = (questionnaireScoreList) => {
  const updatedQuestionnaireScoreList = [...questionnaireScoreList];

  updatedQuestionnaireScoreList.forEach((scoreObj) => {
    const config = Object.values(CDF_SCORE_CARDS_CONFIG).find(
      (themeConfig) => themeConfig.theme === scoreObj.theme
    );

    if (config) {
      scoreObj.headerColor = config.headerColor;
      scoreObj.baseCircleColor = config.baseCircleColor;
      scoreObj.scoreCircleColor = config.scoreCircleColor;
    }
  });

  return updatedQuestionnaireScoreList;
};
/**
 * Retrieves the color associated with a given score range.
 *
 * @version 1.0.0
 * @param {Number} score - The score value for which to find the associated color.
 * @returns {String} - The color associated with the provided score range, or an empty string if no matching range is found.
 */
export const getColorForScore = (score) => {
  const foundDefinition = CDF_SCORES_DEFINITIONS.SCORES_DEFINITIONS.find(
    (definition) => {
      const [minRange, maxRange] = definition.range.split("-");
      return score >= parseInt(minRange) && score <= parseInt(maxRange);
    }
  );

  return foundDefinition ? foundDefinition.color : "";
};
/**
 * Retrieves the name associated with a given score range.
 *
 * @version 1.0.0
 * @param {Number} score - The score value for which to find the associated name.
 * @returns {String} - The name associated with the provided score range, or a default string if no matching range is found.
 */
export const getNameForScore = (score) => {
  const foundDefinition = CDF_SCORES_DEFINITIONS.SCORES_DEFINITIONS.find(
    (definition) => {
      const [minRange, maxRange] = definition.range.split("-");
      return score >= parseInt(minRange) && score <= parseInt(maxRange);
    }
  );

  return foundDefinition ? foundDefinition.name : STRINGS.DEFAULT_ON_EMPTY;
};
/**
 * Retrieves definition score associated with a given score range.
 *
 * @version 1.0.0
 * @param {Number} score - The score value for which to find the associated definition.
 * @returns {object} - The object associated with the provided score range, or a default empty object if no matching range is found.
 */
export const getScoreDefinitionForScore = (score) => {
  const foundDefinition = CDF_SCORES_DEFINITIONS.SCORES_DEFINITIONS.find(
    (definition) => {
      const [minRange, maxRange] = definition.range.split("-");
      return score >= parseInt(minRange) && score <= parseInt(maxRange);
    }
  );

  return foundDefinition ? foundDefinition : {};
};
/**
 * Retrieves the badge icon based on the given badge type. PNG
 *
 * @version 1.0.0
 * @param {string} badgeType - The type of badge to retrieve the icon for.
 * @returns {any} - The URL or path to the icon corresponding to the provided badge type.
 */
export const getBadgeIconByType = (badgeType) => {
  return LMS_BADGE_TYPES[badgeType] || NEONATO;
};
/**
 * Set scroll al inicio de la pagina
 * * @version 1.0.0
 * @returns {any} - set Scroll page
 */
export const scrollToTop = () => {
  return window.scrollTo({ top: 0, behavior: "smooth" });
};
