import {createSlice} from "@reduxjs/toolkit";



//Bill
//bill


const initialBillsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billForEdit: undefined,
  lastError: null, 
  connectionList: null,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const billsSlice = createSlice({
  name: "bills",
  initialState: initialBillsState,
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
    // getBillById
    billFetched: (state, action) => {
      state.actionsLoading = false;
      state.billForEdit = action.payload.billForEdit;
      state.error = null;
    },
    // findBills
    billsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBill
    billCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bill);
    },
    // updateBill
    billUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.eletricityBillId === action.payload.bill.eletricityBillId) {
          return action.payload.bill;
        }
        return entity;
      });
    },
    // deleteBill
    billDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.eletricityBillId !== action.payload.eletricityBillId);
    },
    // deleteBills
    billsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.eletricityBillId)
      );
    },
    
    // billsUpdateState
    billsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.eletricityBillId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
