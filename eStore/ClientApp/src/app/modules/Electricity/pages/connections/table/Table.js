// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/connections/Actions";
import * as cActions from "../../../../_redux/Actions";
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
// import * as colEnumFormatters from "../../../../../../_estore/formaters/";

//Connection
//connection

export function ConnectionsTable() {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      ids: connectionsUIContext.ids,
      setIds: connectionsUIContext.setIds,
      queryParams: connectionsUIContext.queryParams,
      setQueryParams: connectionsUIContext.setQueryParams,
      openEditConnectionDialog:
        connectionsUIContext.openEditConnectionDialog,
      openDeleteConnectionDialog:
        connectionsUIContext.openDeleteConnectionDialog,
    };
  }, [connectionsUIContext]);

  // Getting curret state of connections list from store (Redux)
  const { currentState,commonState } = useSelector(
    (state) => ({ currentState: state.connections, 
      commonState: state.commonTypes, 
      connectionType:state.commonTypes.connectionType,
      storeList:state.commonTypes.storeList}),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
 const {storeList, connectionType} =commonState;
  // Connections Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    connectionsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchConnections(connectionsUIProps.queryParams));
    dispatch(cActions.fetchStores());
    dispatch(cActions.fetchEnumValue("connectionType"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "electricityConnectionId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "locationName",
      text: "Location Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "connectioName",
      text: "Connection Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "consumerNumber",
      text: "Consumer Number",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "conusumerId",
      text: "Conusumer Id",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "connectinDate",
      text: "Connection Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "kvLoad",
      text: "Load",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "disconnectionDate",
      text: "Disconnection Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "connection",
      text: "Connection",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      // formatter:(value,row)=>(
      // <span> { connectionType ? connectionType[value].name : value} </span>
      // ),
      formatter:columnFormatters.EnumColumnFormatter, 
      formatExtraData:{dataList:connectionType, n:-1} 
    },{
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:columnFormatters.StoreNameColumnFormatter, 
      formatExtraData: storeList,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditConnectionDialog:
          connectionsUIProps.openEditConnectionDialog,
        openDeleteConnectionDialog:
          connectionsUIProps.openDeleteConnectionDialog,
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
    sizePerPage: connectionsUIProps.queryParams.pageSize,
    page: connectionsUIProps.queryParams.pageNumber,
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
                keyField="electricityConnectionId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  connectionsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: connectionsUIProps.ids,
                  setIds: connectionsUIProps.setIds,
                  idName: "electricityConnectionId",
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
