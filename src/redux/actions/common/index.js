import { IS_LOADING, SAVE_REFERRAL } from '../../types/common'

export const toggleNetworkLoading = () => dispatch => {
    dispatch({type: IS_LOADING})
}

export const saveReferral = (payload) => dispatch => {
    dispatch({type: SAVE_REFERRAL, payload})
}