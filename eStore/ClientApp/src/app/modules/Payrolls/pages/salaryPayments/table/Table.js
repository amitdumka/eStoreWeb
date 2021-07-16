// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/salaryPayments/Actions";
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

//SalaryPayment
//salaryPayment



export function SalaryPaymentsTable() {
  // SalaryPayments UI Context
  const salaryPaymentsUIContext = useUIContext();
  const salaryPaymentsUIProps = useMemo(() => {
    return {
      ids: salaryPaymentsUIContext.ids,
      setIds: salaryPaymentsUIContext.setIds,
      queryParams: salaryPaymentsUIContext.queryParams,
      setQueryParams: salaryPaymentsUIContext.setQueryParams,
      openEditSalaryPaymentDialog: salaryPaymentsUIContext.openEditSalaryPaymentDialog,
      openDeleteSalaryPaymentDialog: salaryPaymentsUIContext.openDeleteSalaryPaymentDialog,
    };
  }, [salaryPaymentsUIContext]);

  // Getting curret state of salaryPayments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.salaryPayments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // SalaryPayments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    salaryPaymentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchSalaryPayments(salaryPaymentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryPaymentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "salaryPaymentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "employee.staffName",
      text: "Employee",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paymentDate",
      text: "Date",
      sort: true,
      type:      'date',
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "salaryMonth",
      text: "Salary Month",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "salaryComponet",
      text: "Salary Component",
      formatter: columnFormatters.SalaryComponentsColumnFormatter,
      sort: false,
      sortCaret: sortCaret,
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
      dataField: "employee.store.storeName",
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
        openEditSalaryPaymentDialog: salaryPaymentsUIProps.openEditSalaryPaymentDialog,
        openDeleteSalaryPaymentDialog: salaryPaymentsUIProps.openDeleteSalaryPaymentDialog,
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
    sizePerPage: salaryPaymentsUIProps.queryParams.pageSize,
    page: salaryPaymentsUIProps.queryParams.pageNumber,
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
                keyField="salaryPaymentId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  salaryPaymentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: salaryPaymentsUIProps.ids,
                  setIds: salaryPaymentsUIProps.setIds,
                  idName:"salaryPaymentId",
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
