// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as actions from "../../../_redux/cashReceipts/Actions";
import {  getSelectRow,  getHandlerTableChange,  NoRecordsFoundMessage,  PleaseWaitMessage,  sortCaret,  headerSortingClasses,} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";
import FieldDateFormater from "../../../../../../_estore/formaters/FieldDateFormater";

//CashReceipt
//cashReceipt

export function CashReceiptsTable() {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      ids: cashReceiptsUIContext.ids,
      setIds: cashReceiptsUIContext.setIds,
      queryParams: cashReceiptsUIContext.queryParams,
      setQueryParams: cashReceiptsUIContext.setQueryParams,
      openEditCashReceiptDialog: cashReceiptsUIContext.openEditCashReceiptDialog,
      openDeleteCashReceiptDialog: cashReceiptsUIContext.openDeleteCashReceiptDialog,
    };
  }, [cashReceiptsUIContext]);

  // Getting curret state of cashReceipts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.cashReceipts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // CashReceipts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    cashReceiptsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCashReceipts(cashReceiptsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashReceiptsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "cashReceiptId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, {
      dataField: "inwardDate",
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
      dataField: "receiptFrom",
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
        openEditCashReceiptDialog: cashReceiptsUIProps.openEditCashReceiptDialog,
        openDeleteCashReceiptDialog: cashReceiptsUIProps.openDeleteCashReceiptDialog,
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
    sizePerPage: cashReceiptsUIProps.queryParams.pageSize,
    page: cashReceiptsUIProps.queryParams.pageNumber,
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
                keyField="cashReceiptId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  cashReceiptsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: cashReceiptsUIProps.ids,
                  setIds: cashReceiptsUIProps.setIds,
                  idName:"cashReceiptId",
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
