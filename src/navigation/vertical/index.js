import { HelpCircle, Home, Settings, ChevronRight, Video, Sliders, Youtube, Users, List, TrendingUp, GitBranch, Briefcase, CheckCircle, Calendar, BarChart2, PhoneCall} from 'react-feather'
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
    title: 'Customers',
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
    permissions: ["BAC_USER", "USER"]
  },
  {
    id: 'myworkshops',
    title: 'My Workshops',
    icon: <Calendar size={20} />,
    navLink: '/my-workshops',
    permissions: ["BAC_USER", "USER"]
  },
  {
    id: 'mycustomers',
    title: 'Customers',
    icon: <Users size={20} />,
    navLink: '/my-customers',
    permissions: ["BAC_USER"]
  },
  {
    id: 'mycommission',
    title: 'Commision',
    icon: <TrendingUp size={20} />,
    navLink: '/admin/my-commission',
    permissions: ["ADMIN", "BAC_USER"]
  },
  {
    id: 'payouts',
    title: 'Payout',
    icon: <GitBranch size={20} />,
    navLink: '/admin/payouts',
    permissions: ["ADMIN"]
  },
  // {
  //   id: 'myreports',
  //   title: 'Reports',
  //   icon: <FileText size={20} />,
  //   navLink: '/admin/my-reports',
  //   permissions: ["BAC_USER"]
  // },
  // {
  //   id: 'mymessages',
  //   title: 'Messages',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/admin/my-messages',
  //   permissions: ["BAC_USER"]
  // },
  {
    id: 'videos',
    title: 'Video',
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
    navLink: '/kyc',
    permissions: ["BAC_USER"]
  },
  {
    id: 'transactions',
    title: 'Transactions',
    icon: <List size={20} />,
    navLink: '/wallet',
    permissions: ["ADMIN", "BAC_USER"]
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
        permissions: ["admin"],
        navLink: "/about-settings"
      },
      {
        id: "mission",
        title: "Mission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/mission-settings"
      },
      {
        id: "vission",
        title: "Vission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/vision-settings"
      },
      {
        id: "contact",
        title: "Contact",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/contact-settings"
      },
      {
        id: 'gallery',
        title: 'Gallery',
        icon: <ChevronRight size={15} />,
        navLink: '/admin/gallery',
        permissions: ["ADMIN"]
      },
      {
        id: 'socialMedia',
        title: 'Social Media',
        icon: <ChevronRight size={15} />,
        navLink: '/admin/social-media',
        permissions: ["ADMIN"]
      },       
      {
        id: "banner",
        title: "Banner",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/banner"
      },
      {
        id: "staticPages",
        title: "Static Pages",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/static-pages"
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
      //       permissions: ["admin"],
      //       navLink: "/gallery-page-images-settings"
      //     },
      //     {
      //       id: "videospage",
      //       title: "Gallery Videos Settings",
      //       type: "item",
      //       icon: <ChevronRight size={15} />,
      //       permissions: ["admin"],
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
        permissions: ["admin"],
        navLink: "/general-settings"
      },
      {
        id: "faculty",
        title: "Faculty",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/faculty"
      },
      {
        id: "role",
        title: "Role",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/role"
      },
      {
        id: "payment",
        title: "Razorpay",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/payment"
      },
      {
        id: "default-bac",
        title: "Default BAC",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin"],
        navLink: "/default-bac"
      }
    ]
  },
  {
    id: 'followup',
    title: 'Follow Up',
    icon: <PhoneCall size={20} />,
    navLink: '/follow-up',
    permissions: ["ADMIN", "BAC_USER"]
  },
  {
    id: 'inquiry',
    title: 'Inquiry',
    icon: <HelpCircle size={20} />,
    navLink: '/inquiry',
    permissions: ["ADMIN"]
  }
]

// let newNavigation = [...Navigation]
// const user = getUserData()
// if (user !== null) {
//   Navigation = Navigation.filter(i => i.permissions.includes(user?.user?.role))
// }

export default  Navigation