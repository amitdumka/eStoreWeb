import React, { Component, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../../../_redux/Invoices/Actions";
import * as commonActions from "../../../../../_redux/Actions";
import {
  Input,
  DatePickerField,
} from "../../../../../../../_metronic/_partials/controls";
import SyncfusionBase from "../../../../../../../_estore/controls/SyncfusionBase";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  Edit,
  Filter,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { enableRipple } from "@syncfusion/ej2-base";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
////import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
//import { DataUtil } from '@syncfusion/ej2-data'
import { Browser, extend } from "@syncfusion/ej2-base";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

enableRipple(true);

const EditSchema = Yup.object().shape({
  mobileNo: Yup.string().required("Mobile Number is required"),
  customerName: Yup.string().required("Customer Name is required"),
  onDate: Yup.date().required("Date is required"),
  totalAmount: Yup.number().required("Total Amount is required"),
  totalTaxAmount: Yup.number().required("Total Tax is required"),
  totalQty: Yup.number("Qty should be numeric")
    .min(1, "Qty should be more than zero")
    .required("Qty is required"),
});

// Edit Form : The Form for inserting data. 
export default function EditForm({
  invoice,
  btnRef,
  saveData,
  storeList,
  salesmanList,
  payModes,
}) {
  const dispatch = useDispatch();
  let pItems = [];
  const [field, setField] = useState({
    qty: 0,
    amount: 0,
    tax: 0,
    discount: 0,
  });

  const updateDetails = (productStock, setFieldValue) => {
    //based of barcode fetch data and update MRP, Qty
    //productStockViews
    // Barcode = c.Barcode,
    // MRP = c.ProductItem.MRP,
    // Name = c.ProductItem.ProductName,
    // ProductType = c.ProductItem.MainCategory,
    // TaxRate = c.ProductItem.TaxRate,
    // Stock = (decimal)c.Quantity,
    // Unit = c.Units
    //in future need to cache result in some places
    if (productStock != null) {
      setFieldValue("qty", productStock.Quantity);
      setFieldValue("basicPrice", productStock.MRP);
      setFieldValue("price", 0);
      setFieldValue("tax", productStock.TaxRate);
    } else {
      alert("No Product Found!");
    }
    setFieldValue("qty", 101);
  };
  const handleBarcode = (barcode, setFieldValue) => {

    dispatch(commonActions.fetchProductStocks(barcode))
      .then((response) => {
        console.log(response);
        updateDetails(response.data, setFieldValue);
      })
      .catch((error) => {
        console.log(error);
        error.clientMessage = "Can't find Invoice";
        alert(error);
        //Implement SweetNotify2 here
      });
  };
  const onQtyChange = (qty, mrp, setFieldValue) => {
    let price = qty * mrp;
    //let tax=price-(price *TaxRate/100);
    setFieldValue("amount", price);
  };
  const onDiscountChange = (discount, qty, mrp, setFieldValue) => {
    let price = qty * mrp - discount;
    //let tax=price-(price *TaxRate/100);
    setFieldValue("amount", price);
  };

  const handleAddButton = (values, setFieldValue) => {
    pItems.push({
      barcode: values.barcode,
      qty: values.qty,
      basicPrice: values.mrp,
      discount: values.discount,
      tax: values.tax,
    });

    setField("qty", field.qty + values.qty);
    setField("amount", field.amount + values.mrp);
    setField("tax", field.tax + values.tax);
    setField("discount", field.discount + values.discount);

    setFieldValue("totalAmount", field.amount);
    setFieldValue("totalTaxAmount", field.tax);
    setFieldValue("totalDiscount", field.discount);
    setFieldValue("totalQty", field.qty);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invoice}
        validationSchema={EditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              {/* Invoice Details */}
              <div className="form-group row">
                <div className="col-lg-4">
                  <DatePickerField
                    dateFormat="yyyy-MM-dd"
                    name="onDate"
                    label="Date"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="mobileNo"
                    component={Input}
                    placeholder="Mobile No"
                    label="Contact"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="customerName"
                    component={Input}
                    placeholder="Customer Name"
                    label="Customer Name"
                  />
                </div>
              </div>
              {/* Invoice content details */}
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    type="number"
                    name="totalAmount"
                    component={Input}
                    placeholder="Amount"
                    label="Bill Amount"
                    customFeedbackLabel=" "
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    type="number"
                    name="totalTaxAmount"
                    component={Input}
                    placeholder="Taxes"
                    label="Total Taxes"
                    customFeedbackLabel=" "
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    type="number"
                    name="totalDiscount"
                    component={Input}
                    placeholder="Discounts"
                    label="Discounts"
                    customFeedbackLabel=" "
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="totalQty"
                    component={Input}
                    placeholder="Qty"
                    label="Qty"
                  />
                </div>
              </div>

              {/* Move In Different Part */}
              <div className="row">
                <h4>Add Item</h4>
              </div>
              <div className="form-group  row border rounded border-primary  ">
                {/* Add item controls */}

                {/* <div className="col-lg-12 inline"> */}
                <div className="col-sm-2 inline text-center">
                  <Field
                    name="barcode"
                    component={Input}
                    label="Barcode"
                    placeholder="Barcode"
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleBarcode(values.barcode, setFieldValue)
                    }
                  >
                    S
                  </button>
                </div>

                <div className="col-sm-2 ">
                  <Field
                    name="qty"
                    component={Input}
                    label="Qty"
                    placeholder="Qty"
                    onChange={() =>
                      onQtyChange(values.qty, values.mrp, setFieldValue)
                    }
                  />
                </div>
                <div className="col-lg-2">
                  <Field
                    name="mrp"
                    component={Input}
                    label="MRP"
                    placeholder="MRP"
                    disabled
                  />
                </div>
                <div className="col-lg-2">
                  <Field
                    name="discount"
                    component={Input}
                    label="Discount"
                    placeholder="Discount"
                    onChange={() =>
                      onDiscountChange(
                        values.discount,
                        values.qty,
                        values.mrp,
                        setFieldValue
                      )
                    }
                  />
                </div>
                <div className="col-lg-2">
                  <Field
                    name="netAmount"
                    component={Input}
                    label="Amount"
                    placeholder="Amount"
                  />
                </div>
                <div className="col-lg-2 p-7">
                  <button type="button" className="btn btn-primary">
                    Add
                  </button>
                </div>
                {/* </div> */}
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
            <div className="table-danger"></div>
          </>
        )}

        
      </Formik>
      <EditDetailForm dataModel={pItems} />
    </>
  );
}

export class EditDetailForm extends SyncfusionBase {
  constructor() {
    super(...arguments);
    this.toolbarOptions = ["Add", "Edit", "Delete", "Search"];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog",
      // template: this.dialogTemplate,
    };
    this.editparams = { params: { popupHeight: "300px" } };
    this.validationRules = { required: true };
    this.orderidRules = { required: true, number: true };
    this.pageSettings = { pageSize: 5, pageCount: 5 };
  }
  dialogTemplate(props) {
    // return <DialogItemForm {...props} />;
  }
  actionComplete(args) {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + "px";
        args.dialog.dataBind();
      }
    }
  }
  render() {
    return (
      <div className="control-pane border rounded border-primary">
        <div className="control-section">
          <GridComponent
            dataSource={this.props.dataModel}
            toolbar={this.toolbarOptions}
            allowPaging={true}
            allowFiltering={true}
            filterSettings={{ type: "Check" }}
            editSettings={this.editSettings}
            pageSettings={this.pageSettings}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="barcode"
                headerText="Barcode"
                width="180"
                textAlign="Center"
                validationRules={this.validationRules}
                editType="textedit"
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                editType="numericedit"
                field="qty"
                headerText="Qty"
                width="120"
                validationRules={this.orderidRules}
              ></ColumnDirective>
              <ColumnDirective
                field="basicPrice"
                headerText="Price"
                width="120"
                format="C2"
                textAlign="Center"
                editType="numericedit"
              ></ColumnDirective>
              <ColumnDirective
                field="discount"
                headerText="Discount"
                format="C2"
                editType="numericedit"
                width="120"
                validationRules={this.orderidRules}
                textAlign="Center"
              ></ColumnDirective>
              <ColumnDirective
                field="tax"
                format="C2"
                headerText="Tax"
                width="150"
                textAlign="Center"
                editType="numericedit"
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter, Page, Toolbar, Edit]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

// {
//   "purchaseItemId": 1,
//   "productPurchaseId": 142,
//   "productPurchase": null,
//   "productItemId": 0,
//   "productItem": null,
//   "barcode": "M20405501007",
//   "qty": 14.4,
//   "unit": 0,
//   "cost": 507,
//   "taxAmout": 0,
//   "purchaseTaxTypeId": null,
//   "purchaseTaxType": null,
//   "costValue": 7300.8
//   }
