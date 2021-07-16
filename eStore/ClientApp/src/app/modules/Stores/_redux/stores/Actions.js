import * as requestFromServer from "./Crud";
import {storesSlice, callTypes} from "./Slice";

const {actions} = storesSlice;

export const fetchStores = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findStores(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.storesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find stores";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStore = id => dispatch => {
  if (!id) {
    return dispatch(actions.storeFetched({ storeForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStoreById(id)
    .then(response => {
      const store = response.data;
      dispatch(actions.storeFetched({ storeForEdit: store }));
    })
    .catch(error => {
      error.clientMessage = "Can't find store";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStore = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStore(id)
    .then(response => {
      dispatch(actions.storeDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete store";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStore = storeForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStore(JSON.stringify( storeForCreation))
    .then(response => {
      const  store  = response.data;
     // console.log(response.data);
      dispatch(actions.storeCreated({ store }));
    })
    .catch(error => {
      error.clientMessage = "Can't create store";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStore = store => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStore(store)
    .then(() => {
      dispatch(actions.storeUpdated({ store }));
    })
    .catch(error => {
      error.clientMessage = "Can't update store";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStoresStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForStores(ids, status)
    .then(() => {
      dispatch(actions.storesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update stores status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStores = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStores(ids)
    .then(() => {

      dispatch(actions.storesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete stores";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

