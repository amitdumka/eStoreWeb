import * as requestFromServer from "./Crud";
import {deliveriesSlice, callTypes} from "./Slice";


//Delivery
//delivery
//Deliveries
//deliveries


const {actions} = deliveriesSlice;

export const fetchBookings =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getAllBookings()
  .then(response=>{
    const entities  = response.data; 
    console.log(entities);
    dispatch(actions.bookingsFetched({ entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Booking List"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchDeliveries = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDeliveries(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.deliveriesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find deliveries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDelivery = id => dispatch => {
  if (!id) {
    return dispatch(actions.deliveryFetched({ deliveryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDeliveryById(id)
    .then(response => {
      const delivery = response.data;
      console.log(delivery);
      dispatch(actions.deliveryFetched({ deliveryForEdit: delivery }));
    })
    .catch(error => {
      error.clientMessage = "Can't find delivery";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDelivery = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDelivery(id)
    .then(response => {
      dispatch(actions.deliveryDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete delivery";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDelivery = deliveryForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(deliveryForCreation);
  return requestFromServer
    .createDelivery(JSON.stringify( deliveryForCreation))
    .then(response => {
      const  delivery  = response.data;
      console.log(response.data);
      dispatch(actions.deliveryCreated({ delivery }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create delivery";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDelivery = delivery => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(delivery);
  return requestFromServer
    .updateDelivery(delivery)
    .then(() => {
      console.log(delivery);
      dispatch(actions.deliveryUpdated({ delivery }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update delivery";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDeliveriesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDeliveries(ids, status)
    .then(() => {
      dispatch(actions.deliveriesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update deliveries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDeliveries = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDeliveries(ids)
    .then(() => {

      dispatch(actions.deliveriesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete deliveries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

