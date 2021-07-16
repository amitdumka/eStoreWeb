import * as requestFromServer from "./Crud";
import {partiesSlice, callTypes} from "./Slice";


//Party
//party
//Parties
//parties


const {actions} = partiesSlice;

export const fetchledgerTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getAllLedgerTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    //console.log(entities);
    dispatch(actions.ledgerTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Ledger Types"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchParties = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findParties(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      //console.log(response);
      //console.log(response.data.length);
      dispatch(actions.partiesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find parties";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchParty = id => dispatch => {
  if (!id) {
    return dispatch(actions.partyFetched({ partyForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPartyById(id)
    .then(response => {
      const party = response.data;
      //console.log(party);
      dispatch(actions.partyFetched({ partyForEdit: party }));
    })
    .catch(error => {
      error.clientMessage = "Can't find party";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteParty = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteParty(id)
    .then(response => {
      dispatch(actions.partyDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete party";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createParty = partyForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(partyForCreation);
  return requestFromServer
    .createParty(JSON.stringify( partyForCreation))
    .then(response => {
      const  party  = response.data;
      //console.log(response.data);
      dispatch(actions.partyCreated({ party }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create party";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateParty = party => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(party);
  return requestFromServer
    .updateParty(party)
    .then(() => {
      console.log(party);
      dispatch(actions.partyUpdated({ party }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update party";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePartiesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForParties(ids, status)
    .then(() => {
      dispatch(actions.partiesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update parties status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteParties = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteParties(ids)
    .then(() => {

      dispatch(actions.partiesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete parties";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

