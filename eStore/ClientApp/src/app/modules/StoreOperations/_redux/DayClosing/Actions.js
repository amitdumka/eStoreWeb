import * as requestFromServer from "./Crud";
import {dayClosingsSlice, callTypes} from "./Slice";


//DayClosing
//dayClosing


const {actions} = dayClosingsSlice;



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
export const fetchDayClosingTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getDayClosingTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.dayClosingTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load dayClosing type list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchLocations =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getDayClosingedLocations()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.dayClosingedLocationsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load dayClosing location list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchDayClosings = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDayClosings(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.dayClosingsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find dayClosings";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDayClosing = id => dispatch => {
  if (!id) {
    return dispatch(actions.dayClosingFetched({ dayClosingForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDayClosingById(id)
    .then(response => {
      const dayClosing = response.data;
      console.log(dayClosing);
      dispatch(actions.dayClosingFetched({ dayClosingForEdit: dayClosing }));
    })
    .catch(error => {
      error.clientMessage = "Can't find dayClosing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDayClosing = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDayClosing(id)
    .then(response => {
      dispatch(actions.dayClosingDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete dayClosing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDayClosing = dayClosingForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(dayClosingForCreation);
  return requestFromServer
    .createDayClosing(JSON.stringify( dayClosingForCreation))
    .then(response => {
      const  dayClosing  = response.data;
      console.log(response.data);
      dispatch(actions.dayClosingCreated({ dayClosing }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create dayClosing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDayClosing = dayClosing => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(dayClosing);
  return requestFromServer
    .updateDayClosing(dayClosing)
    .then(() => {
      console.log(dayClosing);
      dispatch(actions.dayClosingUpdated({ dayClosing }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update dayClosing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDayClosingsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDayClosings(ids, status)
    .then(() => {
      dispatch(actions.dayClosingsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update dayClosings status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDayClosings = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDayClosings(ids)
    .then(() => {

      dispatch(actions.dayClosingsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete dayClosings";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

