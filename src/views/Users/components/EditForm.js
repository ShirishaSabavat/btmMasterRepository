import React, { useRef, useState, useEffect } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, Alert, Button } from 'reactstrap'

import PersonalInfoComponent from "./PersonalInfoComponent"
import PanComponent from "./PanComponent"
import GSTComponent from "./GSTComponent"
import BankAccountComponent from "./BankAccountComponent"
import AadharComponent from "./AadharComponent"
import AddressComponent from "./AddressComponent"
import FinalSubmit from "./FinalSubmit"

import Wizard from '@components/wizard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKycUserData, saveKycData } from "../../../redux/actions/kyc"

const EditForm = ({setShowEdit, userKYCData}) => {
    
  const userID = userKYCData?.kycId?._id
    
  const dispatch = useDispatch()

  const userKYC = useSelector(state => state.kyc.kycData)
  
  const [active, setActive] = useState('1')
  const [stepper, setStepper] = useState(null)
  const [kycFinalData, setKycFinalData] = useState({})

  const ref = useRef(null)

  const onFinalSubmit = () => {

    const fileData = new FormData()
    fileData.append("aadharAttachment", kycFinalData.aadharAttachment)
    fileData.append("aadharNo", kycFinalData.aadharNo)
    fileData.append("accHolderName", kycFinalData.accHolderName)
    fileData.append("accNo", kycFinalData.accNo)
    fileData.append("address", kycFinalData.address)
    fileData.append("addressAttachment", kycFinalData.addressAttachment)
    fileData.append("banchName", kycFinalData.banchName)
    fileData.append("bankStatement", kycFinalData.bankStatement)
    fileData.append("city", kycFinalData.city)
    fileData.append("country", kycFinalData.country)
    fileData.append("dob", kycFinalData.dob)
    fileData.append("email", kycFinalData.email)
    fileData.append("gstType", kycFinalData.gstType)
    fileData.append("ifscCode", kycFinalData.ifscCode)
    fileData.append("legalname", kycFinalData.legalname)
    fileData.append("name", kycFinalData.name)
    fileData.append("panAttachment", kycFinalData.panAttachment)
    fileData.append("panNo", kycFinalData.panNo)
    fileData.append("panname", kycFinalData.panname)
    fileData.append("phone", kycFinalData.phone)
    fileData.append("selectBank", kycFinalData.selectBank)
    fileData.append("state", kycFinalData.state)
    fileData.append("tradename", kycFinalData.tradename)
    fileData.append("zipCode", kycFinalData.zipCode)
    dispatch(saveKycData(userID, fileData))
  }

  const setKycFormData = (values) => {
    setKycFinalData((currentState) => ({...currentState, ...values}))
  }

  const steps = [
    {
      id: 'personal-details',
      title: 'Personal Information',
      subtitle: 'Enter Your Personal Informations.',
      content: <PersonalInfoComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'pan-info',
      title: 'PAN Info',
      subtitle: 'Add Your PAN Info',
      content: <PanComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'gst-address',
      title: 'GST Details',
      subtitle: 'Add GST details',
      content: <GSTComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'bank-account',
      title: 'Bank Details',
      subtitle: 'Enter Your Banking Info',
      content: <BankAccountComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'aadhar',
      title: 'Aadhar Details',
      subtitle: 'Add Your Aadhar Details',
      content: <AadharComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'address',
      title: 'Address Details',
      subtitle: 'Add Your Address Details',
      content: <AddressComponent setKycFormData={setKycFormData} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    },
    {
      id: 'final',
      title: 'Final',
      subtitle: 'Confirm submit Kyc',
      content: <FinalSubmit onFinalSubmit={onFinalSubmit} stepper={stepper} type='wizard-horizontal' userKYC={userKYC} setShowEdit={setShowEdit} />
    }
  ]

  useEffect(() => {
    dispatch(fetchKycUserData(userID))
  }, [userID])

  return (
    <>
        <div className='horizontal-wizard'>
        <Wizard 
          type='vertical'
          instance={el => setStepper(el)} 
          ref={ref} 
          steps={steps} userKYCData={userKYCData} />
      </div>
    </>
  )
}
export default EditForm