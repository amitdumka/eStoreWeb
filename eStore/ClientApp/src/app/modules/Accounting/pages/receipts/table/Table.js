// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as actions from "../../../_redux/receipts/Actions";
import {  getSelectRow,  getHandlerTableChange,  NoRecordsFoundMessage,  PleaseWaitMessage,  sortCaret,  headerSortingClasses,} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";
import FieldDateFormater from "../../../../../../_estore/formaters/FieldDateFormater";

//Receipt
//receipt

export function ReceiptsTable() {
  // Receipts UI Context
  const receiptsUIContext = useUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      setIds: receiptsUIContext.setIds,
      queryParams: receiptsUIContext.queryParams,
      setQueryParams: receiptsUIContext.setQueryParams,
      openEditReceiptDialog: receiptsUIContext.openEditReceiptDialog,
      openDeleteReceiptDialog: receiptsUIContext.openDeleteReceiptDialog,
    };
  }, [receiptsUIContext]);

  // Getting curret state of receipts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.receipts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Receipts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    receiptsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchReceipts(receiptsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "receiptId",
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
      dataField: "remarks",
      text: "Particular(s)",
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
        openEditReceiptDialog: receiptsUIProps.openEditReceiptDialog,
        openDeleteReceiptDialog: receiptsUIProps.openDeleteReceiptDialog,
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
    sizePerPage: receiptsUIProps.queryParams.pageSize,
    page: receiptsUIProps.queryParams.pageNumber,
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
                keyField="receiptId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  receiptsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: receiptsUIProps.ids,
                  setIds: receiptsUIProps.setIds,
                  idName:"receiptId",
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
