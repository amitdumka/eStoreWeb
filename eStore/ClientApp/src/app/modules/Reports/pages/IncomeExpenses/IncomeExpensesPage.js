import React from "react";
//import { Route } from "react-router-dom";
//import { UIProvider } from "./UIContext";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../_metronic/_partials/controls";
import {ReportCard} from "./ReportCard";



export function IncomeExpensesPage({ history }) {
  // eslint-disable-next-line no-unused-vars
  const uiEvents = {
    newRentButtonClick: () => {
      history.push("/renting/rents/new");
    },
    openEditRentDialog: (id) => {
      history.push(`/renting/rents/${id}/edit`);
    },
    openDeleteRentDialog: (id) => {
      history.push(`/renting/rents/${id}/delete`);
    },
    openDeleteRentsDialog: () => {
      history.push(`/renting/rents/deleteRents`);
    },
    openFetchRentsDialog: () => {
      history.push(`/renting/rents/fetch`);
    },
    openUpdateRentsStatusDialog: () => {
      history.push("/renting/rents/updateStatus");
    }
  }
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.rents.listLoading }),
    shallowEqual
  );
  return (
    <>
     {/** <UIProvider UIEvents={rentsUIEvents}> */}
     
      <LoadingDialog isLoading={isLoading} text="Loading ..." />
      {/* <Route path="/renting/rents/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/deleteRents">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/updateStatus"> 
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>*/}
      <ReportCard />
      {/**   </UIProvider>*/}
      </>
    
  );
}
