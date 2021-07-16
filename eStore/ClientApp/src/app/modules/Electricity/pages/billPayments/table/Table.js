// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billPayments/Actions";
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

//BillPayment
//billPayment

export function BillPaymentsTable() {
  // BillPayments UI Context
  const billPaymentsUIContext = useUIContext();
  const billPaymentsUIProps = useMemo(() => {
    return {
      ids: billPaymentsUIContext.ids,
      setIds: billPaymentsUIContext.setIds,
      queryParams: billPaymentsUIContext.queryParams,
      setQueryParams: billPaymentsUIContext.setQueryParams,
      openEditBillPaymentDialog:
        billPaymentsUIContext.openEditBillPaymentDialog,
      openDeleteBillPaymentDialog:
        billPaymentsUIContext.openDeleteBillPaymentDialog,
    };
  }, [billPaymentsUIContext]);

  // Getting curret state of billPayments list from store (Redux)
  const { curbillPaymentState } = useSelector(
    (state) => ({ curbillPaymentState: state.billPayments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curbillPaymentState;

  // BillPayments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    billPaymentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBillPayments(billPaymentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billPaymentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "eBillPaymentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bill.billNumber",
      text: "Bill Number",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bill.connection.consumerNumber",
      text: "Consumer No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paymentDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "isPartialPayment",
      text: "Partial Payment",
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
      dataField: "storeId",
      text: "Store",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBillPaymentDialog:
          billPaymentsUIProps.openEditBillPaymentDialog,
        openDeleteBillPaymentDialog:
          billPaymentsUIProps.openDeleteBillPaymentDialog,
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
    sizePerPage: billPaymentsUIProps.queryParams.pageSize,
    page: billPaymentsUIProps.queryParams.pageNumber,
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
                keyField="eBillPaymentId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  billPaymentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: billPaymentsUIProps.ids,
                  setIds: billPaymentsUIProps.setIds,
                  idName: "billPaymentId",
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
