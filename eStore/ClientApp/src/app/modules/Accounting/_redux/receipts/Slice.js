import {createSlice} from "@reduxjs/toolkit";



//Receipt
//receipt

const initialReceiptsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  receiptForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0,
  partiesEntities:null,
  bankaccEntities:null,
  totalCountbankacc:undefined, 
  totalCountparty:undefined
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const receiptsSlice = createSlice({
  name: "receipts",
  initialState: initialReceiptsState,
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
    // get All employee List 
    employeesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.employeeEntities=entities;
     state.totalCountEmp=totalCount;

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
    // getReceiptById
    receiptFetched: (state, action) => {
      state.actionsLoading = false;
      state.receiptForEdit = action.payload.receiptForEdit;
      state.error = null;
    },
    // findReceipts
    receiptsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createReceipt
    receiptCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.receipt);
    },
    // updateReceipt
    receiptUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.receiptId === action.payload.receipt.receiptId) {
          return action.payload.receipt;
        }
        return entity;
      });
    },
    // deleteReceipt
    receiptDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.receiptId !== action.payload.receiptId);
    },
    // deleteReceipts
    receiptsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.receiptId)
      );
    },

    
    // receiptsUpdateState
    receiptsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.receiptId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
