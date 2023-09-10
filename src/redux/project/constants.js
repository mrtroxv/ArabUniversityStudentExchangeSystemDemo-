const BE_LINK = "/api"
const OFFERS = "/offer"
export const OFFERS_URL = `${BE_LINK}${OFFERS}/show_offer`
export const CREATE_OFFER_URL = `${BE_LINK}/insert_offer`
export const OWN_OFFERS_URL = `${BE_LINK}${OFFERS}/own-offers`
export const OBTAINED_OFFER_URL = `${BE_LINK}${OFFERS}/obtained-offers`
export const ACTIVE_OFFERS_URL = `${BE_LINK}${OFFERS}/active-offers`
export const ENDED_OFFERS_URL = `${BE_LINK}${OFFERS}/ended-offers`
export const SEND_OFFER_URL = `${BE_LINK}${OFFERS}/send-offer`
export const DELETE_OFFER_URL = `${BE_LINK}${OFFERS}/delete-offer`
export const REJECT_OFFER_URL = `${BE_LINK}${OFFERS}/reject-offer`
export const ACCEPT_OFFER_URL = `${BE_LINK}${OFFERS}/accept-offer`
export const ADD_STUDENT_URL = `${BE_LINK}${OFFERS}/add-student`
export const DUPLICATE_OFFER_URL = `${BE_LINK}${OFFERS}/duplicate`
export const headersApi = {
  authorization: JSON.parse(localStorage.getItem("accessToken"))
}
