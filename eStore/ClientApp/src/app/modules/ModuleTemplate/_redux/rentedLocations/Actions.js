import * as requestFromServer from "./Crud";
import {rentedLocationsSlice, callTypes} from "./Slice";

//RentedLocation
//rentedLocation

const {actions} = rentedLocationsSlice;

export const fetchRentedLocations = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRentedLocations(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.rentedLocationsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find rentedLocations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
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
export const fetchRentedLocation = id => dispatch => {
  if (!id) {
    return dispatch(actions.rentedLocationFetched({ rentedLocationForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRentedLocationById(id)
    .then(response => {
      const rentedLocation = response.data;
      dispatch(actions.rentedLocationFetched({ rentedLocationForEdit: rentedLocation }));
    })
    .catch(error => {
      error.clientMessage = "Can't find rentedLocation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRentedLocation = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRentedLocation(id)
    .then(response => {
      dispatch(actions.rentedLocationDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete rentedLocation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRentedLocation = rentedLocationForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRentedLocation(JSON.stringify( rentedLocationForCreation))
    .then(response => {
      const  rentedLocation  = response.data;
     // console.log(response.data);
      dispatch(actions.rentedLocationCreated({ rentedLocation }));
    })
    .catch(error => {
      error.clientMessage = "Can't create rentedLocation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRentedLocation = rentedLocation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRentedLocation(rentedLocation)
    .then(() => {
      dispatch(actions.rentedLocationUpdated({ rentedLocation }));
    })
    .catch(error => {
      error.clientMessage = "Can't update rentedLocation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRentedLocationsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRentedLocations(ids, status)
    .then(() => {
      dispatch(actions.rentedLocationsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update rentedLocations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRentedLocations = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRentedLocations(ids)
    .then(() => {

      dispatch(actions.rentedLocationsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete rentedLocations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

