import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import FieldDateFormater from "../../../../../_estore/formaters/FieldDateFormater";
const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const UIConsumer = UIContext.Consumer;

export function UIProvider({ UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initData = {
    dailySaleId: 0,
    saleDate: new Date(),
    invNo: "",
    amount: 0,
    payMode: 0,
    cashAmount: 0,
    salesmanId: 0,
    salesman: null,
    isDue: false,
    isManualBill: false,
    isTailoringBill: false,
    isSaleReturn: false,
    remarks: "",
    isMatchedWithVOy: false,
    edcTranscationId: null,
    edcTranscation: null,
    mixAndCouponPaymentId: null,
    mixAndCouponPayment: null,
    couponPayment: null,
    pointRedeemed: null,
    storeId: 1,
    store: null,
    userId: "WebUI",
    entryStatus: 0,
    isReadOnly: false,
  };
  const columns = [
    {
      dataField: "dailySaleId",
      text: "ID",
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
    },
    {
      dataField: "saleDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:FieldDateFormater// (cellContent,row)=>{ new Date(row.saleDate).toLocaleDateString();}
    },
    {
      dataField: "invNo",
      text: "Invoice No",
      sort: true,
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
      dataField: "payMode",
      text: "Payment Mode",
      sort: false,

      sortCaret: sortCaret,
    },
    {
      dataField: "salesman.salesmanName",
      text: "Salesman",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "isManualBill",
      text: "Invoice Type(s)",
      sort: false,
      formatter:columnFormatters.TagGeneratorColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //   dataField: "isSaleReturn",
    //   text: "SalesReturn",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    // {
    //   dataField: "isTailoringBill",
    //   text: "Tailoring",
    //   sort: false,
    //   //formatter:columnFormatters.TypeColumnFormatter,
    //   sortCaret: sortCaret,
    // },
    // {
    //   dataField: "isDue",
    //   text: "Dues",
    //   sort: false,
    //   //formatter:columnFormatters.TypeColumnFormatter,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: UIEvents.openEditDialog,
        openDeleteDialog: UIEvents.openDeleteDialog,
        openPaymentDialog:UIEvents.openPaymentDialog,
        keyFieldValue: null,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initData,
    columns,
    newButtonClick: UIEvents.newButtonClick,
    openEditDialog: UIEvents.openEditDialog,
    openDeleteDialog: UIEvents.openDeleteDialog,
    openDeletesDialog: UIEvents.openDeletesDialog,
    openFetchsDialog: UIEvents.openFetchsDialog,
    openUpdatesStatusDialog: UIEvents.openUpdatesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
