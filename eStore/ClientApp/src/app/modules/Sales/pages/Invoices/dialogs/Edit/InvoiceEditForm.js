// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React ,{Component}from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  ProductConditionTitles,
} from "../ProductsUIHelpers";

import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';

// Validation schema
const ProductEditSchema = Yup.object().shape({
  model: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Model is required"),
  manufacture: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Manufacture is required"),
  modelYear: Yup.number()
    .min(1950, "1950 is minimum")
    .max(2020, "2020 is maximum")
    .required("Model year is required"),
  mileage: Yup.number()
    .min(0, "0 is minimum")
    .max(1000000, "1000000 is maximum")
    .required("Mileage is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .min(1, "$1 is minimum")
    .max(1000000, "$1000000 is maximum")
    .required("Price is required"),
  VINCode: Yup.string().required("VINCode is required"),
});

const initData = {
  //invoiceNumber: "",
  //onDate: new Date(),
  //customerId: 1,
  //customer: null,
  //totalAmount: 0,
  //totalTaxAmount: 0,
  //totalDiscount: 0,
  //roundOff: 0,
  //totalQty: 0,
  //invoiceType: 0,
  //payment: null,
  //invoiceItems: null,
};

export function ProductEditForm({ product, btnRef, saveProduct }) {
  let pItems = [];
  const AddPItem = (item) => {
    pItems.push({
      barcode: item.barcode,
      qty: item.qty,
      basicPrice: item.price,
      discount: item.discount,
      tax: item.tax,
    });
  };

  const FetchPItem = ({ barcode }) => {
    // Need to redux for productItem+stock or ProductStockView
    //Like
    const ProductStockView = {
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
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="onDate"
                    type="date"
                    component={Input}
                    placeholder="Date"
                    label="Date"
                  />
                </div>

                <div className="col-lg-4">
                  <Field
                    //type="number"
                    name="customerName"
                    component={Input}
                    placeholder="Customer Name"
                    label="Customer Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    //type="number"
                    name="mobileNo"
                    component={Input}
                    placeholder="Mobile No"
                    label="Contact"
                  />
                </div>

                <div className="col-lg-4">
                  <Field
                    disabled
                    type="number"
                    name="totalQty"
                    component={Input}
                    placeholder="Qty"
                    label="Qty"
                    //customFeedbackLabel="Please enter Price"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    disabled
                    type="number"
                    name="totalAmount"
                    component={Input}
                    placeholder="Amount"
                    label="Bill Amount"
                    customFeedbackLabel="Please enter Price"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    disabled
                    type="number"
                    name="totalTaxAmount"
                    component={Input}
                    placeholder="Taxes"
                    label="Total Taxes"
                    customFeedbackLabel="Please enter Taxes"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    disabled
                    type="number"
                    name="totalDiscount"
                    component={Input}
                    placeholder="Discounts"
                    label="Discounts"
                    customFeedbackLabel="Please enter Discounts"
                  />
                </div>
              </div>

              <div className="row">
                <h4>Add Item</h4>
              </div>
              <div className="form-group row">
                {/* Add item controls */}

                <div className="col-lg-12">
                  <Field
                    name="barcode"
                    component={Input}
                    label="Barcode"
                    placeholder="Barcode"
                  />
                  <Field
                    name="qty"
                    component={Input}
                    label="Qty"
                    placeholder="Qty"
                  />
                  <Field
                    name="mrp"
                    component={Input}
                    label="MRP"
                    placeholder="MRP"
                    disabled
                  />
                  <Field
                    name="discount"
                    component={Input}
                    label="Discount"
                    placeholder="Discount"
                  />
                  <Field
                    name="netAmount"
                    component={Input}
                    label="Amount"
                    placeholder="Amount"
                  />
                  <button
                    type="button"
                    style={{ display: "none" }}
                    ref={btnRef}
                    onClick={() => handleSubmit()}
                  ></button>
                </div>
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
      <InvoiceDetailForm dataModel={pItems}/>
    </>
  );
}

export default class InvoiceDetailForm extends Component {
  constructor() {
    super(...arguments);
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.editparams = { params: { popupHeight: '300px' } };
    this.validationRules = { required: true };
    this.orderidRules = { required: true, number: true };
    this.pageSettings = { pageCount: 5 };
}
  render() {
    return (<div className='control-pane'>
    <div className='control-section'>
      <GridComponent dataSource={this.params.dataModel} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}>
        <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
          <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
          <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
          <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170'></ColumnDirective>
          <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams}></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Edit]}/>
      </GridComponent>
    </div>
  </div>);
}
}
