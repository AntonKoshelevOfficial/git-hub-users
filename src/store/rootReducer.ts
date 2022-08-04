import { UserActionTypes } from '../types/actionTypes';
import * as globalTypes from '../types/globalTypes';

const initialState: globalTypes.ApplicationState = {
    users: [],
    isNeedLoadData: true,
    selectedUserId: null,
    isOpenUserInfo: false,
    userListSearchInputValue: '',
}

export default (state: globalTypes.ApplicationState = initialState, action: globalTypes.ActionType): globalTypes.ApplicationState => {
    switch (action.type) {
        case UserActionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case UserActionTypes.SET_IS_NEED_LOAD_DATA:
            return {
                ...state,
                isNeedLoadData: action.payload,
            }
        case UserActionTypes.SET_IS_OPEN_USER_INFO:
            return {
                ...state,
                isOpenUserInfo: action.payload,
            }
        case UserActionTypes.SET_SELECTED_USER_ID:
            return {
                ...state,
                selectedUserId: action.payload,
            }
        case UserActionTypes.SET_USER_LIST_SEARCH_INPUT_VALUE:
            return {
                ...state,
                userListSearchInputValue: action.payload,
            }
        default:
            return state;
    }
}
