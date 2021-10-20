import React, {useState} from "react"
import {Media, UncontrolledCollapse, ListGroup, ListGroupItem, Card, Alert, CardText, Badge, CardBody, Button} from "reactstrap"
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'
import pdf from '@src/assets/images/icons/file-icons/pdf.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import interview from '@src/assets/images/portrait/small/avatar-s-20.jpg'
import user1 from '@src/assets/images/portrait/small/avatar-s-25.jpg'
import user2 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import user3 from '@src/assets/images/portrait/small/avatar-s-10.jpg'
import Timeline from '@components/timeline'
import { Share2, Hexagon, MessageSquare, Settings, PenTool, User, FileText, MapPin, AlertCircle, CheckCircle } from 'react-feather'
import Select from "react-select"
import { useDispatch } from 'react-redux'
import { verifyUserKyc } from '../../../redux/actions/user'
import { updateUserKyc } from "../../../redux/actions/auth"

import EditForm from "./EditForm"

const UserKyc  = ({userData}) => {

    const dispatch = useDispatch()

    const [kycStatus, setKycStatus] = useState('')
    const [showEdit, setShowEdit] = useState(false)

    const updateUserKyc = () => {
        dispatch(verifyUserKyc({
            kycId: userData.kycId?._id, 
            userId: userData._id, 
            status: kycStatus
        }))
    }

    const iconsData = [
        {
          title: 'Personal Informations',
          content: '',
          meta: '',
          icon: <User size={14} />,
          color: 'primary',
          customContent: (
            <>
              <Button size='sm' color='primary' id='pi' outline>
                Show
              </Button>
              <UncontrolledCollapse toggler='#pi'>
                <ListGroup className='mt-1' flush>
                  <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                    <p>Name : <span className='font-weight-bold'>{userData.kycId?.name}</span></p>
                    <p>Email : <span className='font-weight-bold'>{userData.kycId?.email}</span></p>
                    <p>Phone : <span className='font-weight-bold'>{userData.kycId?.phone}</span></p>
                  </ListGroupItem>
                </ListGroup>
              </UncontrolledCollapse>
            </>
          )
        },
        {
            title: 'PAN Details',
            content: '',
            meta: '',
            icon: <FileText size={14} />,
            color: 'info',
            customContent: (
              <>
                <Button size='sm' color='primary' id='pd' outline>
                  Show
                </Button>
                <UncontrolledCollapse toggler='#pd'>
                  <ListGroup className='mt-1' flush>
                    <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                        <p>PAN No : <span className='font-weight-bold'>{userData.kycId?.panNo}</span></p>
                        <p>Name as per PAN : <span className='font-weight-bold'>{userData.kycId?.panname}</span></p>
                        <p>DOB as per PAN : <span className='font-weight-bold'>{userData.kycId?.dob}</span></p>
                    </ListGroupItem>
                  </ListGroup>
                </UncontrolledCollapse>
              </>
            )
        },
        {
            title: 'Bank Details',
            content: '',
            meta: '',
            icon: <Hexagon size={14} />,
            color: 'success',
            customContent: (
              <>
                <Button size='sm' color='primary' id='bd' outline>
                  Show
                </Button>
                <UncontrolledCollapse toggler='#bd'>
                  <ListGroup className='mt-1' flush>
                    <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                        <p>Bank Name : <span className='font-weight-bold'>{userData.kycId?.selectBank}</span></p>
                        <p>Bank Branch : <span className='font-weight-bold'>{userData.kycId?.banchName}</span></p>
                        <p>Acc No : <span className='font-weight-bold'>{userData.kycId?.accNo}</span></p>
                        <p>Acc Holder Name : <span className='font-weight-bold'>{userData.kycId?.accHolderName}</span></p>
                        <p>IFSC : <span className='font-weight-bold'>{userData.kycId?.ifscCode}</span></p>
                    </ListGroupItem>
                  </ListGroup>
                </UncontrolledCollapse>
              </>
            )
        },
        {
            title: 'GST Details',
            content: '',
            meta: '',
            icon: <FileText size={14} />,
            color: 'warning',
            customContent: (
              <>
                <Button size='sm' color='primary' id='gd' outline>
                  Show
                </Button>
                <UncontrolledCollapse toggler='#gd'>
                  <ListGroup className='mt-1' flush>
                    <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                        <p>GST Type : <span className='font-weight-bold'>{userData.kycId?.gstType}</span></p>
                        <p>Legal Name : <span className='font-weight-bold'>{userData.kycId?.legalname}</span></p>
                        <p>Trade Name : <span className='font-weight-bold'>{userData.kycId?.tradename}</span></p>
                    </ListGroupItem>
                  </ListGroup>
                </UncontrolledCollapse>
              </>
            )
        },
        {
            title: 'Aadhar Details',
            content: '',
            meta: '',
            icon: <FileText size={14} />,
            color: 'danger',
            customContent: (
              <>
                <Button size='sm' color='primary' id='aad' outline>
                  Show
                </Button>
                <UncontrolledCollapse toggler='#aad'>
                  <ListGroup className='mt-1' flush>
                    <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                        <p>Aadhar No : <span className='font-weight-bold'>{userData.kycId?.aadharNo}</span></p>
                    </ListGroupItem>
                  </ListGroup>
                </UncontrolledCollapse>
              </>
            )
        },
        {
            title: 'Address Details',
            content: '',
            meta: '',
            icon: <MapPin size={14} />,
            color: 'primary',
            customContent: (
              <>
                <Button size='sm' color='primary' id='ad' outline>
                  Show
                </Button>
                <UncontrolledCollapse toggler='#ad'>
                  <ListGroup className='mt-1' flush>
                    <ListGroupItem className='list-group-item justify-content-between flex-wrap'>
                        <p>Address : <span className='font-weight-bold'>{userData.kycId?.address}</span></p>
                        <p>County : <span className='font-weight-bold'>{userData.kycId?.country}</span></p>
                        <p>State : <span className='font-weight-bold'>{userData.kycId?.state}</span></p>
                        <p>City : <span className='font-weight-bold'>{userData.kycId?.city}</span></p>
                        <p>Pin Code : <span className='font-weight-bold'>{userData.kycId?.zipCode}</span></p>
                    </ListGroupItem>
                  </ListGroup>
                </UncontrolledCollapse>
              </>
            )
        },
        {
            title: 'Action',
            content: '',
            meta: '',
            icon: <Settings size={14} />,
            color: 'success',
            customContent: (
              <>
                <div className="col-4 mb-2 p-0">
                    <Select
                        onChange={(value) => setKycStatus(value.value)}
                        options={[
                            {label: "Approve", value: "VERIFIED"},
                            {label: "Reject", value: "PENDING"}
                        ]}
                    />
                </div>
                <div className="d-flex justify-content-end">
                  <Button className="mr-1" onClick={() => updateUserKyc()} size='sm' color='primary' id='reportToggler2'>
                    Save
                  </Button>
                  <Button onClick={() => setShowEdit(true)} size='sm' color='success' id='reportToggler3'>
                    Edit
                  </Button>
                </div>
              </>
            )
        }
      ]
      

    return <div className="">
        <Card className='card-app-design'>
            <CardBody>
                {userData.kycStatus === 'PENDING' && (
                    <div className='p-1'>
                    <Alert color='danger' isOpen={true}>
                        <div className='alert-body'>
                        <AlertCircle size={15} />{' '}
                        <span className='ml-1'>
                            KYC is <strong>NOT Submitted</strong> by the user.
                        </span>
                        </div>
                    </Alert>
                    </div>
                )}

                {userData.kycStatus === 'PROCESSING' && (
                    <div className='p-1'>
                    <Alert color='warning' isOpen={true}>
                        <div className='alert-body'>
                        <AlertCircle size={15} />{' '}
                        <span className='ml-1'>
                            KYC has been <strong>submitted</strong> by the user.
                        </span>
                        </div>
                    </Alert>
                    </div>
                )}

                {userData.kycStatus === 'VERIFIED' && (
                    <div className='p-1'>
                    <Alert color='success' isOpen={true}>
                        <div className='alert-body'>
                        <CheckCircle size={15} />{' '}
                        <span className='ml-1'>
                            KYC has been <strong>Verified</strong>
                        </span>
                        </div>
                    </Alert>
                    </div>
                )}

                {showEdit ? <EditForm setShowEdit={setShowEdit} />  : <Timeline data={iconsData} />}
            </CardBody>
        </Card> 

    </div>

}

export default UserKyc