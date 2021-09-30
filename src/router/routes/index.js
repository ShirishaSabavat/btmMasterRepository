import HomeRoute from './HomeRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"
import CMSRoutes from './CMSRoutes'
import Videos from "./Videos"
import LandingRoute from './LandingRoutes'

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...HomeRoute,
    ...SettingsRoute,
    ...CourseRoutes,
    ...CMSRoutes,
    ...Videos,
    ...LandingRoute
    ]

export { DefaultRoute, TemplateTitle, Routes }

