// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankWithdrawals/Actions";
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

//BankWithdrawal
//bankWithdrawal


export function BankWithdrawalsTable() {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: bankWithdrawalsUIContext.ids,
      setIds: bankWithdrawalsUIContext.setIds,
      queryParams: bankWithdrawalsUIContext.queryParams,
      setQueryParams: bankWithdrawalsUIContext.setQueryParams,
      openEditBankWithdrawalDialog: bankWithdrawalsUIContext.openEditBankWithdrawalDialog,
      openDeleteBankWithdrawalDialog: bankWithdrawalsUIContext.openDeleteBankWithdrawalDialog,
    };
  }, [bankWithdrawalsUIContext]);

  // Getting curret state of bankWithdrawals list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankWithdrawals }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // BankWithdrawals Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    bankWithdrawalsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBankWithdrawals(bankWithdrawalsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankWithdrawalsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "bankWithdrawalId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "account.account",
      text: "Account",
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
      dataField: "inNameOf",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: false,
      sortCaret: sortCaret,
    },
    
    {
      dataField: "details",
      text: "Details",
      sort: true,
      //formatter: columnFormatters.StatusColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "approvedBy",
      text: "ApprovedBy",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankWithdrawalDialog: bankWithdrawalsUIProps.openEditBankWithdrawalDialog,
        openDeleteBankWithdrawalDialog: bankWithdrawalsUIProps.openDeleteBankWithdrawalDialog,
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
    sizePerPage: bankWithdrawalsUIProps.queryParams.pageSize,
    page: bankWithdrawalsUIProps.queryParams.pageNumber,
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
                keyField="bankWithdrawalId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  bankWithdrawalsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: bankWithdrawalsUIProps.ids,
                  setIds: bankWithdrawalsUIProps.setIds,
                  idName:"bankWithdrawalId",
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
