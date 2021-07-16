import React from "react";
import { Route } from "react-router-dom";
import { StaffAdvanceReceiptsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { StaffAdvanceReceiptsCard } from "./StaffAdvanceReceiptsCard";

//StaffAdvanceReceipt
//staffAdvanceReceipt

export function StaffAdvanceReceiptsPage({ history }) {
  const uiEvents = {
    newStaffAdvanceReceiptButtonClick: () => {
      history.push("/payroll/salary/receipts/new");
    },
    openEditStaffAdvanceReceiptDialog: (id) => {
      history.push(`/payroll/salary/receipts/${id}/edit`);
    },
    openDeleteStaffAdvanceReceiptDialog: (id) => {
      history.push(`/payroll/salary/receipts/${id}/delete`);
    },
    openDeleteStaffAdvanceReceiptsDialog: () => {
      history.push(`/payroll/salary/receipts/deleteStaffAdvanceReceipts`);
    },
    openFetchStaffAdvanceReceiptsDialog: () => {
      history.push(`/payroll/salary/receipts/fetch`);
    },
    openUpdateStaffAdvanceReceiptsStatusDialog: () => {
      history.push("/payroll/salary/receipts/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={uiEvents}>
      <StaffAdvanceReceiptsLoadingDialog />
      <Route path="/payroll/salary/receipts/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/salary/receipts/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/salary/receipts/deleteStaffAdvanceReceipts">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/salary/receipts/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/salary/receipts/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/salary/receipts/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/salary/receipts");
            }}
          />
        )}
      </Route>
      <StaffAdvanceReceiptsCard />
    </UIProvider>
  );
}
