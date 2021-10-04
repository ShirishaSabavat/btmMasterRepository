import { useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import '@styles/base/pages/page-auth.scss'
import {Grid, Stack, Button, Typography, Box} from '@mui/material'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
import {Search as SearchIcon, Menu as MenuIcon} from 'react-feather'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Home, Book, Shop2, PhotoAlbum, Phone, Login, Dashboard } from '@mui/icons-material'

const NavBar = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const [drawer, toggleDrawer] = useState(false)

    const userData = useSelector(state => state.auth.userData)

  return (
    <Grid className="bg-white" item xs={12}>
        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Stack spacing={2} direction="row">
                <Button variant="text"><Link to="/home">Home</Link></Button>
                <Button variant="text"><Link to="/all-courses">Courses</Link></Button>
                <Button variant="text"><Link to="/about-us">About Us</Link></Button>
                <Button variant="text"><Link to="/gallery">Gallery</Link></Button>
                <Button variant="text"><Link to="/contact-us">Contact Us</Link></Button>
                {!localStorage.getItem('userData') && (
                    <Button variant="text"><Link to="/login">Login</Link></Button>
                )}
                {localStorage.getItem('userData') && (
                    <Button variant="text"><Link to="/dashboard">Dashboard</Link></Button>
                )}
            </Stack>
        </Box> */}

        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                >
                    Business Acharaya
                </Typography>
                {/* <SearchIcon /> */}
                <Button onClick={() => history.push('/home')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Home</Button>
                <Button onClick={() => history.push('/all-courses')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Cources</Button>
                <Button onClick={() => history.push('/about-us')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">About Us</Button>
                <Button onClick={() => history.push('/contact-us')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Contact Us</Button>
                <Button onClick={() => history.push('/gallery')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Gallery</Button>
                {localStorage.getItem('userData') && (
                    <Button className="ml-3" onClick={() => history.push('/dashboard')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Dashboard <Dashboard /></Button>
                )}
                {!localStorage.getItem('userData') && (
                    <Button className="ml-3" onClick={() => history.push('/login')} sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Login <Login /></Button>
                )}
            </Toolbar>
        </AppBar>

        <Drawer
            anchor={'left'}
            open={drawer}
            onClose={() => toggleDrawer(false)}
            >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
                >
                <List>
                    <ListItem onClick={() => history.push('/home')} button>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <ListItem onClick={() => history.push('/all-courses')} button>
                        <ListItemIcon>
                            <Book />
                        </ListItemIcon>
                        <ListItemText primary={'Cources'} />
                    </ListItem>
                    <ListItem onClick={() => history.push('/all-courses')} button>
                        <ListItemIcon>
                            <Shop2 />
                        </ListItemIcon>
                        <ListItemText primary={'Workshops'} />
                    </ListItem>
                    <ListItem onClick={() => history.push('/gallery')} button>
                        <ListItemIcon>
                            <PhotoAlbum />
                        </ListItemIcon>
                        <ListItemText primary={'Gallery'} />
                    </ListItem>
                    <ListItem onClick={() => history.push('/contact-us')} button>
                        <ListItemIcon>
                            <Phone />
                        </ListItemIcon>
                        <ListItemText primary={'Contact Us'} />
                    </ListItem>
                    
                    <Divider />

                    {localStorage.getItem('userData') && (
                        <ListItem onClick={() => history.push('/dashboard')} button>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    )}
                    {!localStorage.getItem('userData') && (
                        <ListItem onClick={() => history.push('/login')} button>
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItem>
                    )}
                </List>
                </Box>
        </Drawer>
    </Grid>
  )
}

export default NavBar
