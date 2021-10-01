import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import { useSelector } from 'react-redux'

const Landing = () => {
  const [skin, setSkin] = useSkin()

  const userData = useSelector(state => state.auth.userData)

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

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
