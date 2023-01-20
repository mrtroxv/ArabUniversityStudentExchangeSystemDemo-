import React from "react"
import { useTranslation } from "react-i18next"

const useStatusBadge = () => {
  const { t } = useTranslation()
  const statusBadge = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Request"), color: "light-warning" },
    2: { title: t("Accepted"), color: "light-success" },
    3: { title: t("Application Submission"), color: "warning" },
    4: { title: t("Pending Submission"), color: "light-warning" },
    5: { title: t("Ready to Start"), color: "success" },
    6: { title: t("In Progress"), color: "info" },
    7: { title: t("Offer Report"), color: "light-primary" },
    8: { title: t("Finished"), color: "light-danger" }
  }
  return {
    statusBadge
  }
}

export default useStatusBadge
