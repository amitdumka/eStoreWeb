import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Input,
  Select
} from "../../../../../../../_metronic/_partials/controls";




export function PaymentForm({ invoiceNumber,billAmount, onDate, payModes, edcList ,btnRef}) {
 if(invoiceNumber==null){
   return(<>No Invoice is generated!</>);
 }
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
                {/* Bill Amount  */}
                <div className="col-lg-4">
                  <label className="text-danger">
                    Bill Amount : {billAmount && billAmount}
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
                    label="Amount" />
                </div>
                {/* cash amount Name*/}
                <div className="col-lg-4">
                  <Field
                    name="cashAmount"
                    component={Input}
                    placeholder="Cash Amount"
                    label="Cash Amount" />
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
