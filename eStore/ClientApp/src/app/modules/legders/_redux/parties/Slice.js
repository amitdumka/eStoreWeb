import { createSlice } from "@reduxjs/toolkit";

//Party
//party

//Parties
//parties

const initialPartiesState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  partyForEdit: undefined,
  lastError: null,
  ledgerTypes: null,
  totalCount:0
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const partiesSlice = createSlice({
  name: "parties",
  initialState: initialPartiesState,
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
    // get All bank List
    ledgerTypesFetched: function(state, action) {
      const { entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.ledgerTypes = entities;
    },
    // getPartyById
    partyFetched: (state, action) => {
      state.actionsLoading = false;
      state.partyForEdit = action.payload.partyForEdit;
      state.error = null;
    },
    // findParties
    partiesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createParty
    partyCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.party);
    },
    // updateParty
    partyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.partyId === action.payload.party.partyId) {
          return action.payload.party;
        }
        return entity;
      });
    },
    // deleteParty
    partyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.partyId !== action.payload.partyId
      );
    },
    // deleteParties
    partiesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.partyId)
      );
    },

    // partiesUpdateState
    partiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.partyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
