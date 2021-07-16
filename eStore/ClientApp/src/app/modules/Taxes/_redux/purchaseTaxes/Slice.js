import { createSlice } from "@reduxjs/toolkit";

//purchaseTaxes
//PurchaseTaxes
//purchaseTax
//PurchaseTax



const initialPurchaseTaxesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  purchaseTaxForEdit: undefined,
  lastError: null,
  taxType: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const purchaseTaxesSlice = createSlice({
  name: "purchaseTaxes",
  initialState: initialPurchaseTaxesState,
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
    // getPurchaseTaxById
    purchaseTaxFetched: (state, action) => {
      state.actionsLoading = false;
      state.purchaseTaxForEdit = action.payload.purchaseTaxForEdit;
      state.error = null;
    },
    // findPurchaseTaxes
    purchaseTaxesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    taxTypeFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.taxTypes = entities;
    },
    // createPurchaseTax
    purchaseTaxCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.purchaseTax);
    },
    // updatePurchaseTax
    purchaseTaxUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.purchaseTaxId === action.payload.purchaseTax.purchaseTaxId) {
          return action.payload.purchaseTax;
        }
        return entity;
      });
    },
    // deletePurchaseTax
    purchaseTaxDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.purchaseTaxId !== action.payload.purchaseTaxId
      );
    },
    // deletePurchaseTaxes
    purchaseTaxesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.purchaseTaxId)
      );
    },
    // purchaseTaxesUpdateState
    purchaseTaxesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.purchaseTaxId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
