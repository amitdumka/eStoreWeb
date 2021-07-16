import * as requestFromServer from "./Crud";
import { purchaseTaxesSlice, callTypes } from "./Slice";

const { actions } = purchaseTaxesSlice;

//purchaseTaxes
//PurchaseTaxes
//purchaseTax
//PurchaseTax

export const fetchTaxType = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getTaxType()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.taxTypeFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't load Category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPurchaseTaxes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPurchaseTaxes(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.purchaseTaxesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find purchaseTaxes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPurchaseTax = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.purchaseTaxFetched({ purchaseTaxForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPurchaseTaxById(id)
    .then((response) => {
      const purchaseTax = response.data;
      dispatch(actions.purchaseTaxFetched({ purchaseTaxForEdit: purchaseTax }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find purchaseTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePurchaseTax = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePurchaseTax(id)
    .then((response) => {
      dispatch(actions.purchaseTaxDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete purchaseTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPurchaseTax = (purchaseTaxForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPurchaseTax(JSON.stringify(purchaseTaxForCreation))
    .then((response) => {
      const purchaseTax = response.data;
      // console.log(response.data);
      dispatch(actions.purchaseTaxCreated({ purchaseTax }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create purchaseTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePurchaseTax = (purchaseTax) => (dispatch) => {
  console.log(purchaseTax);

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePurchaseTax(purchaseTax)
    .then(() => {
      dispatch(actions.purchaseTaxUpdated({ purchaseTax }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update purchaseTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePurchaseTaxesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPurchaseTaxes(ids, status)
    .then(() => {
      dispatch(actions.purchaseTaxesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update purchaseTaxes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePurchaseTaxes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePurchaseTaxes(ids)
    .then(() => {
      dispatch(actions.purchaseTaxesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete purchaseTaxes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
