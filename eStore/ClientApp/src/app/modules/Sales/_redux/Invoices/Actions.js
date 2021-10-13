import * as requestFromServer from "./Crud";
import { invoicesSlice, callTypes } from "./Slice";

//Invoice
//invoice

const { actions } = invoicesSlice;

export const fetchEmployees = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllEmployees()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
     // console.log(entities);
      dispatch(actions.employeesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Salesman list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchInvoices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInvoices(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      dispatch(actions.invoicesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchInvoice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.invoiceFetched({ invoiceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInvoiceById(id)
    .then((response) => {
      const invoice = response.data;
    //  console.log(response);
      
      dispatch(actions.invoiceFetched({ invoiceForEdit: invoice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchGenInvoice = (invoiceType) => (dispatch) => {
  if (!invoiceType) {
    return dispatch(actions.invoiceGenFetched({ lastInvoiceNumber: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getGenerateInvoice(invoiceType)
    .then((response) => {
      const invoice = response.data;
      console.log(response);
      dispatch(actions.invoiceFetched({ lastInvoiceNumber: invoice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't Generate Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteInvoice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInvoice(id)
    .then((response) => {
      dispatch(actions.invoiceDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createInvoice = (invoiceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInvoice(JSON.stringify(invoiceForCreation))
    .then((response) => {
      const invoice = response.data;
      dispatch(actions.invoiceCreated({ invoice }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateInvoice = (invoice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInvoice(invoice)
    .then(() => {
      console.log(invoice);
      dispatch(actions.invoiceUpdated({ invoice }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateInvoicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInvoices(ids, status)
    .then(() => {
      dispatch(actions.invoicesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Invoice status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteInvoices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInvoices(ids)
    .then(() => {
      dispatch(actions.invoicesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
