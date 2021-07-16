// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/DailySales/Actions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
//import * as columnFormatters from "../column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";

//dailySale

export function DataTable(keyFieldName) {
  // s UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditDialog: uiContext.openEditDialog,
      openDeleteDialog: uiContext.openDeleteDialog,
      columns:uiContext.columns,
    };
  }, [uiContext]);

  // Getting curret state of s list from store (Redux)
  const { curState } = useSelector(
    (state) => ({ curState: state.dailySales }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = curState;

  // s Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    uiProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDailySales(uiProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);
  
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.pageSize,
    page: uiProps.queryParams.pageNumber,
  };
  return (
    <>
    {uiProps.columns &&
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
                keyField={keyFieldName}
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={uiProps.columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities,
                  ids: uiProps.ids,
                  setIds: uiProps.setIds,
                  idName: { keyFieldName },
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
    }
</>
  );
}
