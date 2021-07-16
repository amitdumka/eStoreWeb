import React from "react";
import { Route } from "react-router-dom";
import { EditDialog } from "./dialogs/EditDialog";

import { ShowData } from "./dialogs/ShowData";
import { UIProvider } from "./UIContext";
import { DataCard } from "./DataCard";
// import { DeleteDialog } from "./dialogs/DeleteDialog";
// import { DeletesDialog } from "./dialogs/DeletesDialog";
// import { FetchDialog } from "./dialogs/FetchDialog";
// import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";

//StoreOperation
//storeOperation

export function StoreOperationsPage({ history }) {
  const rentsUIEvents = {
    newButtonStoreClosedClick: () => {
      history.push("/stores/operations/StoreClosed/new");
    },
    newButtonOpenClick: () => {
      history.push("/stores/operations/open/new");
    },
    openEditOpenDialog: (id) => {
      history.push(`/stores/operations/open/${id}/edit`);
    },
    openDeleteOpenDialog: (id) => {
      history.push(`/stores/operations/open/${id}/delete`);
    },
    openDeleteOpensDialog: () => {
      history.push(`/stores/operations/open/deletes`);
    },
    openFetchOpenDialog: () => {
      history.push(`/stores/operations/open/fetch`);
    },
    openUpdateOpenStatusDialog: () => {
      history.push("/stores/operations/open/updateStatus");
    },
    newButtonCloseClick: () => {
      history.push("/stores/operations/close/new");
    },
    openEditCloseDialog: (id) => {
      history.push(`/stores/operations/close/${id}/edit`);
    },
    openDeleteCloseDialog: (id) => {
      history.push(`/stores/operations/close/${id}/delete`);
    },
    openDeleteClosesDialog: () => {
      history.push(`/stores/operations/close/deletes`);
    },
    openFetchCloseDialog: () => {
      history.push(`/stores/operations/close/fetch`);
    },
    openUpdateCloseStatusDialog: () => {
      history.push("/stores/operations/close/updateStatus");
    },
    newButtonHolidayClick: () => {
      history.push("/stores/operations/holiday/new");
    },
    openEditHolidayDialog: (id) => {
      history.push(`/stores/operations/holiday/${id}/edit`);
    },
    openDeleteHolidayDialog: (id) => {
      history.push(`/stores/operations/holiday/${id}/delete`);
    },
    openDeleteHolidaysDialog: () => {
      history.push(`/stores/operations/holiday/deletes`);
    },
    openFetchHolidayDialog: () => {
      history.push(`/stores/operations/holiday/fetch`);
    },
    openUpdateHolidayStatusDialog: () => {
      history.push("/stores/operations/holiday/updateStatus");
    },
  };

  return (
    <UIProvider UIEvents={rentsUIEvents}>
      {/* <DataLoadingDialog /> */}
      <Route path="/stores/operations/attendanceShow">
        {({ history, match }) => (
          <ShowData
            show={match != null}
            onHide={() => {
              history.push("/stores/operations");
            }}
          />
        )}
      </Route>

      <Route path="/stores/operations/storeClosed/new">
        {({ history, match }) => (
          <EditDialog
            windowName="sClosed"
            show={match != null}
            onHide={() => {
              history.push("/stores/operations");
            }}
          />
        )}
      </Route>
      <Route path="/stores/operations/open/new">
        {({ history, match }) => (
          <EditDialog
            windowName="sOpen"
            show={match != null}
            onHide={() => {
              history.push("/stores/operations");
            }}
          />
        )}
      </Route>
      <Route path="/stores/operations/close/new">
        {({ history, match }) => (
          <EditDialog
            windowName="sClose"
            show={match != null}
            onHide={() => {
              history.push("/stores/operations");
            }}
          />
        )}
      </Route>
      <Route path="/stores/operations/holiday/new">
        {({ history, match }) => (
          <EditDialog
            windowName="sHoliday"
            show={match != null}
            onHide={() => {
              history.push("/stores/operations");
            }}
          />
        )}
      </Route>
      <Route path="/store/operations/open/:id/edit">
        {({ history, match }) => (
          <EditDialog
            windowName="sOpen"
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/operations");
            }}
          />
        )}
      </Route>
      <Route path="/store/operations/close/:id/edit">
        {({ history, match }) => (
          <EditDialog
            windowName="sClose"
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/operations");
            }}
          />
        )}
      </Route>
      <Route path="/store/operations/holiday/:id/edit">
        {({ history, match }) => (
          <EditDialog
            windowName="sHoliday"
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/operations");
            }}
          />
        )}
      </Route>

      {/*
     
       <Route path="/storeOperations/open/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/storeOperations/open");
            }}
          />
        )}
      </Route>
      <Route path="/storeOperations/open/deleteRents">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/storeOperations/open");
            }}
          />
        )}
      </Route>
     
      <Route path="/storeOperations/open/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/storeOperations/open");
            }}
          />
        )}
      </Route>
      <Route path="/storeOperations/open/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/storeOperations/open");
            }}
          />
        )}
      </Route> */}
      <DataCard />
    </UIProvider>
  );
}
