import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeMyRequest: {},
  amendmentEmployeeMyRequest:{},
  employeeMyRequestDetails:{},
  idDocumentRequired :0,
  documentRequired :[],

};

export const employeeMyRequestSlice = createSlice({
  name: "employeeMyRequest",
  initialState,
  reducers: {
    setDataEmployeeMyRequest: (state, { payload }) => {
      state.employeeMyRequest = payload;
    },
    setAmendmentDataEmployeeMyRequest: (state, { payload }) => {
      state.amendmentEmployeeMyRequest = payload;
    },
    setDataEmployeeMyRequestDetails: (state, { payload }) => {
      state.employeeMyRequestDetails = payload;
    },
    setIdDocumentRequired: (state, { payload }) => {
      state.idDocumentRequired = payload;
    },
    setDocumentRequired: (state, { payload }) => {
      state.documentRequired = payload;
    },
    clearData: (state) => {
      state = { ...initialState };
    },
  },
});

export const { setDataEmployeeMyRequest,setAmendmentDataEmployeeMyRequest,setDataEmployeeMyRequestDetails,setIdDocumentRequired,setDocumentRequired, clearData } =
  employeeMyRequestSlice.actions;

export default employeeMyRequestSlice.reducer;
