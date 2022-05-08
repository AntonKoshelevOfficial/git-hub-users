import * as globalTypes from '../types/globalTypes';

export const getUsers = (state: { users: globalTypes.UsersListItemType[] }) => state.users;
export const getIsOpenUserInfo = (state: { isOpenUserInfo: boolean }) => state.isOpenUserInfo;
export const getIsNeedLoadData = (state: { isNeedLoadData: boolean }) => state.isNeedLoadData;
export const getSelectedUserId = (state: { selectedUserId: null | number }) => state.selectedUserId;
export const getUserListSearchValue = (state: { userListSearchInputValue: string }) => state.userListSearchInputValue;
