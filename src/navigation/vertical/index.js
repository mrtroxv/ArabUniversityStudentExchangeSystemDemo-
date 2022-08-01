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
import { Mail, Home, Circle, FileText, User, Edit } from "react-feather"

export default [
    {
        id: "home",
        title: "Home",
        icon: <Home size={20} />,
        navLink: "/home"
    },
    {
        id: "secondPage",
        title: "Second Page",
        icon: <Mail size={20} />,
        navLink: "/second-page"
    },
    {
        id: "Offers",
        title: "Offers",
        icon: <FileText size={20} />,
        children: [
            {
                id: "ViewOffers",
                title: "View Offers",
                icon: <Circle size={20} />,
                navLink: "/view-offers"
            },
            {
                id: "EditOffer",
                title: "Edit Offer",
                icon: <Circle size={20} />,
                navLink: "/edit-offer"
            },
            {
                id: "CreateOffer",
                title: "Create Offer",
                icon: <Circle size={20} />,
                navLink: "/new-offer"
            }
        ]

    },
    {
        id: "Candidates",
        title: "Candidates",
        icon: <User size={20} />,
        children: [
            {
                id: "ViewCandidates",
                title: "View Candidates",
                icon: <Circle size={20} />,
                navLink: "/view-candidates"
            },
            {
                id: "EditCandidate",
                title: "Edit Candidate",
                icon: <Circle size={20} />,
                navLink: "/edit-candidate"
            },
            {
                id: "CreateCandidate",
                title: "Create Candidate",
                icon: <Circle size={20} />,
                navLink: "/new-candidate"
            }
        ]

    },
    {
        id: "Reports",
        title: "Reports",
        icon: <Edit size={20} />,
        children: [
            {
                id: "ViewReports",
                title: "View Reports",
                icon: <Circle size={20} />,
                navLink: "/view-reports"
            },
            {
                id: "CreateReport",
                title: "Create Report",
                icon: <Circle size={20} />,
                navLink: "/new-report"
            }
        ]

    }
]
