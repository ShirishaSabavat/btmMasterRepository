import React, {useState, useEffect} from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { State }  from 'country-state-city'
import {ArrowLeft, ArrowRight} from 'react-feather'
import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const GSTComponent  = ({stepper, type, setKycFormData, userKYCData}) => {

    const [stateOptions] = useState(State.getStatesOfCountry("IN").map(values => { return {label : values.name, value : values.countryCode } }))

    const [currentState, setCurrentState] = useState(stateOptions.map(items => {
        if (items.label === userKYCData.kycId.state) {
            return items 
        }
    }))

    const gstTypeOptions = [{label: "Consumer", value: "consumer"}]

    
    const [currentGST, setCurrentGST] = useState(gstTypeOptions.map(items => {
        if (items.label === userKYCData.kycId.gstType) {
            return items 
        }
    }))

    useEffect(() => {
        setCurrentState(stateOptions.map(items => {
            if (items.label === userKYCData.kycId.state) {
                return items 
            }
        }))
        setCurrentGST(gstTypeOptions.map(items => {
            if (items.label === userKYCData.kycId.gstType) {
                return items 
            }
        }))
    }, [])

    const initialValues = {
        gstType:userKYCData.kycId.gstType,
        legalname:userKYCData.kycId.legalname,
        tradename:userKYCData.kycId.tradename,
        address:userKYCData.kycId.address,
        state: userKYCData.kycId.state
    }

    const validationSchema = Yup.object().shape({
        gstType: Yup.string(),
        legalname: Yup.string(),
        tradename: Yup.string(),
        address: Yup.string(),
        state: Yup.string()
    })

    const submitForm = (values) => {
        setKycFormData(values)
        stepper.next()
        console.log("values", values)
    }


    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form className="row">
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="legalname">Legal Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="legalname"
                                id="legalname"
                                {...formik.getFieldProps("legalname")}
                                invalid={!!(formik.touched.legalname && formik.errors.legalname)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="legalname"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="tradename">Trade Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="tradename"
                                id="tradename"
                                {...formik.getFieldProps("tradename")}
                                invalid={!!(formik.touched.tradename && formik.errors.tradename)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="tradename"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6">
                            <Label For="state">State</Label>
                            <CustomSelectField
                                value={formik.values.state}
                                defaultValue={currentState}
                                options={stateOptions}
                                onChange={value => formik.setFieldValue("state", value.value)}
                            />
                            <ErrorMessage
                            name="state"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="address">Address</Label>
                            <InputGroup>
                                <Input
                                type="text"
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
                        <FormGroup className="col-md-6">
                            <Label For="gstType">GST Type</Label>
                            <CustomSelectField
                                value={formik.values.gstType}
                                defaultValue={currentGST}
                                options={gstTypeOptions}
                                onChange={value => formik.setFieldValue("gstType", value.value)}
                            />
                            <ErrorMessage
                            name="gstType"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        
                        <div className='col-md-12 mt-3 d-flex justify-content-between'>
                            <Button.Ripple onClick={() => stepper.previous()} color='secondary' className='btn-prev' outline>
                                <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                            </Button.Ripple>
                            <Button.Ripple type='submit' color='primary' className='btn-next'>
                                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                                <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                            </Button.Ripple>
                        </div>

                    </Form>)
                }}
            </Formik>          
            </CardBody>
            </Card>
        </Col>
    </Row>
}

export default GSTComponent