import {createSlice} from "@reduxjs/toolkit";



//StaffAdvanceReceipt
//staffAdvanceReceipt

const initialStaffAdvanceReceiptsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  staffAdvanceReceiptForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0, 
  partyEntities:null, totalCountParty:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const staffAdvanceReceiptsSlice = createSlice({
  name: "staffAdvanceReceipts",
  initialState: initialStaffAdvanceReceiptsState,
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
    // get All party List 
    partiesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.partyEntities=entities;
     state.totalCountParty=totalCount;

    },
    // getStaffAdvanceReceiptById
    staffAdvanceReceiptFetched: (state, action) => {
      state.actionsLoading = false;
      state.staffAdvanceReceiptForEdit = action.payload.staffAdvanceReceiptForEdit;
      state.error = null;
    },
    // findStaffAdvanceReceipts
    staffAdvanceReceiptsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createStaffAdvanceReceipt
    staffAdvanceReceiptCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.staffAdvanceReceipt);
    },
    // updateStaffAdvanceReceipt
    staffAdvanceReceiptUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.staffAdvanceReceiptId === action.payload.staffAdvanceReceipt.staffAdvanceReceiptId) {
          return action.payload.staffAdvanceReceipt;
        }
        return entity;
      });
    },
    // deleteStaffAdvanceReceipt
    staffAdvanceReceiptDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.staffAdvanceReceiptId !== action.payload.staffAdvanceReceiptId);
    },
    // deleteStaffAdvanceReceipts
    staffAdvanceReceiptsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.staffAdvanceReceiptId)
      );
    },

    
    // staffAdvanceReceiptsUpdateState
    staffAdvanceReceiptsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.staffAdvanceReceiptId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
