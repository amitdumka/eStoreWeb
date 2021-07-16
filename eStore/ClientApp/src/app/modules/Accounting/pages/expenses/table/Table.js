// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/expenses/Actions";
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

//Expense
//expense



export function ExpensesTable() {
  // Expenses UI Context
  const expensesUIContext = useUIContext();
  const expensesUIProps = useMemo(() => {
    return {
      ids: expensesUIContext.ids,
      setIds: expensesUIContext.setIds,
      queryParams: expensesUIContext.queryParams,
      setQueryParams: expensesUIContext.setQueryParams,
      openEditExpenseDialog: expensesUIContext.openEditExpenseDialog,
      openDeleteExpenseDialog: expensesUIContext.openDeleteExpenseDialog,
    };
  }, [expensesUIContext]);

  // Getting curret state of expenses list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.expenses }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Expenses Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    expensesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchExpenses(expensesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "expenseId",
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
      dataField: "particulars",
      text: "Particular(s)",
      sort: true,
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
      dataField: "paidBy.staffName",
      text: "PaidBy",
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
        openEditExpenseDialog: expensesUIProps.openEditExpenseDialog,
        openDeleteExpenseDialog: expensesUIProps.openDeleteExpenseDialog,
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
    sizePerPage: expensesUIProps.queryParams.pageSize,
    page: expensesUIProps.queryParams.pageNumber,
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
                keyField="expenseId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  expensesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: expensesUIProps.ids,
                  setIds: expensesUIProps.setIds,
                  idName:"expenseId",
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
