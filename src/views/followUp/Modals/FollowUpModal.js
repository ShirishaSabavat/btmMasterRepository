import React, {useEffect} from "react"
import {Row, Col, FormGroup, Label, Input, InputGroup, Button } from "reactstrap"
import { Calendar } from 'react-feather'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import CustomSelectField from "../../UtilityComponents/CustomSelectField"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import { TimeLineData } from './TimeLineData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFollowUpById, AddFollowUps, DeleteFollowUpsById } from '../../../redux/actions/followup/index'

const FollowUpModal = (props) => {
  
  const dispatch = useDispatch()
  const followUpData = useSelector(state => state.followup.followupData ?? [])
  const loading = useSelector(state => state.common.loading)

  const followUpId = props?.followUpModal?.id

  useEffect(() => {
    dispatch(fetchAllFollowUpById(followUpId))
  }, [followUpId])

  const initialValues = {
    followUpDate: new Date(),
    nextFollowUpDate: "",
    response: "",
    note: "",
    status: ""
}

const validationSchema = Yup.object().shape({
  followUpDate: Yup.date().required("Required"),
  nextFollowUpDate: Yup.date().required("Required"),
  response: Yup.string().required("Required"),
  note: Yup.string(),
  status: Yup.string()
})

const submitForm = (values) => {
  console.log("Values", values)
  dispatch(AddFollowUps(followUpId, values))
  props.setFollowUpModal(prevState => { return {show: !prevState.show, id: ""} })
  dispatch(fetchAllFollowUpById(followUpId))
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
  
  if (loading) {
    return (<></>)
  }

  return (
      <BootstrapDialog
        maxWidth="md"
        fullWidth
        onClose={() => props.setFollowUpModal(prevState => { return {show: !prevState.show, id: ""} })}
        aria-labelledby="customized-dialog-title"
        open={props.followUpModal?.show && !loading}
      >
        <DialogContent style={{padding: 34}} dividers>
          <Typography gutterBottom>
            Follow Up
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
                              <Row className='d-flex justify-content-end mr-1'>
                                  <Button type="submit" color='primary' size='sm'>
                                      Save
                                  </Button>
                            </Row>
                              <Row>
                                <Col className='mb-sm-1'>
                                  <div style={{fontSize: '1.5rem'}}>Follow Up</div>
                                  <hr />
                                  <TimeLineData followUpId={followUpId} followUpData={followUpData} />
                                </Col>
                              </Row>
                          </Col>
                          <Col sm="12" md="4" style={{backgroundColor: "#F4F4F4"}}>
                            <Row>
                              <Col sm="12" md="12">
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
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Enquiry Date: {new Date(followUpData?.enquiryDate).toDateString()}</div>
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Last Follow Up Date: {new Date(followUpData?.lastFollowUpDate).toDateString()}</div>
                                  <div style={{margin: '5px'}}><Calendar size={15} /> Next Follow Up Date: {new Date(followUpData?.nextFollowUpDate).toDateString()}</div>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12">
                                <div style={{margin: '5px'}}>Name: {followUpData?.name}</div>
                                <div style={{margin: '5px'}}>Phone: {followUpData?.phone} </div>
                                <div style={{margin: '5px'}}>Source: {followUpData?.source}</div>
                                <div style={{margin: '5px'}}>Enquiry Date: {new Date(followUpData?.enquiryDate).toDateString()}</div>
                                <div style={{margin: '5px'}}>Note: {followUpData?.note}</div>
                                <div style={{margin: '5px'}}>Status: {followUpData?.status}</div>
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
