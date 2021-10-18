import { GET_ALL_ROLES } from '../../types/roles'

const initialState = {
  roles:[]
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROLES:
      return {...state, roles: action.payload}

    default:
      return state
  }
}

export default rolesReducer
