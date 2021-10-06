import { useEffect, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Calendar, MapPin, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Media, Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import {Grid, Radio, Divider, Button, Card, Dialog, DialogTitle, FormControl, CardContent, DialogContent, Typography, Chip, TextField} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import NavBar from './components/navbar'
import { toast } from 'react-toastify'
import { fetchCourseById, fetchAllCourses } from '../../redux/actions/courses'
import { DO_LOGIN } from '../../redux/types/auth'
import Footer from './components/footer'
import { BASE_URL } from '../../utility/serverSettings'
// import CourseCard from './components/courseCard'

const Landing = (route) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [skin, setSkin] = useSkin()

    const [loading, setLoading] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [chooseWorkshop, setChooseWorkshop] = useState('')
    

    const { id } = useParams()
 
    const userData = useSelector(state => state.auth.userData)
    const course = useSelector(state => state.courses.course)
    const workshops = useSelector(state => state.courses.workshops)
    const courses = useSelector(state => state.courses.courses)


    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])

    useEffect(() => {
        dispatch(fetchCourseById(id))
    }, [])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
      }

    async function displayRazorpay(price) {
        if (!userData.access_token) {
            if (name === '' || email === '' || phone === '') {
                toast.error("Please enter all fields.", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                return
            }
        }
        
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )
        
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?")
            return
        }

        setLoading(true)
            
        ServerApi().post("purchases/createOrder", {
            userName: name,
            userEmail: email,
            userPhone: phone,
            courseId: course._id
        })
        .then(result => {
            console.log({ result })

            
            const { orderId } = result.data

            // console.log('amount')
            // console.log(amount)

            //rzp_live_yQridN4TIi2mEm
            //CxNzVTZRYv72mLsoof5eYiCg
            //
            //rzp_test_tZ8WCE2tCPXW63
            //5xnKX6BvwxiFGxNThYO7djZv

            const options = {
                key: "rzp_test_tZ8WCE2tCPXW63", 
                amount: price.toString(),
                currency: "INR",
                name: "Business Acharaya Consultancy",
                description: `Purchase Course.`,
                image: 'https://amoghnya.com/assets/img/favicon.png',
                order_id: orderId,
                async handler (response) {
                    const data = {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature
                    }

                    const result = await ServerApi().post(`/purchases/completePurchase`, data)

                    // updateUser()
                    // setLoading(false)
                    // setPaymentDone(true)
                    
                    // setTimeout(() => {
                    //     setRechargeModal(false)
                    //     setPaymentDone(false)
                    //     history.push('/transactions')
                    // }, 3000)

                    // enqueueSnackbar('Payment Done!', {variant: 'success'})
                    // dispatch({ type: "UPDATE_BALANCE", payload: getUser().wallet.balance })

                    // console.log(result.data)
                    dispatch({
                        type: DO_LOGIN,
                        payload: {...result.data, access_token: result.data.access_token}
                    })
                  
                    localStorage.setItem('userData', JSON.stringify({...result.data, access_token: result.data.access_token}))

                    history.push('/dashboard')

                },
                prefill: {
                    name,
                    email,
                    contact: phone
                },
                notes: {
                    address: ''
                },
                theme: {
                    color: "#7367f0"
                }
            }

            const paymentObject = new window.Razorpay(options)
            paymentObject.open()

            setLoading(false)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
            alert("Unable to make payment!")
        })
    }

  return (
    <Grid container spacing={2}>
        <NavBar />

        <Grid className="bg-white py-5" item xs={12} md={9}>
            <div className='w-100 px-5'>
                <img className='img-fluid' src={`${BASE_URL}uploads/${course.image}`} alt='image' style={{maxHeight: 340}} />
                
                <h2 style={{fontSize: 42, fontWeight: 'bold'}} className="mt-2">{course.name}</h2>
                <Chip color="primary" size="small" label="BAC Cource" onClick={() => null} />
                
                <h2 style={{fontSize: 32, fontWeight: 'bold'}} className="mt-2">₹ {course.price} /-</h2>
                
                <p className="mt-1">{course.details}</p>
            </div>
        
        </Grid>
        <Grid className="bg-white py-5" item xs={12} md={3}>

            <div className="p-2">
                <Card >
                    <Typography mx={2} className="text-center mt-2" variant="h5" component="div">
                        {!userData.access_token ? 'Join Online Course' : 'Purchase This Course'}
                    </Typography>
                    <CardContent>

                        <div className="text-center mt-2">
                            <Button 
                                loading={loading}
                                loadingPosition="start"
                                variant="contained" 
                                style={{borderRadius: 2}}
                                onClick={() => setRegisterModal(true)}
                                endIcon={<Send />}
                            >{!userData.access_token ? "Join Now" : "Buy Now" }</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {workshops.length > 0 && (
                <div className="p-2">
                    <Card className="card-developer-meetup" >
                        <Typography mx={2} mb={2} className="text-center mt-2" variant="h5" component="div">
                            Workshops
                        </Typography>
                        <CardContent>

                            {workshops.map((work) => (
                                <Media>
                                    <Avatar color='light-primary' className='rounded mr-1' icon={<Calendar size={18} />} />
                                    <Media body>
                                        <h6 className='mb-0'>{work.startDate}</h6>
                                        <small>{work.startTime} to {work.endTime}</small>
                                    </Media>
                                    <Radio
                                        checked={chooseWorkshop === work._id}
                                        onChange={() => setChooseWorkshop(work._id)}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': work.startDate }}
                                    />
                                </Media>
                            ))}

                            <div className="text-center mt-2">
                                <Button 
                                    loading={loading}
                                    loadingPosition="start"
                                    variant="contained" 
                                    style={{borderRadius: 2}}
                                    onClick={() => setRegisterModal(true)}
                                    endIcon={<Send />}
                                >{!userData.access_token ? "Join Now" : "Buy Now" }</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Grid>

        <Grid item md={12} xs={12}>
        </Grid>

        {course.type !== 'Bac' && (
            <Grid className="bg-white pb-5" item xs={12}>
                <Row className=''>
                    <Col className='' lg='4' xs='12'>
                        <img className='img-fluid' src="/assets/images/c2.jpg" alt='Login V2' />
                    </Col>
                    <Col className='' lg='8' xs='12'>
                    <div className='w-100 px-4 mt-4'>
                        <h2 style={{fontWeight: 'bold', fontSize: 48}}>Become a consultant <br /> of Business Aachrya</h2>
                        <p>Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
                        <Button onClick={() => history.push('/bac-courses')} size="large" variant="contained">BAC Cources</Button>
                    </div>
                    </Col>
                </Row>
            </Grid>
        )}

        {/* <Grid className="bg-white" pt={5} item container spacing={2}>
            <Grid item md={12} xs={12}>
                <Divider />
            </Grid>

            <Grid item md={12} xs={12}>
                <h2 style={{paddingLeft: 38, fontSize: 24, fontWeight: 'bold'}} className="mt-2">You may also like</h2>
            </Grid>

            {courses.map((item) => (
                <CourseCard goTo={(ln) => history.push(`/course/${ln}`)} key={item._id} data={item} />
            ))}
        </Grid> */}

        <Dialog onClose={() => setRegisterModal(false)} open={registerModal}>
            <DialogTitle className="text-center">Register & Join</DialogTitle>

            <DialogContent style={{maxWidth: 370}}>
            {!userData.access_token && (
                <>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField
                        id="name"
                        label="Name"
                        defaultValue=""
                        variant="standard"
                        // error={name === ''}
                        // helperText="Name is required"
                        onChange={e => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl className="pt-1" fullWidth sx={{ p: 1 }}>
                    <TextField
                        id="email"
                        label="Email"
                        defaultValue=""
                        variant="standard"
                        onChange={e => setEmail(e.target.value)}
                    />
                    </FormControl>
                <FormControl className="pt-1" fullWidth sx={{ p: 1 }}>
                    <TextField
                        id="phone"
                        label="Phone No."
                        defaultValue=""
                        variant="standard"
                        onChange={e => setPhone(e.target.value)}
                    />
                </FormControl>
                </>
            )}

            <div className="text-center mt-2">
                <Button 
                    loading={loading}
                    loadingPosition="start"
                    variant="contained" 
                    style={{borderRadius: 2}}
                    onClick={() => displayRazorpay(course.price)}
                    endIcon={<Send />}
                >{!userData.access_token ? "Register & Join" : "Buy Now" }</Button>
            </div>

            <div className="text-center" style={{marginTop: 12}}>
                <p style={{fontSize: 11, cursor: 'pointer'}} onClick={() => { setRegisterModal(false); setLoginModal(true) }}>Aready have an account ?</p>
            </div>
        
            </DialogContent>
        </Dialog>

        <Dialog onClose={() => setLoginModal(false)} open={loginModal}>
            <DialogTitle className="text-center">Login</DialogTitle>

            <DialogContent style={{maxWidth: 370}}>
            {!userData.access_token && (
                <>
                <FormControl className="pt-1" fullWidth sx={{ p: 1 }}>
                    <TextField
                        id="phone"
                        label="Phone No."
                        defaultValue=""
                        variant="standard"
                        onChange={e => setPhone(e.target.value)}
                    />
                </FormControl>
                <FormControl className="pt-1" fullWidth sx={{ p: 1 }}>
                    <TextField
                        id="otp"
                        label="OTP"
                        defaultValue=""
                        variant="standard"
                        helperText={"please enter phone no. otp will be sent automatically."}
                        onChange={e => setOtp(e.target.value)}
                    />
                </FormControl>
                </>
            )}

            <div className="text-center mt-2">
                <Button 
                    loading={loading}
                    loadingPosition="start"
                    variant="contained" 
                    style={{borderRadius: 2}}
                    onClick={() => doLogin()}
                    endIcon={<Send />}
                >{"Login"}</Button>
            </div>

            <div className="text-center" style={{marginTop: 12}}>
                <p style={{fontSize: 11, cursor: 'pointer'}} onClick={() => { setLoginModal(false); setRegisterModal(true) }}>Don't have an account ?</p>
            </div>
        
            </DialogContent>
        </Dialog>

        <Footer />

    </Grid>
  )
}

export default Landing
