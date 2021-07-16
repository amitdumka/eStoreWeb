import * as requestFromServer from "./Crud";
import { cashReceiptsSlice, callTypes } from "./Slice";

//CashReceipt
//cashReceipt

const { actions } = cashReceiptsSlice;

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



export const fetchTranscations = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllTranscations()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.transcationsListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load employees list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchCashReceipts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCashReceipts(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      
      dispatch(actions.cashReceiptsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find cashReceipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCashReceipt = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.cashReceiptFetched({ cashReceiptForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCashReceiptById(id)
    .then((response) => {
      const cashReceipt = response.data;
      dispatch(actions.cashReceiptFetched({ cashReceiptForEdit: cashReceipt }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashReceipt = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashReceipt(id)
    .then((response) => {
      dispatch(actions.cashReceiptDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete cashReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCashReceipt = (cashReceiptForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCashReceipt(JSON.stringify(cashReceiptForCreation))
    .then((response) => {
      const cashReceipt = response.data;
      dispatch(actions.cashReceiptCreated({ cashReceipt }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create cashReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashReceipt = (cashReceipt) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCashReceipt(cashReceipt)
    .then(() => {
      console.log(cashReceipt);
      dispatch(actions.cashReceiptUpdated({ cashReceipt }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update cashReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashReceiptsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCashReceipts(ids, status)
    .then(() => {
      dispatch(actions.cashReceiptsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cashReceipts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashReceipts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashReceipts(ids)
    .then(() => {
      dispatch(actions.cashReceiptsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashReceipts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
