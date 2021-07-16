// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Delivery/Actions";
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
import FieldDateFormater from "../../../../../../_estore/formaters/FieldDateFormater";
//Deliveries
//deliveries
//Delivery
//delivery

export function DeliveriesTable() {
  // Deliveries UI Context
  const deliveriesUIContext = useUIContext();
  const deliveriesUIProps = useMemo(() => {
    return {
      ids: deliveriesUIContext.ids,
      setIds: deliveriesUIContext.setIds,
      queryParams: deliveriesUIContext.queryParams,
      setQueryParams: deliveriesUIContext.setQueryParams,
      openEditDeliveryDialog: deliveriesUIContext.openEditDeliveryDialog,
      openDeleteDeliveryDialog: deliveriesUIContext.openDeleteDeliveryDialog,
    };
  }, [deliveriesUIContext]);

  // Getting current state of deliveries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.deliveries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Deliveries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    deliveriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDeliveries(deliveriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveriesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "talioringDeliveryId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "deliveryDate",
      text: "Delivery Date",
      sort: true,
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "booking.bookingSlipNo",
      text: "Booking No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "invNo",
      text: "Invoice No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDeliveryDialog: deliveriesUIProps.openEditDeliveryDialog,
        openDeleteDeliveryDialog: deliveriesUIProps.openDeleteDeliveryDialog,
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
    sizePerPage: deliveriesUIProps.queryParams.pageSize,
    page: deliveriesUIProps.queryParams.pageNumber,
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
                keyField="deliveryId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  deliveriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: deliveriesUIProps.ids,
                  setIds: deliveriesUIProps.setIds,
                  idName: "deliveryId",
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
