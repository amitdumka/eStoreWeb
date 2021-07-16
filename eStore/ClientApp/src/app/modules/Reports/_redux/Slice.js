import {createSlice} from "@reduxjs/toolkit";

//Report
//report

const initialReportsState = {
  listLoading: false,
  actionsLoading: false,
  lastError: null,
  totalCount: 0,
  entities: null,
  incomeExpensesEntities: undefined,

};
export const callTypes = {
  list: "list",
  action: "action"
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState: initialReportsState,
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

    incomeExpensesFetched:(state, action)=>{
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.incomeExpensesEntities = entities;
    },
    // // getReportById
    // reportFetched: (state, action) => {
    //   state.actionsLoading = false;
    //   state.reportForEdit = action.payload.reportForEdit;
    //   state.error = null;
    // },
    // // findReports
    // reportsFetched: (state, action) => {
    //   const { totalCount, entities } = action.payload;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.entities = entities;
    //   state.totalCount = totalCount;
    // },
    
    
    
  }
});
