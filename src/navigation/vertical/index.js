import { Mail, Home, Settings, ChevronRight, Video } from 'react-feather'

const Navigation = [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: "settings",
    title: "Settings",
    type: "collapse",
    icon: <Settings size={20} />,
    children: [
      {
        id: "general_settings",
        title: "General Settings",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/general-settings"
      }
    ]
  },
  {
    id: "courses",
    title: "Courses",
    type: "collapse",
    icon: <Video size={20} />,
    children: [
      {
        id: "add_course",
        title: "Add Course",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/add-course"
      },
      {
        id: "schedule",
        title: "Schedule",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/schedule"
      },
      {
        id: "courses",
        title: "Courses",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/courses"
      }
    ]
  },
]

export default  Navigation