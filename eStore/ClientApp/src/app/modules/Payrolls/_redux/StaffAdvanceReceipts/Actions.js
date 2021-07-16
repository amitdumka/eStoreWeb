import * as requestFromServer from "./Crud";
import { staffAdvanceReceiptsSlice, callTypes } from "./Slice";

//StaffAdvanceReceipt
//staffAdvanceReceipt

const { actions } = staffAdvanceReceiptsSlice;

export const fetchEmployees = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllEmployees()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.employeesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load employees list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchParties = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllParties()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.partiesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Party list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchStaffAdvanceReceipts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findStaffAdvanceReceipts(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.staffAdvanceReceiptsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find staffAdvanceReceipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStaffAdvanceReceipt = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.staffAdvanceReceiptFetched({
        staffAdvanceReceiptForEdit: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStaffAdvanceReceiptById(id)
    .then((response) => {
      const staffAdvanceReceipt = response.data;
      dispatch(
        actions.staffAdvanceReceiptFetched({
          staffAdvanceReceiptForEdit: staffAdvanceReceipt,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find staffAdvanceReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStaffAdvanceReceipt = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStaffAdvanceReceipt(id)
    .then((response) => {
      dispatch(actions.staffAdvanceReceiptDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete staffAdvanceReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStaffAdvanceReceipt = (staffAdvanceReceiptForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStaffAdvanceReceipt(JSON.stringify(staffAdvanceReceiptForCreation))
    .then((response) => {
      const staffAdvanceReceipt = response.data;
      console.log(response.data);
      dispatch(actions.staffAdvanceReceiptCreated({ staffAdvanceReceipt }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create staffAdvanceReceipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStaffAdvanceReceipt = (staffAdvanceReceipt) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStaffAdvanceReceipt(staffAdvanceReceipt)
    .then(() => {
      console.log(staffAdvanceReceipt);
      dispatch(actions.staffAdvanceReceiptUpdated({ staffAdvanceReceipt }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update staff Advance Receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStaffAdvanceReceiptsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForStaffAdvanceReceipts(ids, status)
    .then(() => {
      dispatch(actions.staffAdvanceReceiptsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update staffAdvanceReceipts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStaffAdvanceReceipts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStaffAdvanceReceipts(ids)
    .then(() => {
      dispatch(actions.staffAdvanceReceiptsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete staffAdvanceReceipts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
