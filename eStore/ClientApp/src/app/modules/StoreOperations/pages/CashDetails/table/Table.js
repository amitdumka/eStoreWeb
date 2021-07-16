// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDetails/Actions";
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

//CashDetail
//cashDetail

export function CashDetailsTable() {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      ids: cashDetailsUIContext.ids,
      setIds: cashDetailsUIContext.setIds,
      queryParams: cashDetailsUIContext.queryParams,
      setQueryParams: cashDetailsUIContext.setQueryParams,
      openEditCashDetailDialog:
        cashDetailsUIContext.openEditCashDetailDialog,
      openDeleteCashDetailDialog:
        cashDetailsUIContext.openDeleteCashDetailDialog,
    };
  }, [cashDetailsUIContext]);

  // Getting curret state of cashDetails list from store (Redux)
  const { curcashDetailState } = useSelector(
    (state) => ({ curcashDetailState: state.cashDetails }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curcashDetailState;

  // CashDetails Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    cashDetailsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCashDetails(cashDetailsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDetailsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "cashDetailId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location.placeName",
      text: "CashDetailed Location",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "cashDetailType",
      text: "CashDetail Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "onDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "period",
      text: "Period",
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
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCashDetailDialog:
          cashDetailsUIProps.openEditCashDetailDialog,
        openDeleteCashDetailDialog:
          cashDetailsUIProps.openDeleteCashDetailDialog,
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
    sizePerPage: cashDetailsUIProps.queryParams.pageSize,
    page: cashDetailsUIProps.queryParams.pageNumber,
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
                keyField="cashDetailId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  cashDetailsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: cashDetailsUIProps.ids,
                  setIds: cashDetailsUIProps.setIds,
                  idName: "cashDetailId",
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
