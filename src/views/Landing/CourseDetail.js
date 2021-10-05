import { useEffect, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Calendar, MapPin, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Media, Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import {Grid, Radio, Stack, Button, Card, Dialog, DialogTitle, FormControl, CardContent, DialogContent, Typography, Chip, TextField} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import NavBar from './components/navbar'
import { toast } from 'react-toastify'
import { fetchCourseById } from '../../redux/actions/courses'
import { DO_LOGIN } from '../../redux/types/auth'
import Footer from './components/footer'
import { BASE_URL } from '../../utility/serverSettings'

const Landing = (route) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [skin, setSkin] = useSkin()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [chooseWorkshop, setChooseWorkshop] = useState('')
    

    const { id } = useParams()
 
    const userData = useSelector(state => state.auth.userData)
    const course = useSelector(state => state.courses.course)

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

        <Grid className="bg-white py-5" item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center' lg='8' sm='12'>
                <div className='w-100 px-5'>
                    <img className='img-fluid' src={`${BASE_URL}uploads/${course.image}`} alt='image' style={{maxHeight: 340}} />
                    <h2 style={{fontSize: 42, fontWeight: 'bold'}} className="mt-2">{course.name}</h2>
                    <p className="mt-1">{course.details}</p>
                    <h2 style={{fontSize: 32, fontWeight: 'bold'}} className="mt-2">₹ {course.price}</h2>
                </div>
                </Col>
                <Col className='px-2 p-lg-5' lg='4' sm='12'>
                    <div className="p-2">
                        <Card >
                            <Typography mx={3} className="text-center mt-3" variant="h5" component="div">
                                {!userData.access_token ? 'Join Online Course' : 'Purchase This Course'}
                            </Typography>
                            <CardContent>

                                <div className="text-center mt-2">
                                    <Button 
                                        loading={loading}
                                        loadingPosition="start"
                                        variant="contained" 
                                        style={{borderRadius: 2}}
                                        onClick={() => setModal(true)}
                                        endIcon={<Send />}
                                    >{!userData.access_token ? "Join Now" : "Buy Now" }</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="p-2">
                        <Card className="card-developer-meetup" >
                            <Typography mx={3} mb={2} className="text-center mt-3" variant="h5" component="div">
                                Workshops
                            </Typography>
                            <CardContent>

                            {/*<div className='meetup-header d-flex align-items-center'>
                                <div className='meetup-day'>
                                    <h6 className='mb-0'>THU</h6>
                                    <h3 className='mb-0'>24</h3>
                                </div>
                                <div className='my-auto'>
                                    <CardTitle tag='h4' className='mb-25'>
                                    Developer Meetup
                                    </CardTitle>
                                    <CardText className='mb-0'>Meet world popular developers</CardText>
                                </div>
                            </div>*/}

                            <Media>
                                <Avatar color='light-primary' className='rounded mr-1' icon={<Calendar size={18} />} />
                                <Media body>
                                    <h6 className='mb-0'>Sat, May 25, 2020</h6>
                                    <small>10:AM to 6:PM</small>
                                </Media>
                                <Radio
                                    checked={chooseWorkshop === 'a'}
                                    onChange={() => setChooseWorkshop('a')}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                            </Media>

                            <Media>
                                <Avatar color='light-primary' className='rounded mr-1' icon={<Calendar size={18} />} />
                                <Media body>
                                    <h6 className='mb-0'>Sat, May 25, 2020</h6>
                                    <small>10:AM to 6:PM</small>
                                </Media>
                                <Radio
                                    checked={chooseWorkshop === 'b'}
                                    onChange={() => setChooseWorkshop('b')}
                                    value="b"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'B' }}
                                />
                            </Media>

                                <div className="text-center mt-2">
                                    <Button 
                                        loading={loading}
                                        loadingPosition="start"
                                        variant="contained" 
                                        style={{borderRadius: 2}}
                                        onClick={() => displayRazorpay(100)}
                                        endIcon={<Send />}
                                    >{!userData.access_token ? "Join Now" : "Buy Now" }</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Grid>

        <Dialog onClose={() => setModal(false)} open={modal}>
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
        
            </DialogContent>
        </Dialog>

        <Footer />

    </Grid>
  )
}

export default Landing
