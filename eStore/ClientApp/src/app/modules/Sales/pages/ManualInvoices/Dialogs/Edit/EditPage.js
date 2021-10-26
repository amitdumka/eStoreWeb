/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useState, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSubheader } from "../../../../../../../_metronic/layout";
import * as actions from "../../../../_redux/Invoices/Actions";
import * as cActions from "../../../../../_redux/Actions";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar,
} from "../../../../../../../_metronic/_partials/controls";

import EditForm from "./EditForm";
import { PaymentForm } from "./PaymentForm";

const initData = {
  onDate: new Date(),
  customerName: "",
  mobileNo: "",
  totalAmount: 0,
  totalTaxAmount: 0,
  totalDiscount: 0,
  roundOff: 0,
  totalQty: 0,
  invoiceType: 0,
  payment: null,
  invoiceItems: null,
};

const itemInitData = {
  barcode: "",
  qty: 0,
  basicPrice: 0,
  discount: 0,
  tax: 0,
};

// It is invoice Edit/Entry page.
export function EditPage({
  history,
  match: {
    params: { id },
  },
}) {
  //SubHeader
  const subHeader = useSubheader();
  //need to set SubHeader.

  //Tabs
  const [tab, setTab] = useState("Invoice");
  const [title, setTitle] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [billAmount, setBillAmount] = useState(-1);
  const dispatch = useDispatch();
  const {
    actionsLoading,
    invoiceForEdit,
    salesmanList,
    payModes,
    storeList,
    productStocks,
  } = useSelector(
    (state) => ({
      actionsLoading: state.invoices.actionsLoading,
      invoiceForEdit: state.invoices.invoiceForEdit,
      salesmanList: state.commonTypes.salesmanList,
      payModes: state.commonTypes.payModes,
      storeList: state.commonTypes.storeList,
      // productStocks: state.productStocks.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    // Calling server for data..
    dispatch(actions.fetchInvoice(id));
    //dispatch(cActions.fetchSalesman());
    dispatch(cActions.fetchEnumValue("payMode"));
    dispatch(cActions.fetchStores());
    //Note: Will check for use which one is more effective.
    // dispatch(actions.fetchProductStocks()); //Fetch product Stock View so it can be used to later use.
  }, [id, dispatch]);
  //Setting up header and SubHeader title.
  useEffect(() => {
    let _title = id ? "" : "New Invoice";
    if (invoiceForEdit && id) {
      _title = `Edit Invoice '${invoiceForEdit.invoiceNumber}' ${invoiceForEdit.onDate}'`;
    }
    setTitle(_title);
    subHeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceForEdit, id]);

  // map formik data to sale item and invoice
  const mapToInvoice = (data) => {
    const invoice = {
      onDate: data.onDate,
      totalAmount: data.totalAmount,
      totalTaxAmount: data.totalTaxAmount,
      totalDiscount: data.totalDiscount,
      roundOff: data.roundOff,
      totalQty: data.totalQty,
      invoiceType: 1,
    };
    const item = {
      Barcode: data.item.barcoe,
      Qty: data.item.qty,
      Units: data.item.unit,
      BasicPrice: data.item.basicPrice,
      DiscountAmount: data.item.discount,
      TaxAmount: data.item.taxAmount,
      SalesmanId: data.item.salesmanid,
    };
  };

  //Save Data.
  const saveData = (invoice) => {
    // Note: Here need to convert data into server data format
    if (!id) {
      // server request for creating invoice
      //Display alert message on event completed or error occured!.
      dispatch(actions.createInvoice(invoice)).then((response) =>
        moveToPaymentTab(response.data)
      );
    } else {
      // server request for updating invoice
      //Display alert message on event completed or error occured!.
      dispatch(actions.updateInvoice(invoice)).then((response) =>
        moveToPaymentTab(response.data)
      );
    }
  };

  const moveToPaymentTab = (invoice) => {
    setTab("Payment");
    setInvoiceDate(invoice.onDate);
    setBillAmount(invoice.totalAmount);
    setInvoiceNumber(invoice.invoiceNumber);
  };

  const btnRef = useRef(); //using button ref

  //Need to co-relate it with actions
  const saveInvoiceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInvoicesList = () => {
    history.push(`/sales/invoices`);
  };

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
          <li className="nav-item" onClick={() => setTab("Invoice")}>
            <a
              className={`nav-link ${tab === "Invoice" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "Invoice").toString()}
            >
              Invoice
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("Payment")}>
            <a
              className={`nav-link ${tab === "Payment" && "active"}`}
              data-toggle="tab"
              role="button"
              aria-selected={(tab === "Payment").toString()}
            >
              Invoice Payment
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "Invoice" && (
            <EditForm
              //actionsLoading={actionsLoading}
              invoice={invoiceForEdit || initData}
              btnRef={btnRef}
              saveData={saveData}
              // salesmanList={salesmanList}
              // payModes={payModes}
              // storeList={storeList}
            />
          )}
          {tab === "Payment" && (
            <>
              <PaymentForm payModes={payModes} edcList={null} btnRef={btnRef} />
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
//end of EditPage.
