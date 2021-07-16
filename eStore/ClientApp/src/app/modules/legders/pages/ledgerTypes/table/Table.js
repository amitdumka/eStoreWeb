// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ledgerTypes/Actions";
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

//ledgerType
//LedgerType


export function LedgerTypesTable() {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      ids: ledgerTypesUIContext.ids,
      setIds: ledgerTypesUIContext.setIds,
      queryParams: ledgerTypesUIContext.queryParams,
      setQueryParams: ledgerTypesUIContext.setQueryParams,
      openEditLedgerTypeDialog: ledgerTypesUIContext.openEditLedgerTypeDialog,
      openDeleteLedgerTypeDialog: ledgerTypesUIContext.openDeleteLedgerTypeDialog,
    };
  }, [ledgerTypesUIContext]);

  // Getting current state of ledgerTypes list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ledgerTypes , ledgerCategory:state.ledgerTypes.ledgerTypes}),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // LedgerTypes Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ledgerTypesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchLedgerTypes(ledgerTypesUIProps.queryParams));
    dispatch(actions.fetchLedgerCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledgerTypesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "ledgerTypeId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ledgerNameType",
      text: "LedgerType Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remark",
      text: "Remark",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLedgerTypeDialog: ledgerTypesUIProps.openEditLedgerTypeDialog,
        openDeleteLedgerTypeDialog: ledgerTypesUIProps.openDeleteLedgerTypeDialog,
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
    sizePerPage: ledgerTypesUIProps.queryParams.pageSize,
    page: ledgerTypesUIProps.queryParams.pageNumber,
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
                keyField="ledgerTypeId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  ledgerTypesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ledgerTypesUIProps.ids,
                  setIds: ledgerTypesUIProps.setIds,
                  idName:"ledgerTypeId",
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
