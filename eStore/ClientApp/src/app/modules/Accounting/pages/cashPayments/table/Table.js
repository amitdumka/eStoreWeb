// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as actions from "../../../_redux/cashPayments/Actions";
import {  getSelectRow,  getHandlerTableChange,  NoRecordsFoundMessage,  PleaseWaitMessage,  sortCaret,  headerSortingClasses,} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";
import FieldDateFormater from "../../../../../../_estore/formaters/FieldDateFormater";

//CashPayment
//cashPayment

export function CashPaymentsTable() {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      ids: cashPaymentsUIContext.ids,
      setIds: cashPaymentsUIContext.setIds,
      queryParams: cashPaymentsUIContext.queryParams,
      setQueryParams: cashPaymentsUIContext.setQueryParams,
      openEditCashPaymentDialog: cashPaymentsUIContext.openEditCashPaymentDialog,
      openDeleteCashPaymentDialog: cashPaymentsUIContext.openDeleteCashPaymentDialog,
    };
  }, [cashPaymentsUIContext]);

  // Getting curret state of cashPayments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.cashPayments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // CashPayments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    cashPaymentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCashPayments(cashPaymentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashPaymentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "cashPaymentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, {
      dataField: "paymentDate",
      text: "Date",
      sort: true,
      type:      'date',
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mode.transcation",
      text: "Transaction",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paidTo",
      text: "Party",
      sort: true,
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
      dataField: "amount",
      text: "amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      //formatter: columnFormatters.SalaryComponentsColumnFormatter,
      sort: false,
      sortCaret: sortCaret,
    },
    
   
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCashPaymentDialog: cashPaymentsUIProps.openEditCashPaymentDialog,
        openDeleteCashPaymentDialog: cashPaymentsUIProps.openDeleteCashPaymentDialog,
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
    sizePerPage: cashPaymentsUIProps.queryParams.pageSize,
    page: cashPaymentsUIProps.queryParams.pageNumber,
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
                keyField="cashPaymentId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  cashPaymentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: cashPaymentsUIProps.ids,
                  setIds: cashPaymentsUIProps.setIds,
                  idName:"cashPaymentId",
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
