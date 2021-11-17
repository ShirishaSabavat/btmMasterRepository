import React from 'react'
import { Trash, Clock } from 'react-feather'
import { Media, Button } from 'reactstrap'
import Timeline from '@components/timeline'

import {useDispatch} from 'react-redux'
import { DeleteFollowUpsById } from '../../../redux/actions/followup/index'

export const TimeLineData = ({followUpId, followUpData}) => {
  const dispatch = useDispatch()
  const iconsData = followUpData?.followups?.map(values => ({
      title: values.response,
      customContent: (
        <Media>
          <Media body>
            <span className='mr-1'><strong>Follow Up Date:</strong> {new Date(values.followUpDate).toDateString()}</span>
            <span><strong>Next Follow Up Date:</strong> {new Date(values.nextFollowUpDate).toDateString()}</span>
          </Media>
        </Media>),
      content: values.note,
      icon: <Clock size={14} />,
      meta: (<Button
        className="btn-icon rounded-circle"
        color="flat-danger"
        onClick={() => dispatch(DeleteFollowUpsById(followUpId, values._id))}
        >
            <Trash size={15} />
        </Button>)
  }))
  
  return <Timeline data={iconsData} />
}