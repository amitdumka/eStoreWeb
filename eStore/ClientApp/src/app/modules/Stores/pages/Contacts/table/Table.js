// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contacts/Actions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";

//Contact
//contact

export function ContactsTable() {
  // Contacts UI Context
  const contactsUIContext = useUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
      setIds: contactsUIContext.setIds,
      queryParams: contactsUIContext.queryParams,
      setQueryParams: contactsUIContext.setQueryParams,
      openEditContactDialog:
        contactsUIContext.openEditContactDialog,
      openDeleteContactDialog:
        contactsUIContext.openDeleteContactDialog,
    };
  }, [contactsUIContext]);

  // Getting curret state of contacts list from store (Redux)
  const { curcontactState } = useSelector(
    (state) => ({ curcontactState: state.contacts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curcontactState;

  // Contacts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    contactsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchContacts(contactsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsUIProps.queryParams, dispatch]);

// contactId: 1
// eMailAddress: ""
// firstName: "AJAM"
// lastName: "MASTER"
// mobileNo: "9973599123"
// phoneNo: ""
// remarks: ""
  // Table columns
  const columns = [
    {
      dataField: "contactId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mobileNo",
      text: "Contact No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phoneNo",
      text: "Phone No",
      sort: false,
      
      sortCaret: sortCaret,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditContactDialog:
          contactsUIProps.openEditContactDialog,
        openDeleteContactDialog:
          contactsUIProps.openDeleteContactDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: contactsUIProps.queryParams.pageSize,
    page: contactsUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={true}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                //remote
                noDataIndication="No Record Found now.."
                keyField="contactId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  contactsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: contactsUIProps.ids,
                  setIds: contactsUIProps.setIds,
                  idName: "contactId",
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
