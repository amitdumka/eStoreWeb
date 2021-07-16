import {createSlice} from "@reduxjs/toolkit";



//SalaryPayment
//salaryPayment

const initialSalaryPaymentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  salaryPaymentForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const salaryPaymentsSlice = createSlice({
  name: "salaryPayments",
  initialState: initialSalaryPaymentsState,
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
    // getSalaryPaymentById
    salaryPaymentFetched: (state, action) => {
      state.actionsLoading = false;
      state.salaryPaymentForEdit = action.payload.salaryPaymentForEdit;
      state.error = null;
    },
    // findSalaryPayments
    salaryPaymentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSalaryPayment
    salaryPaymentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.salaryPayment);
    },
    // updateSalaryPayment
    salaryPaymentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.salaryPaymentId === action.payload.salaryPayment.salaryPaymentId) {
          return action.payload.salaryPayment;
        }
        return entity;
      });
    },
    // deleteSalaryPayment
    salaryPaymentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.salaryPaymentId !== action.payload.salaryPaymentId);
    },
    // deleteSalaryPayments
    salaryPaymentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.salaryPaymentId)
      );
    },

    
    // salaryPaymentsUpdateState
    salaryPaymentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.salaryPaymentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
