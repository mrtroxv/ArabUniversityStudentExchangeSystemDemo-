// ** Third Party Components
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"
// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import { useLang } from "../../../../utility/hooks/custom/useLang"
// import i18n from "../../../../configs/i18n"

const IntlDropdown = () => {
  // ** Hooks
  const { t } = useTranslation()
  const [lang, handleLangUpdate] = useLang()
  // ** Vars
  const langObj = {
    en: "us",
    ar: "sa"
  }

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={langObj[lang]}
        />
        <span className="selected-language">{t(lang)}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "en")}
        >
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">{t("en")}</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "ar")}
        >
          <ReactCountryFlag className="country-flag" countryCode="sa" svg />
          <span className="ms-1">{t("ar")}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
