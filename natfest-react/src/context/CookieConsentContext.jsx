import { createContext, useContext } from 'react'
import { useCookieConsentLogic } from '../hooks/useCookieConsent'

const CookieConsentContext = createContext({
  consent: 'unset',
  accept: () => {},
  reject: () => {},
  revoke: () => {},
})

export function CookieConsentProvider({ children }) {
  const cookieConsent = useCookieConsentLogic()

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}

export default CookieConsentContext
