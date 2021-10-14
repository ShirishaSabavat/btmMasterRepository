import React from 'react'
import Lottie from 'react-lottie'
import { useHistory } from 'react-router'
import * as animationData from '../../assets/lottie/empty-state-illustration.json'
import * as animationData1 from '../../assets/lottie/empty-state.json'
import * as animationData2 from '../../assets/lottie/empty.json'
import * as animationData3 from '../../assets/lottie/sequis-empty-state.json'
import { Button } from '@mui/material'
  
function Empty(props) {
    
    const history = useHistory()

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: 
            props.style === "1" ? animationData1.default : props.style === "2" ? animationData2.default : animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className="text-center" style={{marginTop: 54}}>
            <Lottie 
                options={defaultOptions}
                height={284}
                width={284}
            />
            <h6 style={{width: '100%', textAlign: 'center', marginTop: 14, paddingLeft: 0}}>{props.title || "No data available!"}</h6>
            
            {props.button && (
                <Button className="mt-1" onClick={() => history.push(props.buttonLink)} size="large" variant="contained">{props.buttonText}</Button>
            )}

        </div>
    )
}

export default Empty