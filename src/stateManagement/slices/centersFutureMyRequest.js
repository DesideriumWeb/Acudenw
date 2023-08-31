import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  centerFutureMyRequest: {},
  centerFutureMyRequestDetails: {},
};

export const centerFutureMyRequestSlice = createSlice({
  name: "centerFutureMyRequest",
  initialState,
  reducers: {
    setDataCenterFutureMyRequest: (state, { payload }) => {
      state.centerFutureMyRequest = payload;
    },
    setDataCenterFutureMyRequestDetails: (state, { payload }) => {
      state.centerFutureMyRequestDetails = payload;
    },
    clearData: (state) => {
      state = { ...initialState };
    },
  },
});

export const {
  setDataCenterFutureMyRequest,
  setDataCenterFutureMyRequestDetails,
  clearData,
} = centerFutureMyRequestSlice.actions;

export default centerFutureMyRequestSlice.reducer;
