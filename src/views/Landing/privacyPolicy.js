import { Row, Col } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid} from '@mui/material'

const PrivacyPolicy = () => {

  return (
    <Grid container spacing={4}>
        <Grid className="bg-white"  item xs={12} className="mt-2">
            <Row>
                <Col sm="12" md="8">
                    <Row className=''>
                        <Col className='d-lg-flex flex-column' lg='12' sm='12'>
                        <h3 className="px-5 my-2" style={{fontWeight: 'bold', fontSize: 38}}>Privacy Policy</h3>
                        <div className='w-100 px-5'>
                            <h2>Business Aacharaya</h2>
                            <p>...</p>
                        </div>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Grid>

    </Grid>
  )
}

export default PrivacyPolicy
