// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

// ** Vertical Menu Items Array
import navigation from '@src/navigation/vertical'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'

const Sidebar = props => {
  // ** Props
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin } = props

  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    if (menuCollapsed) {
      setMenuHover(true)
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  // update side nav based on permissions
  const [newNavigation, setNewNavigation] = useState(navigation)
  const userData = useSelector(state => state.auth.userData)

  useEffect(() => {
    if (userData.access_token) {
      const n = navigation.filter(i => i.permissions.includes(userData.user.role))
      if (userData.user.role !== 'USER' && userData.user.role !== 'ADMIN' && userData.user.role !== 'BAC_USER') {
        // console.log(userData.permissions.filter(i => Object.keys(i)[0] === 'videos')[0].videos.view)
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'videos')[0].videos.view === true) {
          n.push(navigation.filter(i => i.id === 'videos')[0])
        }
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'cources')[0].cources.view === true) {
          n.push(navigation.filter(i => i.id === 'courses')[0])
        }
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'workshops')[0].workshops.view === true) {
          n.push(navigation.filter(i => i.id === 'courseSchedule')[0])
        }
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'sales')[0].sales.view === true) {
          n.push(navigation.filter(i => i.id === 'sales')[0])
        }
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'cms')[0].cms.view === true) {
          n.push(navigation.filter(i => i.id === 'cms')[0])
        }
        if (userData.permissions.filter(i => Object.keys(i)[0] === 'commisions')[0].commisions.view === true) {
          n.push(navigation.filter(i => i.id === 'mycommission')[0])
        }

      }

      setNewNavigation(n)
    }
  }, [userData])

  return (
    <Fragment>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu(props)
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              <ul className='navigation navigation-main'>
                <VerticalNavMenuItems
                  items={newNavigation}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  groupOpen={groupOpen}
                  setGroupOpen={setGroupOpen}
                  routerProps={routerProps}
                  menuCollapsed={menuCollapsed}
                  menuHover={menuHover}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
