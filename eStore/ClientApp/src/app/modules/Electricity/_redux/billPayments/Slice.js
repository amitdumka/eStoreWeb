import {createSlice} from "@reduxjs/toolkit";



//BillPayment
//billPayment


const initialBillPaymentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billPaymentForEdit: undefined,
  lastError: null, 
  connectionList:null, 
  billList:null, 
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const billPaymentsSlice = createSlice({
  name: "billPayments",
  initialState: initialBillPaymentsState,
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
    connectionsFetched: function(state, action){
      const{entities}=action.payload;
      state.actionsLoading=false;
      state.listLoading =false;
      state.error=null;
      state.connectionList=entities;
      
    },
    // get All bank List 
    billsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.billList=entities;
     
    },
    // getBillPaymentById
    billPaymentFetched: (state, action) => {
      state.actionsLoading = false;
      state.billPaymentForEdit = action.payload.billPaymentForEdit;
      state.error = null;
    },
    // findBillPayments
    billPaymentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBillPayment
    billPaymentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.billPayment);
    },
    // updateBillPayment
    billPaymentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.eBillPaymentId === action.payload.billPayment.eBillPaymentId) {
          return action.payload.billPayment;
        }
        return entity;
      });
    },
    // deleteBillPayment
    billPaymentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.eBillPaymentId !== action.payload.eBillPaymentId);
    },
    // deleteBillPayments
    billPaymentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.eBillPaymentId)
      );
    },
    
    // billPaymentsUpdateState
    billPaymentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.eBillPaymentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
