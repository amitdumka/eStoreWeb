// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

//contact
//Contact

// Validation schema
const ContactEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  mobileNo:Yup.string().required("Mobile No is required"), 
});

export function EditForm({ saveContact, contact, actionsLoading, onHide, locationList, contactTypes, payModes,storeList }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={contact}
        validationSchema={ContactEditSchema}
        onSubmit={(values) => {
          saveContact(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transpacontact">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                
                <div className="form-group row">
                  {/*   Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="FistName"
                      label="FirstName"
                    />
                  </div>
                   {/*   Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="LastName"
                      label="LastName"
                    />
                  </div>
                   {/*  State Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="mobileNo"
                      component={Input}
                      placeholder="Mobile No"
                      label="Mobile No"
                    />
                  </div>
                </div>
                <div className="form-group row">
                   {/*  State Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="phoneNo"
                      component={Input}
                      placeholder="Phone No"
                      label="Phone No"
                    />
                  </div>
                   {/*  Father Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="eMailAddress"
                      component={Input}
                      placeholder="Email"
                      label="eMail"
                    />
                  </div>
                   {/*  Father Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
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
