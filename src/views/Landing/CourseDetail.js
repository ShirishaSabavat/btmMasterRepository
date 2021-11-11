import { useEffect, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Calendar, MapPin, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import LoadingButton from '@mui/lab/LoadingButton'
import { Media, Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import {Grid, Radio, Divider, Button, Card, Dialog, DialogTitle, FormControl, CardContent, DialogContent, Typography, Chip, TextField} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import NavBar from './components/navbar'
import { toast } from 'react-toastify'
import { fetchCourseById, fetchAllCourses } from '../../redux/actions/courses'
import { toggleNetworkLoading } from '../../redux/actions/common'
import { DO_LOGIN } from '../../redux/types/auth'
import Footer from './components/footer'
import { BASE_URL } from '../../utility/serverSettings'
import { handleLogin, updateUserRole } from '../../redux/actions/auth'
import { getLandingPageData } from "../../redux/actions/landingPage/index"
// import { getUserData } from '../../utility/Utils'
// import CourseCard from './components/courseCard'
import CourseDetailLoadingSkleton from '../../components/skleton/CourseDetailLoadingSkleton'

const Landing = (route) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [skin, setSkin] = useSkin()

    const networkLoading = useSelector(state => state.common.loading)

    // const [loading, setLoading] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [chooseWorkshop, setChooseWorkshop] = useState('')
    const [purchaseType, setPurchaseType] = useState('')

    const { id } = useParams()
 
    const userData = useSelector(state => state.auth.userData)
    const referralCode = useSelector(state => state.common.referralCode)
    const course = useSelector(state => state.courses.course)
    const workshops = useSelector(state => state.courses.workshops)
    const courses = useSelector(state => state.courses.courses)
    const landingPageData = useSelector(state => state.landingPage.landingPage)
    const [razorPayKey, setRazorPayKey] = useState("")


    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])

    useEffect(() => {
        dispatch(getLandingPageData())
    }, [])

    useEffect(() => {
        dispatch(fetchCourseById(id))
    }, [])

    useEffect(() => {
        if (userData.user && loginModal) {
            setLoginModal(false)
        }
    }, [userData])

    
    useEffect(() => {
        if (landingPageData?.razorPayMode === "LIVE") {
            setRazorPayKey(landingPageData.razorPayLiveKey)
        } else {
            setRazorPayKey(landingPageData.razorPayTestKey)
        }
    }, [landingPageData])

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

    const displayRazorpay = async (price, type) => {
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
            toast.error("Razorpay SDK failed to load. Are you online?", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }

        // dispatch(toggleNetworkLoading(true))

        const raw = {
            courseId: course._id,
            purchaseType: type || purchaseType
        }    
        if (type === "WORKSHOP") {
            raw.workshopId = chooseWorkshop
        }

        ServerApi().post("purchases/createOrder", raw)
        .then(result => {
            if (result.data.success === false) {
                toast.error(result.data.message || "Unable to purchase.", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                // dispatch(toggleNetworkLoading(false))
                return
            }

            const { orderId } = result.data

            //rzp_live_yQridN4TIi2mEm
            //CxNzVTZRYv72mLsoof5eYiCg
            //
            //rzp_test_tZ8WCE2tCPXW63
            //5xnKX6BvwxiFGxNThYO7djZv

            const options = {
                key: razorPayKey, 
                amount: (parseFloat(price) + ((parseFloat(price) * 18) / 100)).toString(),
                currency: "INR",
                name: "Business Aacharaya",
                description: `Purchase Course.`,
                image: 'https://amoghnya.com/assets/img/favicon.png',
                order_id: orderId,
                async handler (response) {
                    const data = {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature
                    }

                    ServerApi().post(`/purchases/completePurchase`, data)
                    .then(res => {
                        //update role if Bac course
                        if (course.type === 'Bac') {
                            dispatch(updateUserRole('BAC_USER'))
                        }
                    })

                    history.push('/dashboard')

                },
                prefill: {
                    name: userData.access_token ? userData.user.name : name,
                    email: userData.access_token ? userData.user.email : email,
                    contact: userData.access_token ? userData.user.phone : phone
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

            // dispatch(toggleNetworkLoading(false))
        })
        .catch(e => {
            console.log(e)
            // dispatch(toggleNetworkLoading(false))
            toast.error("Unable to make payment!", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })
    }

    const doRegister = () => {
        if (name === '' || email === '' || phone === '' || password === '') {
            toast.error("Please enter all fields.", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }

        const raw = {
            name,
            email,
            phone,
            password
        }

        if (referralCode) {
            raw.referral = referralCode
        }

        ServerApi().post('users/register', raw)
        .then(res => {
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Unable to register!', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                return
            }

            dispatch({
                type: DO_LOGIN,
                payload: res.data
            })
          
            localStorage.setItem('userData', JSON.stringify(res.data))

            //continue purchase
            displayRazorpay(course.price, purchaseType)

        })
        .catch(e => {
            console.log(e.response)
        })
    }

    const doLogin = () => {
        if (email === '' || password === '') {
            toast.error("Please enter valid email & password", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }

        dispatch(handleLogin({email, password}))

        //continue purchase
        displayRazorpay(course.price, purchaseType)

    }

    const initPurchase = (type) => {
        if (type === 'WORKSHOP') {
            if (chooseWorkshop === '') {
                toast.error("Please choose a workshop first", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                return
            }
        }
        setPurchaseType(type)

        if (userData.access_token) {
            displayRazorpay(course.price, type)
            return
        }

        setRegisterModal(true)
    }

  return (
    <Grid container spacing={2}>

        {networkLoading && (
            <CourseDetailLoadingSkleton />
        )}

        {!networkLoading && (
        <Grid className="bg-white py-5" item xs={12} md={8}>
            <div className='w-100 px-5'>
                <img 
                  className='img-fluid' 
                  src={(course.image === '/assets/images/default-image.jpg' || course.image === undefined) ? '/assets/images/default-image.jpg' : `${BASE_URL}uploads/${course.image}`} 
                  alt='image' 
                  style={{maxHeight: 340}} />
                
                <h2 style={{fontSize: 42, fontWeight: 'bold'}} className="mt-2">{course.name}</h2>
                {course.type === 'Bac' && (
                    <Chip color="primary" size="small" label="BAC Cource" onClick={() => null} />
                )}
                
                <h2 style={{fontSize: 32, fontWeight: 'bold'}} className="mt-2">₹ {course.price} /- <small>+ (18%) gst</small> </h2>
                
                <p className="mt-1 text-justify">{course.details}</p>
            </div>
        
        </Grid>
        )}

        {!networkLoading && (
        <Grid className="bg-white py-5" item xs={12} md={4}>

            <div className="p-2">
                <Card style={{borderRadius: 12, boxShadow: 'none', border: '2px solid #dadada'}} elevation={6} >
                    <Typography mx={2} className="text-center mt-2" variant="h5" component="div">
                        {!userData.access_token ? 'Join Online Course' : 'Purchase This Course'}
                    </Typography>
                    <CardContent>

                        <div className="text-center mt-2">
                            <LoadingButton 
                                loading={networkLoading}
                                loadingPosition="start"
                                variant="contained" 
                                style={{borderRadius: 2}}
                                onClick={() => initPurchase('ONLINE')}
                            >{!userData.access_token ? "Join Now" : "Buy Now" }</LoadingButton>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {workshops.length > 0 && (
                <div className="p-2">
                    <Card style={{borderRadius: 12, boxShadow: 'none', border: '2px solid #dadada'}} elevation={6} className="card-developer-meetup" >
                        <Typography mx={2} mb={2} className="text-center mt-2" variant="h5" component="div">
                            Workshops
                        </Typography>
                        <CardContent>

                            {workshops.map((work) => (
                                <>
                                <Media>
                                    <Avatar color='light-primary' className='rounded mr-1' icon={<Chip color="primary" size="small" label={work.batchNo} onClick={() => null} />} />
                                    <Media body>
                                        <h4 style={{fontWeight: 'bold'}} className='mb-0'> {new Date(work.startDate).toDateString()}</h4>
                                        <p className="mb-0"><small>{new Date(work.startTime).toLocaleTimeString().replace(':00', '')} to {new Date(work.endTime).toLocaleTimeString().replace(':00', '')}</small></p>
                                        <p> <MapPin size={16} className="mr-1" /><a href={work.location} target="_blank" rel="noopener">{work.address}</a></p>
                                    </Media>
                                    <Radio
                                        checked={chooseWorkshop === work._id}
                                        onChange={() => setChooseWorkshop(work._id)}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': work.startDate }}
                                    />
                                </Media>
                                <Divider />
                                </>
                            ))}

                            <div className="text-center mt-2">
                                <LoadingButton 
                                    loading={networkLoading}
                                    loadingPosition="start"
                                    variant="contained" 
                                    style={{borderRadius: 2}}
                                    onClick={() => initPurchase('WORKSHOP')}
                                >{!userData.access_token ? "Join Now" : "Buy Now" }</LoadingButton>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Grid>
        )}

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
                        <p className="text-justify">Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
                        <Button onClick={() => history.push('/bac-courses')} size="large" variant="contained">BAC Courses</Button>
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
                <FormControl className="w-100" sx={{ p: 1 }}>
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
                <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                    <TextField
                        id="email"
                        label="Email"
                        defaultValue=""
                        type="email"
                        variant="standard"
                        onChange={e => setEmail(e.target.value)}
                    />
                    </FormControl>
                <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                    <TextField
                        id="phone"
                        label="Phone No."
                        defaultValue=""
                        length={10}
                        type="number"
                        variant="standard"
                        onChange={e => setPhone(e.target.value)}
                    />
                </FormControl>
                <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                    <TextField
                        id="password"
                        label="Password"
                        defaultValue=""
                        variant="standard"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormControl>

                {referralCode && (
                    <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                        <TextField
                            id="referral"
                            label="referral"
                            defaultValue=""
                            value={referralCode}
                            variant="standard"
                            disabled
                        />
                    </FormControl>
                )}
                </>
            )}

            <div className="text-center mt-2">
                <LoadingButton 
                    loading={networkLoading}
                    loadingPosition="start"
                    variant="contained" 
                    style={{borderRadius: 2}}
                    disabled={userData.access_token}
                    onClick={() => doRegister()}
                >{!userData.access_token ? "Register & Join" : "Please Wait..." }</LoadingButton>
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
                <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                    <TextField
                        id="phone"
                        label="Email"
                        defaultValue=""
                        variant="standard"
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl className="w-100 pt-1" sx={{ p: 1 }}>
                    <TextField
                        id="otp"
                        label="Password"
                        defaultValue=""
                        variant="standard"
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormControl>
                </>
            )}

            <div className="text-center mt-2">
                <LoadingButton 
                    loading={networkLoading}
                    loadingPosition="start"
                    variant="contained" 
                    style={{borderRadius: 2}}
                    onClick={() => doLogin()}
                >{"Login"}</LoadingButton>
            </div>

            <div className="text-center" style={{marginTop: 12}}>
                <p style={{fontSize: 11, cursor: 'pointer'}} onClick={() => { setLoginModal(false); setRegisterModal(true) }}>Don't have an account ?</p>
            </div>
        
            </DialogContent>
        </Dialog>

    </Grid>
  )
}

export default Landing
