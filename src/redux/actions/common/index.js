import { IS_LOADING, SAVE_REFERRAL } from '../../types/common'

export const toggleNetworkLoading = (payload) => dispatch => {
    dispatch({type: IS_LOADING, payload})
}

export const saveReferral = (payload) => dispatch => {
    dispatch({type: SAVE_REFERRAL, payload})
}