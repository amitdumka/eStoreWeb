import { createSlice } from "@reduxjs/toolkit";

//BankWithdrawal
//bankWithdrawal

const initialBankWithdrawalsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankWithdrawalForEdit: undefined,
  lastError: null,
  bankEntities: null,
  totalCountEmp: 0,
  payModes: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const bankWithdrawalsSlice = createSlice({
  name: "bankWithdrawals",
  initialState: initialBankWithdrawalsState,
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
    banksListFetched: function(state, action) {
      const { totalCount, entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.bankEntities = entities;
      state.totalCountEmp = totalCount;
    },
    // get All bank List
    payModeListFetched: function(state, action) {
      const { entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.payModes = entities;
      //state.totalCountEmp=totalCount;
    },
    // getBankWithdrawalById
    bankWithdrawalFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankWithdrawalForEdit = action.payload.bankWithdrawalForEdit;
      state.error = null;
    },
    // findBankWithdrawals
    bankWithdrawalsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBankWithdrawal
    bankWithdrawalCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bankWithdrawal);
    },
    // updateBankWithdrawal
    bankWithdrawalUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.bankWithdrawalId ===
          action.payload.bankWithdrawal.bankWithdrawalId
        ) {
          return action.payload.bankWithdrawal;
        }
        return entity;
      });
    },
    // deleteBankWithdrawal
    bankWithdrawalDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.bankWithdrawalId !== action.payload.bankWithdrawalId
      );
    },
    // deleteBankWithdrawals
    bankWithdrawalsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.bankWithdrawalId)
      );
    },

    // bankWithdrawalsUpdateState
    bankWithdrawalsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.bankWithdrawalId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
