import React from "react"
import {Row, Col, FormGroup, Label, Input, InputGroup } from "reactstrap"
import {Button as MuiButton} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import CustomSelectField from "../../UtilityComponents/CustomSelectField"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import { useDispatch } from 'react-redux'
import { AddFollowUp } from '../../../redux/actions/followup/index'

const AddModal = (props) => {

  const dispatch = useDispatch()

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    enquiryDate: new Date(),
    nextFollowUpDate: "",
    lastFollowUpDate: "",
    source: ""
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.number().positive().required("Required"),
  email: Yup.string().email().required("Required"),
  address: Yup.string(),
  note: Yup.string(),
  enquiryDate: Yup.date().required("Required"),
  nestFollowUpDate: Yup.date(),
  lastFollowUpDate: Yup.date(),
  source: Yup.string()
})

const submitForm = (values) => {
  console.log("Values", values)
  dispatch(AddFollowUp(values))
  props.setShowModal(prevState => !prevState)
}

const sourceOptions = [
    {label:"Advertisment", value:"advertisment"},
    {label:"Website", value:"website"},
    {label:"Friends", value:"friends"},
    {label:"Family", value:"family"},
    {label:"Others", value:"others"}
]

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  return (
      <BootstrapDialog
        onClose={() => props.setShowModal(prevState => !prevState)}
        aria-labelledby="customized-dialog-title"
        open={props.showModal}
      >
        <DialogContent style={{padding: 34}} dividers>
          <Typography gutterBottom>
            Add Follow Up 
          </Typography>
          <hr />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
            {(formik) => {
                return (
                    <Form >
                        <Row sm="12" md="4"> 
                          <Col sm="12" md="6">
                            <FormGroup className="has-icon-left position-relative">
                                  <Label htmlFor="name">Name <span className="text-danger">*</span></Label>
                                  <InputGroup>
                                      <Input
                                      type="text"
                                      name="name"
                                      id="name"
                                      {...formik.getFieldProps("name")}
                                      invalid={!!(formik.touched.name && formik.errors.name)}
                                      >
                                      </Input>
                                  </InputGroup>
                                  <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="field-error text-danger"
                                  />
                              </FormGroup>
                          </Col>
                          <Col  sm="12" md="6">
                            <FormGroup className="has-icon-left position-relative">
                                  <Label htmlFor="email">Email <span className="text-danger">*</span></Label>
                                  <InputGroup>
                                      <Input
                                      type="text"
                                      name="email"
                                      id="eamil"
                                      {...formik.getFieldProps("email")}
                                      invalid={!!(formik.touched.email && formik.errors.email)}
                                      >
                                      </Input>
                                  </InputGroup>
                                  <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="field-error text-danger"
                                  />
                              </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col  sm="12" md="6">
                            <FormGroup className="has-icon-left position-relative">
                                  <Label htmlFor="phone">Phone <span className="text-danger">*</span></Label>
                                  <InputGroup>
                                      <Input
                                      type="text"
                                      name="phone"
                                      id="phone"
                                      {...formik.getFieldProps("phone")}
                                      invalid={!!(formik.touched.phone && formik.errors.phone)}
                                      >
                                      </Input>
                                  </InputGroup>
                                  <ErrorMessage
                                      name="phone"
                                      component="div"
                                      className="field-error text-danger"
                                  />
                              </FormGroup>
                          </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="enquiryDate">Date <span className="text-danger">*</span></Label>
                                    <Flatpickr
                                    className="form-control"
                                    name="enquiryDate"
                                    id="enquiryDate"
                                    value={formik.values.enquiryDate}
                                    options={{
                                        dateFormat: "Y-m-d"
                                        }}
                                    onChange={(date) => {
                                        formik.setFieldValue("enquiryDate", date[0])
                                    }} />
                                    <ErrorMessage name="enquiryDate" component="div" className="field-error text-danger" />
                                </FormGroup>
                            </Col>
                            {/* <Col sm="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="nextFollowUpDate">Next Follow Up Date</Label>
                                    <Flatpickr
                                    className="form-control"
                                    name="nextFollowUpDate"
                                    id="nextFollowUpDate"
                                    value={formik.values.nextFollowUpDate}
                                    options={{
                                        dateFormat: "Y-m-d"
                                        }}
                                    onChange={(date) => {
                                        formik.setFieldValue("nextFollowUpDate", date[0])
                                    }} />
                                    <ErrorMessage name="nextFollowUpDate" component="div" className="field-error text-danger" />
                                </FormGroup>
                            </Col> */}
                            {/* <Col sm="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="lastFollowUpDate">Last Follow Up Date</Label>
                                    <Flatpickr
                                    className="form-control"
                                    name="lastFollowUpDate"
                                    id="lastFollowUpDate"
                                    value={formik.values.lastFollowUpDate}
                                    options={{
                                        dateFormat: "Y-m-d"
                                        }}
                                    onChange={(date) => {
                                        formik.setFieldValue("lastFollowUpDate", date[0])
                                    }} />
                                    <ErrorMessage name="lastFollowUpDate" component="div" className="field-error text-danger" />
                                </FormGroup>
                            </Col> */}
                      </Row>
                      <Row>
                        <Col sm="12" md="6">
                            <FormGroup>
                                <Label htmlFor="source">Source</Label>
                                <CustomSelectField
                                    value= {formik.values.source}
                                    options={sourceOptions}
                                    onChange={(value) => formik.setFieldValue("source", value.value)}
                                />
                                <ErrorMessage
                                    name="source"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="6">
                          <FormGroup className="has-icon-left position-relative">
                              <Label htmlFor="note">Note</Label>
                              <InputGroup>
                                  <Input
                                  type="text"
                                  name="note"
                                  id="note"
                                  {...formik.getFieldProps("note")}
                                  invalid={!!(formik.touched.note && formik.errors.note)}
                                  >
                                  </Input>
                              </InputGroup>
                              <ErrorMessage
                                  name="note"
                                  component="div"
                                  className="field-error text-danger"
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                          <Col  sm="12" md="12">
                            <FormGroup className="has-icon-left position-relative">
                                  <Label htmlFor="address">Address</Label>
                                  <InputGroup>
                                      <Input
                                      type="textarea"
                                      name="address"
                                      id="address"
                                      {...formik.getFieldProps("address")}
                                      invalid={!!(formik.touched.address && formik.errors.address)}
                                      >
                                      </Input>
                                  </InputGroup>
                                  <ErrorMessage
                                      name="address"
                                      component="div"
                                      className="field-error text-danger"
                                  />
                              </FormGroup>
                            </Col>
                        </Row>
                    <Row className='d-flex justify-content-end'>
                      <DialogActions >
                          <MuiButton color="error" autoFocus onClick={() => props.setShowModal(prevState => !prevState)}>
                            Cancel
                          </MuiButton>
                          <MuiButton type="submit">
                            Save
                          </MuiButton>
                        </DialogActions>
                      </Row>
                    </Form>
                    )
              }}
          </Formik>

        </DialogContent>
        
      </BootstrapDialog>
  )
}

export default AddModal
