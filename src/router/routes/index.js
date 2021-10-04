import AuthRoute from './AuthRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"
import CMSRoutes from './CMSRoutes'
import Videos from "./Videos"
import LandingRoute from './LandingRoutes'
import GalleryRoute from './GalleryRoute'
import MyCustomerRoute from "./MyCustomerRoute"
import MyCommissionRoute from "./MyCommissionRoute"
import MyMessagesRoute from "./MyMessagesRoute"
import MyPayoutsRoute from "./MyPayoutsRoute"
import MyReportsRoute from "./MyReportsRoute"

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...AuthRoute,
    ...SettingsRoute,
    ...CourseRoutes,
    ...CMSRoutes,
    ...Videos,
    ...LandingRoute,
    ...GalleryRoute,
    ...MyCustomerRoute,
    ...MyCommissionRoute,
    ...MyMessagesRoute,
    ...MyPayoutsRoute,
    ...MyReportsRoute
    ]

export { DefaultRoute, TemplateTitle, Routes }

