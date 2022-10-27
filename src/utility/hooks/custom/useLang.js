// custom hook to get the language from the local storage and set the language in the local storage
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRTL } from "../useRTL"
import { useLocalStorage } from "./useLocalStorage"

export const useLang = () => {
  const { i18n } = useTranslation()
  const [lang, setLang] = useLocalStorage("lang", "en")
  const [isRtl, setValue] = useRTL()
  useEffect(() => {
    i18n.changeLanguage(lang)
    if (lang === "ar") {
      setValue(true)
    } else if (lang === "en") {
      setValue(false)
    }
  }, [lang])

  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
    if (lang === "ar" && !isRtl) {
      setValue(true)
    } else if (lang === "en" && isRtl) {
      setValue(false)
    }
    setLang(lang)
  }
  return [lang, handleLangUpdate]
}
