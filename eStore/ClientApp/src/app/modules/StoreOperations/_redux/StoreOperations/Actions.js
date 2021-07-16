import * as requestFromServer from "./Crud";
import { storeOperationsSlice, callTypes } from "./Slice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
const { actions } = storeOperationsSlice;

toast.configure();

export const fetchStoreStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getStoreStatus(id)
    .then((response) => {
      const storeStatus = response.data;
      dispatch(actions.storeStatusFetched({ entities: storeStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find store Status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchStoreOperations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getStoreOperations(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      dispatch(actions.storeOperationsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't find Store Operations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchStoreOpens = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllStoreOpens(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      //console.log(response);
      //console.log(response.data.length);
      dispatch(actions.storeOpensFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't find StoreOpen";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchStoreCloses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllStoreCloses(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      //console.log(response);
      //console.log(response.data.length);
      dispatch(actions.storeClosesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't find Store Close";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchStoreHolidays = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllStoreHolidays(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      // console.log(response);
      //console.log(response.data.length);
      dispatch(actions.storeHolidaysFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't find StoreOpen";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStoreOpen = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.storeOpenFetched({ openForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStoreOpenById(id)
    .then((response) => {
      const storeOpen = response.data;
      dispatch(actions.storeOpenFetched({ openForEdit: storeOpen }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find store Open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchStoreClose = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.storeCloseFetched({ closeForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStoreCloseById(id)
    .then((response) => {
      const storeClose = response.data;
      dispatch(actions.storeCloseFetched({ openForEdit: storeClose }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find store Close";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchStoreHoliday = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.storeHolidayFetched({ holidayForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStoreHolidayById(id)
    .then((response) => {
      const storeHoliday = response.data;
      dispatch(actions.storeHolidayFetched({ openForEdit: storeHoliday }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find store Holiday";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStoreOpen = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreOpen(id)
    .then((response) => {
      dispatch(actions.storeOpenDeleted({ id }));
    })
    .catch((error) => {
      //console.log("CD=" + error);
      error.clientMessage = "Can't delete Store Open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteStoreClose = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreClose(id)
    .then((response) => {
      dispatch(actions.storeCloseDeleted({ id }));
    })
    .catch((error) => {
      //console.log("CD=" + error);
      error.clientMessage = "Can't delete Store Close";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStoreHoliday = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreHoliday(id)
    .then((response) => {
      dispatch(actions.storeHolidayDeleted({ id }));
    })
    .catch((error) => {
      //console.log("CD=" + error);
      error.clientMessage = "Can't delete Store Holiday";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createNDaysHoliday = (openForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStoreClosedForNDays(JSON.stringify(openForCreation))
    .then((response) => {
      const nDays = response.data;
      console.log(response.data);
      console.log(response);
      dispatch(actions.storeClosedNDaysCreated({ nDays }));
      if (nDays === true) {
        toast.success(
          "Successfully save Store Holidays/Closed and marked Attendance for all Employees, Check Attendance Page for Details!",
          { position: toast.POSITION.TOP_CENTER }
        );
      } else {
        toast.error(
          "It fails to add store close and marked attendance, Kindly check store Holiday and Attendances Pages",
          { position: toast.POSITION.TOP_CENTER }
        );
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't create Store Open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createStoreHolidayWithAttendance = (openForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStoreClosed(JSON.stringify(openForCreation))
    .then((response) => {
      const attendances = response.data;
      console.log(response);
      console.log(response.data);
      dispatch(actions.storeClosedCreated({ attendances }));
      if (response.data.length > 0) {
        toast.success(
          "Successfully save Store Holidays/Closed and marked Attendance for all Employees, Check Attendance Page for Details!",
          { position: toast.POSITION.TOP_CENTER }
        );
        ShowAttendances();
        //TODO: Show  All Employee Marked Attendance in Modal
      } else {
        toast.error(
          "It fails to add store close and marked attendance, Kindly check store Holiday and Attendances Pages",
          { position: toast.POSITION.TOP_CENTER }
        );
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't create Store Open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStoreOpen = (openForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStoreOpen(JSON.stringify(openForCreation))
    .then((response) => {
      const storeOpen = response.data;
      //console.log(response.data);
      dispatch(actions.storeOpenCreated({ storeOpen }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create Store Open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStoreClose = (closeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStoreClose(JSON.stringify(closeForCreation))
    .then((response) => {
      const storeClose = response.data;
      //console.log(response.data);
      dispatch(actions.storeOpenCreated({ storeClose }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create Store Close";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStoreHoliday = (holidayForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStoreHoliday(JSON.stringify(holidayForCreation))
    .then((response) => {
      const storeHoliday = response.data;
      //console.log(response.data);
      dispatch(actions.storeHolidayCreated({ storeHoliday }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create Store Holiday";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStoreOpen = (storeOpen) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStoreOpen(storeOpen)
    .then(() => {
      //console.log(storeOpen);
      dispatch(actions.storeOpenUpdated({ storeOpen }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't update Store open";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStoreClose = (storeClose) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStoreClose(storeClose)
    .then(() => {
      //console.log(storeClose);
      dispatch(actions.storeCloseUpdated({ storeClose }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't update Store Close";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStoreHoliday = (storeHoliday) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStoreHoliday(storeHoliday)
    .then(() => {
      //console.log(storeHoliday);
      dispatch(actions.storeHolidayUpdated({ storeHoliday }));
    })
    .catch((error) => {
      console.error(error);
      error.clientMessage = "Can't update Store Holiday";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStoreOpens = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreOpens(ids)
    .then(() => {
      dispatch(actions.storeOpensDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete storeOpens";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStoreCloses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreCloses(ids)
    .then(() => {
      dispatch(actions.storeClosesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Store Closes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStoreHolidays = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStoreHolidays(ids)
    .then(() => {
      dispatch(actions.storeHolidaysDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Store Holidays";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const ShowAttendances = () => {
  const history = useHistory();
  history.pushState("/stores/operations/attendanceShow");
};
