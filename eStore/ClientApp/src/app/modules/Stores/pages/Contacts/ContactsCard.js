import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ContactsFilter } from "./filter/Filter";
import { ContactsTable } from "./table/Table";
import { ContactsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Contact
//contact


export function ContactsCard() {
  const ContactsUIContext = useUIContext();
  const ContactsUIProps = useMemo(() => {
    return {
      ids: ContactsUIContext.ids,
      newContactButtonClick: ContactsUIContext.newContactButtonClick,
    };
  }, [ContactsUIContext]);

  return (
    <Card>
      <CardHeader title="Address Book">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ContactsUIProps.newContactButtonClick}
          >
            New Contact
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContactsFilter />
        {ContactsUIProps.ids.length > 0 && <ContactsGrouping />}
        <ContactsTable />
      </CardBody>
    </Card>
  );
}
