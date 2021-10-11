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

const BacCources = () => {
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
        <NavBar />

        <Grid item xs={12}>
            <h2 className="text-center mb-2">BAC Cources</h2>
        </Grid>

        {courses.length === 0 && (
            <Grid className="bg-white" item container spacing={2}>
                <Empty title="No courses are available !" />
            </Grid>
        )}

        <Grid className="bg-white" item container spacing={2}>
            {courses.filter((i) => i.type === 'Bac').map((item) => (
                <CourseCard key={item._id} data={item} />
            ))}
        </Grid>

        <Footer />

    </Grid>
  )
}

export default BacCources
