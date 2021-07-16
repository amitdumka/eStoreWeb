// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StaffAdvanceReceipts/Actions";
import * as commonActions from "../../../../_redux/Actions";
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

//StaffAdvanceReceipt
//staffAdvanceReceipt

export function StaffAdvanceReceiptsTable() {
  // StaffAdvanceReceipts UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditStaffAdvanceReceiptDialog:
        uiContext.openEditStaffAdvanceReceiptDialog,
      openDeleteStaffAdvanceReceiptDialog:
        uiContext.openDeleteStaffAdvanceReceiptDialog,
    };
  }, [uiContext]);

  // Getting curret state of staffAdvanceReceipts list from store (Redux)
  const { currentState, commonState } = useSelector(
    (state) => ({ currentState: state.staffAdvanceReceipts , 
                  commonState:state.commonTypes,            
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading , employeeEntities} = currentState;
  const {payModes, storeList}=commonState;

  // StaffAdvanceReceipts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    uiProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchStaffAdvanceReceipts(uiProps.queryParams));
    dispatch(actions.fetchEmployees());
    dispatch(actions.fetchParties());
    dispatch(commonActions.fetchEnumValue("payMode"));
    dispatch(commonActions.fetchStores());
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "staffAdvanceReceiptId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "employeeId",
      text: "Employee",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:(cellValue)=>(employeeEntities && employeeEntities[cellValue-1].staffName)
    },
    {
      dataField: "receiptDate",
      text: "Date",
      sort: true,
      type: "date",
      formatter: FieldDateFormater,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "amount",
      text: "amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
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
      dataField: "details",
      text: "Details",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:(cellValue)=>(storeList && storeList[cellValue-1].storeName)
    },
    
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditStaffAdvanceReceiptDialog:
          uiProps.openEditStaffAdvanceReceiptDialog,
        openDeleteStaffAdvanceReceiptDialog:
          uiProps.openDeleteStaffAdvanceReceiptDialog,
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
    sizePerPage: uiProps.queryParams.pageSize,
    page: uiProps.queryParams.pageNumber,
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
                keyField="staffAdvanceReceiptId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities,
                  ids: uiProps.ids,
                  setIds: uiProps.setIds,
                  idName: "staffAdvanceReceiptId",
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
