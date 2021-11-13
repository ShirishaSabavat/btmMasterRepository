import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordSendOtp, forgotPasswordVerifyOtp, forgotPasswordChangePassword } from '../../redux/actions/auth'
import NavBar from '../Landing/components/navbar'
import Footer from '../Landing/components/footer'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userData = useSelector(state => state.auth.userData)
    const networkLoading = useSelector(state => state.common.loading)
    const verifyOtp = useSelector(state => state.auth.verifyOtp)
    const changePassword = useSelector(state => state.auth.changePassword)

    useEffect(() => {
        dispatch({type: 'VERIFY_OTP_TAB', payload: false})
        dispatch({type: 'CREATE_PASSWORD_TAB', payload: false})
    }, [])

    // const [verifyOtp, setVerifyOtp] = useState(false)
    // const [changePassword, setChangePassword] = useState(false)
    const [forgotPhone, setForgotPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const goToLogin = () => {
        history.push('/login')
    }

    const doVerifyOtp = () => {
        if (otp === '' || otp.length !== 4) {
            toast.error("Invalid OTP", {
                position: toast.POSITION.BOTTOM_CENTER
            })      
            return
        }
        dispatch(forgotPasswordVerifyOtp({otp, phone: forgotPhone}))
    }

    const sendOtp = () => {
        if (verifyOtp) {
            doVerifyOtp()
            return
        }

        if (forgotPhone === '' || forgotPhone.length !== 10) {
            toast.error("Invalid Phone No.", {
                position: toast.POSITION.BOTTOM_CENTER
            })      
            return
        }

        dispatch(forgotPasswordSendOtp({phone: forgotPhone}))
    }

    const doChangePassword = () => {
        if (newPassword === '' || confirmPassword === '' || (newPassword !== confirmPassword)) {
            toast.error("Password and confirm password are required.", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }

        dispatch(forgotPasswordChangePassword({otp, phone: forgotPhone, newPassword, confirmPassword}, goToLogin))

        // toast.success("Password changed successfully.", {
        //     position: toast.POSITION.BOTTOM_CENTER
        // })

        // history.push('login')
    }

  //go to dashboard on successful login
  useEffect(() => {
      if (userData.access_token) {
          history.push('/dashboard')
      }
  }, [userData])

  return (
    <>
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          {/* <h2 className='brand-text text-primary ml-1'>Business Aacharaya</h2> */}
        </Link>
        <Col style={{backgroundColor: '#393a50'}} className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src='/assets/images/logo-h.png' alt='Login V2' />
          </div>
        </Col>
        <Col style={{backgroundColor: '#393a50'}} className='d-flex align-items-center auth-bg px-1 p-lg-4' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <Card className="p-2">
                <CardContent>
                
                <CardTitle tag='h2' className='font-weight-bold'>
                    {changePassword ? "Create New Password" : verifyOtp ? "Verify OTP" : "Forgot Password" }
                </CardTitle>  

                <CardText className='mb-2'></CardText>
                <Form className='auth-login-form mt-2' >

                {(!changePassword) && (
                    <FormGroup className="mb-3">
                        <Label className='form-label' htmlFor='login-email'>
                            Phone No.
                        </Label>
                        <Input disabled={verifyOtp} onChange={(e) => setForgotPhone(e.target.value)} type='number' placeholder='Enter your account phone no.' autoFocus />
                    </FormGroup>
                )}

                {verifyOtp && (
                    <FormGroup className="mb-3">
                        <Label className='form-label' htmlFor='login-email'>
                            OTP
                        </Label>
                        <Input disabled={changePassword} onChange={(e) => setOtp(e.target.value)} type='number' placeholder='Enter the OTP' autoFocus />
                        <small>An OTP has been sent to your phone no.</small>
                    </FormGroup>
                )}

                {changePassword && (
                    <>
                        <FormGroup className="mb-3">
                            <Label className='form-label' htmlFor='login-email'>
                                New Password
                            </Label>
                            <InputPasswordToggle onChange={(e) => setNewPassword(e.target.value)} className='input-group-merge' id='new-password' />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label className='form-label' htmlFor='login-email'>
                                Confirm Password
                            </Label>
                            <InputPasswordToggle onChange={(e) => setConfirmPassword(e.target.value)} className='input-group-merge' id='confirm-password' />
                        </FormGroup>
                    </>
                )}

                <Button.Ripple disabled={networkLoading} onClick={() => (changePassword ? doChangePassword() : sendOtp())} color='primary' block>
                    {changePassword ? "Save" : verifyOtp ? "Verify" : "Send OTP" }
                </Button.Ripple>

                <div className="mt-1 text-center">
                    <span onClick={() => history.push('/login')} style={{fontSize: 11}} className="text-info cursor pointer">Back to Login</span>
                </div>

                </Form>
                </CardContent>
            </Card>
          </Col>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default ForgotPassword
