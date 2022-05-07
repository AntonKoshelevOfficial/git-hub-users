import * as globalTypes from '../constants/globalTypes';

export const getUsers = (state: { users: globalTypes.UsersListItemType[] }) => state.users;
export const getIsOpenUserInfo = (state: { isOpenUserInfo: boolean }) => state.isOpenUserInfo;
