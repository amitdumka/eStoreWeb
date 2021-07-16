import * as requestFromServer from "./Crud";
import {connectionsSlice, callTypes} from "./Slice";

//Connection
//connection

const {actions} = connectionsSlice;

export const fetchConnections = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findConnections(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.connectionsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find connections";
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
export const fetchConnection = id => dispatch => {
  if (!id) {
    return dispatch(actions.connectionFetched({ connectionForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getConnectionById(id)
    .then(response => {
      const connection = response.data;
      dispatch(actions.connectionFetched({ connectionForEdit: connection }));
    })
    .catch(error => {
      error.clientMessage = "Can't find connection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteConnection = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteConnection(id)
    .then(response => {
      dispatch(actions.connectionDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete connection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createConnection = connectionForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createConnection(JSON.stringify( connectionForCreation))
    .then(response => {
      const  connection  = response.data;
     // console.log(response.data);
      dispatch(actions.connectionCreated({ connection }));
    })
    .catch(error => {
      error.clientMessage = "Can't create connection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateConnection = connection => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateConnection(connection)
    .then(() => {
      dispatch(actions.connectionUpdated({ connection }));
    })
    .catch(error => {
      error.clientMessage = "Can't update connection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateConnectionsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForConnections(ids, status)
    .then(() => {
      dispatch(actions.connectionsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update connections status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteConnections = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteConnections(ids)
    .then(() => {

      dispatch(actions.connectionsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete connections";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

