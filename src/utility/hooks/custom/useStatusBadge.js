import React from "react"
import { useTranslation } from "react-i18next"

const useStatusBadge = () => {
  const { t } = useTranslation()
  const statusBadge = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Offer Request"), color: "light-warning" },
    2: { title: t("Accepted Offer"), color: "light-success" },
    3: { title: t("Student Request Submission"), color: "warning" },
    4: { title: t("Pending Student Request"), color: "light-warning" },
    5: { title: t("Ready to Start"), color: "success" },
    6: { title: t("In Progress"), color: "info" },
    7: { title: t("Creating Offer Reports"), color: "light-primary" },
    8: { title: t("Finished"), color: "light-danger" }
  }
  return {
    statusBadge
  }
}

export default useStatusBadge
