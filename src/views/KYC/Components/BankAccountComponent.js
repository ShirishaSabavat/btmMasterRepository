import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {ArrowLeft, ArrowRight} from 'react-feather'
import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const BankAccountComponent  = ({stepper, type, setKycFormData}) => {


    const initialValues = {
        selectBank:"",
        banchName:"",
        ifscCode:"",
        accNo:"",
        accHolderName:"",
        bankStatment:""
    }

    const validationSchema = Yup.object().shape({
        selectBank: Yup.string().required("Required"),
        banchName: Yup.string().required("Required"),
        ifscCode: Yup.string().required("Required"),
        accNo: Yup.number().positive().required("Required"),
        accHolderName: Yup.string().required("Required"),
        bankStatment: Yup.string()
    })

    const submitForm = (values) => {
        setKycFormData(values)
        stepper.next()
        console.log("values", values)
    }

    const bankOptions = [{label: "State Bank of India", value: "sbi"}]

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form className="row">
                        {/* <FormGroup className="col-md-6">
                            <Label For="selectBank">Select Bank</Label>
                            <CustomSelectField
                                value={formik.values.selectBank}
                                options={bankOptions}
                                onChange={value => formik.setFieldValue("selectBank", value.value)}
                            />
                            <ErrorMessage
                            name="selectBank"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup> */}
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="selectBank">Bank Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="selectBank"
                                id="selectBank"
                                {...formik.getFieldProps("selectBank")}
                                invalid={!!(formik.touched.selectBank && formik.errors.selectBank)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="selectBank"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="banchName">Branch Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="banchName"
                                id="banchName"
                                {...formik.getFieldProps("banchName")}
                                invalid={!!(formik.touched.banchName && formik.errors.banchName)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="banchName"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="ifscCode">IFSC Code</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="ifscCode"
                                id="ifscCode"
                                {...formik.getFieldProps("ifscCode")}
                                invalid={!!(formik.touched.ifscCode && formik.errors.ifscCode)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="ifscCode"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="accNo">Account Number</Label>
                            <InputGroup>
                                <Input
                                type="number"
                                name="accNo"
                                id="accNo"
                                {...formik.getFieldProps("accNo")}
                                invalid={!!(formik.touched.accNo && formik.errors.accNo)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="accNo"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="accHolderName">Account Holder Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="accHolderName"
                                id="accHolderName"
                                {...formik.getFieldProps("accHolderName")}
                                invalid={!!(formik.touched.accHolderName && formik.errors.accHolderName)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="accHolderName"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="bankStatment">Bank Statement</Label>
                            <CustomInput
                            type="file"
                            name="bankStatment"
                            id="bankStatment"
                            {...formik.getFieldProps("bankStatment")}
                            invalid={!!(formik.touched.bankStatment && formik.errors.bankStatment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="bankStatment"
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

export default BankAccountComponent