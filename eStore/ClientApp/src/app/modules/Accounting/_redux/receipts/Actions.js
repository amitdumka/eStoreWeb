import * as requestFromServer from "./Crud";
import { receiptsSlice, callTypes } from "./Slice";

//Receipt
//receipt

const { actions } = receiptsSlice;

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

export const fetchReceipts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findReceipts(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      
      dispatch(actions.receiptsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchReceipt = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.receiptFetched({ receiptForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getReceiptById(id)
    .then((response) => {
      const receipt = response.data;
      dispatch(actions.receiptFetched({ receiptForEdit: receipt }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteReceipt = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteReceipt(id)
    .then((response) => {
      dispatch(actions.receiptDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createReceipt = (receiptForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createReceipt(JSON.stringify(receiptForCreation))
    .then((response) => {
      const receipt = response.data;
      dispatch(actions.receiptCreated({ receipt }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateReceipt = (receipt) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateReceipt(receipt)
    .then(() => {
      console.log(receipt);
      dispatch(actions.receiptUpdated({ receipt }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateReceiptsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForReceipts(ids, status)
    .then(() => {
      dispatch(actions.receiptsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update receipts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteReceipts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteReceipts(ids)
    .then(() => {
      dispatch(actions.receiptsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete receipts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
