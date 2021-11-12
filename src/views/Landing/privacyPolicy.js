import { Row, Col } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid} from '@mui/material'
import { useSelector } from 'react-redux'

const PrivacyPolicy = () => {

    const landingCms = useSelector(state => state.cms.landingCms)
    
    return (
        <Grid container>
            <Grid className="bg-white" item xs={12} className="mt-2">
                <div style={{padding: 49,  justifyContent: 'center'}} dangerouslySetInnerHTML={{__html: landingCms.filter(i => i.type === 'PRIVACY_POLICY')[0].content}} />
            </Grid>
        </Grid>
    )
}

export default PrivacyPolicy
