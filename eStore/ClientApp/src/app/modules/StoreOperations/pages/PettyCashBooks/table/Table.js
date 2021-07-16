// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PettyCashBooks/Actions";
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

//PettyCashBook
//pettyCashBook

export function PettyCashBooksTable() {
  // PettyCashBooks UI Context
  const pettyCashBooksUIContext = useUIContext();
  const pettyCashBooksUIProps = useMemo(() => {
    return {
      ids: pettyCashBooksUIContext.ids,
      setIds: pettyCashBooksUIContext.setIds,
      queryParams: pettyCashBooksUIContext.queryParams,
      setQueryParams: pettyCashBooksUIContext.setQueryParams,
      openEditPettyCashBookDialog:
        pettyCashBooksUIContext.openEditPettyCashBookDialog,
      openDeletePettyCashBookDialog:
        pettyCashBooksUIContext.openDeletePettyCashBookDialog,
    };
  }, [pettyCashBooksUIContext]);

  // Getting curret state of pettyCashBooks list from store (Redux)
  const { curpettyCashBookState } = useSelector(
    (state) => ({ curpettyCashBookState: state.pettyCashBooks }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curpettyCashBookState;

  // PettyCashBooks Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    pettyCashBooksUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPettyCashBooks(pettyCashBooksUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pettyCashBooksUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "pettyCashBookId",
      text: "ID",
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
      dataField: "openingCash",
      text: "Opening Cash",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "systemSale",
      text: "System Sale",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "tailoringSale",
      text: "Tailoring Sale",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "cardSwipe",
      text: "Card/Other Sale",
      sort: true,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bankDeposit",
      text: "Bank Deposit",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "totalExpenses",
      text: "Expenses",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "closingCash",
      text: "Cash In Hand",
      sort: false,     
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPettyCashBookDialog:
          pettyCashBooksUIProps.openEditPettyCashBookDialog,
        openDeletePettyCashBookDialog:
          pettyCashBooksUIProps.openDeletePettyCashBookDialog,
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
    sizePerPage: pettyCashBooksUIProps.queryParams.pageSize,
    page: pettyCashBooksUIProps.queryParams.pageNumber,
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
                keyField="pettyCashBookId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  pettyCashBooksUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: pettyCashBooksUIProps.ids,
                  setIds: pettyCashBooksUIProps.setIds,
                  idName: "pettyCashBookId",
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
