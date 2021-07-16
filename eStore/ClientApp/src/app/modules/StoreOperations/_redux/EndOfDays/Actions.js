import * as requestFromServer from "./Crud";
import {endOfDaysSlice, callTypes} from "./Slice";


//EndOfDay
//endOfDay


const {actions} = endOfDaysSlice;



export const fetchPayModes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getPayModes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.payModesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load paymode list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchEndOfDayTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getEndOfDayTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.endOfDayTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load endOfDay type list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchLocations =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getEndOfDayedLocations()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.endOfDayedLocationsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load endOfDay location list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchEndOfDays = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEndOfDays(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.endOfDaysFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find endOfDays";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchEndOfDay = id => dispatch => {
  if (!id) {
    return dispatch(actions.endOfDayFetched({ endOfDayForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEndOfDayById(id)
    .then(response => {
      const endOfDay = response.data;
      console.log(endOfDay);
      dispatch(actions.endOfDayFetched({ endOfDayForEdit: endOfDay }));
    })
    .catch(error => {
      error.clientMessage = "Can't find endOfDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEndOfDay = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEndOfDay(id)
    .then(response => {
      dispatch(actions.endOfDayDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete endOfDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createEndOfDay = endOfDayForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(endOfDayForCreation);
  return requestFromServer
    .createEndOfDay(JSON.stringify( endOfDayForCreation))
    .then(response => {
      const  endOfDay  = response.data;
      console.log(response.data);
      dispatch(actions.endOfDayCreated({ endOfDay }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create endOfDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEndOfDay = endOfDay => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(endOfDay);
  return requestFromServer
    .updateEndOfDay(endOfDay)
    .then(() => {
      console.log(endOfDay);
      dispatch(actions.endOfDayUpdated({ endOfDay }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update endOfDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEndOfDaysStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEndOfDays(ids, status)
    .then(() => {
      dispatch(actions.endOfDaysStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update endOfDays status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEndOfDays = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEndOfDays(ids)
    .then(() => {

      dispatch(actions.endOfDaysDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete endOfDays";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

