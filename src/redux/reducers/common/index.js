import { IS_LOADING, SAVE_REFERRAL } from '../../types/common'

const initialState = {
    loading: false,
    referralCode: null
}

const common = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {...state, loading: action.payload}
        
        case SAVE_REFERRAL:
            return {...state, referralCode: action.payload}
        
        default:
            return state
    }
}

export default common