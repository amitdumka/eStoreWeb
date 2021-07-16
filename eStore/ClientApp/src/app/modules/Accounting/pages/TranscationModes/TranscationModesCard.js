import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { TranscationModesFilter } from "./filter/Filter";
import { TranscationModesTable } from "./table/Table";
import { TranscationModesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//TranscationMode
//transcationMode


export function TranscationModesCard() {
  const TranscationModesUIContext = useUIContext();
  const TranscationModesUIProps = useMemo(() => {
    return {
      ids: TranscationModesUIContext.ids,
      newTranscationModeButtonClick: TranscationModesUIContext.newTranscationModeButtonClick,
    };
  }, [TranscationModesUIContext]);

  return (
    <Card>
      <CardHeader title="Transcation Mode list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={TranscationModesUIProps.newTranscationModeButtonClick}
          >
            New Transcation Mode
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <TranscationModesFilter /> 
        {TranscationModesUIProps.ids.length > 0 && <TranscationModesGrouping />}
        <TranscationModesTable />
      </CardBody>
    </Card>
  );
}
