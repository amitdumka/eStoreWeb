import {createSlice} from "@reduxjs/toolkit";



//Payment
//payment

const initialPaymentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  paymentForEdit: undefined,
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

export const paymentsSlice = createSlice({
  name: "payments",
  initialState: initialPaymentsState,
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
    // getPaymentById
    paymentFetched: (state, action) => {
      state.actionsLoading = false;
      state.paymentForEdit = action.payload.paymentForEdit;
      state.error = null;
    },
    // findPayments
    paymentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPayment
    paymentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.payment);
    },
    // updatePayment
    paymentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.paymentId === action.payload.payment.paymentId) {
          return action.payload.payment;
        }
        return entity;
      });
    },
    // deletePayment
    paymentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.paymentId !== action.payload.paymentId);
    },
    // deletePayments
    paymentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.paymentId)
      );
    },

    
    // paymentsUpdateState
    paymentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.paymentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
