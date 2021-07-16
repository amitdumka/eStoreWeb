// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const EmployeeEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  mobileNo: Yup.string().required("Mobile No  is required"),
  city: Yup.string().required("City is required"),
  joiningDate: Yup.string().required("Joining is required"),
  eMail: Yup.string()
    .email()
    .required("Email is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  adharNumber: Yup.string().required("Aadhar is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  fatherName: Yup.string().required("Father Name is required"),
  highestQualification: Yup.string().required(
    "Highest Qualification is required"
  ),
  storeId: Yup.number().required("Store is required"),
});

export function EditForm({ saveEmployee, employee, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={employee}
        validationSchema={EmployeeEditSchema}
        onSubmit={(values) => {
          saveEmployee(values);
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
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                  {/* Login */}
                  <div className="col-lg-4">
                    <Field
                      name="mobileNo"
                      component={Input}
                      placeholder="Phone No"
                      label="Phone No"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* Email */}
                  <div className="col-lg-4">
                    <Field
                      name="eMail"
                      component={Input}
                      placeholder="eMail"
                      label="eMail"
                    />
                  </div>

                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-mm-dd"
                      name="dateOfBirth"
                      label="Date of Birth"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="fatherName"
                      component={Input}
                      placeholder="Father Name"
                      label="Father Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Store */}
                  <div className="col-lg-4">
                    <Select name="storeId" label="Store">
                      <option value="1">Aprajita Retails</option>
                      <option value="2">Aprajita Retails, Jamshedpur</option>
                    </Select>
                  </div>

                  {/* Date of Joining */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-mm-dd"
                      name="joiningDate"
                      label="Joining Date"
                    />
                  </div>
                  {/* Date of Leaving */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-mm-dd"
                      name="leavingDate"
                      label="Leaving Date"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Address */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>

                  {/* City */}
                  <div className="col-lg-4">
                    <Field
                      component={Input}
                      name="city"
                      label="City"
                      placeholder="City"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="state"
                      component={Input}
                      placeholder="State"
                      label="State"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Department */}
                  <div className="col-lg-4">
                    <Select name="categoryId" label="Department">
                      <option value="1">Store Manager</option>
                      <option value="2">Salesman</option>
                      <option value="3">HouseKeeping</option>
                      <option value="4">Accountant</option>
                    </Select>
                  </div>
                  {/*  Qualification*/}
                  <div className="col-lg-4">
                    <Field
                      name="highestQualification"
                      component={Input}
                      placeholder="Highest Qualification"
                      label="Qualification"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Addhar Number */}
                  <div className="col-lg-4">
                    <Field
                      name="adharNumber"
                      component={Input}
                      placeholder="Aadhar No"
                      label="Aadhar Number"
                    />
                  </div>
                  {/*  Pan Number */}
                  <div className="col-lg-4">
                    <Field
                      name="panNo"
                      component={Input}
                      placeholder="PAN No"
                      label="PAN No"
                    />
                  </div>
                  {/*  Other Id*/}
                  <div className="col-lg-4">
                    <Field
                      name="otherIdDetails"
                      component={Input}
                      placeholder="Other Id"
                      label="Other Id"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* isWorking */}
                  <div className="col-lg-4">
                    <Field name="isWorking" type="checkbox" /> Working
                  </div>
                  {/* Tailoring Division */}
                  <div className="col-lg-4">
                    <Field name="isTailors" type="checkbox" />
                    {} Tailoring Division
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
