import { lazy } from 'react'

// ** Merge Routes
const LandingRoute = [
  {
      path: '/home',
      component: lazy(() => import('../../views/Landing')),
      layout: 'BlankLayout',
      meta: {
        publicRoute: true
      }
  },
  {
    path: '/course/:id',
    component: lazy(() => import('../../views/Landing/CourseDetail')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/all-courses',
    component: lazy(() => import('../../views/Landing/cources')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/bac-courses',
    component: lazy(() => import('../../views/Landing/bacCources')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/about-us',
    component: lazy(() => import('../../views/Landing/aboutUs')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/contact-us',
    component: lazy(() => import('../../views/Landing/contactUs')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/gallery',
    component: lazy(() => import('../../views/Landing/gallery')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default LandingRoute