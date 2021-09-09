import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  actionsLoading: false,
  lastError: null,
  duplicateInvCheckList:null, 
  tailoringCheckList:null

};


export const callTypes = {
  list: "list",
  action: "action",
};




export const commonPageTypesSlice = createSlice({
  name: "commonPageTypes",
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

    tailoringCheckFetched: function(state, action) {
      const { entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.tailoringCheckList = entities;
    },
    duplicateInvCheckFetched: function(state, action) {
        const { entities } = action.payload;
        state.actionsLoading = false;
        state.listLoading = false;
        state.error = null;
        state.duplicateInvCheckList = entities;
      },
       
  },
});
