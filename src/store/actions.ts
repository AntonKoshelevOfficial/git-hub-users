import ActionTypes from '../constants/actionTypes';
import * as globalTypes from '../constants/globalTypes';

export const setUsers = (payload: globalTypes.UsersListItemType[]) => ({ type: ActionTypes.SET_USERS, payload });
export const setIsOpenUserInfo = (payload: boolean) => ({ type: ActionTypes.SET_IS_OPEN_USER_INFO, payload });
export const setIsNeedLoadData = (payload: boolean) => ({ type: ActionTypes.SET_IS_NEED_LOAD_DATA, payload });
export const setSelectedUserId = (payload: number) => ({ type: ActionTypes.SET_SELECTED_USER_ID, payload });
export const setUserListSearchInputValue = (payload: string) => ({ type: ActionTypes.SET_USER_LIST_SEARCH_INPUT_VALUE, payload });
