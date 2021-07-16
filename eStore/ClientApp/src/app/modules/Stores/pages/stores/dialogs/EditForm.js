import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

//Validation schema
const StoreEditSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  storeCode: Yup.string().required("Store Code is required"),
  address: Yup.string().required("Store Address is required"),
  city: Yup.string().required("Store City is required"),
  pinCode: Yup.string().required("Store Pin Code"),
  phoneNo: Yup.string().required("Store Phone no is required"),
  storeManagerName: Yup.string().required("Store Manager Name is required"),
  smContact: Yup.string().required("Store Manger Contact is required"),
  panNo: Yup.string().required("Pan No is required"),
  gstno: Yup.string().required("GST No is required"),
  openingDate: Yup.mixed()
    .nullable(false)
    .required("Opening Date is required"),
});

export function EditForm({ saveStore, store, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={store}
        validationSchema={StoreEditSchema}
        onSubmit={(values) => {
          saveStore(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Store Name */}
                  <div className="col-lg-4">
                    <Field
                      name="storeName"
                      component={Input}
                      placeholder="Store Name"
                      label="Store Name"
                    />
                  </div>
                  {/* Store Code  */}
                  <div className="col-lg-4">
                    <Field
                      name="storeCode"
                      component={Input}
                      placeholder="Store Code"
                      label="Store Code"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Store Address */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Store Address"
                      label="Store Address"
                    />
                  </div>
                  {/* Store City  */}
                  <div className="col-lg-4">
                    <Field
                      name="city"
                      component={Input}
                      placeholder="Store City"
                      label="Store City"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Store Contact No */}
                  <div className="col-lg-4">
                    <Field
                      name="pinCode"
                      component={Input}
                      placeholder="Store Pin No"
                      label="Store ZipCode"
                    />
                  </div>
                  {/* Store Phone no  */}
                  <div className="col-lg-4">
                    <Field
                      name="phoneNo"
                      component={Input}
                      placeholder="Store Contact"
                      label="Store Contact"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Store Manager Name */}
                  <div className="col-lg-4">
                    <Field
                      name="storeManagerName"
                      component={Input}
                      placeholder="Store Manager Name"
                      label="Store Manger Name"
                    />
                  </div>
                  {/* Store Manger Contact  */}
                  <div className="col-lg-4">
                    <Field
                      name="storeManagerPhoneNo"
                      component={Input}
                      placeholder="Store Manager Contact"
                      label="Store Manager Contact"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Store Pan No */}
                  <div className="col-lg-4">
                    <Field
                      name="panNo"
                      component={Input}
                      placeholder="Pan No"
                      label="Pan No"
                    />
                  </div>
                  {/* Store GST  */}
                  <div className="col-lg-4">
                    <Field
                      name="gstno"
                      component={Input}
                      placeholder="GSTIN"
                      label="GSTIN"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Date of Opening */}
                  <div className="col-lg-4">
                    <DatePickerField name="openingDate" label="Opening Date" />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
