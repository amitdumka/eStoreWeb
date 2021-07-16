// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/payments/Actions";
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

//Payment
//payment



export function PaymentsTable() {
  // Payments UI Context
  const paymentsUIContext = useUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      ids: paymentsUIContext.ids,
      setIds: paymentsUIContext.setIds,
      queryParams: paymentsUIContext.queryParams,
      setQueryParams: paymentsUIContext.setQueryParams,
      openEditPaymentDialog: paymentsUIContext.openEditPaymentDialog,
      openDeletePaymentDialog: paymentsUIContext.openDeletePaymentDialog,
    };
  }, [paymentsUIContext]);

  // Getting curret state of payments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.payments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Payments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    paymentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPayments(paymentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "paymentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, {
      dataField: "onDate",
      text: "Date",
      sort: true,
      type:      'date',
      formatter: FieldDateFormater,
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
      dataField: "paymentSlipNo",
      text: "Payment Slip No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "amount",
      text: "amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "payMode",
      text: "Mode",
      sort: true,
      formatter: columnFormatters.PayModeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paymentDetails",
      text: "Payment Details",
      //formatter: columnFormatters.SalaryComponentsColumnFormatter,
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "fromAccount.account",
      text: "Account",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "party.partyName",
      text: "Ledger",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPaymentDialog: paymentsUIProps.openEditPaymentDialog,
        openDeletePaymentDialog: paymentsUIProps.openDeletePaymentDialog,
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
    sizePerPage: paymentsUIProps.queryParams.pageSize,
    page: paymentsUIProps.queryParams.pageNumber,
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
                keyField="paymentId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  paymentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: paymentsUIProps.ids,
                  setIds: paymentsUIProps.setIds,
                  idName:"paymentId",
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
