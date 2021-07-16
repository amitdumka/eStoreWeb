// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/saleTaxes/Actions";
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

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax

export function SaleTaxesTable() {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      ids: saleTaxesUIContext.ids,
      setIds: saleTaxesUIContext.setIds,
      queryParams: saleTaxesUIContext.queryParams,
      setQueryParams: saleTaxesUIContext.setQueryParams,
      openEditSaleTaxDialog: saleTaxesUIContext.openEditSaleTaxDialog,
      openDeleteSaleTaxDialog: saleTaxesUIContext.openDeleteSaleTaxDialog,
    };
  }, [saleTaxesUIContext]);

  // Getting current state of saleTaxes list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.saleTaxes }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // SaleTaxes Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    saleTaxesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchSaleTaxes(saleTaxesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleTaxesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "saleTaxTypeId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "taxName",
      text: "SaleTax",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "taxType",
      text: "Tax Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "compositeRate",
      text: "Composite Rate",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSaleTaxDialog: saleTaxesUIProps.openEditSaleTaxDialog,
        openDeleteSaleTaxDialog: saleTaxesUIProps.openDeleteSaleTaxDialog,
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
    sizePerPage: saleTaxesUIProps.queryParams.pageSize,
    page: saleTaxesUIProps.queryParams.pageNumber,
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
                keyField="saleTaxId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  saleTaxesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: saleTaxesUIProps.ids,
                  setIds: saleTaxesUIProps.setIds,
                  idName: "saleTaxId",
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
