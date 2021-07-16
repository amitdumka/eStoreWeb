import { createSlice } from "@reduxjs/toolkit";

//ledgerType
//LedgerType

const initialLedgerTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  ledgerTypeForEdit: undefined,
  lastError: null,
  ledgerCategory: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const ledgerTypesSlice = createSlice({
  name: "ledgerTypes",
  initialState: initialLedgerTypesState,
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
    // getLedgerTypeById
    ledgerTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.ledgerTypeForEdit = action.payload.ledgerTypeForEdit;
      state.error = null;
    },
    // findLedgerTypes
    ledgerTypesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    ledgerCategoryFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.ledgerCategory = entities;
    },
    // createLedgerType
    ledgerTypeCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ledgerType);
    },
    // updateLedgerType
    ledgerTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ledgerTypeId === action.payload.ledgerType.ledgerTypeId) {
          return action.payload.ledgerType;
        }
        return entity;
      });
    },
    // deleteLedgerType
    ledgerTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ledgerTypeId !== action.payload.ledgerTypeId
      );
    },
    // deleteLedgerTypes
    ledgerTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ledgerTypeId)
      );
    },
    // ledgerTypesUpdateState
    ledgerTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ledgerTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
