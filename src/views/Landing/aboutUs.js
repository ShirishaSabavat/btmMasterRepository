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

const Landing = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

  return (
    <Grid container spacing={2}>
        <NavBar />

        {/* <Grid className="bg-white" item xs={12}>
            <h2 className="text-center">About Us</h2>
        </Grid> */}

        <Grid className="bg-white pb-5" item xs={12} md={8}>
            <div className='w-100 px-4 mt-4'>
                <h2 style={{fontWeight: 'bold', fontSize: 48}}>About Us <br /> </h2>
                <p className="text-justify">Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
            </div>
        </Grid>
        <Grid className="bg-white pb-5" item xs={12} md={4}>
            <img className='img-fluid' src="/assets/images/br2.webp" alt='Login V2' />
        </Grid>

        <Grid style={{backgroundColor: '#f1f1f3'}} className="pb-5" item xs={12} md={4}>
            <img className='img-fluid' src="/assets/images/mission.png" alt='Login V2' />
        </Grid>

        <Grid style={{backgroundColor: '#f1f1f3'}} className="pb-5" item xs={12} md={8}>
            <div className='w-100 px-4 mt-4'>
                <h2 style={{fontWeight: 'bold', fontSize: 48}}>Mission <br /> </h2>
                <p className="text-justify">Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
            </div>
        </Grid>

        <Grid style={{backgroundColor: '#00a6c0'}} className="pb-5" item xs={12} md={8}>
            <div className='w-100 px-4 mt-4'>
                <h2 className="text-white" style={{fontWeight: 'bold', fontSize: 48}}>Vision <br /> </h2>
                <p className="text-white text-justify">Br Shafi is Master motivator, life skill trainer and international orator. He has given many public talks life changing motivational seminars, life skill training program and personality development workshops for School, Colleges, NGOs, Corporate companies, Doctors and Hospital staff and police officials. Is an Author, Educator, Business Consultant and a much sought-after speaker. </p>
            </div>
        </Grid>
        <Grid style={{backgroundColor: '#00a6c0'}} className="pb-5" item xs={12} md={4}>
            <img className='img-fluid' src="/assets/images/vision2.jpg" alt='Login V2' />
        </Grid>

        <Footer />

    </Grid>
  )
}

export default Landing
