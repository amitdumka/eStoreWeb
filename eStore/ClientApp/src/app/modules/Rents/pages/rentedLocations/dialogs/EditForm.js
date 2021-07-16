// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select,DatePickerField} from "../../../../../../_metronic/_partials/controls";

//RentedLocation
//rentedLocation

// Validation schema
const RentedLocationEditSchema = Yup.object().shape({
  placeName: Yup.string().required("RentedLocation Name is required"),
  address: Yup.string().required("Address is required"),
  onDate: Yup.date().required("Date is required"),
  //vacatedDate:Yup.date().required("Date is required"),
  city: Yup.string().required("City is required"),
  rentType: Yup.number().required("Select Rent Type , is required"),
  storeId: Yup.number().moreThan(0).required("Select Store Location , is required"),
  rentAmount: Yup.number().moreThan(0).required("Amount is required"),
  advanceAmount: Yup.number().moreThan(0).required("Amount is required"),
  ownerName:Yup.string().required("Owner Name is required"), 
  mobileNo: Yup.string().required("Mobile No Details is required")
});


export function EditForm({
  saveRentedLocation,
  rentedLocation,
  rentTypes,
  actionsLoading,
  onHide,storeList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={rentedLocation}
        validationSchema={RentedLocationEditSchema}
        onSubmit={(values) => {
          saveRentedLocation(values);
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
                    {/* Store */}
                    <div className="col-lg-4">
                    <Select name="storeId" label="Store">
                    {storeList && storeList.map((item) => (
                        <option key={item.storeId} value={item.storeId}>
                          {item.storeName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="placeName"
                      component={Input}
                      placeholder="Location Name"
                      label="Location Name"
                    />
                  </div>
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>{/* Staff Name */}
                 
                </div>
                <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                      name="city"
                      component={Input}
                      placeholder="City"
                      label="City"
                    />
                  </div>
                   {/* Date of BankDeposit */}
                   <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="On Date"
                    />
                  </div>
                   {/* Date of BankDeposit */}
                   <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="vacatedDate"
                      label="Vacate Date"
                    />
                  </div>

                </div>
                <div className="form-group row">
                   {/* Staff Name */}
                   <div className="col-lg-4">
                    <Field
                      name="ownerName"
                      component={Input}
                      placeholder="Owner Name"
                      label="Owner Name"
                    />
                  </div>
                   {/* Staff Name */}
                   <div className="col-lg-4">
                    <Field
                      name="mobileNo"
                      component={Input}
                      placeholder="Contact No"
                      label="Contact No"
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select name="rentType" placeholder="Rent Type" label="Rent Type">
                      <option value="">Select Type</option>
                      { rentTypes && rentTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              <div className="form-group row">
                 {/*  State Name*/}
                 <div className="col-lg-4">
                    <Field
                      name="rentAmount"
                      component={Input}
                      placeholder="Amount"
                      label="Rent Amount"
                    />
                  </div>
                   {/*  State Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="advanceAmount"
                      component={Input}
                      placeholder="Advance Amount"
                      label="Advance Amount"
                    />
                  </div>
                   {/* isWorking */}
                   <div className="col-lg-4">
                    <Field name="isRented" type="checkbox" /> Occupied
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
