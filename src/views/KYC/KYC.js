import React, { useRef, useState } from 'react'

import { AlertCircle, CheckCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, Alert } from 'reactstrap'

import PersonalInfoComponent from "./Components/PersonalInfoComponent"
import PanComponent from "./Components/PanComponent"
import GSTComponent from "./Components/GSTComponent"
import BankAccountComponent from "./Components/BankAccountComponent"
import AadharComponent from "./Components/AadharComponent"
import AddressComponent from "./Components/AddressComponent"
import FinalSubmit from "./Components/FinalSubmit"

import Wizard from '@components/wizard'
import { useDispatch, useSelector } from 'react-redux'
import { saveKyc } from '../../redux/actions/user'

const KYC = () => {

  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth.userData)
  
  const [active, setActive] = useState('1')
  const [stepper, setStepper] = useState(null)
  const [kycFinalData, setKycFinalData] = useState({})

  const ref = useRef(null)

  const onFinalSubmit = () => {
    console.log(kycFinalData)
    const formData = new FormData()
    Object.keys(kycFinalData).map(i => {
      formData.append(i, kycFinalData[i])
    })
    dispatch(saveKyc(formData))
  }

  const setKycFormData = (values) => {
    console.log({values})
    setKycFinalData((currentState) => ({...currentState, ...values}))
  }

  const steps = [
    {
      id: 'personal-details',
      title: 'Personal Information',
      subtitle: 'Enter Your Personal Informations.',
      content: <PersonalInfoComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'pan-info',
      title: 'PAN Info',
      subtitle: 'Add Your PAN Info',
      content: <PanComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'gst-address',
      title: 'GST Details',
      subtitle: 'Add GST details',
      content: <GSTComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'bank-account',
      title: 'Bank Details',
      subtitle: 'Enter Your Banking Info',
      content: <BankAccountComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'aadhar',
      title: 'Aadhar Details',
      subtitle: 'Add Your Aadhar Details',
      content: <AadharComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'address',
      title: 'Address Details',
      subtitle: 'Add Your Address Details',
      content: <AddressComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'final',
      title: 'Final',
      subtitle: 'Confirm submit Kyc',
      content: <FinalSubmit onFinalSubmit={onFinalSubmit} stepper={stepper} type='wizard-horizontal' />
    }
  ]

  return (
    <Card>
      <CardHeader><CardTitle>KYC Settings</CardTitle></CardHeader>
      <hr className="m-0" />

      {userData.user.kycStatus === 'PROCESSING' && (
      <div className='p-3'>
      <Alert color='danger' isOpen={true}>
        <div className='alert-body'>
          <AlertCircle size={15} />{' '}
          <span className='ml-1'>
            Your KYC is under <strong>Verification</strong> you will be notified when it is processed.
          </span>
        </div>
      </Alert>
      </div>
      )}

      {userData.user.kycStatus === 'VERIFIED' && (
      <div className='p-2'>
      <Alert color='success' isOpen={true}>
        <div className='alert-body'>
          <CheckCircle size={15} />{' '}
          <span className='ml-1'>
            Your KYC has been <strong>Verified</strong> now you can share your referral link and earn commisions on each purchase by your referral link.
          </span>
        </div>
      </Alert>
      </div>
      )}

      {userData.user.kycStatus === 'PENDING' && (
      <div className='horizontal-wizard'>
        <Wizard 
          type='vertical'
          instance={el => setStepper(el)} 
          ref={ref} 
          steps={steps} />
      </div>
      )}
      
    </Card>
  )
}
export default KYC
