import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Send } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, CardActions, CardContent, CardMedia, Typography, Chip} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ServerApi from '../../utility/ServerApi'
import CourseCard from './components/courseCard'
import {fetchAllCourses} from '../../redux/actions/courses'
import { useEffect } from 'react'
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

        <Grid item xs={12}>
            <h1 style={{fontWeight: 'bold'}} className="text-center my-2">BAC Cources</h1>
        </Grid>

        {courses.filter((i) => i.type === 'Bac').length === 0 && (
            <Grid xs={12} className="" item>
                <div className="p-5">
                    <Empty 
                        style="1" 
                        title="No courses are available !"
                        button={true}
                        buttonLink="/all-courses"
                        buttonText="View Normal Cources"
                    />
                </div> 
            </Grid>
        )}

        <Grid className="bg-white" item container spacing={2}>
            {courses.filter((i) => i.type === 'Bac').map((item) => (
                <CourseCard 
                    key={item._id}
                    data={item}
                />
            ))}
        </Grid>

    </Grid>
  )
}

export default BacCources
