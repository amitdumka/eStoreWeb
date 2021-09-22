import React from "react";
//import { Route } from "react-router-dom";
import { DataLoadingDialog } from "./LoadingDialog";
import { UIProvider } from "./UIContext";
import { DuplicateBookingCard } from "./DuplicateBookingCard";

//pendingDelivery

export function DuplicateBookingsPage({ history }) {
  const uiEvents = {  
    openFetchBookingsDialog: () => {
      history.push(`/tailoring/booking/fetch`);
    }
  }

  return (
    <UIProvider UIEvents={uiEvents}>
      <DataLoadingDialog />
      <DuplicateBookingCard />
    </UIProvider>
  );
}
