import {Stack, Skeleton, Grid} from '@mui/material'

const CoursesLoadingSkleton = (props) => {
    const nos = props.nos ?? 1

    return ( 
        <Grid item container >
            {Array(nos).fill().map(i => (
                <Grid item md={4} xs={12}>
                    <Stack spacing={1} className="pl-3 mb-2">
                        <Skeleton variant="rectangular" width={290} height={188} />
                        <Skeleton variant="text" width={180} />
                        <Skeleton variant="text" width={80} />
                        <Skeleton variant="circular" width={40} height={40} />
                    </Stack>
                </Grid>
            ))}
        </Grid>
    )
}

export default CoursesLoadingSkleton