import * as globalTypes from '../constants/globalTypes';

export const getUsers = (state: { users: globalTypes.UsersListItemType[] }) => state.users;
export const getIsOpenUserInfo = (state: { isOpenUserInfo: boolean }) => state.isOpenUserInfo;
export const getIsNeedLoadData = (state: { isNeedLoadData: boolean }) => state.isNeedLoadData;
export const getSelectedUserId = (state: { selectedUserId: number }) => state.selectedUserId;
export const getUserListSearchValue = (state: { userListSearchInputValue: string }) => state.userListSearchInputValue;
