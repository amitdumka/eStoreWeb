import {createSlice} from "@reduxjs/toolkit";

const initialStoresState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  storeForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const storesSlice = createSlice({
  name: "stores",
  initialState: initialStoresState,
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
    // getStoreById
    storeFetched: (state, action) => {
      state.actionsLoading = false;
      state.storeForEdit = action.payload.storeForEdit;
      state.error = null;
    },
    // findStores
    storesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createStore
    storeCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.store);
    },
    // updateStore
    storeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.storeId === action.payload.store.storeId) {
          return action.payload.store;
        }
        return entity;
      });
    },
    // deleteStore
    storeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.storeId !== action.payload.storeId);
    },
    // deleteStores
    storesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.storeId)
      );
    },
    // storesUpdateState
    storesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.storeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
