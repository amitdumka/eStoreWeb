import * as requestFromServer from "./Crud";
import { transcationModesSlice, callTypes } from "./Slice";

//TranscationMode
//transcationMode

const { actions } = transcationModesSlice;

export const fetchParties = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllParty()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.partiesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load parties/Ledger list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};
export const fetchBankAccounts = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllBankAccount()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.bankAccountsListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Bank Accounts list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};



export const fetchEmployees = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllEmployees()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.employeesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load employees list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchTranscationModes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTranscationModes(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      
      dispatch(actions.transcationModesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find transcationModes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTranscationMode = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.transcationModeFetched({ transcationModeForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTranscationModeById(id)
    .then((response) => {
      const transcationMode = response.data;
      dispatch(actions.transcationModeFetched({ transcationModeForEdit: transcationMode }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find transcationMode";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTranscationMode = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTranscationMode(id)
    .then((response) => {
      dispatch(actions.transcationModeDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete transcationMode";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTranscationMode = (transcationModeForCreation) => (dispatch) => {
  console.log(transcationModeForCreation);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTranscationMode(JSON.stringify(transcationModeForCreation))
    .then((response) => {
      const transcationMode = response.data;
      dispatch(actions.transcationModeCreated({ transcationMode }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create transcationMode";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTranscationMode = (transcationMode) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTranscationMode(transcationMode)
    .then(() => {
      console.log(transcationMode);
      dispatch(actions.transcationModeUpdated({ transcationMode }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update transcationMode";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTranscationModesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTranscationModes(ids, status)
    .then(() => {
      dispatch(actions.transcationModesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update transcationModes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTranscationModes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTranscationModes(ids)
    .then(() => {
      dispatch(actions.transcationModesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete transcationModes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
