import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, CustomInput, Button, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Home } from "react-feather"
import {Alert} from '@mui/material'

import {useDispatch, useSelector} from "react-redux"
import {fetchAllOrganizationSettings, UpdateOrganizationSettings} from "../../../redux/actions/settings/organization"

const Payment = () => {

    const dispatch = useDispatch()
    const organizationData = useSelector(state => state.organization.organization)
    const serverLoading = useSelector(state => state.common.loading)
    const [validationType, setValidationType] = useState(false)

    useEffect(() => {
        dispatch(fetchAllOrganizationSettings())
    }, [])

    const initialValues = {
        liveApiKey: organizationData[0]?.razorPayLiveKey || "",
        liveApiSecret: organizationData[0]?.razorPayLiveSecret || "",
        testApiKey: organizationData[0]?.razorPayTestKey || "",
        testApiSecret: organizationData[0]?.razorPayTestSecret || "",
        liveSwitch: organizationData[0]?.razorPayMode === "LIVE"
    }

    const validationSchema1 = Yup.object().shape({
        liveApiKey: Yup.string().required("Required"),
        liveApiSecret: Yup.string().required("Required")
    })
    const validationSchema2 = Yup.object().shape({
        testApiKey: Yup.string().required("Required"),
        testApiSecret: Yup.string().required("Required")
        
    })

    const submitForm = (values) => {
        console.log("values", values)

        const rawData = {
            razorPayLiveKey: values.liveApiKey || "",
            razorPayLiveSecret: values.liveApiSecret || "",
            razorPayTestKey: values.testApiKey || "",
            razorPayTestSecret: values.testApiSecret || "",
            razorPayMode: values.liveSwitch ? "LIVE" : "TEST"
        }

        dispatch(UpdateOrganizationSettings(organizationData[0]?._id, rawData))
    }

    const changeHandler = (formik) => {
        formik.setFieldValue('liveSwitch', !formik.values?.liveSwitch)
        setValidationType(prevState => !prevState)
    }

    if (!organizationData[0]) {
        return (<></>)
    }

    return <Row>
        <Col sm="12" md="5">
            <Card>
                {organizationData[0]?.razorPayMode === "TEST" && (
                    <Alert severity="warning">Razorpay is in test mode!</Alert>
                )}

                <Formik initialValues={initialValues} validationSchema={validationType ? validationSchema1 : validationSchema2}  onSubmit={submitForm} enableReinitialize>
                    {(formik) => {
                        return (
                            <Form>
                                <CardHeader >
                                    <CardTitle>Razorpay Settings</CardTitle>
                                    <div className="d-flex align-items-center">
                                        <div className='mr-1'>Live</div>
                                        <CustomInput 
                                            type='switch' 
                                            id='switch-primary' 
                                            name='liveSwitch'  
                                            onChange={(e) => formik.setFieldValue('liveSwitch', e.target.checked)} 
                                            defaultChecked={formik.values.liveSwitch} 
                                            inline 
                                        />
                                    </div>
                                </CardHeader>
                                <hr className="m-0" />
                                <CardBody>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="liveApiKey">Live Razorpay Key</Label>
                                                <InputGroup>
                                                    
                                                    <Input
                                                    type="text"
                                                    name="liveApiKey"
                                                    id="liveApiKey"
                                                    disabled={!formik.values?.liveSwitch}
                                                    {...formik.getFieldProps("liveApiKey")}
                                                    invalid={!!(formik.touched.liveApiKey && formik.errors.liveApiKey)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="liveApiKey"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="liveApiSecret">Live Razorpay Secret</Label>
                                                <InputGroup>
                                                    
                                                    <Input
                                                    type="text"
                                                    name="liveApiSecret"
                                                    id="liveApiSecret"
                                                    disabled={!formik.values?.liveSwitch}
                                                    {...formik.getFieldProps("liveApiSecret")}
                                                    invalid={!!(formik.touched.liveApiSecret && formik.errors.liveApiSecret)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="liveApiSecret"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="testApiKey">Test Razorpay Key</Label>
                                                <InputGroup>
                                                    
                                                    <Input
                                                    type="text"
                                                    name="testApiKey"
                                                    id="testApiKey"
                                                    disabled={formik.values?.liveSwitch}
                                                    {...formik.getFieldProps("testApiKey")}
                                                    invalid={!!(formik.touched.testApiKey && formik.errors.testApiKey)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="testApiKey"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="testApiSecret">Test Razorpay Secret</Label>
                                                <InputGroup>
                                                    
                                                    <Input
                                                    type="text"
                                                    name="testApiSecret"
                                                    id="testApiSecret"
                                                    disabled={formik.values?.liveSwitch}
                                                    {...formik.getFieldProps("testApiSecret")}
                                                    invalid={!!(formik.touched.testApiSecret && formik.errors.testApiSecret)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="testApiSecret"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row className="mt-1">
                                        <Col sm="12" md="12">
                                            <Button disabled={serverLoading} color="primary" type="submit">{serverLoading ? "Please Wait..." : "Save"}</Button>
                                        </Col>
                                    </Row>
                            </CardBody>
                        </Form>
                            )
                        }}
                </Formik>
            </Card>
        </Col>
    </Row>
}

export default Payment