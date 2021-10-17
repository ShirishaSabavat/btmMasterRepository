// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import {Grid} from '@mui/material'
import NavBar from '../../views/Landing/components/navbar'
import Footer from '../../views/Landing/components/footer'
import { fetchAllLandingCms } from '../../redux/actions/cms'
import { useDispatch, useSelector } from 'react-redux'

const BlankLayout = ({ children, ...rest }) => {

  const dispatch = useDispatch()

  const landingCms = useSelector(state => state.cms.landingCms)

  // ** Hooks
  const [skin, setSkin] = useSkin()

  // ** States
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    dispatch(fetchAllLandingCms())
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='blank-page'>
      <div className='app-content content'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <NavBar landingCms={landingCms} />
              {children}
            <Footer landingCms={landingCms} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlankLayout
