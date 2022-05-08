import { UserActionTypes } from '../types/actionTypes';
import * as globalTypes from '../types/globalTypes';

export const setUsers = (payload: globalTypes.UsersListItemType[]) => ({ type: UserActionTypes.SET_USERS, payload });
export const setIsOpenUserInfo = (payload: boolean) => ({ type: UserActionTypes.SET_IS_OPEN_USER_INFO, payload });
export const setIsNeedLoadData = (payload: boolean) => ({ type: UserActionTypes.SET_IS_NEED_LOAD_DATA, payload });
export const setSelectedUserId = (payload: number) => ({ type: UserActionTypes.SET_SELECTED_USER_ID, payload });
export const setUserListSearchInputValue = (payload: string) => ({ type: UserActionTypes.SET_USER_LIST_SEARCH_INPUT_VALUE, payload });
