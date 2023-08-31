import { createSlice } from "@reduxjs/toolkit";
import { Session } from "../../services/Session";
const infoLocalStorageFormCenterFutureRequestBasic = () => {
  const profileDataInfoSotage = Session.getProviderProfile();
  const data = JSON.parse(
    localStorage.getItem("formCenterFutureRequestBasic")
  ) || {
    id:profileDataInfoSotage?.id.toString() || "",
    name: profileDataInfoSotage?.name|| "",
    nombreDirigeCentro: "",
    phoneNumber: profileDataInfoSotage?.phoneNumber1 || "",
    city: profileDataInfoSotage?.townName || "",
    physicalAddress: profileDataInfoSotage?.addressLine1 || "",
    postalAddress: profileDataInfoSotage?.addressLine2 || "",
    email: profileDataInfoSotage?.email || "",
    web: profileDataInfoSotage?.websiteUrl || "",
    horarioAdministrativo: "",
    poblacion: [],
    cantidadSalones: "",
    cantidadNinos: "",
    infantes: "0",
    maternales: "0",
    preescolares: "0",
    ninosDiversidad: "",
    diversidad:"",
    createUser: localStorage.getItem("userEmail") || "",
  };
  if (data) {
    if (data.createUser === localStorage.getItem("userEmail")) {
      return data;
    } else {
      localStorage.removeItem("formCenterFutureRequestBasic");
      return null;
    }
  } else {
    return null;
  }
};

const infoLocalStorageFormCenterFutureRequestGeneral = () => {
  const profileDataInfoSotage = Session.getProviderProfile();
  const data =
    JSON.parse(localStorage.getItem("formCenterFutureRequestGeneral")) || {
      tipoOrganizacion: profileDataInfoSotage?.tipoOrganizacion || "",
      agenciaOMunicipio: "",
      financiamientoCentro: [],
      horarioServicio: [],
      diasServicio: [],
      poblacion: [],
      patio: [],
      acreditacion: [],
      relacionAccuden: [],
      maestro: [],
      asistente: [],
      acuerdoColaboracion: [],
      cantidadInfantes: "",
      cantidadMaternales: "",
      cantidadPreescolares: "",
      cantidadTotalEmpleados: "",
    };
  if (data) {
    if (data.createUser === localStorage.getItem("userEmail")) {
      return data;
    } else {
      localStorage.removeItem("formCenterFutureRequestGeneral");
      return null;
    }
  } else {
    return null;
  }
};

const initialState = {
  formCenterFutureRequestBasic: infoLocalStorageFormCenterFutureRequestBasic(),
  formCenterFutureRequestGeneral:
    infoLocalStorageFormCenterFutureRequestGeneral(),
};

export const requestFormFutureCenterSlice = createSlice({
  name: "centerFutureRequest",
  initialState,
  reducers: {
    setDataFormCenterFutureRequestBasic: (state, { payload }) => {
      state.formCenterFutureRequestBasic = payload;
    },
    setDataFormCenterFutureRequestGeneral: (state, { payload }) => {
      state.formCenterFutureRequestGeneral = payload;
    },

    clearData: (state) => {
      state = { ...initialState };
    },
  },
});

export const {
  setDataFormCenterFutureRequestBasic,
  setDataFormCenterFutureRequestGeneral,
  clearData,
} = requestFormFutureCenterSlice.actions;

export default requestFormFutureCenterSlice.reducer;
