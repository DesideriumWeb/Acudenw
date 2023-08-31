import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import requestFormsReducer from "./slices/requestFormsSlice";
import requestFormsCenterFutureReducer from "./slices/requestFormFutureCenterSlice";
import employeeMyRequestReducer from "./slices/employeeMyRequest";
import centersFutureMyRequestReducer from "./slices/centersFutureMyRequest";

function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      employee: requestFormsReducer,
      centerFutureRequest: requestFormsCenterFutureReducer,
      employeeMyRequest: employeeMyRequestReducer,
      centerFutureMyRequest: centersFutureMyRequestReducer,
    },
  });
}

const store = makeStore();
export default store;
