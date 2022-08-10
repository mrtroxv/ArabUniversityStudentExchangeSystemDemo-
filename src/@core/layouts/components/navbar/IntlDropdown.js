// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'
import { useRTL } from '@hooks/useRTL'
// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const IntlDropdown = () => {
  // ** Hooks
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [isRtl, setValue] = useRTL()
  // ** Vars
  const langObj = {
    en: 'en',
    ar: 'ar'
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
    if (lang === 'ar' && !isRtl) {
      setValue(true)
    } else if (lang === 'en') {
      setValue(false)
    }
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className='country-flag flag-icon'
          countryCode={i18n.language === 'en' ? 'us' : 'sa'}
        />
        <span className='selected-language'>{t(langObj[i18n.language])}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ms-1'>{t('en')}</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'ar')}>
          <ReactCountryFlag className='country-flag' countryCode='sa' svg />
          <span className='ms-1'>{t('ar')}</span>
        </DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
