import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import ServerApi from '../../utility/ServerApi'

const Landing = () => {
    // const dispatch = useDispatch()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

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

        const result = await ServerApi().post("/payments/orders", {amount: price * 100, currency: "INR"})

        if (!result) {
            alert("Server error. Are you online?")
            return
        }

        const { amount, id, currency } = result.data.data

        // console.log('amount')
        // console.log(amount)

        //rzp_live_yQridN4TIi2mEm
        //CxNzVTZRYv72mLsoof5eYiCg
        //
        //rzp_test_tZ8WCE2tCPXW63
        //5xnKX6BvwxiFGxNThYO7djZv

        const options = {
            key: "rzp_test_tZ8WCE2tCPXW63", 
            amount: amount.toString(),
            currency,
            name: "Business Acharaya Consultancy",
            description: `Purchase Course.`,
            image: '/asstes/images/demo1.jpg',
            order_id: id,
            async handler (response) {
                const data = {
                    orderCreationId: id,
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
                address: getUser().address.address
            },
            theme: {
                color: "#7367f0"
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

  return (
    <Grid container spacing={2}>
        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center p-5' lg='12' sm='12'>
                    <Stack spacing={2} direction="row">
                        <Button variant="text"><Link to="/home">Home</Link></Button>
                        <Button variant="text"><Link to="/cources">Courses</Link></Button>
                        <Button variant="text"><Link to="/about-us">About Us</Link></Button>
                        <Button variant="text"><Link to="/gallery">Gallery</Link></Button>
                        <Button variant="text"><Link to="/contact-us">Contact Us</Link></Button>
                        {!localStorage.getItem('userData') && (
                            <Button variant="text"><Link to="/login">Login</Link></Button>
                        )}
                        {localStorage.getItem('userData') && (
                            <Button variant="text"><Link to="/dashboard">Dashboard</Link></Button>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center p-5' lg='8' sm='12'>
                <div className='w-100 px-5'>
                    <h2>Welcome to BAC</h2>
                    <p>What is Spirituality? - Over the years many definitions have been given to it. One such definition is connecting one's soul with everything positive around us. It is the attempt to be at peace with oneself. It is the art of letting go. The yearning for this spiritual experience has led to demand for spirituality courses.
View more- Explore Online Courses and Certifications</p>
                </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <img className='img-fluid' src="/assets/images/demo1.jpg" alt='Login V2' />
                </Col>
            </Row>
        </Grid>

        <Grid item xs={12}>
            <h2 className="text-center mt-4 mb-2">Cources</h2>
        </Grid>

        <Grid item container spacing={2}>
            <Grid item md={4} xs={10}>
                <Card className="ml-3" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="224"
                        image="/assets/images/demo2.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Buddhism and Modern Psychology
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Princeton University via Coursera
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => displayRazorpay()} size="small">Buy</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item md={4} xs={10}>
                <Card className="ml-3" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="224"
                        image="/assets/images/demo3.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Buddhism and Modern Psychology
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Princeton University via Coursera
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Buy</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item md={4} xs={10}>
                <Card className="ml-3" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="224"
                        image="/assets/images/demo4.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Buddhism and Modern Psychology
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Princeton University via Coursera
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Buy</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <Grid className="mt-5 bg-white" item xs={12}>
            <h2 className="text-center mt-4">About Us</h2>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <img className='img-fluid' src="/assets/images/demo2.jpg" alt='Login V2' />
                </Col>
                <Col className='d-lg-flex align-items-center p-5' lg='8' sm='12'>
                <div className='w-100 px-5'>
                    <h2>Business Acharaya Consultancy</h2>
                    <p>What is Spirituality? - Over the years many definitions have been given to it. One such definition is connecting one's soul with everything positive around us. It is the attempt to be at peace with oneself. It is the art of letting go. The yearning for this spiritual experience has led to demand for spirituality courses.
View more- Explore Online Courses and Certifications</p>
                </div>
                </Col>
            </Row>
        </Grid>

    </Grid>
  )
}

export default Landing
