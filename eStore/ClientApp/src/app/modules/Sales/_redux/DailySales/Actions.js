import * as requestFromServer from "./Crud";
import { dailySalesSlice, callTypes } from "./Slice";

//DailySale
//dailySale

const { actions } = dailySalesSlice;

export const fetchEmployees = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllEmployees()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
     // console.log(entities);
      dispatch(actions.employeesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Salesman list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchDailySales = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDailySales(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      dispatch(actions.dailySalesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDailySale = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.dailySaleFetched({ dailySaleForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDailySaleById(id)
    .then((response) => {
      const dailySale = response.data;
    //  console.log(response);
      
      dispatch(actions.dailySaleFetched({ dailySaleForEdit: dailySale }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDailySale = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDailySale(id)
    .then((response) => {
      dispatch(actions.dailySaleDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDailySale = (dailySaleForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDailySale(JSON.stringify(dailySaleForCreation))
    .then((response) => {
      const dailySale = response.data;
      dispatch(actions.dailySaleCreated({ dailySale }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDailySale = (dailySale) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDailySale(dailySale)
    .then(() => {
      console.log(dailySale);
      dispatch(actions.dailySaleUpdated({ dailySale }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDailySalesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDailySales(ids, status)
    .then(() => {
      dispatch(actions.dailySalesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Daily Sale status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDailySales = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDailySales(ids)
    .then(() => {
      dispatch(actions.dailySalesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Daily Sale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
