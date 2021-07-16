import React  from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PendingDeliveryTable } from "./Table";
//import { useUIContext } from "./UIContext";


export function PendingDeliveryCard() {
//   const uiContext = useUIContext();
//   const uiProps = useMemo(() => {
//     return {
//       ids: uiContext.ids,
//     };
//   }, [uiContext]);

  return (
    <Card>
      <CardHeader title="Pending Delivery list">
        <CardHeaderToolbar>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <BookingsFilter />
        {uiProps.ids.length > 0 && <BookingsGrouping />} */}
        <PendingDeliveryTable />
      </CardBody>
    </Card>
  );
}
