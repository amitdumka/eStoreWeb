// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dueRecovereds/Actions";
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

//DueRecovered
//dueRecovered



export function DueRecoveredsTable() {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      ids: dueRecoveredsUIContext.ids,
      setIds: dueRecoveredsUIContext.setIds,
      queryParams: dueRecoveredsUIContext.queryParams,
      setQueryParams: dueRecoveredsUIContext.setQueryParams,
      openEditDueRecoveredDialog: dueRecoveredsUIContext.openEditDueRecoveredDialog,
      openDeleteDueRecoveredDialog: dueRecoveredsUIContext.openDeleteDueRecoveredDialog,
    };
  }, [dueRecoveredsUIContext]);

  // Getting curret state of dueRecovereds list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dueRecovereds }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // DueRecovereds Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    dueRecoveredsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDueRecovereds(dueRecoveredsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueRecoveredsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "dueRecoverdId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, {
      dataField: "paidDate",
      text: "Date",
      sort: true,
      type:      'date',
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    
   
    {
      dataField: "duesList.dailySale.invNo",
      text: "Invoice No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "duesList.amount",
      text: "Due Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "amountPaid",
      text: "Amount Paid",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },   
    {
      dataField: "isPartialPayment",
      text: "Partial Payment",
      formatter: columnFormatters.BooleanColumnFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "modes",
      text: "Mode",
      sort: true,
      formatter: columnFormatters.PayModeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      //formatter: columnFormatters.SalaryComponentsColumnFormatter,
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDueRecoveredDialog: dueRecoveredsUIProps.openEditDueRecoveredDialog,
        openDeleteDueRecoveredDialog: dueRecoveredsUIProps.openDeleteDueRecoveredDialog,
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
    sizePerPage: dueRecoveredsUIProps.queryParams.pageSize,
    page: dueRecoveredsUIProps.queryParams.pageNumber,
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
                keyField="dueRecoveredId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  dueRecoveredsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: dueRecoveredsUIProps.ids,
                  setIds: dueRecoveredsUIProps.setIds,
                  idName:"dueRecoveredId",
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
