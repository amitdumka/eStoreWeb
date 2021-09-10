import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { Filter } from "./filter/Filter";
import { RecordDataTable } from "./table/Table";
import { Grouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

const HeaderTitle="List";
const ButtonText="New";

export function ViewCard() {
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      newButtonClick: UIContext.newButtonClick,
    };
  }, [UIContext]);

  return (
    <Card>
      <CardHeader title={HeaderTitle}>
        <CardHeaderToolbar>
          <button type="button" className="btn btn-primary" onClick={UIProps.newButtonClick} > {ButtonText}</button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Filter />
        {UIProps.ids.length > 0 && <Grouping />}
        <RecordDataTable />
      </CardBody>
    </Card>
  );
}
