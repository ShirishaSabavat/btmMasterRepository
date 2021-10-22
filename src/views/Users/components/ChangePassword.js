import { Button, Label, Row, Col, Input, FormGroup } from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

const ChangePassword = () => {

  const initialValues = {
    newPassword:"",
    reNewPassword:""
  }

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Required"),
    reNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Required")
  })


  const submitForm = values => {
    console.log("val", values)
  }


  return (
     <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
        {(formik) => {
          return (
            <Form>
              <Row>
                <Col sm='6'>
                  <FormGroup>
                    <Label htmlFor='newPassword'>New Password</Label>
                        <Input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        {...formik.getFieldProps("newPassword")}
                        invalid={!!(formik.touched.newPassword && formik.errors.newPassword)}
                        >
                        </Input>
                    <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  <FormGroup>
                    <Label htmlFor='reNewPassword'>Confirm Password</Label>
                        <Input
                        type="password"
                        name="reNewPassword"
                        id="reNewPassword"
                        {...formik.getFieldProps("reNewPassword")}
                        invalid={!!(formik.touched.reNewPassword && formik.errors.reNewPassword)}
                        >
                        </Input>
                    <ErrorMessage
                        name="reNewPassword"
                        component="div"
                        className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary'>
                    Save
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ChangePassword
