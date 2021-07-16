// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/Actions";
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

//BankAccount
//bankAccount

export function BankAccountsTable() {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      ids: bankAccountsUIContext.ids,
      setIds: bankAccountsUIContext.setIds,
      queryParams: bankAccountsUIContext.queryParams,
      setQueryParams: bankAccountsUIContext.setQueryParams,
      openEditBankAccountDialog:
        bankAccountsUIContext.openEditBankAccountDialog,
      openDeleteBankAccountDialog:
        bankAccountsUIContext.openDeleteBankAccountDialog,
    };
  }, [bankAccountsUIContext]);

  // Getting curret state of bankAccounts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankAccounts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // BankAccounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    bankAccountsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBankAccounts(bankAccountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccountsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "bankAccountId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "bank.bankName",
      text: "Bank",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "account",
      text: "Account No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "branchName",
      text: "Branch Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "accountType",
      text: "Account Type",
      sort: false,
      formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankAccountDialog:
          bankAccountsUIProps.openEditBankAccountDialog,
        openDeleteBankAccountDialog:
          bankAccountsUIProps.openDeleteBankAccountDialog,
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
    sizePerPage: bankAccountsUIProps.queryParams.pageSize,
    page: bankAccountsUIProps.queryParams.pageNumber,
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
                keyField="bankAccountId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  bankAccountsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: bankAccountsUIProps.ids,
                  setIds: bankAccountsUIProps.setIds,
                  idName: "bankAccountId",
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
