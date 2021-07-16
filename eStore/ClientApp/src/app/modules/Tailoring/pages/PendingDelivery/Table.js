// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/Booking/Actions";
import {
 
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
//import * as uiHelpers from "./UIHelpers";
//import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useUIContext } from "./UIContext";
import FieldDateFormater from "../../../../../_estore/formaters/FieldDateFormater";


//booking
//Booking

export function PendingDeliveryTable() {
  // Bookings UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
    };
  }, [uiContext]);

  // Getting current state of bookings list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.bookings,
    }),
    shallowEqual
  );
  const { totalCountPending, pendingDelivery, listLoading } = currentState;

  // Bookings Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    uiProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBooking());
    dispatch(actions.fetchPendingDelivery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "bookingId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bookingDate",
      text: "Booking Date",
      sort: true,
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "customerName",
      text: "Customer",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "delveryDate",
      text: "Delivery Date",
      sort: true,
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },


    {
      dataField: "slipNo",
      text: "Slip No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "quantity",
      text: "Total Qty",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "noDays",
      text: "Over Due",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditBookingDialog: uiProps.openEditBookingDialog,
    //     openDeleteBookingDialog: uiProps.openDeleteBookingDialog,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCountPending,
    sizePerPageList: [3,5,10],
    sizePerPage: 10,
    page: 1,
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
                keyField="bookingId"
                data={pendingDelivery === null ? [] : totalCountPending ? pendingDelivery : []}
                //data={[]}
                columns={columns}
                //defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  uiProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   pendingDelivery,
                //   ids: uiProps.ids,
                //   setIds: uiProps.setIds,
                //   idName: "bookingId",
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={pendingDelivery} />
                <NoRecordsFoundMessage entities={pendingDelivery} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
