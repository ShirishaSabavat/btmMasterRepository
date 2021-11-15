import React from "react"
import {Row, Col, FormGroup, Label, Input, InputGroup,  Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import { Calendar } from 'react-feather'
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
import Timeline from '@components/timeline'
import { iconsData } from './data'

const FollowUpModal = (props) => {

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    date: "",
    nextFollowUpDate: "",
    source: ""
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.number().positive().required("Required"),
  email: Yup.string().email().required("Required"),
  address: Yup.string(),
  note: Yup.string(),
  date: Yup.date().required("Required"),
  nestFollowUpDate: Yup.date(),
  source: Yup.string()
})

const submitForm = (values) => {
  const rawData = {
    date: new Date(values.date).toDateString(),
    nestFollowUpDate: new Date(values.nextFollowUpDate).toDateString()
  }
  console.log("Values", values, "rawData", rawData)
  props.setFollowUpModal(prevState => { return {show: !prevState.show, id: ""} })
}

const statusOptions = [
    {label:"Active", value:"active"},
    {label:"Passive", value:"passive"},
    {label:"Inquiry", value:"inquiry"},
    {label:"FollowUp", value:"followup"},
    {label:"Close", value:"close"},
    {label:"Lost", value:"lost"}
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
        maxWidth="md"
        fullWidth
        onClose={() => props.setFollowUpModal(prevState => { return {show: !prevState.show, id: ""} })}
        aria-labelledby="customized-dialog-title"
        open={props.followUpModal}
      >
        <DialogContent style={{padding: 34}} dividers>
          <Typography gutterBottom>
            Follow Up Admission Enquiry 
          </Typography>
          <hr />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
            {(formik) => {
                return (
                    <Form>
                        <Row >
                          <Col sm="12" md="8" >
                              <Row>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        <Label htmlFor="followUpDate">Follow Up Date <sapn className='text-danger'>*</sapn></Label>
                                        <Flatpickr
                                        className="form-control"
                                        name="followUpDate"
                                        id="followUpDate"
                                        value={formik.values.followUpDate}
                                        options={{
                                            dateFormat: "Y-m-d"
                                            }}
                                        onChange={(date) => {
                                            formik.setFieldValue("followUpDate", date[0])
                                        }} />
                                        <ErrorMessage name="followUpDate" component="div" className="field-error text-danger" />
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        <Label htmlFor="nextFollowUpDate">Next Follow Up Date <sapn className='text-danger'>*</sapn></Label>
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
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="6">
                                  <FormGroup className="has-icon-left position-relative">
                                      <Label htmlFor="response">Response <span className="text-danger">*</span></Label>
                                      <InputGroup>
                                          <Input
                                          type="text"
                                          name="response"
                                          id="response"
                                          {...formik.getFieldProps("response")}
                                          invalid={!!(formik.touched.response && formik.errors.response)}
                                          >
                                          </Input>
                                      </InputGroup>
                                      <ErrorMessage
                                          name="response"
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
                              <Row className='d-flex justify-content-end'>
                                <DialogActions >
                                <MuiButton type="submit">
                                    Save
                                </MuiButton>
                                </DialogActions>
                            </Row>
                              <Row>
                                <Col className='mb-sm-1'>
                                  <div style={{fontSize: '1.5rem'}}>Follow Up (Apolline)</div>
                                  <hr />
                                  <Timeline data={iconsData} />
                                </Col>
                              </Row>
                          </Col>
                          <Col sm="12" md="4" style={{backgroundColor: "#F4F4F4"}}>
                            <Row>
                              <Col sm="12" md="6">
                                <div style={{fontSize: '1.5rem'}}>Summary</div>
                                <div>Created By: </div>
                              </Col>
                              <Col sm="12" md="6">
                                  <FormGroup>
                                      <Label htmlFor="status">Status</Label>
                                      <CustomSelectField
                                          value= {formik.values.status}
                                          options={statusOptions}
                                          onChange={(value) => formik.setFieldValue("status", value.value)}
                                      />
                                      <ErrorMessage
                                          name="status"
                                          component="div"
                                          className="field-error text-danger"
                                      />
                                  </FormGroup>
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col sm="12" md="12">
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Enquiry Date: 09/11/2021</div>
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Last Follow Up Date: 09/11/2021</div>
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Next Follow Up Date: 20/11/2021</div>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12">
                                <div style={{margin: '5px'}}>Phone: </div>
                                <div style={{margin: '5px'}}>Address: </div>
                                <div style={{margin: '5px'}}>Reference: </div>
                                <div style={{margin: '5px'}}>Description: </div>
                                <div style={{margin: '5px'}}>Note: </div>
                                <div style={{margin: '5px'}}>Source: </div>
                                <div style={{margin: '5px'}}>Assigned: </div>
                                <div style={{margin: '5px'}}>Email: </div>
                                <div style={{margin: '5px'}}>Class: </div>
                                <div style={{margin: '5px'}}>Number: </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                    </Form>
                    )
              }}
          </Formik>

        </DialogContent>
        
      </BootstrapDialog>
  )
}

export default FollowUpModal
