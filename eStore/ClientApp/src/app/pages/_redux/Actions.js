import * as requestFromServer from "./Crud";
import { commonPageTypesSlice, callTypes } from "./Slice";


const { actions } = commonPageTypesSlice;


export const resetTailor=()=>(dispatch)=>{

    dispatch(actions.startCall({ callType: callTypes.list }));
    const entities = null;
    const totalCount = 0;
    dispatch(actions.tailoringCheckFetched({ totalCount, entities }));
};

export const resetDupInv=()=>(dispatch)=>{

    dispatch(actions.startCall({ callType: callTypes.list }));
    const entities = null;
    const totalCount = 0;
    dispatch(actions.duplicateInvCheckFetched({ totalCount, entities }));
};


export const fetchTailoringCheck = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getTailoringChecks(id)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      dispatch(actions.tailoringCheckFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get tailoring check Infomation from server";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};



export const fetchDuplicateInvCheck = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getDuplicateInvChecks(id)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.duplicateInvCheckFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't get duplicate list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

