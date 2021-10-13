/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'
import * as actions from '../../../_redux/invoices/invoicesActions'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../_metronic/_partials/controls'
import { InvoiceEditForm } from './InvoiceEditForm'
import { Specifications } from '../invoice-specifications/Specifications'
import { SpecificationsUIProvider } from '../invoice-specifications/SpecificationsUIContext'
import { useSubheader } from '../../../../../../_metronic/layout'
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls'
import { RemarksUIProvider } from '../invoice-remarks/RemarksUIContext'
import { Remarks } from '../invoice-remarks/Remarks'
import { Modal } from 'react-bootstrap'
//import { shallowEqual, //, useSelector } from "react-redux";
//import * as actions from "../../../_redux/Invoices/Actions";
import * as cActions from '../../../../_redux/Actions'
import { EditDialogHeader } from './EditDialogHeader'
import { EditForm } from './EditForm'
import { useUIContext } from '../UIContext'

export function InvoiceEditorPage({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const subHeader = useSubheader()
  // Tabs
  const [tab, setTab] = useState('Invoice');
  const [title, setTitle] = useState('');
  // Invoices UI Context
  const invoicesUIContext = useUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      initInvoice: invoicesUIContext.initData,
    };
  }, [invoicesUIContext]);
  const dispatch = useDispatch();
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
            <InvoiceEditForm
              actionsLoading={actionsLoading}
              //invoice={invoiceForEdit || initInvoice}
              btnRef={btnRef}
              saveInvoice={saveInvoice}
              invoice={invoiceForEdit || invoicesUIProps.initInvoice}
              salesmanList={salesmanList}
              payModes={payModes}
              storeList={storeList}
            />
          )}
          {tab === 'Payment' && id && (
            <RemarksUIProvider currentInvoiceId={id}>
              <Remarks />
            </RemarksUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
