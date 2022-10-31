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
import { Mail, Home, Circle, FileText, User, Edit, File } from "react-feather"
const menuItems = (t) => {
  const items = [
    {
      id: "home",
      title: t("home"),
      icon: <Home size={20} />,
      navLink: "/home"
    },
    {
      id: "secondPage",
      title: t("secondPage"),
      icon: <Mail size={20} />,
      navLink: "/second-page"
    },
    {
      id: "Offers",
      title: t("offers"),
      icon: <FileText size={20} />,
      children: [
        {
          id: "CreateOffer",
          title: t("createOffer"),
          icon: <Circle size={20} />,
          navLink: "/new-offer"
        }
      ]
    },
    {
      id: "Universities",
      title: t("universities"),
      icon: <User size={20} />,
      children: [
        {
          id: "CreateUniversity",
          title: t("CreateUniversity"),
          icon: <Circle size={20} />,
          navLink: "/new-university"
        },
        {
          id: "ViewUniversities",
          title: t("ViewUniversities"),
          icon: <Circle size={20} />,
          navLink: "/universities/list"
        }
      ]
    },
    {
      id: "Candidates",
      title: t("candidates"),
      icon: <User size={20} />,
      children: [
        // {
        //     id: "ViewCandidates",
        //     title: t('viewCandidates'),
        //     icon: <Circle size={20} />,
        //     navLink: "/view-candidates"
        // },
        // {
        //     id: "EditCandidate",
        //     title: t('editCandidate'),
        //     icon: <Circle size={20} />,
        //     navLink: "/edit-candidate"
        // },
        {
          id: "CreateCandidate",
          title: t("createCandidate"),
          icon: <Circle size={20} />,
          navLink: "/new-candidate"
        }
      ]
    },
    {
      id: "Reports",
      title: t("reports"),
      icon: <Edit size={20} />,
      children: [
        {
          id: "ViewReports",
          title: t("viewReports"),
          icon: <Circle size={20} />,
          navLink: "/view-reports"
        },
        {
          id: "CreateReport",
          title: t("createReport"),
          icon: <Circle size={20} />,
          navLink: "/new-report"
        }
      ]
    },
    {
      id: "Pages",
      title: t("pages"),
      icon: <File size={20} />,
      children: [
        {
          id: "AccountSettings",
          title: t("accountSettings"),
          icon: <Circle size={20} />,
          navLink: "/pages/account-settings"
        }
      ]
    }
  ]
  return items
}

export default menuItems
