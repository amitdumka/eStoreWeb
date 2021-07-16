import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DeliveriesFilter } from "./filter/Filter";
import { DeliveriesTable } from "./table/Table";
import { DeliveriesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Deliveries
//deliveries
//Delivery
//delivery

export function DeliveriesCard() {
  const DeliveriesUIContext = useUIContext();
  const DeliveriesUIProps = useMemo(() => {
    return {
      ids: DeliveriesUIContext.ids,
      newDeliveryButtonClick: DeliveriesUIContext.newDeliveryButtonClick,
    };
  }, [DeliveriesUIContext]);

  return (
    <Card>
      <CardHeader title="Delivery list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={DeliveriesUIProps.newDeliveryButtonClick}
          >
            New Delivery
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeliveriesFilter />
        {DeliveriesUIProps.ids.length > 0 && <DeliveriesGrouping />}
        <DeliveriesTable />
      </CardBody>
    </Card>
  );
}
