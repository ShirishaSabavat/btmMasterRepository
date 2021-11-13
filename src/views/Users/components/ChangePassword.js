import { Button, Label, Row, Col, Input, FormGroup } from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from 'react-redux'
import { changePassword } from '../../../redux/actions/auth'

const ChangePassword = () => {

  const userData = useSelector(state => state.user.userData)
  const dispatch = useDispatch()

  const initialValues = {
    newPassword:"",
    confirmPassword:""
  }

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Required")
  })


  const submitForm = (values, {resetForm}) => {
    console.log("val", values)
    dispatch(changePassword(values, resetForm))
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
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                        invalid={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        >
                        </Input>
                    <ErrorMessage
                        name="confirmPassword"
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
