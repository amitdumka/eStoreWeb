import { createSlice } from "@reduxjs/toolkit";

//dashboard
//Dashboard

const initialDashboardState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  masterReportEntities: null,
  lastError: null,
  cashBookEntities: null,
  totalCashBook: 0,
  dailySaleEntities:null, 
  totalDailySale:0
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardSlice = createSlice({
  name: "dashboards",
  initialState: initialDashboardState,
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
    masterReportFetched: function(state, action) {
      const { entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.masterReportEntities = entities;
    },
    cashBookFetched: function(state, action) {
      const { entities, totalCount } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.cashBookEntities = entities;
      state.totalCashBook = totalCount;
    },
    dailySaleFetched: function(state, action) {
      const { entities, totalCount } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.dailySaleEntities = entities;
      state.totalDailySale = totalCount;
    },
  },
});
