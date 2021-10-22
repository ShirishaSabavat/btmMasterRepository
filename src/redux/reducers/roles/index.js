import { GET_ALL_ROLES, ROLE_DETAILS, UPDATE_PERMISSIONS } from '../../types/roles'

const initialState = {
  roles:[],
  role: {}
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROLES:
      return {...state, roles: action.payload}
    case ROLE_DETAILS:
      return {...state, role: action.payload}
    case UPDATE_PERMISSIONS:
      const newPermissions = [...state.role.permissions]
      newPermissions[action.payload.module][Object.keys(newPermissions[action.payload.module])[0]][action.payload.role] = action.payload.value
      return {
        ...state,
        permission: {
          ...state.role,
          permissions: newPermissions
        }
      }

    default:
      return state
  }
}

export default rolesReducer
