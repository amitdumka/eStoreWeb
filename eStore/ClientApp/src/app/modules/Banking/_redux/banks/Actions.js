import * as requestFromServer from "./Crud";
import {banksSlice, callTypes} from "./Slice";

//Bank
//bank

const {actions} = banksSlice;

export const fetchBanks = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBanks(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.banksFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find banks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBank = id => dispatch => {
  if (!id) {
    return dispatch(actions.bankFetched({ bankForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBankById(id)
    .then(response => {
      const bank = response.data;
      dispatch(actions.bankFetched({ bankForEdit: bank }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBank = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBank(id)
    .then(response => {
      dispatch(actions.bankDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBank = bankForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBank(JSON.stringify( bankForCreation))
    .then(response => {
      const  bank  = response.data;
     // console.log(response.data);
      dispatch(actions.bankCreated({ bank }));
    })
    .catch(error => {
      error.clientMessage = "Can't create bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBank = bank => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBank(bank)
    .then(() => {
      dispatch(actions.bankUpdated({ bank }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBanksStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBanks(ids, status)
    .then(() => {
      dispatch(actions.banksStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update banks status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBanks = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBanks(ids)
    .then(() => {

      dispatch(actions.banksDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete banks";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

