import React from "react"
import { useSelector } from "react-redux"
import {
  selectAllOffers,
  selectCreatedOffers,
  selectIsLoadingOffers,
  selectObtainedOffers,
  selectSentOffers
} from "../../../redux/project/offers"

const useOfferApi = () => {
  const isLoadingOffers = useSelector(selectIsLoadingOffers)
  const allOffers = useSelector(selectAllOffers)
  const createdOffers = (id) =>
    useSelector((state) => selectCreatedOffers(state, id))
  const sentOffers = (id) => useSelector((state) => selectSentOffers(state, id))
  const obtainedOffers = (id) =>
    useSelector((state) => selectObtainedOffers(state, id))
  return {
    isLoading: isLoadingOffers,
    offersData: allOffers,
    createdOffers,
    sentOffers,
    obtainedOffers
  }
}

export default useOfferApi
