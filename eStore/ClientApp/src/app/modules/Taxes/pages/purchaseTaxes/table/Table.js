// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/purchaseTaxes/Actions";
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

//purchaseTax
//PurchaseTax

export function PurchaseTaxesTable() {
  // PurchaseTaxes UI Context
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      ids: purchaseTaxesUIContext.ids,
      setIds: purchaseTaxesUIContext.setIds,
      queryParams: purchaseTaxesUIContext.queryParams,
      setQueryParams: purchaseTaxesUIContext.setQueryParams,
      openEditPurchaseTaxDialog:
        purchaseTaxesUIContext.openEditPurchaseTaxDialog,
      openDeletePurchaseTaxDialog:
        purchaseTaxesUIContext.openDeletePurchaseTaxDialog,
    };
  }, [purchaseTaxesUIContext]);

  // Getting current state of purchaseTaxes list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.purchaseTaxes,
      taxTypes: state.purchaseTaxes.purchaseTaxes,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // PurchaseTaxes Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    purchaseTaxesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPurchaseTaxes(purchaseTaxesUIProps.queryParams));
    dispatch(actions.fetchTaxType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseTaxesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "purchaseTaxId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ledgerNameType",
      text: "PurchaseTax Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remark",
      text: "Remark",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPurchaseTaxDialog:
          purchaseTaxesUIProps.openEditPurchaseTaxDialog,
        openDeletePurchaseTaxDialog:
          purchaseTaxesUIProps.openDeletePurchaseTaxDialog,
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
    sizePerPage: purchaseTaxesUIProps.queryParams.pageSize,
    page: purchaseTaxesUIProps.queryParams.pageNumber,
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
                keyField="purchaseTaxId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  purchaseTaxesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: purchaseTaxesUIProps.ids,
                  setIds: purchaseTaxesUIProps.setIds,
                  idName: "purchaseTaxId",
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
