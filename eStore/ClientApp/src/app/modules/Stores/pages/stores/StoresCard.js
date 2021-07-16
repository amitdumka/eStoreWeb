import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { StoresTable } from "./StoresTable";
import { useStoresUIContext } from "./StoreUIContext";

export function StoresCard() {
    const storesUIContext = useStoresUIContext();
    const storesUIProps = useMemo(() => {
      return {
        ids: storesUIContext.ids,
        newStoreButtonClick: storesUIContext.newStoreButtonClick,
      };
    }, [storesUIContext]);
  
    return (
      <Card>
        <CardHeader title="Stores list">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={storesUIProps.newStoreButtonClick}
            >
              New Store
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {/* <StoresFilter />
          {storesUIProps.ids.length > 0 && <StoresGrouping />}
          <StoresTable /> */}
          <StoresTable/>
        </CardBody>
      </Card>
    );
  }
  
