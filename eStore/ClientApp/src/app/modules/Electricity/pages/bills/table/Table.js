// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/Actions";
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

//Bill
//bill

export function BillsTable() {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      setIds: billsUIContext.setIds,
      queryParams: billsUIContext.queryParams,
      setQueryParams: billsUIContext.setQueryParams,
      openEditBillDialog:
        billsUIContext.openEditBillDialog,
      openDeleteBillDialog:
        billsUIContext.openDeleteBillDialog,
    };
  }, [billsUIContext]);

  // Getting curret state of bills list from store (Redux)
  const { curbillState } = useSelector(
    (state) => ({ curbillState: state.bills }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curbillState;

  // Bills Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    billsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBills(billsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "eletricityBillId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "connection.consumerNumber",
      text: "Consumer Number",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "billNumber",
      text: "Bill Number",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "billDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "meterReadingDate",
      text: "Meter Reading Date",
      sort: false,
      
      sortCaret: sortCaret,
    },
    {
      dataField: "currentMeterReading",
      text: "Meter Reading",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "totalUnit",
      text: "Total Unit",
      sort: true,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "currentAmount",
      text: "Current Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "arrearAmount",
      text: "Arrear Amount",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "netDemand",
      text: "Net Amount",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBillDialog:
          billsUIProps.openEditBillDialog,
        openDeleteBillDialog:
          billsUIProps.openDeleteBillDialog,
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
    sizePerPage: billsUIProps.queryParams.pageSize,
    page: billsUIProps.queryParams.pageNumber,
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
                keyField="billId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  billsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: billsUIProps.ids,
                  setIds: billsUIProps.setIds,
                  idName: "eletricityBillId",
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
