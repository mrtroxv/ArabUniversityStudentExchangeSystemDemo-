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
      id: "Offers",
      title: t("offers"),
      icon: <FileText size={20} />,
      children: [
        {
          id: "CreatedOffers",
          title: t("Created Offers"),
          icon: <Circle size={20} />,
          navLink: "/offers/created-offers"
        },
        {
          id: "SentOffers",
          title: t("Sent Offers"),
          icon: <Circle size={20} />,
          navLink: "/offers/sent-offers"
        },
        {
          id: "ObtainedOffers",
          title: t("Obtained Offers"),
          icon: <Circle size={20} />,
          navLink: "/offers/obtained-offers"
        }
      ]
    },
    {
      id: "Universities",
      title: t("universities"),
      icon: <User size={20} />,
      children: [
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
        {
          id: "ViewCandidates",
          title: t("viewCandidates"),
          icon: <Circle size={20} />,
          navLink: "/candidates/view-candidates"
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
        }
      ]
    },
    {
      header: "Apps & Pages"
    },
    {
      id: "email",
      title: "Email",
      icon: <Mail size={20} />,
      navLink: "/apps/email"
    }
  ]
  return items
}

export default menuItems
