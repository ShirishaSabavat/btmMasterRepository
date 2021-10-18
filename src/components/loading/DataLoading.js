import React from 'react'
import Lottie from 'react-lottie'
import { useHistory } from 'react-router'
import * as animationData from '../../assets/lottie/loading-animation.json'
import { Button } from '@mui/material'
  
function DataLoading(props) {
    
    const history = useHistory()

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className="text-center" style={{marginTop: 84}}>
            <Lottie 
                options={defaultOptions}
                height={154}
                width={154}
            />
            <h6 style={{width: '100%', textAlign: 'center', marginTop: 14, paddingLeft: 0}}>{props.title || "Loading Please Wait..."}</h6>            
        </div>
    )
}

export default DataLoading