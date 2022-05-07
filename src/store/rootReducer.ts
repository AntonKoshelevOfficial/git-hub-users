import ActionTypes from '../constants/actionTypes';
import * as types from '../constants/globalTypes';

export default (state: any, action: types.ActionType) => {
    switch (action.type) {
        case ActionTypes.SET_USERS:
            console.log('sdsdsd', action.payload)
            return {
                ...state,
                users: action.payload,
            }
        case ActionTypes.SET_IS_OPEN_USER_INFO:
            return {
                ...state,
                isOpenUserInfo: action.payload,
            }
        default:
            return state;
    }
}