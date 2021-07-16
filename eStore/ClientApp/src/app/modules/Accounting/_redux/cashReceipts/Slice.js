import {createSlice} from "@reduxjs/toolkit";



//CashReceipt
//cashReceipt

const initialCashReceiptsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashReceiptForEdit: undefined,
  lastError: null, 
  transcationEntities: null, 
  totalCountTran:0,
  partiesEntities:null,
  bankaccEntities:null,
  totalCountbankacc:undefined, 
  totalCountparty:undefined
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const cashReceiptsSlice = createSlice({
  name: "cashReceipts",
  initialState: initialCashReceiptsState,
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
    // get All transcation List 
    transcationsListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.transcationEntities=entities;
     state.totalCountTran=totalCount;

    },
    // get All parties List 
    partiesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.partiesEntities=entities;
     state.totalCountparty=totalCount;

    },
    // get All bank account List 
    bankAccountsListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.bankaccEntities=entities;
     state.totalCountbankacc=totalCount;

    },
    // getCashReceiptById
    cashReceiptFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashReceiptForEdit = action.payload.cashReceiptForEdit;
      state.error = null;
    },
    // findCashReceipts
    cashReceiptsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCashReceipt
    cashReceiptCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.cashReceipt);
    },
    // updateCashReceipt
    cashReceiptUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.cashReceiptId === action.payload.cashReceipt.cashReceiptId) {
          return action.payload.cashReceipt;
        }
        return entity;
      });
    },
    // deleteCashReceipt
    cashReceiptDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.cashReceiptId !== action.payload.cashReceiptId);
    },
    // deleteCashReceipts
    cashReceiptsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.cashReceiptId)
      );
    },

    
    // cashReceiptsUpdateState
    cashReceiptsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.cashReceiptId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
