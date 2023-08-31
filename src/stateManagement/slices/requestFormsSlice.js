/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { createSlice } from "@reduxjs/toolkit";

const infoLocalStorageFormEmployee = () => {
  const data = JSON.parse(localStorage.getItem("formEmployee")) || null;
  if (data) { 
    if (data.createUser === localStorage.getItem("userEmail")) {
      return data;
    } else {
      localStorage.removeItem("formEmployee");
      return null;
    }
  } else {
    return null;
  }
};

const infoLocalStorageFormSupplier = () => {
  const data = JSON.parse(localStorage.getItem("formSupplier")) || null;
  if (data) {
    if (data.createUser === localStorage.getItem("userEmail")) {
      return data;
    } else {
      localStorage.removeItem("formSupplier");
      return null;
    }
  } else {
    return null;
  }
};
const infoLocalStorageFormAcademicData = () => {
  const data = JSON.parse(localStorage.getItem("formAcademicData")) || null;
  if (data) {
    if (data.createUser === localStorage.getItem("userEmail")) {
      return data;
    } else {
      localStorage.removeItem("formAcademicData");
      return null;
    }
  } else {
    return null;
  }
};
const infoLocalStorageFormDocumentsRequired = () => {
  const data =
    JSON.parse(localStorage.getItem("formDocumentsRequired")) || null;
    if (data) {
      if (data.createUser === JSON.stringify(localStorage.getItem("userEmail"))) {
        return data;
      } else {
        localStorage.removeItem("formDocumentsRequired");
        return null;
      }
    } else {
      return null;
    }
};

const initialState = {
  formEmployee: infoLocalStorageFormEmployee(),
  formSupplier: infoLocalStorageFormSupplier(),
  formAcademicData: infoLocalStorageFormAcademicData(),
  formDocumentsRequired: infoLocalStorageFormDocumentsRequired(),
};

export const requestFormsSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setDataEmployee: (state, { payload }) => {
      state.formEmployee = payload;
    },

    setDataSupplier: (state, { payload }) => {
      state.formSupplier = payload;
    },
    setDataDocumentsRequired: (state, { payload }) => {
      state.formDocumentsRequired = payload;
    },
    setDataAcademicData: (state, { payload }) => {
      state.formAcademicData = payload;
    },

    clearData: (state) => {
      state = { ...initialState };
    },
  },
});

export const {
  setDataEmployee,
  setDataSupplier,
  clearData,
  setDataAcademicData,
  setDataDocumentsRequired,
} = requestFormsSlice.actions;

export default requestFormsSlice.reducer;
