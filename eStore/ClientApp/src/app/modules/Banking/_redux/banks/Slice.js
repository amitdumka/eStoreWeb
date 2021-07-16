import {createSlice} from "@reduxjs/toolkit";

//Bank
//bank

const initialBanksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const banksSlice = createSlice({
  name: "banks",
  initialState: initialBanksState,
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
    // getBankById
    bankFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankForEdit = action.payload.bankForEdit;
      state.error = null;
    },
    // findBanks
    banksFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBank
    bankCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bank);
    },
    // updateBank
    bankUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.bankId === action.payload.bank.bankId) {
          return action.payload.bank;
        }
        return entity;
      });
    },
    // deleteBank
    bankDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.bankId !== action.payload.bankId);
    },
    // deleteBanks
    banksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.bankId)
      );
    },
    // banksUpdateState
    banksStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.bankId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
