// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/stores/Actions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "./StoreUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useStoresUIContext } from "./StoreUIContext";


export function StoresTable() {
  // Stores UI Context
  const storesUIContext = useStoresUIContext();
  const storesUIProps = useMemo(() => {
    return {
      ids: storesUIContext.ids,
      setIds: storesUIContext.setIds,
      queryParams: storesUIContext.queryParams,
      setQueryParams: storesUIContext.setQueryParams,
      openEditStoreDialog: storesUIContext.openEditStoreDialog,
      openDeleteStoreDialog: storesUIContext.openDeleteStoreDialog,
    };
  }, [storesUIContext]);

  // Getting curret state of stores list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.stores }),
    shallowEqual
  );
  
  const { totalCount, entities, listLoading } = currentState;

  
  // Stores Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    storesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchStores(storesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storesUIProps.queryParams, dispatch]);
  // Table columns
const columns = [
  {
    dataField: "storeId",
    text: "ID",
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: "storeName",
    text: "Storename",
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: "storeCode",
    text: "storeCode",
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
    dataField: "gstno",
    text: "GSTIN",
    sort: false,
    sortCaret: sortCaret,
  },
  
  {
    dataField: "phoneNo",
    text: "Contact",
    sort: false,
    sortCaret: sortCaret,
  },
  {
    dataField: "storeManagerName",
    text: "StoreManager",
    sort: false,
    sortCaret: sortCaret,
  },
  {
    dataField: "openingDate",
    text: "OpeningDate",
    sort: true,
    sortCaret: sortCaret,
    //formatter: columnFormatters.StatusColumnFormatter,
    headerSortingClasses,
  },
  {
    dataField: "action",
    text: "Actions",
    formatter: columnFormatters.ActionsColumnFormatter,
    formatExtraData: {
      openEditStoreDialog: storesUIProps.openEditStoreDialog,
      openDeleteStoreDialog: storesUIProps.openDeleteStoreDialog,
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
    sizePerPage: storesUIProps.queryParams.pageSize,
    page: storesUIProps.queryParams.pageNumber,
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
                keyField="storeId"
                data={entities === null ? []: entities}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  storesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: storesUIProps.ids,
                  setIds: storesUIProps.setIds,
                  idName:"storeId",
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
