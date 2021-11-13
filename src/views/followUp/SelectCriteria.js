import React from "react"
import { Row, Col, CardHeader, CardTitle, CardBody, Button, FormGroup, Label } from "reactstrap"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Search } from 'react-feather'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"

import CustomSelectField from "../UtilityComponents/CustomSelectField"

const SelectCriteria = () => {

    const initialValues = {
        source: "",
        enquiryFromDate: "",
        enquiryToDate: "",
        status: ""
    }

    const validationSchema = Yup.object().shape({
        source: Yup.string().required("Required"),
        enquiryFromDate: Yup.date().required("Required"),
        enquiryToDate: Yup.date().required("Required"),
        status: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("Values", values)
        const rawData = {
            enquiryFromDate: new Date(values.enquiryFromDate).toDateString(),
            enquiryToDate: new Date(values.enquiryToDate).toDateString()
        }
    }

    const sourceOptions = [
        {label:"Front Office", value:"front office"},
        {label:"Advertisment", value:"advertisment"},
        {label:"Online Front Site", value:"online front site"},
        {label:"Google Ads", value:"google ads"},
        {label:"Admission Campaign", value:"admission campaign"}
    ]

    const statusOptions = [
        {label:"All", value:"all"},
        {label:"Active", value:"active"},
        {label:"Passive", value:"passive"},
        {label:"Deaf Ads", value:"dead"},
        {label:"Won", value:"won"},
        {label:"Lost", value:"lost"}
    ]

    return <>
        <CardHeader>
            <CardTitle>Select Criteria</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} >
               {formik => {
                   console.log("formik", formik.values)
                    return <Form>
                        <Row>
                            <Col sm="12" md="3">
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
                            <Col sm="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="enquiryFromDate">Enquiry From Date</Label>
                                    <Flatpickr
                                    className="form-control"
                                    name="enquiryFromDate"
                                    id="enquiryFromDate"
                                    value={formik.values.enquiryFromDate}
                                    options={{
                                        dateFormat: "Y-m-d"
                                        }}
                                    onChange={(date) => {
                                        formik.setFieldValue("enquiryFromDate", date[0])
                                    }} />
                                    <ErrorMessage name="enquiryFromDate" component="div" className="field-error text-danger" />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="enquiryToDate">Enquiry To Date</Label>
                                    <Flatpickr
                                    className="form-control"
                                    name="enquiryToDate"
                                    id="enquiryToDate"
                                    value={formik.values.enquiryToDate}
                                    options={{
                                        dateFormat: "Y-m-d"
                                        }}
                                    onChange={(date) => {
                                        formik.setFieldValue("enquiryToDate", date[0])
                                    }} />
                                    <ErrorMessage name="enquiryToDate" component="div" className="field-error text-danger" />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md='3'>
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
                    <Row>
                        <FormGroup className='ml-auto mr-1'>
                            <Button color="primary" type='submit'><Search size={16}/> Search</Button>
                        </FormGroup>
                        </Row>
                    </Form>
               }}
            </Formik> 
        </CardBody>
    </>
}

export default SelectCriteria