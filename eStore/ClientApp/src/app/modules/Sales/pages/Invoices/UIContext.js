import React, { createContext, useContext, useState, useCallback } from 'react'
import { isEqual, isFunction } from 'lodash'
import { initialFilter } from './UIHelpers'
import {
  sortCaret,
  headerSortingClasses,
} from '../../../../../_metronic/_helpers'
import * as columnFormatters from './column-formatters'
import FieldDateFormater from '../../../../../_estore/formaters/FieldDateFormater'
const UIContext = createContext()

export function useUIContext() {
  console.log("usecontext is called");
  return useContext(UIContext)
}

export const UIConsumer = UIContext.Consumer

export function UIProvider({ UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter)
  const [ids, setIds] = useState([])
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams)
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams
      }

      return nextQueryParams
    })
  }, [])

  const initData = {
    onDate: new Date(),
    customerName:'',
    mobileNo:" ",
    totalAmount: 0,
    totalTaxAmount: 0,
    totalDiscount: 0,
    roundOff: 0,
    totalQty: 0,
    invoiceType: 0,
    payment: null,
    invoiceItems: null,
  }

  const columns = [
    {
      dataField: 'invoiceNumber',
      text: 'Invoice No',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'onDate',
      text: 'Date',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: FieldDateFormater, // (cellContent,row)=>{ new Date(row.saleDate).toLocaleDateString();}
    },
    {
      dataField: 'totalDiscount',
      text: 'Bill Discount',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'totalTaxAmount',
      text: 'Tax Amount',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'totalQty',
      text: 'Qty',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'totalAmount',
      text: 'Bill Amount',
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: 'invoiceType',
      text: 'Invoice Type(s)',
      sort: false,
      formatter: columnFormatters.TagGeneratorColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: UIEvents.openEditDialog,
        openDeleteDialog: UIEvents.openDeleteDialog,
        openPaymentDialog: UIEvents.openPaymentDialog,
        keyFieldValue: null,
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ]
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
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
