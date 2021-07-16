// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankDeposits/Actions";
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

//BankDeposit
//bankDeposit


export function BankDepositsTable() {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      ids: bankDepositsUIContext.ids,
      setIds: bankDepositsUIContext.setIds,
      queryParams: bankDepositsUIContext.queryParams,
      setQueryParams: bankDepositsUIContext.setQueryParams,
      openEditBankDepositDialog: bankDepositsUIContext.openEditBankDepositDialog,
      openDeleteBankDepositDialog: bankDepositsUIContext.openDeleteBankDepositDialog,
    };
  }, [bankDepositsUIContext]);

  // Getting curret state of bankDeposits list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankDeposits }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // BankDeposits Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    bankDepositsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBankDeposits(bankDepositsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankDepositsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "bankDepositId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "account.account",
      text: "AccountNo",
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
      dataField: "chequeNo",
      text: "ChequeNo",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "inNameOf",
      text: "In-Name",
      sort: false,
      sortCaret: sortCaret,
    },
    
    {
      dataField: "payMode",
      text: "Mode",
      sort: true,
      formatter: columnFormatters.PayModeColumnFormatter,
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
      dataField: "remarks",
      text: "Remarks",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankDepositDialog: bankDepositsUIProps.openEditBankDepositDialog,
        openDeleteBankDepositDialog: bankDepositsUIProps.openDeleteBankDepositDialog,
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
    sizePerPage: bankDepositsUIProps.queryParams.pageSize,
    page: bankDepositsUIProps.queryParams.pageNumber,
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
                keyField="bankDepositId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  bankDepositsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: bankDepositsUIProps.ids,
                  setIds: bankDepositsUIProps.setIds,
                  idName:"bankDepositId",
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
