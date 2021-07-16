import {createSlice} from "@reduxjs/toolkit";



//CashPayment
//cashPayment

const initialCashPaymentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashPaymentForEdit: undefined,
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

export const cashPaymentsSlice = createSlice({
  name: "cashPayments",
  initialState: initialCashPaymentsState,
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
    // getCashPaymentById
    cashPaymentFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashPaymentForEdit = action.payload.cashPaymentForEdit;
      state.error = null;
    },
    // findCashPayments
    cashPaymentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCashPayment
    cashPaymentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.cashPayment);
    },
    // updateCashPayment
    cashPaymentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.cashPaymentId === action.payload.cashPayment.cashPaymentId) {
          return action.payload.cashPayment;
        }
        return entity;
      });
    },
    // deleteCashPayment
    cashPaymentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.cashPaymentId !== action.payload.cashPaymentId);
    },
    // deleteCashPayments
    cashPaymentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.cashPaymentId)
      );
    },

    
    // cashPaymentsUpdateState
    cashPaymentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.cashPaymentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
