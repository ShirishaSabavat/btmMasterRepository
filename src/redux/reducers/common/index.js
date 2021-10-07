import { IS_LOADING } from '../../types/common'

const initialState = {
    loading: false
}

const common = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {...state, loading: !state.loading}
        
        default:
            return state
    }
}

export default common