import ActionTypes from '../constants/actionTypes';
import * as globalTypes from '../constants/globalTypes';

export const setUsers = (payload: globalTypes.UsersListItemType[]) => ({ type: ActionTypes.SET_USERS, payload });
export const setIsOpenUserInfo = (payload: boolean) => ({ type: ActionTypes.SET_IS_OPEN_USER_INFO, payload });
