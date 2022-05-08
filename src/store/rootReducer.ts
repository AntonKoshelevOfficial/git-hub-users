import ActionTypes from '../constants/actionTypes';
import * as types from '../constants/globalTypes';

export default (state: any, action: types.ActionType) => {
    switch (action.type) {
        case ActionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case ActionTypes.SET_IS_NEED_LOAD_DATA:
            return {
                ...state,
                isNeedLoadData: action.payload,
            }
        case ActionTypes.SET_IS_OPEN_USER_INFO:
            return {
                ...state,
                isOpenUserInfo: action.payload,
            }
        case ActionTypes.SET_SELECTED_USER_ID:
            return {
                ...state,
                selectedUserId: action.payload,
            }
        case ActionTypes.SET_USER_LIST_SEARCH_INPUT_VALUE:
            return {
                ...state,
                userListSearchInputValue: action.payload,
            }
        default:
            return state;
    }
}