// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/endOfDays/Actions";
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

//EndOfDay
//endOfDay

export function EndOfDaysTable() {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      ids: endOfDaysUIContext.ids,
      setIds: endOfDaysUIContext.setIds,
      queryParams: endOfDaysUIContext.queryParams,
      setQueryParams: endOfDaysUIContext.setQueryParams,
      openEditEndOfDayDialog:
        endOfDaysUIContext.openEditEndOfDayDialog,
      openDeleteEndOfDayDialog:
        endOfDaysUIContext.openDeleteEndOfDayDialog,
    };
  }, [endOfDaysUIContext]);

  // Getting curret state of endOfDays list from store (Redux)
  const { curendOfDayState } = useSelector(
    (state) => ({ curendOfDayState: state.endOfDays }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curendOfDayState;

  // EndOfDays Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    endOfDaysUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchEndOfDays(endOfDaysUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfDaysUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "endOfDayId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location.placeName",
      text: "EndOfDayed Location",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "endOfDayType",
      text: "EndOfDay Type",
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
        openEditEndOfDayDialog:
          endOfDaysUIProps.openEditEndOfDayDialog,
        openDeleteEndOfDayDialog:
          endOfDaysUIProps.openDeleteEndOfDayDialog,
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
    sizePerPage: endOfDaysUIProps.queryParams.pageSize,
    page: endOfDaysUIProps.queryParams.pageNumber,
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
                keyField="endOfDayId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  endOfDaysUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: endOfDaysUIProps.ids,
                  setIds: endOfDaysUIProps.setIds,
                  idName: "endOfDayId",
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
