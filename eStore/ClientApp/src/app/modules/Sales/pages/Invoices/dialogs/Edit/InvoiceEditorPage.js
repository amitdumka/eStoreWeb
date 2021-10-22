/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'
import * as actions from '../../../../_redux/Invoices/Actions'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../../_metronic/_partials/controls'

import { useSubheader } from '../../../../../../../_metronic/layout'
import { ModalProgressBar } from '../../../../../../../_metronic/_partials/controls'
import * as cActions from '../../../../../_redux/Actions'
import { useUIContext } from '../../UIContext'
import { ProductEditForm } from './InvoiceEditForm'

const initData = {
  onDate: new Date(),
  customerName:'',
  mobileNo:'',
  totalAmount: 0,
  totalTaxAmount: 0,
  totalDiscount: 0,
  roundOff: 0,
  totalQty: 0,
  invoiceType: 0,
  payment: null,
  invoiceItems: null,
}


export function InvoiceEditorPage({
  history,
  match: {
    params: { id },
  },
}) {
  
  // Subheader
  const subHeader = useSubheader()
  // Tabs
  const [tab, setTab] = useState('Invoice')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const {
    actionsLoading,
    invoiceForEdit,
    salesmanList,
    payModes,
    storeList,
  } = useSelector(
    (state) => ({
      actionsLoading: state.invoices.actionsLoading,
      invoiceForEdit: state.invoices.invoiceForEdit,
      salesmanList: state.invoices.employeeEntities,
      payModes: state.commonTypes.payModes,
      storeList: state.commonTypes.storeList,
    }),
    shallowEqual,
  )
  useEffect(() => {
    // server call for getting Invoice by id
    dispatch(actions.fetchInvoice(id))
    dispatch(actions.fetchEmployees())
    dispatch(cActions.fetchEnumValue('payMode'))
    dispatch(cActions.fetchStores())
  }, [id, dispatch])

  useEffect(() => {
    let _title = id ? '' : 'New Invoice'
    if (invoiceForEdit && id) {
      _title = `Edit Invoice '${invoiceForEdit.invoiceNumber}' ${invoiceForEdit.onDate}'`
    }
    setTitle(_title)
    subHeader.setTitle(_title)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceForEdit, id])
  
  // server request for saving invoice
  const saveInvoice = (invoice) => {
    invoice.payMode = parseInt(invoice.payMode)
    if (!id) {
      // server request for creating invoice
      dispatch(actions.createInvoice(invoice)).then(() => backToInvoicesList())
    } else {
      // server request for updating invoice
      dispatch(actions.updateInvoice(invoice)).then(() => backToInvoicesList())
    }
  }
  const btnRef = useRef()
  const saveInvoiceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click()
    }
  }

  const backToInvoicesList = () => {
    history.push(`/sales/invoices`)
  }

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToInvoicesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveInvoiceClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab('Invoice')}>
            <a
              className={`nav-link ${tab === 'Invoice' && 'active'}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === 'Invoice').toString()}
            >
              Invoice
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab('Payment')}>
            <a
              className={`nav-link ${tab === 'Payment' && 'active'}`}
              data-toggle="tab"
              role="button"
              aria-selected={(tab === 'Payment').toString()}
            >
              Invoice Payment
            </a>
          </li>
        </ul>

        <div className="mt-5">
          {tab === 'Invoice' && (
            <ProductEditForm
              //   actionsLoading={actionsLoading}
              invoice={invoiceForEdit || initData}
              btnRef={btnRef}
              //   saveInvoice={saveInvoice}
              //   invoice={invoiceForEdit || invoicesUIProps.initInvoice}
              //   salesmanList={salesmanList}
              //   payModes={payModes}
              //   storeList={storeList}
            />
          )}
          {tab === 'Payment' && <>Payment</>}
        </div>
      </CardBody>
    </Card>
  )
}
