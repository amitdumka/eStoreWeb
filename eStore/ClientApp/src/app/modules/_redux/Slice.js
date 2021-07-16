import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  actionsLoading: false,
  lastError: null,

  payModes: null,
  rentTypes: null,
  accountType: null,
  paymentMode: null,
  attendanceUnits: null,
  employeeType: null,
  ledgerEntryType: null,
  ledgerCategoryType: null,
  taxType: null,
  gender: null,
  connectionType: null,
  units: null,
  sizes: null,
  productCategory: null,
  entryStatus: null,
  cardType: null,
  cardMode: null,
  vPayMode: null,
  salaryComponet: null,
  bankPayMode: null,
  voucherType: null,
  loginRole: null,
  arvindAccounts: null,
  storeList: null,
  holidayReasons: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};




export const commonTypesSlice = createSlice({
  name: "commonTypes",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    storesFetched: function(state, action) {
      const { entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.storeList = entities;
    },
    enumValueFetched: function(state, action) {
      const {enumName, entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      setEnumValue(state,enumName,entities);
     
    },
    // entryStatusFetched: (state, action) =>function(state, action) {
    //     const { entities } = action.payload;
    //     state.actionsLoading = false;
    //     state.listLoading = false;
    //     state.error = null;
    //     state.entryStatus = entities;
    //   },
    //   // get All parties List
    //   productCategoryFetched: function(state, action) {
    //     const {  entities } = action.payload;
    //     state.actionsLoading = false;
    //     state.listLoading = false;
    //     state.error = null;
    //     state.productCategory = entities;
       
    //   },
    //   // get All bank account List
    //   sizesFetched: function(state, action) {
    //     const { entities } = action.payload;
    //     state.actionsLoading = false;
    //     state.listLoading = false;
    //     state.error = null;
    //     state.sizes = entities;
        
    //   },
   
    // vPayModesFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.vPayModes = entities;
    // },
    // // get All parties List
    // cardModeFetch: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.cardMode = entities;
    // },
    // // get All bank account List
    // cardTypeFetch: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.cardType = entities;
    // },

    // voucherTypeFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.voucherType = entities;
    // },
    // // get All parties List
    // bankPayModeFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.bankPayMode = entities;
    // },
    // // get All bank account List
    // salaryComponentFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.salaryComponet = entities;
    // },

    // payModesFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.payModes = entities;
    // },
    // // get All parties List
    // arvindAccountsFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.arvindAccounts = entities;
    // },
    // // get All bank account List
    // loginRoleFetched: function(state, action) {
    //   const { entities } = action.payload;
    //   state.actionsLoading = false;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.loginRole = entities;
    // },
   
  },
});

export function setEnumValue(state, actionName, entities) {
  switch (actionName) {
    case "holidayReasons": state.holidayReasons = entities; break;
    case "payMode":
      state.payModes = entities;
      break;
    case "rentType":
      state.rentTypes = entities;
      break;
    case "accountType":
      state.accountType = entities;
      break;
    case "paymentMode":
      state.paymentMode = entities;
      break;
    case "attendanceUnit":
      state.attendanceUnits = entities;
      break;
    case "employeeType":
      state.employeeType = entities;
      break;
    case "ledgerEntryType":
      state.employeeType = entities;
      break;
    case "ledgerCategoryType":
      state.ledgerCategoryType = entities;
      break;
    case "taxType":
      state.taxType = entities;
      break;
    case "gender":
      state.gender= entities;
      break;
    case "connectionType":
      state.connectionType = entities;
      break;
    case "units":
      state.units = entities;
      break;
    case "sizes":
      state.sizes = entities;
      break;
    case "productCategory":
      state.productCategory = entities;
      break;
    case "entryStatus":
      state.entryStatus = entities;
      break;
    case "cardType":
      state.cardType = entities;
      break;
    case "cardMode":
      state.cardMode = entities;
      break;
    case "vPayMode":
      state.vPayMode = entities;
      break;
    case "salarycomponets":
      state.salaryComponet = entities;
      break;
    case "bankPayMode":
      state.bankPayMode = entities;
      break;
    case "voucherType":
      state.voucherType = entities;
      break;
    case "loginRole":
      state.loginRole = entities;
      break;
    case "arvindAccounts":
      state.arvindAccounts = entities;
      break;
    case "storeList":
      state.storeList = entities;
      break;
    default:
      return;
  }
}
