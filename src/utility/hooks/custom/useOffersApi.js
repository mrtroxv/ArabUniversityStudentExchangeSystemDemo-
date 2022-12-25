import React from "react"
import { useSelector } from "react-redux"
import {
  selectAllOffers,
  selectCreatedOffers,
  selectIsLoadingOffers,
  selectSentOffers
  // fetchAllOffers
} from "../../../redux/project/offers"

const useOfferApi = () => {
  // const dispatch = useDispatch()
  const isLoadingOffers = useSelector(selectIsLoadingOffers)
  const allOffers = useSelector(selectAllOffers)
  const createdOffers = (id) =>
    useSelector((state) => selectCreatedOffers(state, id))
  const sentOffers = (id) => useSelector((state) => selectSentOffers(state, id))

  return {
    isLoading: isLoadingOffers,
    offersData: allOffers,
    createdOffers,
    sentOffers
  }
}

export default useOfferApi
