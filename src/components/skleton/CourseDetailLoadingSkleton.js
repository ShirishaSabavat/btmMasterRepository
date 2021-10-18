import {Stack, Skeleton, Grid} from '@mui/material'

const CourseDetailLoadingSkleton = (props) => {

    return ( 
        <Grid item container >
            <Grid item md={7} xs={12}>
                <Stack spacing={1} className="mt-4 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={308} />
                    <Skeleton variant="text" width={180} />
                    <Skeleton variant="text" width={80} />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>
            </Grid>

            <Grid item md={4} xs={12}>
                <Stack spacing={1} className="mt-4 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={128} />
                    <Skeleton variant="rectangular" height={25} width={70} style={{margin: 'auto', marginTop: 10}} />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>

                <Stack spacing={1} className="mt-4 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={128} />
                    <Skeleton variant="rectangular" height={25} width={70} style={{margin: 'auto', marginTop: 10}} />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>
            </Grid>
        </Grid>
    )
}

export default CourseDetailLoadingSkleton