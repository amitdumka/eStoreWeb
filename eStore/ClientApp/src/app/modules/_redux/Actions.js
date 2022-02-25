// import { isConstructorDeclaration } from "typescript";
import * as requestFromServer from "./Crud";
import { commonTypesSlice, callTypes } from "./Slice";

const { actions } = commonTypesSlice;

export const fetchEnumValue = (enumName) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getEnumType(enumName)
    .then((response) => {
      const entities = response.data;
      console.log(enumName);
      console.log(entities);

      dispatch(actions.enumValueFetched({ enumName, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = `$"Can't load {enumName} list"`;
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchStores = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  const tName = "stores";
  return requestFromServer
    .getStores()
    .then((response) => {
      const entities = response.data;
      //console.log(entities);
      dispatch(actions.storesFetched({ tName, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = `$"Can't load Store list"`;
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchSalesmen = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getSalesmen()
    .then((response) => {
      const entities = response.data;
      //console.log(entities);
      dispatch(actions.salesmenFetched({ entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = `$"Can't load Salesmen list"`;
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchProductStocks = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getProductStocks()
    .then((response) => {
      const entities = response.data;
      //console.log(entities);
      dispatch(actions.storesFetched({ entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = `$"Can't load ProductStock  list"`;
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};
