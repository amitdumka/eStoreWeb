import * as requestFromServer from "./Crud";
import {contactsSlice, callTypes} from "./Slice";


//Contact
//contact


const {actions} = contactsSlice;

export const fetchContacts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findContacts(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.contactsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find contacts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchContact = id => dispatch => {
  if (!id) {
    return dispatch(actions.contactFetched({ contactForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getContactById(id)
    .then(response => {
      const contact = response.data;
      console.log(contact);
      dispatch(actions.contactFetched({ contactForEdit: contact }));
    })
    .catch(error => {
      error.clientMessage = "Can't find contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteContact = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteContact(id)
    .then(response => {
      dispatch(actions.contactDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createContact = contactForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(contactForCreation);
  return requestFromServer
    .createContact(JSON.stringify( contactForCreation))
    .then(response => {
      const  contact  = response.data;
      console.log(response.data);
      dispatch(actions.contactCreated({ contact }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateContact = contact => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(contact);
  return requestFromServer
    .updateContact(contact)
    .then(() => {
      console.log(contact);
      dispatch(actions.contactUpdated({ contact }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateContactsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForContacts(ids, status)
    .then(() => {
      dispatch(actions.contactsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update contacts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteContacts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteContacts(ids)
    .then(() => {

      dispatch(actions.contactsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete contacts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

