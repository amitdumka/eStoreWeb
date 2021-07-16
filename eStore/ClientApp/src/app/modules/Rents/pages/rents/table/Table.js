// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rents/Actions";
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

//Rent
//rent

export function RentsTable() {
  // Rents UI Context
  const rentsUIContext = useUIContext();
  const rentsUIProps = useMemo(() => {
    return {
      ids: rentsUIContext.ids,
      setIds: rentsUIContext.setIds,
      queryParams: rentsUIContext.queryParams,
      setQueryParams: rentsUIContext.setQueryParams,
      openEditRentDialog:
        rentsUIContext.openEditRentDialog,
      openDeleteRentDialog:
        rentsUIContext.openDeleteRentDialog,
    };
  }, [rentsUIContext]);

  // Getting curret state of rents list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rents }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Rents Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    rentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchRents(rentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "rentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location.placeName",
      text: "Rented Location",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "rentType",
      text: "Rent Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "onDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "period",
      text: "Period",
      sort: false,
      
      sortCaret: sortCaret,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mode",
      text: "Mode",
      sort: true,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paymentDetails",
      text: "Payment Details",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRentDialog:
          rentsUIProps.openEditRentDialog,
        openDeleteRentDialog:
          rentsUIProps.openDeleteRentDialog,
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
    sizePerPage: rentsUIProps.queryParams.pageSize,
    page: rentsUIProps.queryParams.pageNumber,
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
                keyField="rentId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  rentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: rentsUIProps.ids,
                  setIds: rentsUIProps.setIds,
                  idName: "rentId",
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
