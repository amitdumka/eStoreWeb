// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dayClosings/Actions";
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

//DayClosing
//dayClosing

export function DayClosingsTable() {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      ids: dayClosingsUIContext.ids,
      setIds: dayClosingsUIContext.setIds,
      queryParams: dayClosingsUIContext.queryParams,
      setQueryParams: dayClosingsUIContext.setQueryParams,
      openEditDayClosingDialog:
        dayClosingsUIContext.openEditDayClosingDialog,
      openDeleteDayClosingDialog:
        dayClosingsUIContext.openDeleteDayClosingDialog,
    };
  }, [dayClosingsUIContext]);

  // Getting curret state of dayClosings list from store (Redux)
  const { curdayClosingState } = useSelector(
    (state) => ({ curdayClosingState: state.dayClosings }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curdayClosingState;

  // DayClosings Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    dayClosingsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDayClosings(dayClosingsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayClosingsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "dayClosingId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location.placeName",
      text: "DayClosinged Location",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "dayClosingType",
      text: "DayClosing Type",
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
        openEditDayClosingDialog:
          dayClosingsUIProps.openEditDayClosingDialog,
        openDeleteDayClosingDialog:
          dayClosingsUIProps.openDeleteDayClosingDialog,
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
    sizePerPage: dayClosingsUIProps.queryParams.pageSize,
    page: dayClosingsUIProps.queryParams.pageNumber,
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
                keyField="dayClosingId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  dayClosingsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: dayClosingsUIProps.ids,
                  setIds: dayClosingsUIProps.setIds,
                  idName: "dayClosingId",
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
