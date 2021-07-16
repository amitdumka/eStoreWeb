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
      //console.log("Enum Name:" + enumName);
      //console.log(entities);
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
const tName="stores";
  return requestFromServer
    .getStores()
    .then((response) => {
      const entities = response.data;
      //console.log(entities);
      dispatch(actions.storesFetched({ tName,entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = `$"Can't load Store list"`;
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

