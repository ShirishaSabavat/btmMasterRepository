import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Send } from 'react-feather'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Card, Avatar, CardContent, CardMedia, Typography, Chip} from '@mui/material'
import {BASE_URL} from '../../../utility/serverSettings'

const courseCard = (props) => {

    const history = useHistory()

  return (
    <Grid item md={4} xs={12}>
        <Card onClick={() => history.push(`course/${props.data._id}`)} className="ml-3 mb-3 pointer" sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="224"
                image={`${BASE_URL}uploads/${props.data.image}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {props.data.shortDescription}
                </Typography>

                <Stack direction="row" spacing={2}>
                    {props.data.faculty && (
                        <><Avatar style={{width: 24, height: 24}} alt="" src="/assets/images/deafault-user.jpg" />
                        <Typography style={{paddingTop: 3}} variant="body2" color="text.secondary">
                            {props.data.faculty.name}
                        </Typography></>
                    )}
                    <Typography style={{marginLeft: 'auto', marginRight: 12}} variant="h5" color="text.primary">
                        ₹ {props.data.price}
                    </Typography>
                </Stack>

            </CardContent>
            {/* <CardActions>
                <Grid container className="p-1 pt-0" spacing={2} >
                    <Grid item xs={8}>
                        <Chip label={props.data.tags} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button 
                            variant="contained" 
                            style={{borderRadius: 2}}
                            onClick={() => history.push(`course/${props.data._id}`)}
                            // endIcon={<Send />}
                        >View</Button>
                    </Grid>
                </Grid>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    </Grid>
  )
}

export default courseCard
