import {useEffect} from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'react-feather'
import '@styles/base/pages/page-auth.scss'
import {Grid, ButtonGroup, Divider, IconButton} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { getLandingPageData } from '../../../redux/actions/landingPage/index'

const Footer = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)
    const landingPageData = useSelector(state => state.landingPage.landingPage[0])

    useEffect(() => {
        dispatch(getLandingPageData())
    }, [])

  return (
    <>
    <Grid style={{backgroundColor: '#161616', borderBottom: '1px solid #292929'}} container>
        <Grid item xs={12} md={4}>
            <div className="p-4">
                <h3 style={{fontWeight: 'bold'}} className="text-white mb-2">About</h3>
                {props.landingCms.filter(i => i.type === 'about').length > 0 && (
                <h5 className="mb-2" style={{fontSize: 16, fontWeight: 300, color: '#a5a5a5'}}>
                    {parse(props.landingCms.filter(i => i.type === 'about')[0]?.content)}
                </h5>  
                )}

                <ButtonGroup >
                    <IconButton onClick={() => window.open(JSON.parse(props.landingCms.filter(i => i.type === 'social-links')[0]?.content).facebook, "_blank")} color="info" component="span">
                        <Facebook />
                    </IconButton>
                    <IconButton onClick={() => window.open(JSON.parse(props.landingCms.filter(i => i.type === 'social-links')[0]?.content).instagram, "_blank")} color="warning" component="span">
                        <Instagram />
                    </IconButton>
                    <IconButton onClick={() => window.open(JSON.parse(props.landingCms.filter(i => i.type === 'social-links')[0]?.content).youtube, "_blank")} color="error" component="span">
                        <Youtube />
                    </IconButton>

                </ButtonGroup>
            </div>
        </Grid>
        <Grid item xs={12} md={4}>
            <div className="p-4">
                <h3 style={{fontWeight: 'bold'}} className="text-white mb-2">Explore Business Aacharya</h3>
                <Grid style={{backgroundColor: '#161616'}} container>
                    <Grid item xs={6} md={6}>
                        <ul className="p-0 mb-2" style={{listStyleType: 'none'}}>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/about-us"> About </Link> <br />
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/all-courses"> Courses </Link>
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/bac-courses"> BAC Courses </Link>
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/gallery"> Gallery </Link>
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/contact-us"> Contact Us </Link>
                            </li>
                            <li style={{marginBottom: 5}}>
                                {!localStorage.getItem('userData') && (
                                    <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/login"> Login </Link>
                                )}
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ul className="p-0 mb-2" style={{listStyleType: 'none'}}>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/privacy-policy"> Privacy Policy </Link> <br />
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/terms-and-conditions"> Terms And Conditions </Link>
                            </li>
                            <li style={{marginBottom: 5}}>
                                <Link className="hover-highlight" style={{color: '#b3bbc6'}} to="/refund-policy"> Refund Policy </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        <Grid item xs={12} md={3}>
            <div className="p-4">
                <h3 style={{fontWeight: 'bold'}} className="text-white mb-2">Enquiry</h3>
                <h4 style={{color: '#a5a5a5'}} ><Phone size={20} style={{color: '#76a4eb', marginRight: 5}} /> Phone</h4>
                <p style={{fontWeight: 'bold'}} className="ml-2 text-light"><a className="hover-highlight" style={{color: "white"}} href={`tel:${landingPageData?.phoneNo}`}>{landingPageData?.phoneNo}</a></p>
                
                <h4 style={{color: '#a5a5a5'}}><Mail size={20} style={{color: '#76a4eb', marginRight: 5}} /> Email</h4>
                <p style={{fontWeight: 'bold'}} className="ml-2 text-light"><a className="hover-highlight" style={{color: "white"}} href={`mailto:${landingPageData?.mailId}`}>{landingPageData?.mailId}</a></p>
                
                <h4 style={{color: '#a5a5a5'}} ><MapPin size={20} style={{color: '#76a4eb', marginRight: 5}} /> Address</h4>
                <p style={{fontWeight: 'bold'}} className="ml-2 text-light"><a target="_blank" className="hover-highlight" style={{color: "white"}} href="https://goo.gl/maps/LuusffEaxx5aH1bF8">{landingPageData?.address}</a></p>
            </div>
        </Grid>
    </Grid>

    <Grid style={{backgroundColor: '#161616'}} className="p-3" item xs={12} md={12}>
        <div style={{    maxWidth: 960, margin: 'auto'}}>
            <div className="text-center mb-2">
                <img src="/assets/images/logo-fav.png" className="img-fluid" style={{width: 114}} />
            </div>

            <h5 className="text-center m-0" style={{ color: '#a5a5a5'}}>{landingPageData?.footerText}</h5>
        </div>
    </Grid>

    <Grid style={{backgroundColor: '#252525'}} className="p-2" item xs={12} md={12}>
        <h6 className="text-center m-0" style={{ color: '#a5a5a5', fontSize: 11}}> Developed by <a href="https://amoghnya.com" target="_blank">amoghnya techsolutions pvt.ltd </a> ???? <a href="https://www.mindsoftitsolution.com/" target="_blank">mindsoft it solutions</a></h6>
    </Grid>
    </>
  )
}

export default Footer
