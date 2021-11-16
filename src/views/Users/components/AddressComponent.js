import React, {useState, useEffect} from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { Country, State, City }  from 'country-state-city'
import {ArrowLeft, ArrowRight} from 'react-feather'
import CustomSelectField from "../../UtilityComponents/CustomSelectField"
import { BASE_URL } from '../../../utility/serverSettings'

const AddressComponent  = ({stepper, type, setKycFormData, userKYC, setShowEdit}) => {
   
  const allCountries = Country.getAllCountries().map(values => { return {label : values.name, value : values.isoCode } })

  const [countryOptions] = useState(allCountries)
  const [stateOptions, setStates] = useState([])
  const [cityOptions, setCityOptions] = useState()

  const [selectedCountry, setSelectedCountry] = useState()
  const [selectedState, setSelectedState] = useState()

  useEffect(() => {
    setStates(State.getStatesOfCountry(selectedCountry).map(values => { return {label : values.name, value : values.isoCode, countryCode: values.countryCode } }))
  }, [selectedCountry])

  useEffect(() => {
    const CountryCode = selectedState?.countryCode 
    const StateCode = selectedState?.value
    setCityOptions(City.getCitiesOfState(CountryCode, StateCode).map(values => { return {label : values.name, value: values.stateCode } }))
  }, [selectedState])

    const initialValues = {
        address:userKYC?.address,
        country:userKYC?.country,
        state:userKYC?.state,
        city:userKYC?.city,
        zipCode:userKYC?.zipCode,
        addressAttachment: userKYC?.addressAttachment
    }

    console.log(userKYC, "userKYC")

    const validationSchema = Yup.object().shape({
        address: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        zipCode: Yup.number().positive().integer().required("Required"),
        addressAttachment: Yup.string()

    })

    const submitForm = (values) => {
        console.log("values", values)
        setKycFormData(values)
        stepper.next()
    }

    const countryChangeHadler = (value, formik) => {
        formik.setFieldValue("country", value.label)
        setSelectedCountry(value.value)
      }
    
      const StateChangeHadler = (value, formik) => {
        formik.setFieldValue("state", value.label)
        setSelectedState(value)
      }

    const [currentCountry, setCurrentCountry] = useState(countryOptions?.map(items => {
        if (items.label === userKYC.country) {
            return items 
        }
    }))

    const [currentState, setCurrentState] = useState([])
  
    const [currentCity, setCurrentCity] = useState([])

    useEffect(() => {
        countryOptions?.map(items => {
            if (items.label === userKYC.country) {
                setSelectedCountry(items.value)
                setCurrentCountry(items)
            }
        })
    }, [])

    // useEffect(() => {
    //     State.getAllStates().map(items => {
    //         console.log("items.name === userKYC.state", items.name === userKYC.state)
    //         if (items.name === userKYC.state) {
    //             console.log("st", items)
    //             setCurrentState({label: items.name, value:items.isoCode})
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     City.getAllCities().map(items => {
    //         console.log("items.name === userKYC.state", items.name === userKYC.city)
    //         if (items.name === userKYC.city) {
    //             console.log("st", items)
    //             setCurrentCity({label: items.name, value:items.isoCode})
    //         }
    //     })
    // }, [])

    // console.log("currentCountry", currentCountry)
    // console.log("currentState", currentState)

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    console.log("ff", formik.values)
                    return (<Form className="row">
                        <FormGroup className="col-md-12 has-icon-left position-relative">
                            <Label htmlFor="address">Address <span className="text-danger">*</span></Label>
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
                            <Label htmlFor="zipCode">Pin Code <span className="text-danger">*</span></Label>
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
                            {formik.values.addressAttachment?.name || formik.values.addressAttachment ? <div>
                                <p>Preview:</p>
                                {formik.values.addressAttachment?.name ? <img width="400" src={URL.createObjectURL(formik.values.addressAttachment)} className="img-fluid" alt='No Image' /> : <a title="View" href={`${BASE_URL}uploads/${formik.values.addressAttachment}`} target="_blank"><img width="400" src={`${BASE_URL}uploads/${formik.values.addressAttachment}`} className="img-fluid"  alt='No Image' /></a> }
                            </div> : null }
                            <Label htmlFor="addressAttachment">Address Documnet</Label>
                            <CustomInput
                            type="file"
                            name="addressAttachment"
                            id="addressAttachment"
                            onChange={file => formik.setFieldValue("addressAttachment", file.currentTarget.files[0])}
                            invalid={!!(formik.touched.addressAttachment && formik.errors.addressAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="addressAttachment"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>

                        {/* <FormGroup className="col-md-4">
                            <Label For="country">Country <span className="text-danger">*</span></Label>
                            <CustomSelectField
                              value={formik.values.country}
                              options={countryOptions}
                              defaultValue={currentCountry}
                              onChange={(value) => countryChangeHadler(value, formik)}
                            />
                            <ErrorMessage
                            name="country"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Label For="state">State <span className="text-danger">*</span></Label>
                            <CustomSelectField
                              value={formik.values.state}
                              defaultValue={currentState}
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
                            <Label For="city">City <span className="text-danger">*</span></Label>
                            <CustomSelectField
                              value={formik.values.city}
                              defaultValue={currentCity}
                              options={cityOptions}
                              onChange={(value) => formik.setFieldValue("city", value.label)}
                            />
                            <ErrorMessage
                            name="city"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>  */}
                        
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
        <div className="ml-auto mr-2">
          <Button.Ripple onClick={() => setShowEdit(prevState => !prevState)} color='danger' className='btn-prev' outline>
              <span className='align-middle d-sm-inline-block d-none'>Cancel</span>
          </Button.Ripple>
        </div>
    </Row>
}

export default AddressComponent