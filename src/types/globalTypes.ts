import { UserActionTypes } from './actionTypes';

export type ReposListType = {
    id: number,
    name: string,
    html_url: string,
    forks_count: number,
    stargazers_count: number,
}

export type UsersListItemType = {
    id: number,
    url: string,
    bio?: string,
    type: string,
    login: string,
    email?: string,
    node_id: string,
    html_url: string,
    location?: string,
    gists_url: string,
    repos_url: string,
    site_admin: boolean,
    avatar_url: string,
    events_url: string,
    repos_list?: ReposListType[],
    created_at?: string,
    starred_url: string,
    gravatar_id: string,
    repos_count?: number,
    followers_url: string,
    following_url: string,
    followers_count?: number,
    following_count?: number,
    subscriptions_url: string,
    organizations_url: string,
    received_events_url: string,
}

export interface ApplicationState {
    users: UsersListItemType[],
    isNeedLoadData: boolean,
    selectedUserId: null | number,
    isOpenUserInfo: boolean,
    userListSearchInputValue: string,
}

interface SetUsers {
    type: UserActionTypes.SET_USERS,
    payload: UsersListItemType[],
}

interface SetIsOpenUserInfo {
    type: UserActionTypes.SET_IS_OPEN_USER_INFO,
    payload: boolean,
}

interface SetIsNeedLoadData {
    type: UserActionTypes.SET_IS_NEED_LOAD_DATA,
    payload: boolean,
}

interface SetSelectedUserId {
    type: UserActionTypes.SET_SELECTED_USER_ID,
    payload: number,
}

interface SetUserListSearchInputValue {
    type: UserActionTypes.SET_USER_LIST_SEARCH_INPUT_VALUE,
    payload: string,
}

export type ActionType = SetUsers
| SetIsOpenUserInfo
| SetIsNeedLoadData
| SetSelectedUserId
| SetUserListSearchInputValue