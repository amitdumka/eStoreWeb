import * as requestFromServer from "./Crud";
import {rentsSlice, callTypes} from "./Slice";


//Rent
//rent


const {actions} = rentsSlice;



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
export const fetchRentTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getRentTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.rentTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load rent type list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchLocations =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getRentedLocations()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.rentedLocationsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load rent location list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchRents = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRents(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.rentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find rents";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRent = id => dispatch => {
  if (!id) {
    return dispatch(actions.rentFetched({ rentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRentById(id)
    .then(response => {
      const rent = response.data;
      console.log(rent);
      dispatch(actions.rentFetched({ rentForEdit: rent }));
    })
    .catch(error => {
      error.clientMessage = "Can't find rent";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRent = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRent(id)
    .then(response => {
      dispatch(actions.rentDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete rent";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRent = rentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(rentForCreation);
  return requestFromServer
    .createRent(JSON.stringify( rentForCreation))
    .then(response => {
      const  rent  = response.data;
      console.log(response.data);
      dispatch(actions.rentCreated({ rent }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create rent";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRent = rent => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(rent);
  return requestFromServer
    .updateRent(rent)
    .then(() => {
      console.log(rent);
      dispatch(actions.rentUpdated({ rent }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update rent";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRentsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRents(ids, status)
    .then(() => {
      dispatch(actions.rentsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update rents status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRents = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRents(ids)
    .then(() => {

      dispatch(actions.rentsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete rents";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

