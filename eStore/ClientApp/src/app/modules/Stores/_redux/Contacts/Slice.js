import {createSlice} from "@reduxjs/toolkit";



//Contact
//contact


const initialContactsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  contactForEdit: undefined,
  lastError: null, 
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContactsState,
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
    payModesFetched: function(state, action){
      const{entities}=action.payload;
      state.actionsLoading=false;
      state.listLoading =false;
      state.error=null;
      state.payModes=entities;
      
    },
    contactTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.contactTypes=entities;
     
    },
    // get All bank List 
    contactedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.contactedLocations=entities;
     
    },
    // getContactById
    contactFetched: (state, action) => {
      state.actionsLoading = false;
      state.contactForEdit = action.payload.contactForEdit;
      state.error = null;
    },
    // findContacts
    contactsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createContact
    contactCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.contact);
    },
    // updateContact
    contactUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.contactId === action.payload.contact.contactId) {
          return action.payload.contact;
        }
        return entity;
      });
    },
    // deleteContact
    contactDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.contactId !== action.payload.contactId);
    },
    // deleteContacts
    contactsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.contactId)
      );
    },
    
    // contactsUpdateState
    contactsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.contactId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
