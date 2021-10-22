
// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Component,useEffect, useMemo  } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../../_metronic/_partials/controls";
import * as actions from "../../../../_redux/Invoices/Actions";
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

// Validation schema
const InvoiceEditSchema = Yup.object().shape({
  mobileNo: Yup.string().required("Mobile Number is required"),
  customerName: Yup.string().required("Customer Name is required"),
  onDate: Yup.date().required("Date is required"),
  totalAmount: Yup.number().required("Total Amount is required"),
  totalTaxAmount: Yup.number().required("Total Tax is required"),
  totalQty: Yup.number("Qty should be numeric")
    .min(1, "Qty should be more than zero")
    .required("Qty is required"),
});

enableRipple(true);

export function ProductEditForm({ invoice, btnRef, saveProduct }) {
  const dispatch = useDispatch();

  const { invoices ,commonTypes} = useSelector(
    (state) => ({ invoices: state.invoices , commonTypes:state.commonTypes}),
    shallowEqual
  );

  const { productStocks } = invoices;
useEffect(() => {
    // server call by queryParams
   // dispatch(actions.fetchProductStocks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  let pItems = [];

  const AddItem = (item) => {
    pItems.push({
      barcode: item.barcode,
      qty: item.qty,
      basicPrice: item.price,
      discount: item.discount,
      tax: item.tax,
    });
  };


  const handleFetchBarcode = (barcode, setFieldValue) => {
    alert(barcode);
    setFieldValue("qty", 101);
  };

  const FetchProductItem = ({ barcode }) => {
    // Need to redux for productItem+stock or ProductStockView
    //Like
    let ProductStockView = {
      barcode: "",
      mrp: 0,
      stock: 0,
      taxRate: 5,
      ProductCategory: "Fabric",
      productName: "Shirting Tersca White",
      Unit: "Metres",
    };
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invoice}
        validationSchema={InvoiceEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              {/* Invoice Details */}
              <div className="form-group row">
                <div className="col-lg-4">
                  {/* <Field
                    name="onDate"
                    type="date"
                    component={Input}
                    placeholder="Date"
                    label="Date"
                  /> */}
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
                      handleFetchBarcode(values.barcode, setFieldValue)
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
      <InvoiceDetailForm dataModel={pItems} />
    </>
  );
}
export class SyncfusionBase extends React.PureComponent {
  rendereComplete() {
    /**custom render complete function */
  }
  componentDidMount() {
    setTimeout(() => {
      this.rendereComplete();
    });
  }
}
export default class InvoiceDetailForm extends SyncfusionBase {
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
    return <DialogItemForm {...props} />;
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

//Note: template was working but suddenly got stop working and started to give error
//Pop up add display form
export class DialogItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = extend({}, {}, props, true);
  }
  onChange(args) {
    let key = args.target.name;
    let value = args.target.value;
    this.setState({ [key]: value });
  }
  componentDidMount() {
    let state = this.state;
    // Set initail Focus
    state.isAdd ? this.barcode.focus() : this.qty.focus();
  }
  render() {
    let data = this.state;
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                ref={(input) => (this.barcode = input)}
                id="barcode"
                name="barcode"
                type="text"
                disabled={!data.isAdd}
                value={data.barcode}
                onChange={this.onChange.bind(this)}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top"> Barcode</label>
            </div>
          </div>
          <div className="form-group col-md-6">
            <NumericTextBoxComponent
              id="qty"
              value={data.qty}
              placeholder="Qty"
              floatLabelType="Always"
            ></NumericTextBoxComponent>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <NumericTextBoxComponent
              id="basicPrice"
              format="C2"
              value={data.basicPrice}
              placeholder="Basic Price"
              floatLabelType="Always"
            ></NumericTextBoxComponent>
          </div>
          <div className="form-group col-md-6">
            <NumericTextBoxComponent
              id="discount"
              format="C2"
              value={data.discount}
              placeholder="Discount"
              floatLabelType="Always"
            ></NumericTextBoxComponent>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <NumericTextBoxComponent
              id="tax"
              format="C2"
              value={data.tax}
              placeholder="Tax"
              floatLabelType="Always"
            ></NumericTextBoxComponent>
          </div>
        </div>
      </div>
    );
  }
}

export function PaymentForm({ invoiceNumber, onDate, payModes, edcList }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        //initialValues={payment}
        // validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          //saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                {/* Date of Invoice */}
                <div className="col-lg-4">
                  <label className="text-info">
                    On Date : {onDate && onDate}
                  </label>
                </div>
                {/* Invoice No */}
                <div className="col-lg-4">
                  <label className="text-danger">
                    Invoice No : {invoiceNumber && invoiceNumber}
                  </label>
                </div>
              </div>

              <div className="form-group row">
                {/* PayMode */}
                <div className="col-lg-4">
                  <Select name="payModes" label="Payment Mode">
                    {payModes &&
                      payModes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </div>
                {/* EDC */}
                <div className="col-lg-4">
                  <Select name="EDCId" label="EDC">
                    {edcList &&
                      edcList.map((item) => (
                        <option key={item.eDCId} value={item.eDCId}>
                          {item.eDCName}
                        </option>
                      ))}
                  </Select>
                </div>
                {/*  amount Name*/}
                <div className="col-lg-4">
                  <Field
                    name="amount"
                    component={Input}
                    placeholder="Amount"
                    label="Amount"
                  />
                </div>
                {/* cash amount Name*/}
                <div className="col-lg-4">
                  <Field
                    name="cashAmount"
                    component={Input}
                    placeholder="Cash Amount"
                    label="Cash Amount"
                  />
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
