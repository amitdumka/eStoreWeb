import * as requestFromServer from "./Crud";
import { cashPaymentsSlice, callTypes } from "./Slice";

//CashPayment
//cashPayment

const { actions } = cashPaymentsSlice;

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

export const fetchCashPayments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCashPayments(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      
      dispatch(actions.cashPaymentsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find cashPayments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCashPayment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.cashPaymentFetched({ cashPaymentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCashPaymentById(id)
    .then((response) => {
      const cashPayment = response.data;
      dispatch(actions.cashPaymentFetched({ cashPaymentForEdit: cashPayment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashPayment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashPayment(id)
    .then((response) => {
      dispatch(actions.cashPaymentDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete cashPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCashPayment = (cashPaymentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCashPayment(JSON.stringify(cashPaymentForCreation))
    .then((response) => {
      const cashPayment = response.data;
      dispatch(actions.cashPaymentCreated({ cashPayment }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create cashPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashPayment = (cashPayment) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCashPayment(cashPayment)
    .then(() => {
      console.log(cashPayment);
      dispatch(actions.cashPaymentUpdated({ cashPayment }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update cashPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashPaymentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCashPayments(ids, status)
    .then(() => {
      dispatch(actions.cashPaymentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cashPayments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashPayments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashPayments(ids)
    .then(() => {
      dispatch(actions.cashPaymentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashPayments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
