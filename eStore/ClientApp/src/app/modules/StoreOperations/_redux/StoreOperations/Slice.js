import { createSlice } from "@reduxjs/toolkit";

const initialStoreOperationsState = {
  listLoading: false,
  actionsLoading: false,
  lastError: null,
  totalOpens: 0,
  entitiesOpens: null,
  openForEdit: undefined,
  totalCloses: 0,
  entitiesCloses: null,
  closeForEdit: undefined,
  totalHolidays: 0,
  entitiesHolidays: null,
  holidayForEdit: undefined,
  entitiesStoreOperations: undefined,
  storeOperationForEdit: undefined,
  totalSO: 0,
  storeStatus:null, 
  storeNDays:false,
  attendances:null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const storeOperationsSlice = createSlice({
  name: "storeOperations",
  initialState: initialStoreOperationsState,
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
    // findStoreOpens
    storeOperationsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entitiesStoreOperations = entities;
      state.totalSO = totalCount;
    },

    storeStatusFetched:(state, action)=>{
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.storeStatus = entities;
      
    },
    //storeOpensById
    storeOpenFetched: (state, action) => {
      state.actionsLoading = false;
      state.openForEdit = action.payload.openForEdit;
      state.error = null;
    },
    // findstoreOpenss
    storeOpensFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entitiesOpens = entities;
      state.totalOpens = totalCount;
    },
    //storeOpensById
    storeCloseFetched: (state, action) => {
      state.actionsLoading = false;
      state.closeForEdit = action.payload.closeForEdit;
      state.error = null;
    },
    // findstoreOpenss
    storeClosesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entitiesCloses = entities;
      state.totalCloses = totalCount;
    },
    //storeOpensById
    storeHolidayFetched: (state, action) => {
      state.actionsLoading = false;
      state.holidayForEdit = action.payload.holidayForEdit;
      state.error = null;
    },
    // findstoreHolidayss
    storeHolidaysFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entitiesHolidays = entities;
      state.totalHolidays = totalCount;
    },

    // createstoreOpens
    storeOpenCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entitiesOpens.push(action.payload.storeOpen);
    },
    // updatestoreOpens
    storeOpenUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesOpens = state.entitiesOpens.map((entity) => {
        if (entity.storeOpenId === action.payload.storeOpen.storeOpenId) {
          return action.payload.storeOpen;
        }
        return entity;
      });
    },
    // deletestoreOpens
    storeOpenDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesOpens = state.entitiesOpens.filter(
        (el) => el.storeOpenId !== action.payload.storeOpenId
      );
    },
    // deletestoreOpenss
    storeOpensDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesOpens = state.entitiesOpens.filter(
        (el) => !action.payload.ids.includes(el.storeOpenId)
      );
    },
    // createstoreOpens
    storeCloseCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entitiesCloses.push(action.payload.storeClose);
    },
    // updatestoreOpens
    storeCloseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesCloses = state.entitiesCloses.map((entity) => {
        if (entity.storeCloseId === action.payload.storeClose.storeCloseId) {
          return action.payload.storeClose;
        }
        return entity;
      });
    },
    // deletestoreOpens
    storeCloseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesCloses = state.entitiesCloses.filter(
        (el) => el.storeCloseId !== action.payload.storeCloseId
      );
    },
    // deletestoreOpens
    storeClosesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesCloses = state.entitiesCloses.filter(
        (el) => !action.payload.ids.includes(el.storeCloseId)
      );
    },

    // createstoreOpens
    storeHolidayCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entitiesHolidays.push(action.payload.storeHoliday);
    },
     // createstoreOpens
     storeClosedCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.attendances =action.payload.attendances;
    },
     // createstoreOpens
     storeClosedNDaysCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.storeNDays=action.payload.nDays;
    },
    // updatestoreOpens
    storeHolidayUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesHolidays = state.entitiesHolidays.map((entity) => {
        if (
          entity.storeHolidayId === action.payload.storeHoliday.storeHolidayId
        ) {
          return action.payload.storeHoliday;
        }
        return entity;
      });
    },
    // deletestoreOpens
    storeHolidayDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesHolidays = state.entitiesHolidays.filter(
        (el) => el.storeHolidayId !== action.payload.storeHolidayID
      );
    },
    // deletestoreOpens
    storeHolidaysDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entitiesHolidays = state.entitiesHolidays.filter(
        (el) => !action.payload.ids.includes(el.storeHolidayId)
      );
    },
  }, //End of Reduers
});
