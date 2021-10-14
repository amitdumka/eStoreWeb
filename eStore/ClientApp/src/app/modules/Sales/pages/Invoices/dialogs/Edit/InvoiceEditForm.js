// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  ProductConditionTitles,
} from "../ProductsUIHelpers";

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
  let pItems=[];
  const AddPItem=(item)=>{
    pItems.push({barcode:item.barcode,qty:item.qty, basicPrice:item.price, discount:item.discount, tax:item.tax });

  }

  const FetchPItem=({barcode})=>{
      // Need to redux for productItem+stock or ProductStockView
      //Like
      const ProductStockView={
        barcode:"", mrp:0, stock:0,taxRate:5, ProductCategory:"Fabric", productName:"Shirting Tersca White", 
        Unit:"Metres"
      };
  }

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

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
