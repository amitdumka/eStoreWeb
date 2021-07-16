// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/Actions";
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


//Bank
//bank

export function BanksTable() {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      queryParams: banksUIContext.queryParams,
      setQueryParams: banksUIContext.setQueryParams,
      openEditBankDialog: banksUIContext.openEditBankDialog,
      openDeleteBankDialog: banksUIContext.openDeleteBankDialog,
    };
  }, [banksUIContext]);

  // Getting curret state of banks list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.banks }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Banks Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    banksUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBanks(banksUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "bankId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bankName",
      text: "Bank Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankDialog: banksUIProps.openEditBankDialog,
        openDeleteBankDialog: banksUIProps.openDeleteBankDialog,
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
    sizePerPage: banksUIProps.queryParams.pageSize,
    page: banksUIProps.queryParams.pageNumber,
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
                keyField="bankId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  banksUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: banksUIProps.ids,
                  setIds: banksUIProps.setIds,
                  idName:"bankId",
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
