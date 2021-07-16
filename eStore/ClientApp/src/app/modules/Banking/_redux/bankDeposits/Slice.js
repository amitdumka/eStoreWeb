import {createSlice} from "@reduxjs/toolkit";



//BankDeposit
//bankDeposit


const initialBankDepositsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankDepositForEdit: undefined,
  lastError: null, 
  bankEntities: null, 
  totalCountEmp:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const bankDepositsSlice = createSlice({
  name: "bankDeposits",
  initialState: initialBankDepositsState,
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
    // getBankDepositById
    bankDepositFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankDepositForEdit = action.payload.bankDepositForEdit;
      state.error = null;
    },
    // findBankDeposits
    bankDepositsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBankDeposit
    bankDepositCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bankDeposit);
    },
    // updateBankDeposit
    bankDepositUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.bankDepositId === action.payload.bankDeposit.bankDepositId) {
          return action.payload.bankDeposit;
        }
        return entity;
      });
    },
    // deleteBankDeposit
    bankDepositDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.bankDepositId !== action.payload.bankDepositId);
    },
    // deleteBankDeposits
    bankDepositsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.bankDepositId)
      );
    },

    
    // bankDepositsUpdateState
    bankDepositsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.bankDepositId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
