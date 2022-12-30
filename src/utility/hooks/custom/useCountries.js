import countries from "i18n-iso-countries"
import EN_COUNTRIES from "i18n-iso-countries/langs/en.json"
import AR_COUNTRIES from "i18n-iso-countries/langs/ar.json"

import React from "react"
import { useLang } from "./useLang"

const useCountries = () => {
  const [lang] = useLang()
  countries.registerLocale(EN_COUNTRIES)
  countries.registerLocale(AR_COUNTRIES)
  const data = countries.getNames(lang, { official: true })
  const COUNTRIES_IDS = Object.keys(data)
  const selectCountries = COUNTRIES_IDS.map((country) => ({
    value: country,
    lable: data[country]
  }))
  console.log(selectCountries)
  return {
    countries: data,
    selectCountries
  }
}

export default useCountries
