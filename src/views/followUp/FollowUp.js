import React from "react"
import { Card } from "reactstrap"
import SelectCriteria from './SelectCriteria'
import AdmissionEnquiry from './AdmissionEnquiry'

const FollowUp = () => {
    return <Card>
        <SelectCriteria />
        <hr className="m-0" />
        <AdmissionEnquiry />
    </Card>
}

export default FollowUp