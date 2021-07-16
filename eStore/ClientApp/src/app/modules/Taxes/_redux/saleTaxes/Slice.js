import { createSlice } from "@reduxjs/toolkit";

//SaleTax
//saleTax

//SaleTaxes
//saleTaxes

const initialSaleTaxesState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  saleTaxForEdit: undefined,
  lastError: null,
  taxTypes: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const saleTaxesSlice = createSlice({
  name: "saleTaxes",
  initialState: initialSaleTaxesState,
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
    // get All bank List
    taxTypesFetched: function(state, action) {
      const {entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.taxTypes = entities;
    },
    // getSaleTaxById
    saleTaxFetched: (state, action) => {
      state.actionsLoading = false;
      state.saleTaxForEdit = action.payload.saleTaxForEdit;
      state.error = null;
    },
    // findSaleTaxes
    saleTaxesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSaleTax
    saleTaxCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.saleTax);
    },
    // updateSaleTax
    saleTaxUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.saleTaxId === action.payload.saleTax.saleTaxId) {
          return action.payload.saleTax;
        }
        return entity;
      });
    },
    // deleteSaleTax
    saleTaxDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.saleTaxId !== action.payload.saleTaxId
      );
    },
    // deleteSaleTaxes
    saleTaxesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.saleTaxId)
      );
    },

    // saleTaxesUpdateState
    saleTaxesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.saleTaxId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
