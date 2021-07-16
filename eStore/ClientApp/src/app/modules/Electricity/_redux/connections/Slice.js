import {createSlice} from "@reduxjs/toolkit";

//Connection
//connection

const initialConnectionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rentTypes:null,
  connectionForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const connectionsSlice = createSlice({
  name: "connections",
  initialState: initialConnectionsState,
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
    // getConnectionById
    connectionFetched: (state, action) => {
      state.actionsLoading = false;
      state.connectionForEdit = action.payload.connectionForEdit;
      state.error = null;
    },
    // findConnections
    connectionsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    rentTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.rentTypes=entities;
     
    },
    // createConnection
    connectionCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.connection);
    },
    // updateConnection
    connectionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.electricityConnectionId === action.payload.connection.electricityConnectionId) {
          return action.payload.connection;
        }
        return entity;
      });
    },
    // deleteConnection
    connectionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.electricityConnectionId !== action.payload.electricityConnectionId);
    },
    // deleteConnections
    connectionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.electricityConnectionId)
      );
    },
    // connectionsUpdateState
    connectionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.electricityConnectionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
