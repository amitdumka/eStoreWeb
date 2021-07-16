import React from "react";
//import { Route } from "react-router-dom";
import { DataLoadingDialog } from "./LoadingDialog";
import { UIProvider } from "./UIContext";
import { PendingDeliveryCard } from "./PendingDeliveryCard";

//pendingDelivery

export function PendingDeliveryPage({ history }) {
  const uiEvents = {  
    openFetchBookingsDialog: () => {
      history.push(`/tailoring/pending/fetch`);
    }
  }

  return (
    <UIProvider UIEvents={uiEvents}>
      <DataLoadingDialog />
      <PendingDeliveryCard />
    </UIProvider>
  );
}
