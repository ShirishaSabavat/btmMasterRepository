import {Stack, Skeleton, Grid} from '@mui/material'

const ProfileLoadingSkleton = (props) => {

    return ( 
        <Grid item container >
            <Grid item md={12} xs={12}>
                <Stack spacing={1} className="mt-2 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={4} />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>
            </Grid>

            <Grid item md={4} xs={6}>
                <Stack spacing={1} className="mt-2 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={234} />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>
            </Grid>

            <Grid item md={8} xs={12}>
                <Stack spacing={1} className="mt-2 pl-3 mb-2">
                    <Skeleton variant="rectangular" height={234} />
                    {/* <Skeleton variant="rectangular" height={25} width={70} style={{margin: 'auto', marginTop: 10}} /> */}
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ProfileLoadingSkleton