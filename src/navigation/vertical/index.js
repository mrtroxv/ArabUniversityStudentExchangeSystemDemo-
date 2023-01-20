// ** Navigation imports
// import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

// ** Merge & Export
// export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others]
import {
  Mail,
  Home,
  Circle,
  FileText,
  User,
  Edit,
  File,
  Send
} from "react-feather"
import { FiDownload, FiUsers, FiUserX } from "react-icons/fi"
import { AiOutlineFileDone } from "react-icons/ai"
const menuItems = (t) => {
  const items = [
    {
      header: "Main Menu",
      action: "read",
      resource: "ACL"
    },
    {
      id: "home",
      title: t("home"),
      icon: <Home size={20} />,
      navLink: "/home",
      action: "read",
      resource: "ACL"
    },
    {
      header: "Offers",
      action: "read",
      resource: "ACL"
    },
    {
      id: "CreatedOffers",
      title: t("Created Offers"),
      icon: <FileText size={20} />,
      navLink: "/offers/created-offers",
      action: "read",
      resource: "ACL"
    },
    {
      id: "SentOffers",
      title: t("Sent Offers"),
      icon: <Send size={20} />,
      navLink: "/offers/sent-offers",
      action: "read",
      resource: "ACL"
    },
    {
      id: "ObtainedOffers",
      title: t("Obtained Offers"),
      icon: <FiDownload size={20} />,
      navLink: "/offers/obtained-offers",
      action: "read",
      resource: "ACL"
    },
    {
      id: "FinishedOffers",
      title: t("Finished Offers"),
      icon: <AiOutlineFileDone size={20} />,
      navLink: "/offers/finished-offers",
      action: "read",
      resource: "ACL"
    },
    {
      header: "Universities",
      action: "manage",
      resource: "admin"
    },
    {
      id: "ViewUniversities",
      title: t("Active"),
      icon: <FiUsers size={20} />,
      navLink: "/universities/list/active",
      action: "manage",
      resource: "admin"
    },
    {
      id: "ViewSuspended",
      title: t("Suspended"),
      icon: <FiUserX size={20} />,
      navLink: "/universities/list/suspended",
      action: "manage",
      resource: "admin"
    },
    {
      header: t("candidates"),
      action: "read",
      resource: "ACL"
    },
    {
      id: "ViewCandidates",
      title: t("viewCandidates"),
      icon: <User size={20} />,
      navLink: "/candidates/view-candidates",
      action: "read",
      resource: "ACL"
    },
    {
      id: "ViewReports",
      title: t("reports"),
      icon: <Edit size={20} />,
      navLink: "/view-reports",
      action: "read",
      resource: "user"
      // newTab: true
    },
    {
      header: "Apps & Pages",
      action: "read",
      resource: "user"
    },
    {
      id: "email",
      title: "Email",
      icon: <Mail size={20} />,
      navLink: "/apps/email",
      action: "read",
      resource: "user"
    }
  ]
  return items
}

export default menuItems
