import React, {useState, useEffect} from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { Country, State, City }  from 'country-state-city'
import {ArrowLeft, ArrowRight} from 'react-feather'
import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const AddressComponent  = ({stepper, type, setKycFormData}) => {
   
  const allCountries = Country.getAllCountries().map(values => { return {label : values.name, value : values.isoCode } })

  const [countryOptions] = useState(allCountries)
  const [stateOptions, setStates] = useState([])
  const [cityOptions, setCityOptions] = useState()

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    setStates(State.getStatesOfCountry(selectedCountry).map(values => { return {label : values.name, value : values.isoCode, countryCode: values.countryCode } }))
  }, [selectedCountry])

  useEffect(() => {
    const CountryCode = selectedState?.countryCode 
    const StateCode = selectedState?.value
    setCityOptions(City.getCitiesOfState(CountryCode, StateCode).map(values => { return {label : values.name, value: values.stateCode } }))
  }, [selectedState])

    const initialValues = {
        address:"",
        country:"",
        state:"",
        city:"",
        zipCode:"",
        addressAttachment:""
    }

    const validationSchema = Yup.object().shape({
        address: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        zipCode: Yup.number().positive().integer().required("Required"),
        addressAttachment: Yup.string()

    })

    const submitForm = (values) => {
        // console.log("values", values)
        setKycFormData(values)
        stepper.next()
    }

    const countryChangeHadler = (value, formik) => {
        formik.setFieldValue("country", value.label)
        setSelectedCountry(value.value)
      }
    
      const StateChangeHadler = (value, formik) => {
        console.log("val", value)
        formik.setFieldValue("state", value.label)
        setSelectedState(value)
      }

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form className="row">
                        <FormGroup className="col-md-12 has-icon-left position-relative">
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
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <InputGroup>
                                <Input
                                type="number"
                                name="zipCode"
                                id="zipCode"
                                {...formik.getFieldProps("zipCode")}
                                invalid={!!(formik.touched.zipCode && formik.errors.zipCode)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="zipCode"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="addressAttachment">Address Documnet</Label>
                            <CustomInput
                            type="file"
                            name="addressAttachment"
                            id="addressAttachment"
                            {...formik.getFieldProps("addressAttachment")}
                            invalid={!!(formik.touched.addressAttachment && formik.errors.addressAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="addressAttachment"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>

                        <FormGroup className="col-md-4">
                            <Label For="country">Country</Label>
                            <CustomSelectField
                              value={formik.values.country}
                              options={countryOptions}
                              onChange={(value) => countryChangeHadler(value, formik)}
                            />
                            <ErrorMessage
                            name="country"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Label For="state">State</Label>
                            <CustomSelectField
                              value={formik.values.state}
                              options={stateOptions}
                              onChange={(value) => StateChangeHadler(value, formik) }
                            />
                            <ErrorMessage
                            name="state"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Label For="city">City</Label>
                            <CustomSelectField
                              value={formik.values.city}
                              options={cityOptions}
                              onChange={(value) => formik.setFieldValue("city", value.label)}
                            />
                            <ErrorMessage
                            name="city"
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

export default AddressComponent