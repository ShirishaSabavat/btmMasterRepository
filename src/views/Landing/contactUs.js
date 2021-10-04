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
import NavBar from './components/navbar'
import Footer from './components/footer'

const ContactUs = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

  return (
    <Grid container spacing={2}>
        <NavBar />

        <Grid className="bg-white" item xs={12}>
            <h2 className="text-center">About Us</h2>
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

        <Footer />

    </Grid>
  )
}

export default ContactUs
