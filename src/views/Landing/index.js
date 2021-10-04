import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, ButtonGroup, Divider, IconButton, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography, Chip} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import NavBar from './components/navbar'
import Footer from './components/footer'
import CourseCard from './components/courseCard'
import { fetchAllCourses } from '../../redux/actions/courses'
import { useEffect } from 'react'

const Landing = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)
    const courses = useSelector(state => state.courses.courses)

    useEffect(() => {
        dispatch(fetchAllCourses())
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
        // setLoading(true)

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?")
            return
        }

        ServerApi().post("purchases/createOrder", {
            userName: "om mahato",
            userEmail: "om@om.com",
            userPhone: 123,
            courseId: "615558608fe19045f0d1b010"
        })
        .then(result => {
            console.log({ result })

            
            const { _id, orderId } = result.data

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
                image: '/asstes/images/demo1.jpg',
                order_id: orderId,
                async handler (response) {
                    const data = {
                        orderCreationId: _id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        amount,
                        credits: amount,
                        currency: "INR"
                    }

                    const result = await ServerApi().post(`/payments/${response.razorpay_payment_id}/capture`, data)

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

                    console.log(result.data)
                },
                prefill: {
                    name: 'test',
                    email: 'test',
                    contact: 'test'
                },
                notes: {
                    address: 'getUser().address.address'
                },
                theme: {
                    color: "#7367f0"
                }
            }

            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        })
        .catch(e => {
            console.log(e)
            alert("Server error. Are you online?")
        })
    }

  return (
    <Grid container spacing={2}>
        <NavBar />

        <Grid className="" style={{backgroundColor: 'silver'}} item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center' lg='8' sm='12'>
                <div className='w-100 px-5 mt-4'>
                    <h2 style={{color: 'black'}}>Welcome to BAC</h2>
                    <p>Br Shafi Shaik Shafiulla is Popularly Known as  Brother Shafi  is Founder President of Mission Nenu Saitham Samajam Kosam. Br Shafi  has done Masters Degree from Osmania University in MSW Medical and Psychiatric Social Work.   He Awarded Gold Medal for His best services in  social work from Roda MISTRY college of social work, Osmania University. by Deputy CM and Educational Minister of Telangana State Sri Kadiyam Srihari Garu. Br Shafi is Master Motivator, life skills trainer and international orator. He has given many motivational training programs and Personality Development work shops in many schools, colleges, corporate companies and Police officials.</p>
                </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2' lg='4' sm='12'>
                    <img className='img-fluid' src="/assets/images/br5.jpg" alt='Login V2' />
                </Col>
            </Row>
        </Grid>

        <Grid style={{backgroundColor: '#e2ecf5'}} className="pb-5" item xs={12}>
            <Row className=''>
                <Col className=' auth-bg' lg='5' xs='12'>
                    <img className='img-fluid' src="/assets/images/q3.jpg" alt='Login V2' />
                </Col>
 
                <Col className='' lg='7' xs='12'>
                    <div className='w-100 px-5 mt-4'>
                        <h2 style={{fontWeight: 'bold', fontSize: 48}}>We Organize  <br /> Effective Learning</h2>
                        <p>Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
                        <Button size="large" className="mt-2" variant="contained">About Us</Button>
                    </div>
                </Col>
                
            </Row>
        </Grid>

        <Grid item xs={12}>
            <h2 className="text-center mt-4 mb-2">Cources</h2>
        </Grid>

        
        <Grid item container spacing={2}>
            {courses.map((item) => (
                <CourseCard key={item._id} data={item} />
            ))}
        </Grid>

        <Grid style={{backgroundColor: '#3f1360'}} className="pb-5" item xs={12}>
            <Row className=''>
                <Col className='' lg='5' xs='12'>
                    <img style={{width: '70%'}} className='img-fluid ml-2' src="/assets/images/w2.jpg" alt='Login V2' />
                </Col>

                <Col className='' lg='7' xs='12'>
                    <div className='w-100 px-5'>
                        <h2 className="text-white" style={{fontWeight: 'bold', fontSize: 48}}>Our Trainings Workshops</h2>
                        <p className="text-white mt-3">Sharpen your skills. Be the best you can be</p>
                        <p className="text-white">Br Shafi Shaik Shafiulla is Popularly Known as  Brother Shafi  is Founder President of Mission Nenu Saitham Samajam Kosam. Br Shafi  has done Masters Degree from Osmania University in MSW Medical and Psychiatric Social Work.   He Awarded Gold Medal for His best services in  social work from Roda MISTRY college of social work, Osmania University. by Deputy CM and Educational Minister of Telangana State Sri Kadiyam Srihari Garu. Br Shafi is Master Motivator, life skills trainer and international orator. He has given many motivational training programs and Personality Development work shops in many schools, colleges, corporate companies and Police officials.</p>
                        <Button className="mt-2" size="large" variant="contained">View Workshops</Button>
                    </div>
                </Col>
                
            </Row>
        </Grid>

        {/* <Grid className="mt-5 bg-white" item xs={12}>
            <h2 className="text-center mt-4">About Us</h2>
        </Grid> */}

        <Grid className="bg-white pb-5" item xs={12}>
            <Row className=''>
                <Col className='' lg='8' xs='12'>
                <div className='w-100 px-4 mt-4'>
                    <h2 style={{fontWeight: 'bold', fontSize: 48}}>Benefits of learning <br /> with BAC</h2>
                    <p>Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
                </div>
                </Col>
                <Col className='' lg='4' xs='12'>
                    <img className='img-fluid' src="/assets/images/br2.webp" alt='Login V2' />
                </Col>
            </Row>
        </Grid>

        <Grid className="pt-4" style={{background: 'floralwhite'}} item xs={12}>
            <div className='w-100 px-5 text-center'>
                <h1 style={{fontSize: 45, marginBottom: 10, fontFamily: 'cursive', fontWeight: 'bold'}}>ACCOMPLISH MORE <br /> IN 2021</h1>
                <p className="mb-2">MASTER YOUR TIME TO GET MORE DONE <br /> AND ACHIEVE MORE MEANINGFUL RESULTS</p>
                <Button size="large" variant="contained">Cources</Button>
            </div>

            <img src="/assets/images/demo6.png" /> 
        </Grid>

        <Footer />

    </Grid>
  )
}

export default Landing
