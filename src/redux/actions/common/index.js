import { IS_LOADING } from '../../types/common'

export const toggleNetworkLoading = () => dispatch => {
    dispatch({type: IS_LOADING})
}