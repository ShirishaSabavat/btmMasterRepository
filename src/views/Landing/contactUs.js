import { useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography, Chip} from '@mui/material'
import { useSelector } from 'react-redux'
import ServerApi from '../../utility/ServerApi'

const ContactUs = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

  return (
    <Grid container spacing={2}>

        <Grid className="bg-white" item xs={12}>
            <h3 className="text-center my-2" style={{fontWeight: 'bold', fontSize: 38}}>Contact Us</h3>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <img className='img-fluid' src="/assets/images/demo2.jpg" alt='Login V2' />
                </Col>
                <Col className='d-lg-flex align-items-center p-5' lg='8' sm='12'>
                <div className='w-100 px-5'>
                    <h2>Business Acharaya</h2>
                    <p>What is Spirituality? - Over the years many definitions have been given to it. One such definition is connecting one's soul with everything positive around us. It is the attempt to be at peace with oneself. It is the art of letting go. The yearning for this spiritual experience has led to demand for spirituality courses.
View more- Explore Online Courses and Certifications</p>
                </div>
                </Col>
            </Row>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <h2 className="text-center">Locate Us</h2>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center' lg='12' sm='12'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243480.07874631535!2d78.43127257375757!3d17.537265291617135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb84ad48255d29%3A0x410841a999b3433!2sSecunderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1634330966804!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy"></iframe>
                </Col>
            </Row>
        </Grid>
    </Grid>
  )
}

export default ContactUs
