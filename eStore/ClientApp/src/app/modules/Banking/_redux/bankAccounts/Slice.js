import {createSlice} from "@reduxjs/toolkit";



//BankAccount
//bankAccount


const initialBankAccountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankAccountForEdit: undefined,
  lastError: null, 
  bankEntities: null, 
  totalCountEmp:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const bankAccountsSlice = createSlice({
  name: "bankAccounts",
  initialState: initialBankAccountsState,
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
    banksListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.bankEntities=entities;
     state.totalCountEmp=totalCount;

    },
    // getBankAccountById
    bankAccountFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankAccountForEdit = action.payload.bankAccountForEdit;
      state.error = null;
    },
    // findBankAccounts
    bankAccountsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBankAccount
    bankAccountCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bankAccount);
    },
    // updateBankAccount
    bankAccountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.bankAccountId === action.payload.bankAccount.bankAccountId) {
          return action.payload.bankAccount;
        }
        return entity;
      });
    },
    // deleteBankAccount
    bankAccountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.bankAccountId !== action.payload.bankAccountId);
    },
    // deleteBankAccounts
    bankAccountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.bankAccountId)
      );
    },

    
    // bankAccountsUpdateState
    bankAccountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.bankAccountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
