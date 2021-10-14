import { Image, Home, Settings, ChevronRight, Video, Sliders, Youtube, Users, CreditCard, FileText, MessageSquare, Briefcase, CheckCircle, Share2, User, Calendar, BarChart2 } from 'react-feather'
import { getUserData } from '../../utility/Utils'

const Navigation = [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard',
    permissions: ["ADMIN", "BAC_USER", "USER"]
  },
  {
    id: 'user',
    title: 'User',
    icon: <Users size={20} />,
    navLink: '/users',
    permissions: ["ADMIN"]
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <BarChart2 size={20} />,
    navLink: '/sales',
    permissions: ["ADMIN"]
  },
  {
    id: 'mycourses',
    title: 'My Courses',
    icon: <Video size={20} />,
    navLink: '/my-courses',
    permissions: ["USER"]
  },
  {
    id: 'myworkshops',
    title: 'My Workshops',
    icon: <Calendar size={20} />,
    navLink: '/my-workshops',
    permissions: ["USER"]
  },
  {
    id: 'mycustomers',
    title: 'My Customers',
    icon: <Users size={20} />,
    navLink: '/admin/my-customers',
    permissions: ["BAC_USER"]
  },
  {
    id: 'mycommission',
    title: 'My Commission',
    icon: <Briefcase size={20} />,
    navLink: '/admin/my-commission',
    permissions: ["BAC_USER"]
  },
  {
    id: 'mypayouts',
    title: 'My Payouts',
    icon: <CreditCard size={20} />,
    navLink: '/admin/my-payouts',
    permissions: ["BAC_USER"]
  },
  {
    id: 'myreports',
    title: 'My Reports',
    icon: <FileText size={20} />,
    navLink: '/admin/my-reports',
    permissions: ["BAC_USER"]
  },
  {
    id: 'mymessages',
    title: 'My Messages',
    icon: <MessageSquare size={20} />,
    navLink: '/admin/my-messages',
    permissions: ["BAC_USER"]
  },
  {
    id: 'videos',
    title: 'Video Links',
    icon: <Youtube size={20} />,
    navLink: '/videos',
    permissions: ["ADMIN"]
  },
  {
    id: 'courses',
    title: 'Courses',
    icon: <Video size={20} />,
    navLink: '/courses',
    permissions: ["ADMIN"]
  },
  {
    id: 'courseSchedule',
    title: 'Course Schedule',
    icon: <Briefcase size={20} />,
    navLink: '/course-schedule',
    permissions: ["ADMIN"]
  },
  {
    id: 'staff',
    title: 'Staff',
    icon: <Users size={20} />,
    navLink: '/staff',
    permissions: ["ADMIN"]
  },
  {
    id: 'kyc',
    title: 'KYC',
    icon: <CheckCircle size={20} />,
    navLink: '/admin/kyc',
    permissions: ["BAC_USER"]
  },
  {
    id: 'socialMedia',
    title: 'Social Media',
    icon: <Share2 size={20} />,
    navLink: '/admin/social-media',
    permissions: ["ADMIN"]
  },
  {
    id: "cms",
    title: "CMS",
    type: "collapse",
    icon: <Sliders size={20} />,
    permissions: ["ADMIN"],
    children: [
      {
        id: "about",
        title: "About",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/about-settings"
      },
      {
        id: "mission",
        title: "Mission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/mission-settings"
      },
      {
        id: "vission",
        title: "Vission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/vision-settings"
      },
      {
        id: "contact",
        title: "Contact",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/contact-settings"
      },
      {
        id: 'gallery',
        title: 'Gallery',
        icon: <ChevronRight size={15} />,
        navLink: '/admin/gallery',
        permissions: ["ADMIN"]
      }
      // {
      //   id: "gallery",
      //   title: "Gallery",
      //   type: "collapse",
      //   icon: <Sliders size={20} />,
      //   permissions: ["ADMIN"],
      //   children: [
      //     {
      //       id: "imagespage",
      //       title: "Gallery Images Settings",
      //       type: "item",
      //       icon: <ChevronRight size={15} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/gallery-page-images-settings"
      //     },
      //     {
      //       id: "videospage",
      //       title: "Gallery Videos Settings",
      //       type: "item",
      //       icon: <ChevronRight size={15} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/gallery-videos-page-settings"
      //     }
      //   ]
      // }
    ]
  },
  {
    id: "settings",
    title: "Settings",
    type: "collapse",
    icon: <Settings size={20} />,
    permissions: ["ADMIN"],
    children: [
      {
        id: "organization",
        title: "Organization",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/general-settings"
      },
      {
        id: "faculty",
        title: "Faculty",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/faculty"
      },
      {
        id: "role",
        title: "Role",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/role"
      }
    ]
  }
]

// let newNavigation = [...Navigation]
// const user = getUserData()
// if (user !== null) {
//   Navigation = Navigation.filter(i => i.permissions.includes(user?.user?.role))
// }

export default  Navigation