import React, {useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, CustomInput, Button, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Home } from "react-feather"

import {useDispatch, useSelector} from "react-redux"
import {fetchAllOrganizationSettings, UpdateOrganizationSettings} from "../../../redux/actions/settings/organization"

const Payment = () => {

    const dispatch = useDispatch()
    const organizationData = useSelector(state => state.organization.organization)
    
    useEffect(() => {
        dispatch(fetchAllOrganizationSettings())
    }, [])

    console.log('organizationData', organizationData)

    const initialValues = {
        liveApiKey: organizationData[0]?.razorPayLiveKey || "",
        liveApiSecret: organizationData[0]?.razorPayLiveSecret || "",
        testApiKey: organizationData[0]?.razorPayTestKey || "",
        testApiSecret: organizationData[0]?.razorPayTestSecret || "",
        liveSwitch: organizationData[0]?.razorPayMode || ""
    }

    const validationSchema = Yup.object().shape({
        liveApiKey: Yup.string().required("Required"),
        liveApiSecret: Yup.string().required("Required"),
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
            razorPayMode: values.liveSwitch || ""
        }

        dispatch(UpdateOrganizationSettings(organizationData[0]?._id, rawData))
    }

    return <Row className="w-100 h-100 ">
        <Col sm="12" md="5">
            <Card>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                    {(formik) => {
                        console.log("formik", formik.values)
                        return (
                            <Form>
                                <CardHeader >
                                    <CardTitle>Payment Settings</CardTitle>
                                    <div className="d-flex align-items-center">
                                        <div className='mr-1'>Live</div>
                                        <CustomInput type='switch' id='switch-primary' name='liveSwitch' {...formik.getFieldProps("liveSwitch")} value="LIVE" inline defaultChecked={formik.values.liveSwitch === "LIVE"} />
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
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button color="primary" type="submit" >Save</Button>
                                    </FormGroup>
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