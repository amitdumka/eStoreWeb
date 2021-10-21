// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Select,DatePickerField } from '../../../../../../../_metronic/_partials/controls';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids'

// Validation schema
const InvoiceEditSchema = Yup.object().shape({
  mobileNo: Yup.string().required('Mobile Number is required'),
  customerName: Yup.string().required('Customer Name is required'),
  onDate:Yup.date().required("Date is required"),
  totalAmount: Yup.number().required('Total Amount is required'),
  totalTaxAmount: Yup.number().required('Total Tax is required'),
  totalQty: Yup.number("Qty should be numeric").min(1,"Qty should be more than zero").required("Qty is required"),
})

export function ProductEditForm({ invoice, btnRef, saveProduct }) {
  let pItems = []
  const AddPItem = (item) => {
    pItems.push({
      barcode: item.barcode,
      qty: item.qty,
      basicPrice: item.price,
      discount: item.discount,
      tax: item.tax,
    })
  }

  const FetchPItem = ({ barcode }) => {
    // Need to redux for productItem+stock or ProductStockView
    //Like
    const ProductStockView = {
      barcode: '',
      mrp: 0,
      stock: 0,
      taxRate: 5,
      ProductCategory: 'Fabric',
      productName: 'Shirting Tersca White',
      Unit: 'Metres',
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invoice}
        validationSchema={InvoiceEditSchema}
        onSubmit={(values) => {
          saveProduct(values)
        }}
      >
        {({ handleSubmit }) => (
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
                  <Field disabled
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
                   <button type="button" className="btn btn-primary btn-sm">S</button>
                  </div>
                  
                   <div className="col-sm-2 ">
                  <Field
                    name="qty"
                    component={Input}
                    label="Qty"
                    placeholder="Qty"
                  /></div>
                   <div className="col-lg-2">
                  <Field
                    name="mrp"
                    component={Input}
                    label="MRP"
                    placeholder="MRP"
                    disabled
                  /></div>
                   <div className="col-lg-2">
                  <Field
                    name="discount"
                    component={Input}
                    label="Discount"
                    placeholder="Discount"
                  /></div>
                   <div className="col-lg-2">
                  <Field
                    name="netAmount"
                    component={Input}
                    label="Amount"
                    placeholder="Amount"
                  /></div>
                   <div className="col-lg-2 p-7">
                  <button type="button" className="btn btn-primary">Add</button></div>
                {/* </div> */}
              </div>
              <button
                type="submit"
                style={{ display: 'none' }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
            <div className="table-danger"></div>
          </>
        )}
      </Formik>
      {/* <InvoiceDetailForm dataModel={pItems} /> */}
    </>
  )
}

export default class InvoiceDetailForm extends Component {
  constructor() {
    super(...arguments)
    this.toolbarOptions = ['Add', 'Edit', 'Delete']
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    }
    this.editparams = { params: { popupHeight: '300px' } }
    this.validationRules = { required: true }
    this.orderidRules = { required: true, number: true }
    this.pageSettings = { pageCount: 5 }
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            dataSource={this.params.dataModel}
            toolbar={this.toolbarOptions}
            allowPaging={true}
            editSettings={this.editSettings}
            pageSettings={this.pageSettings}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="120"
                textAlign="Right"
                validationRules={this.orderidRules}
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                field="CustomerName"
                headerText="Customer Name"
                width="150"
                validationRules={this.validationRules}
              ></ColumnDirective>
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                width="120"
                format="C2"
                textAlign="Right"
                editType="numericedit"
              ></ColumnDirective>
              <ColumnDirective
                field="OrderDate"
                headerText="Order Date"
                editType="datepickeredit"
                format="yMd"
                width="170"
              ></ColumnDirective>
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="150"
                editType="dropdownedit"
                edit={this.editparams}
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        </div>
      </div>
    )
  }
}
