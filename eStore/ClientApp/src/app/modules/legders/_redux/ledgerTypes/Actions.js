import * as requestFromServer from "./Crud";
import { ledgerTypesSlice, callTypes } from "./Slice";

const { actions } = ledgerTypesSlice;

//ledgerType
//LedgerType
export const fetchLedgerCategory = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getLedgerCategory()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.ledgerCategoryFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't load Category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLedgerTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLedgerTypes(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.ledgerTypesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find ledgerTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLedgerType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.ledgerTypeFetched({ ledgerTypeForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLedgerTypeById(id)
    .then((response) => {
      const ledgerType = response.data;
      dispatch(actions.ledgerTypeFetched({ ledgerTypeForEdit: ledgerType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find ledgerType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLedgerType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLedgerType(id)
    .then((response) => {
      dispatch(actions.ledgerTypeDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete ledgerType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createLedgerType = (ledgerTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLedgerType(JSON.stringify(ledgerTypeForCreation))
    .then((response) => {
      const ledgerType = response.data;
      // console.log(response.data);
      dispatch(actions.ledgerTypeCreated({ ledgerType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create ledgerType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLedgerType = (ledgerType) => (dispatch) => {
  console.log(ledgerType);

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLedgerType(ledgerType)
    .then(() => {
      dispatch(actions.ledgerTypeUpdated({ ledgerType }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update ledgerType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLedgerTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLedgerTypes(ids, status)
    .then(() => {
      dispatch(actions.ledgerTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update ledgerTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLedgerTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLedgerTypes(ids)
    .then(() => {
      dispatch(actions.ledgerTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete ledgerTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
