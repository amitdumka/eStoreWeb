import {createSlice} from "@reduxjs/toolkit";



//Expense
//expense

const initialExpensesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  expenseForEdit: undefined,
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

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
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
    // getExpenseById
    expenseFetched: (state, action) => {
      state.actionsLoading = false;
      state.expenseForEdit = action.payload.expenseForEdit;
      state.error = null;
    },
    // findExpenses
    expensesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createExpense
    expenseCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.expense);
    },
    // updateExpense
    expenseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.expenseId === action.payload.expense.expenseId) {
          return action.payload.expense;
        }
        return entity;
      });
    },
    // deleteExpense
    expenseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.expenseId !== action.payload.expenseId);
    },
    // deleteExpenses
    expensesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.expenseId)
      );
    },

    
    // expensesUpdateState
    expensesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.expenseId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
