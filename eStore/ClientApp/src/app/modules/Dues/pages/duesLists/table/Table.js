// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/duesLists/Actions";
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

//DuesList
//duesList

export function DuesListsTable() {
  // DuesLists UI Context
  const duesListsUIContext = useUIContext();
  const duesListsUIProps = useMemo(() => {
    return {
      ids: duesListsUIContext.ids,
      setIds: duesListsUIContext.setIds,
      queryParams: duesListsUIContext.queryParams,
      setQueryParams: duesListsUIContext.setQueryParams,
      openEditDuesListDialog: duesListsUIContext.openEditDuesListDialog,
      openDeleteDuesListDialog: duesListsUIContext.openDeleteDuesListDialog,
    };
  }, [duesListsUIContext]);

  // Getting curret state of duesLists list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.duesLists }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // DuesLists Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    duesListsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDuesLists(duesListsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duesListsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "duesListId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "dailySale.saleDate",
      text: "Date",
      sort: true,
      type: "date",
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "recoveryDate",
      text: "Recovery Date",
      sort: true,
      type: "date",
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "isRecovered",
      text: "Recovered",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "dailySale.invNo",
      text: "Invoice No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "isPartialRecovery",
      text: "Partial Recovery",
      sort: true,
      //formatter: columnFormatters.PayModeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "storeId",
      text: "Store",
      //formatter: columnFormatters.SalaryComponentsColumnFormatter,
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDuesListDialog: duesListsUIProps.openEditDuesListDialog,
        openDeleteDuesListDialog: duesListsUIProps.openDeleteDuesListDialog,
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
    sizePerPage: duesListsUIProps.queryParams.pageSize,
    page: duesListsUIProps.queryParams.pageNumber,
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
                keyField="duesListId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  duesListsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: duesListsUIProps.ids,
                  setIds: duesListsUIProps.setIds,
                  idName: "duesListId",
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
