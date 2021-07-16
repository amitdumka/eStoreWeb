// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StoreOperations/Actions";
import * as cActions from "../../../../_redux/Actions";
import {
  
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
//import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";

//Store Operation Table

export function OperationTable({enableButtons}) {
  // Rents UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditDialog: uiContext.openEditOpenDialog,
      openDeleteDialog: uiContext.openDeleteOpenDialog,
    };
  }, [uiContext]);

  // Store Operation state
  const { currentState, storeList } = useSelector(
    (state) => ({
      currentState: state.storeOperations,
      storeList: state.commonTypes.storeList,
    }),
    shallowEqual
  );
  const { totalSO, entitiesStoreOperations, listLoading , storeStatus} = currentState;

  // Store Operation Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    uiProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchStoreOperations(uiProps.queryParams));
    dispatch(actions.fetchStoreStatus(0));
    dispatch(cActions.fetchStores());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);
  // Table columns
  const columnsOpen = [
    {
      dataField: "storeDailyOperationId",
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
      formatter: (cellContent, row) => (
        <span>{new Date(cellContent).toLocaleDateString()}</span>
      ),
    },
    {
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row, rowIndex) => (
        <span>{storeList && cellContent && storeList[rowIndex].storeName}</span>
      ),
    },
    {
      dataField: "openningTime",
      text: "Opens At",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row) => (
        <span>{new Date(cellContent).toLocaleTimeString()}</span>
      ),
    },
    {
      dataField: "closingTime",
      text: "Closed At",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row) => (
        <span>{new Date(cellContent).toLocaleTimeString()}</span>
      ),
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditRentDialog: uiProps.openEditRentDialog,
    //     openDeleteRentDialog: uiProps.openDeleteRentDialog,
    //     idValue: (cellContent, row) => row.storeOpensId,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalSO,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.pageSize,
    page: uiProps.queryParams.pageNumber,
  };

 storeStatus && storeStatus ? enableButtons(false,false): enableButtons(true,true);
  //storeStatus ? setCloseButton(true): setCloseButton(false);
 // console.log(storeStatus);

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
                keyField="storeDailyOperationId"
                data={
                  entitiesStoreOperations === null
                    ? []
                    : totalSO
                    ? entitiesStoreOperations
                    : []
                }
                columns={columnsOpen}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
                //  selectRow={getSelectRow({
                //    entitiesStoreOperations,
                //    ids: uiProps.ids,
                //    setIds: uiProps.setIds,
                //    idName: "storeDailyOperationId",
                //  })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entitiesStoreOperations} />
                <NoRecordsFoundMessage entities={entitiesStoreOperations} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
export function HolidayTable() {
  // Rents UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      idHs: uiContext.idHs,
      setIdHs: uiContext.setIdHs,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditDialog: uiContext.openEditHolidayDialog,
      openDeleteDialog: uiContext.openDeleteHolidayDialog,
    };
  }, [uiContext]);

  // Store Operation state
  const { currentState, storeList } = useSelector(
    (state) => ({
      currentState: state.storeOperations,
      storeList: state.commonTypes.storeList,
    }),
    shallowEqual
  );
  const { totalHolidays, entitiesHolidays, listLoading } = currentState;

  // Store Operation Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    uiProps.setIdHs([]);
    // server call by queryParams
    dispatch(actions.fetchStoreHolidays(uiProps.queryParams));
    dispatch(cActions.fetchStores());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "storeHolidayId",
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
      formatter: (cellContent, row) => (
        <span>{new Date(cellContent).toLocaleDateString()}</span>
      ),
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "approvedBy",
      text: "Approved By",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row) => (
        <span>
          {cellContent}
          {" : "} {storeList && storeList[cellContent - 1].storeName}
        </span>
      ),
    },

    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditRentDialog: uiProps.openEditRentDialog,
    //     openDeleteRentDialog: uiProps.openDeleteRentDialog,
    //     idValue: (cellContent, row) => row.storeHolidayId,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalHolidays,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.pageSize,
    page: uiProps.queryParams.pageNumber,
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
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                //remote
                noDataIndication="No Record Found now.."
                keyField="storeHolidayId"
                data={
                  entitiesHolidays === null
                    ? []
                    : totalHolidays
                    ? entitiesHolidays
                    : []
                }
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
                // selectRow={getSelectRow({
                //   entitiesHolidays,
                //   ids: uiProps.idHs,
                //   setIds: uiProps.setIdHs,
                //   idName: "storeHolidayId",
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entitiesHolidays} />
                <NoRecordsFoundMessage entities={entitiesHolidays} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
