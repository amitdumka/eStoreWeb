// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/parties/Actions";
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

//Parties
//parties
//Party
//party

export function PartiesTable() {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      ids: partiesUIContext.ids,
      setIds: partiesUIContext.setIds,
      queryParams: partiesUIContext.queryParams,
      setQueryParams: partiesUIContext.setQueryParams,
      openEditPartyDialog: partiesUIContext.openEditPartyDialog,
      openDeletePartyDialog: partiesUIContext.openDeletePartyDialog,
    };
  }, [partiesUIContext]);

  // Getting curret state of parties list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.parties }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Parties Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    partiesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchParties(partiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partiesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "partyId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "partyName",
      text: "Party",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "panNo",
      text: "PAN",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "gstNo",
      text: "GSTIN",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "openningDate",
      text: "Openning Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "openningBalance",
      text: "Openning Balance",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ledgerType.ledgerNameType",
      text: "Ledger Type",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPartyDialog: partiesUIProps.openEditPartyDialog,
        openDeletePartyDialog: partiesUIProps.openDeletePartyDialog,
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
    sizePerPage: partiesUIProps.queryParams.pageSize,
    page: partiesUIProps.queryParams.pageNumber,
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
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                //remote
                noDataIndication="No Record Found now.."
                keyField="partyId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  partiesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: partiesUIProps.ids,
                  setIds: partiesUIProps.setIds,
                  idName: "partyId",
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
