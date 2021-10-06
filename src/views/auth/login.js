import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '../../redux/actions/auth'
import NavBar from '../Landing/components/navbar'
import Footer from '../Landing/components/footer'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userData = useSelector(state => state.auth.userData)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doLogin = () => {

    if (email === '' || password === '') {
      toast.error("Invalid Email/Password", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      return
    }

    dispatch(handleLogin({email, password}))
  }

  //go to dashboard on successful login
  useEffect(() => {
      if (userData.access_token) {
          history.push('/dashboard')
      }
  }, [userData])

  return (
    <>
    <NavBar />
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          {/* <h2 className='brand-text text-primary ml-1'>Business Acharaya Consultancy</h2> */}
        </Link>
        <Col style={{backgroundColor: '#161749'}} className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src='/assets/images/demo5.jpg' alt='Login V2' />
          </div>
        </Col>
        <Col style={{backgroundColor: '#161749'}} className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <Card className="p-2">
            <CardContent>
            <CardTitle tag='h2' className='font-weight-bold'>
              Welcome to Business Aachrya
            </CardTitle>
            <CardText className='mb-2'></CardText>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input onChange={(e) => setEmail(e.target.value)} type='email' id='login-email' placeholder='' autoFocus />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <InputPasswordToggle onChange={(e) => setPassword(e.target.value)} className='input-group-merge' id='login-password' />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple onClick={() => doLogin()} color='primary' block>
                Log in
              </Button.Ripple>
            </Form>
            </CardContent>
            </Card>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/'>
                <span>Create an account</span>
              </Link>
            </p> 
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>*/}
          </Col>
        </Col>
      </Row>
    </div>

    <Footer />
    </>
  )
}

export default Login