import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography, Chip} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import NavBar from './components/navbar'
import CourseCard from './components/courseCard'
import {fetchAllCourses} from '../../redux/actions/courses'
import { useEffect } from 'react'
import Footer from './components/footer'
import Empty from '../../components/loading/Empty'

const Landing = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [skin, setSkin] = useSkin()

    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])

    const userData = useSelector(state => state.auth.userData)
    const courses = useSelector(state => state.courses.courses)

  return (
    <Grid className="bg-white" container spacing={2}>

        <Grid item xs={12}>
            <h1 style={{fontWeight: 'bold'}} className="text-center my-2">Cources</h1>
        </Grid>

        <Grid className="bg-white" item container spacing={2}>
            {courses.filter((i) => i.type === 'Regular').map((item) => (
                <CourseCard key={item._id} data={item} />
            ))}
        </Grid>

        {courses.length === 0 && (
            <Grid xs={12} className="" item>
                <div className="p-5">
                    <Empty title="No courses are available !" />
                </div> 
            </Grid>
        )}

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

    </Grid>
  )
}

export default Landing
